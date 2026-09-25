import {guideAiRequestEnvelope,guideAiPublicResponse} from "./guide-ai-api-contract.js";
import {guideAiActivation} from "./guide-ai-activation.js";
import {guideAiTrustedContext,validateGuideAiModelResult} from "./guide-ai-trusted-context.js";

export async function guideAiService(input={},context={}){
  const activation=guideAiActivation(context.capabilities);
  if(!activation.ready)return{ok:false,mode:"DETERMINISTIC_ONLY",reason:"GUIDE_AI_NOT_ACTIVATED"};
  const parsed=guideAiRequestEnvelope(input);
  if(!parsed.ok)return{ok:false,mode:"GENERATIVE_ENABLED",stage:"INPUT",reason:parsed.reason};
  if(!Array.isArray(context.catalog))return{ok:false,mode:"DETERMINISTIC_ONLY",reason:"TRUSTED_CATALOG_REQUIRED"};
  if(typeof context.modelAdapter?.generate!=="function")return{ok:false,mode:"DETERMINISTIC_ONLY",reason:"MODEL_ADAPTER_REQUIRED"};
  if(typeof context.costGuard?.allow!=="function"||typeof context.costGuard?.commit!=="function")return{ok:false,mode:"DETERMINISTIC_ONLY",reason:"COST_GUARD_REQUIRED"};

  const trusted=guideAiTrustedContext(parsed.request,context.catalog);
  const budget=await context.costGuard.allow({sessionId:parsed.request.sessionId,queryChars:parsed.request.query.length});
  if(!budget?.allowed)return{ok:false,mode:"DETERMINISTIC_ONLY",reason:budget?.reason||"COST_GUARD_BLOCKED"};

  let generated;
  try{
    generated=await context.modelAdapter.generate({
      query:parsed.request.query,
      language:parsed.request.language,
      trustedContext:trusted,
      constraints:{
        maxAnswerChars:1600,
        claimsMustUseTrustedContext:true,
        noPaidRanking:true,
        doNotUpgradeTruthLabels:true
      }
    });
  }catch{
    return{ok:false,mode:"DETERMINISTIC_ONLY",reason:"MODEL_GENERATION_FAILED"};
  }

  const validated=validateGuideAiModelResult(generated,trusted);
  if(!validated.ok)return{ok:false,mode:"DETERMINISTIC_ONLY",reason:validated.reason};
  const committed=await context.costGuard.commit({sessionId:parsed.request.sessionId,usage:generated.usage||null});
  if(committed?.allowed===false)return{ok:false,mode:"DETERMINISTIC_ONLY",reason:committed.reason||"COST_COMMIT_BLOCKED"};

  return{ok:true,mode:"GENERATIVE_ENABLED",response:guideAiPublicResponse(validated.result),trustedContext:trusted};
}
