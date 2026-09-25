import {earthSignalFeatureMode} from "./earth-signal-activation.js";
import {EARTH_SIGNAL_API_CONTRACT} from "./earth-signal-api-contract.js";
import {
  createEarthSignalService,
  listEarthSignalService,
  reportEarthSignalService
} from "./earth-signal-service.js";

const JSON_HEADERS=Object.freeze({"content-type":"application/json; charset=utf-8","cache-control":"no-store"});

function response(status,body){
  return{status,headers:JSON_HEADERS,body};
}

export async function earthSignalHttpRequest(request={}, context={}){
  const method=String(request.method||"GET").toUpperCase();
  const path=String(request.path||"");
  const capabilities=context.capabilities||{};
  const mode=earthSignalFeatureMode(capabilities);

  if(method==="GET"&&path===EARTH_SIGNAL_API_CONTRACT.contributionPath){
    if(mode!=="CONTRIBUTION_ENABLED")return response(503,{ok:false,mode:"READ_ONLY",reason:"EARTH_SIGNALS_NOT_ACTIVATED"});
    try{
      const result=await listEarthSignalService({...context,placeId:request.query?.placeId||null});
      return response(200,result);
    }catch(error){
      return response(503,{ok:false,reason:error?.code||"SERVICE_UNAVAILABLE"});
    }
  }

  if(method==="POST"&&path===EARTH_SIGNAL_API_CONTRACT.contributionPath){
    if(mode!=="CONTRIBUTION_ENABLED")return response(503,{ok:false,mode:"READ_ONLY",reason:"EARTH_SIGNALS_NOT_ACTIVATED"});
    try{
      const tx=await createEarthSignalService(request.body||{},context);
      if(!tx.ok){
        const status=tx.stage==="RATE_LIMIT"?429:tx.reason==="UNKNOWN_PLACE"?404:400;
        return response(status,{ok:false,reason:tx.reason,stage:tx.stage});
      }
      return response(201,{ok:true,signal:tx.public,retention:tx.retention,rate:tx.rate});
    }catch(error){
      return response(503,{ok:false,reason:error?.code||"SERVICE_UNAVAILABLE"});
    }
  }

  const reportMatch=path.match(/^\/api\/earth-signals\/([^/]+)\/report$/);
  if(method==="POST"&&reportMatch){
    if(mode!=="CONTRIBUTION_ENABLED")return response(503,{ok:false,mode:"READ_ONLY",reason:"EARTH_SIGNALS_NOT_ACTIVATED"});
    try{
      const tx=await reportEarthSignalService({...request.body,signalId:reportMatch[1]},context);
      if(!tx.ok)return response(tx.reason==="SIGNAL_NOT_FOUND"?404:400,{ok:false,reason:tx.reason,stage:tx.stage});
      return response(202,{ok:true,report:tx.report,visibility:tx.immediateVisibility});
    }catch(error){
      return response(503,{ok:false,reason:error?.code||"SERVICE_UNAVAILABLE"});
    }
  }

  return response(404,{ok:false,reason:"NOT_FOUND"});
}
