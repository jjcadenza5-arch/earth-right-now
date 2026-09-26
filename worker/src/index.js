import {guideAiService} from "../../src/guide-ai-service.js";
import {rankForIntent} from "../../src/ern-ai.js";
import {deriveGuideAiRateSubject} from "../../src/guide-ai-rate-subject-derivation.js";
import {createOpenAiGuideModelAdapter} from "./openai-model-adapter.js";
export {GuideState} from "./guide-state.js";

const H={"content-type":"application/json; charset=utf-8","cache-control":"no-store"};
const reply=(status,body,origin)=>{const h={...H};if(origin){h["access-control-allow-origin"]=origin;h.vary="Origin"}return new Response(JSON.stringify(body),{status,headers:h})};
const originFor=(r,e)=>{const want=String(e.ERN_PUBLIC_ORIGIN||"https://earthrightnow.app").replace(/\/$/,""),got=String(r.headers.get("origin")||"").replace(/\/$/,"");return got===want?got:null};
const hmac=async(raw,key)=>{const k=await crypto.subtle.importKey("raw",new TextEncoder().encode(key),{name:"HMAC",hash:"SHA-256"},false,["sign"]),sig=await crypto.subtle.sign("HMAC",k,new TextEncoder().encode(raw));return btoa(String.fromCharCode(...new Uint8Array(sig))).replace(/\+/g,"-").replace(/\//g,"_").replace(/=+$/,"")};
const stateStub=e=>e.GUIDE_STATE.get(e.GUIDE_STATE.idFromName("global"));
const stateCall=async(e,body)=>{const r=await stateStub(e).fetch("https://guide-state/internal",{method:"POST",headers:{"content-type":"application/json"},body:JSON.stringify(body)});return r.json()};
async function catalog(e){const r=await fetch(e.ERN_CATALOG_URL||"https://earthrightnow.app/data/sources.json",{headers:{accept:"application/json","user-agent":"ERN-Guide/1.0"},cf:{cacheTtl:60,cacheEverything:true}});if(!r.ok)throw Error("CATALOG_FETCH_"+r.status);const x=await r.json();if(!Array.isArray(x))throw Error("CATALOG_INVALID");return x}
function resolver(){return{async resolve({query,placeHint,sourceHints,catalog}){const byId=new Map(catalog.map(x=>[x.id,x])),picked=[];for(const id of sourceHints||[]){const s=byId.get(id);if(s&&s.health!=="OFFLINE")picked.push(s)}if(placeHint)for(const s of catalog)if((s.placeId||s.id)===placeHint&&s.health!=="OFFLINE")picked.push(s);for(const s of rankForIntent(catalog,query))picked.push(s);const unique=[...new Map(picked.map(s=>[s.id,s])).values()].slice(0,8);return{sourceIds:unique.map(s=>s.id),placeId:placeHint||unique[0]?.placeId||null,action:unique.length?"OPEN_SOURCE":"NO_MATCH"}}}}
function stores(e,ceiling,reservation){
 const call=b=>stateCall(e,b);
 return{
  rateLimiter:{begin:({subject})=>call({op:"rate-begin",subject}),end:({subject})=>call({op:"rate-end",subject})},
  idempotency:{begin:({subject,requestId})=>call({op:"idem-begin",subject,requestId}),complete:({subject,requestId,response})=>call({op:"idem-complete",subject,requestId,response}),abort:({subject,requestId})=>call({op:"idem-abort",subject,requestId})},
  costGuard:{allow:()=>call({op:"cost-allow",ceiling,reservation}),commit:({usage})=>call({op:"cost-commit",ceiling,reservation,cost:+usage?.estimatedCostUsd}),release:()=>call({op:"cost-release",ceiling,reservation}),forfeit:()=>call({op:"cost-forfeit",ceiling,reservation})},
  metrics:{record:event=>call({op:"metric",event})}
 }
}
export default{
 async fetch(request,env){
  const url=new URL(request.url),origin=originFor(request,env),enabled=env.ERN_GUIDE_AI_ENABLED==="true",ceiling=+env.ERN_GUIDE_MONTHLY_COST_CEILING_USD||10,reservation=+env.ERN_GUIDE_MAX_REQUEST_RESERVATION_USD||.02;
  if(request.method==="OPTIONS")return origin?new Response(null,{status:204,headers:{"access-control-allow-origin":origin,"access-control-allow-methods":"POST, OPTIONS","access-control-allow-headers":"content-type","access-control-max-age":"600",vary:"Origin"}}):new Response(null,{status:403});
  if(request.method==="GET"&&url.pathname==="/health"){let cost=null;try{cost=await stateCall(env,{op:"cost-status",ceiling})}catch{}return reply(200,{ok:true,service:"ERN Guide API",generativeEnabled:enabled,model:env.ERN_GUIDE_MODEL||"gpt-5.6-luna",monthlyCostCeilingUsd:ceiling,cost,secretValuesExposed:false},origin)}
  if(request.method!=="POST"||url.pathname!=="/api/guide")return reply(404,{ok:false,reason:"NOT_FOUND"},origin);
  if(!origin)return reply(403,{ok:false,reason:"ORIGIN_NOT_ALLOWED"});
  if(!enabled)return reply(503,{ok:false,mode:"DETERMINISTIC_ONLY",reason:"GUIDE_AI_DISABLED"},origin);
  if(!env.OPENAI_API_KEY||!env.ERN_RATE_HMAC_KEY||!env.GUIDE_STATE)return reply(503,{ok:false,mode:"DETERMINISTIC_ONLY",reason:"GUIDE_AI_SERVER_CONFIG_INCOMPLETE"},origin);
  if((+request.headers.get("content-length")||0)>6000)return reply(413,{ok:false,reason:"REQUEST_TOO_LARGE"},origin);
  let input;try{input=await request.json()}catch{return reply(400,{ok:false,reason:"INVALID_JSON"},origin)}
  const raw=request.headers.get("CF-Connecting-IP")||request.headers.get("x-real-ip")||"";
  const subject=await deriveGuideAiRateSubject(raw,{digest:v=>hmac(v,env.ERN_RATE_HMAC_KEY)});
  if(!subject.ok)return reply(503,{ok:false,mode:"DETERMINISTIC_ONLY",reason:subject.reason},origin);
  let sources;try{sources=await catalog(env)}catch{return reply(503,{ok:false,mode:"DETERMINISTIC_ONLY",reason:"TRUSTED_CATALOG_UNAVAILABLE"},origin)}
  const s=stores(env,ceiling,reservation);
  const result=await guideAiService(input,{capabilities:{transport:true,secretIsolation:true,trustedContext:true,costGuard:true,rateLimits:true,idempotency:true,observability:true,safetyBoundary:true,privacyNotice:true,deterministicFallback:true},catalog:sources,resolver:resolver(),modelAdapter:createOpenAiGuideModelAdapter({apiKey:env.OPENAI_API_KEY,model:env.ERN_GUIDE_MODEL||"gpt-5.6-luna"}),rateSubject:subject.subject,rateLimiter:s.rateLimiter,idempotency:s.idempotency,costGuard:s.costGuard,metrics:s.metrics,modelTimeoutMs:15000});
  if(result.ok)return reply(200,result.response,origin);
  const status=result.stage==="INPUT"?400:/RATE_LIMIT|COST/.test(result.reason||"")?429:503;return reply(status,result,origin)
 }
};
