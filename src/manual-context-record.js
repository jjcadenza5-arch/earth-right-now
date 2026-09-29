function clean(v){return typeof v==="string"?v.trim():""}
function isoMs(v){const n=Date.parse(v||"");return Number.isFinite(n)?n:null}
export function manualContextRecord(input={},policy={},options={}){
  const sourceId=clean(input.sourceId),observedAt=clean(input.observedAt),verifiedBy=clean(input.verifiedBy);
  const fields=input.fields&&typeof input.fields==="object"&&!Array.isArray(input.fields)?input.fields:null;
  const observedMs=isoMs(observedAt);
  const maxAgeMinutes=Number(policy.maxAgeMinutes),now=options.now instanceof Date?options.now.getTime():Number(options.now??Date.now()),maxFutureSkewMinutes=Math.max(0,Number(options.maxFutureSkewMinutes??5)||0);
  if(!sourceId)return{ok:false,reason:"SOURCE_ID_REQUIRED"};
  if(observedMs===null)return{ok:false,reason:"VALID_OBSERVED_AT_REQUIRED"};
  if(!Number.isFinite(now))return{ok:false,reason:"VALID_NOW_REQUIRED"};
  if(observedMs>now+maxFutureSkewMinutes*60000)return{ok:false,reason:"OBSERVED_AT_IN_FUTURE"};
  if(!verifiedBy)return{ok:false,reason:"VERIFIER_REQUIRED"};
  if(!fields||!Object.keys(fields).length)return{ok:false,reason:"CONTEXT_FIELDS_REQUIRED"};
  if(!Number.isFinite(maxAgeMinutes)||maxAgeMinutes<=0)return{ok:false,reason:"VALID_MAX_AGE_REQUIRED"};
  const allowed=new Set(Array.isArray(policy.allowedFields)?policy.allowedFields:[]);
  if(allowed.size){
    const unknown=Object.keys(fields).filter(k=>!allowed.has(k));
    if(unknown.length)return{ok:false,reason:"UNAPPROVED_CONTEXT_FIELD",unknownFields:unknown};
  }
  return{ok:true,record:{
    sourceId,observedAt,verifiedBy,
    fields:{...fields},
    cameraTruth:false,mayCreateLiveLabel:false,
    expiresAt:new Date(observedMs+maxAgeMinutes*60000).toISOString()
  }};
}
export function currentManualContext(result,{now=Date.now(),maxFutureSkewMinutes=5}={}){
  if(!result?.ok)return{ok:false,reason:result?.reason||"CONTEXT_UNAVAILABLE"};
  const expiry=isoMs(result.record?.expiresAt),observed=isoMs(result.record?.observedAt),n=now instanceof Date?now.getTime():Number(now);
  if(expiry===null||observed===null||!Number.isFinite(n))return{ok:false,reason:"INVALID_CONTEXT_EXPIRY"};
  if(observed>n+Math.max(0,Number(maxFutureSkewMinutes)||0)*60000)return{ok:false,reason:"OBSERVED_AT_IN_FUTURE"};
  if(n>expiry)return{ok:false,reason:"STALE_CONTEXT"};
  return{ok:true,record:result.record};
}
