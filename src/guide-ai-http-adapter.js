import {guideAiService} from "./guide-ai-service.js";
import {GUIDE_AI_API_CONTRACT} from "./guide-ai-api-contract.js";
import {guideAiActivation} from "./guide-ai-activation.js";

const HEADERS=Object.freeze({"content-type":"application/json; charset=utf-8","cache-control":"no-store"});
const response=(status,body)=>({status,headers:HEADERS,body});

export async function guideAiHttpRequest(request={},context={}){
  const method=String(request.method||"GET").toUpperCase();
  const path=String(request.path||"");
  if(method!=="POST"||path!==GUIDE_AI_API_CONTRACT.path)return response(404,{ok:false,reason:"NOT_FOUND"});
  const activation=guideAiActivation(context.capabilities);
  if(!activation.ready)return response(503,{ok:false,mode:"DETERMINISTIC_ONLY",reason:"GUIDE_AI_NOT_ACTIVATED"});
  const result=await guideAiService(request.body||{},context);
  if(!result.ok){
    const status=result.stage==="INPUT"?400:result.reason==="COST_GUARD_BLOCKED"?429:503;
    return response(status,result);
  }
  return response(200,result);
}
