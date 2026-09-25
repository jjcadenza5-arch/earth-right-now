import {earthSignalFeatureMode} from "./earth-signal-activation.js";
import {EARTH_SIGNAL_API_CONTRACT} from "./earth-signal-api-contract.js";
import {earthSignalCreateTransaction,earthSignalListProjection,earthSignalReportTransaction} from "./earth-signal-server-pipeline.js";

const JSON_HEADERS=Object.freeze({"content-type":"application/json; charset=utf-8","cache-control":"no-store"});

function response(status,body){
  return{status,headers:JSON_HEADERS,body};
}

export function earthSignalHttpRequest(request={}, context={}){
  const method=String(request.method||"GET").toUpperCase();
  const path=String(request.path||"");
  const capabilities=context.capabilities||{};
  const mode=earthSignalFeatureMode(capabilities);

  if(method==="GET"&&path===EARTH_SIGNAL_API_CONTRACT.contributionPath){
    if(mode!=="CONTRIBUTION_ENABLED")return response(503,{ok:false,mode:"READ_ONLY",reason:"EARTH_SIGNALS_NOT_ACTIVATED"});
    return response(200,{ok:true,signals:earthSignalListProjection(context.records||[],{placeId:request.query?.placeId||null,now:context.now||new Date()})});
  }

  if(method==="POST"&&path===EARTH_SIGNAL_API_CONTRACT.contributionPath){
    if(mode!=="CONTRIBUTION_ENABLED")return response(503,{ok:false,mode:"READ_ONLY",reason:"EARTH_SIGNALS_NOT_ACTIVATED"});
    const tx=earthSignalCreateTransaction(request.body||{},context);
    if(!tx.ok){
      const status=tx.stage==="RATE_LIMIT"?429:tx.reason==="UNKNOWN_PLACE"?404:400;
      return response(status,{ok:false,reason:tx.reason,stage:tx.stage});
    }
    return response(201,{ok:true,signal:tx.public,retention:tx.retention});
  }

  const reportMatch=path.match(/^\/api\/earth-signals\/([^/]+)\/report$/);
  if(method==="POST"&&reportMatch){
    if(mode!=="CONTRIBUTION_ENABLED")return response(503,{ok:false,mode:"READ_ONLY",reason:"EARTH_SIGNALS_NOT_ACTIVATED"});
    const tx=earthSignalReportTransaction({...request.body,signalId:reportMatch[1]},context.records||[]);
    if(!tx.ok)return response(tx.reason==="SIGNAL_NOT_FOUND"?404:400,{ok:false,reason:tx.reason,stage:tx.stage});
    return response(202,{ok:true,report:tx.report,visibility:tx.immediateVisibility});
  }

  return response(404,{ok:false,reason:"NOT_FOUND"});
}
