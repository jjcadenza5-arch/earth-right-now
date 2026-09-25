import {guideAiRequestEnvelope,guideAiPublicResponse} from "./guide-ai-api-contract.js";
import {guideAiActivation} from "./guide-ai-activation.js";
import {guideAiTrustedContext,validateGuideAiModelResult} from "./guide-ai-trusted-context.js";
import {guideAiRateSubject} from "./guide-ai-rate-limit.js";
import {guideAiFallback} from "./guide-ai-fallback.js";

async function metric(metrics,type,fields={}){try{await metrics?.record?.({type,...fields})}catch{}}
async function releaseBudget(costGuard){try{await costGuard?.release?.()}catch{}}
function fallback(reason,request={}){return{ok:false,...guideAiFallback(reason,request)}}

export async function guideAiService(input={},context={}){
  const started=Date.now(),activation=guideAiActivation(context.capabilities);
  if(!activation.ready)return fallback("GUIDE_AI_NOT_ACTIVATED",input);
  const parsed=guideAiRequestEnvelope(input);
  if(!parsed.ok){await metric(context.metrics,"inputRejected",{latencyMs:Date.now()-started,inputChars:String(input?.query||"").length});return{ok:false,mode:"GENERATIVE_ENABLED",stage:"INPUT",reason:parsed.reason}}
  const request=parsed.request;
  if(!Array.isArray(context.catalog))return fallback("TRUSTED_CATALOG_REQUIRED",request);
  if(typeof context.resolver?.resolve!=="function")return fallback("DETERMINISTIC_RESOLVER_REQUIRED",request);
  if(typeof context.modelAdapter?.generate!=="function")return fallback("MODEL_ADAPTER_REQUIRED",request);
  if(typeof context.costGuard?.allow!=="function"||typeof context.costGuard?.commit!=="function")return fallback("COST_GUARD_REQUIRED",request);
  if(typeof context.rateLimiter?.begin!=="function"||typeof context.rateLimiter?.end!=="function")return fallback("RATE_LIMITER_REQUIRED",request);
  if(typeof context.metrics?.record!=="function")return fallback("OBSERVABILITY_REQUIRED",request);

  const subject=guideAiRateSubject(context.rateSubject||request.sessionId);
  if(!subject.ok)return fallback(subject.reason,request);
  const rate=await context.rateLimiter.begin({subject:subject.subject});
  if(!rate?.allowed){await metric(context.metrics,"rateLimited",{latencyMs:Date.now()-started,inputChars:request.query.length});return fallback(rate?.reason||"RATE_LIMIT",request)}

  try{
    let selection;
    try{selection=await context.resolver.resolve({query:request.query,language:request.language,placeHint:request.placeId,sourceHints:request.sourceIds,catalog:context.catalog})}catch{return fallback("DETERMINISTIC_RESOLUTION_FAILED",request)}
    if(!selection||!Array.isArray(selection.sourceIds))return fallback("DETERMINISTIC_RESOLUTION_INVALID",request);
    const trusted=guideAiTrustedContext(selection,context.catalog);
    const budget=await context.costGuard.allow({sessionId:subject.subject,queryChars:request.query.length});
    if(!budget?.allowed){await metric(context.metrics,"costBlocked",{latencyMs:Date.now()-started,inputChars:request.query.length});return fallback(budget?.reason||"COST_GUARD_BLOCKED",request)}

    let generated;
    try{
      generated=await context.modelAdapter.generate({
        query:request.query,
        language:request.language,
        trustedContext:trusted,
        constraints:{maxAnswerChars:1600,claimsMustUseTrustedContext:true,noPaidRanking:true,doNotUpgradeTruthLabels:true}
      });
    }catch{
      await releaseBudget(context.costGuard);
      await metric(context.metrics,"modelError",{latencyMs:Date.now()-started,inputChars:request.query.length});
      return fallback("MODEL_GENERATION_FAILED",request);
    }

    const validated=validateGuideAiModelResult(generated,trusted);
    if(!validated.ok){await releaseBudget(context.costGuard);await metric(context.metrics,"truthRejected",{latencyMs:Date.now()-started,inputChars:request.query.length});return fallback(validated.reason,request)}
    const committed=await context.costGuard.commit({sessionId:subject.subject,usage:generated.usage||null});
    if(committed?.allowed===false){await metric(context.metrics,"costBlocked",{latencyMs:Date.now()-started,inputChars:request.query.length});return fallback(committed.reason||"COST_COMMIT_BLOCKED",request)}

    const response=guideAiPublicResponse(validated.result);
    await metric(context.metrics,"success",{latencyMs:Date.now()-started,inputChars:request.query.length,outputChars:response.answer.length,estimatedCostUsd:Number.isFinite(committed?.estimatedCostUsd)?committed.estimatedCostUsd:null});
    return{ok:true,mode:"GENERATIVE_ENABLED",response,trustedContext:trusted};
  }finally{
    await context.rateLimiter.end({subject:subject.subject});
  }
}
