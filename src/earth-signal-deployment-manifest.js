const SAFE_KEYS=new Set([
  "schemaVersion","status","endpointUrl","durableStorage","serverRateLimits","pseudonymousRateSubjects",
  "rawNetworkIdentifiersStored","moderation","reportQueue","expiryCleanup","privacyUrl","privacyPublished",
  "secretIsolation","observability","costGuard","checkedAt","evidenceNote"
]);

export function validateEarthSignalDeploymentManifest(manifest={}){
  const issues=[];
  if(manifest.schemaVersion!==1)issues.push("UNSUPPORTED_SCHEMA_VERSION");
  for(const key of Object.keys(manifest)){
    if(!SAFE_KEYS.has(key))issues.push("UNSAFE_OR_UNKNOWN_FIELD:"+key);
  }
  if(manifest.endpointUrl!=null&&!/^https:\/\//i.test(String(manifest.endpointUrl)))issues.push("ENDPOINT_NOT_HTTPS");
  if(manifest.privacyUrl!=null&&!/^https:\/\//i.test(String(manifest.privacyUrl)))issues.push("PRIVACY_URL_NOT_HTTPS");
  if(manifest.checkedAt!=null&&!Number.isFinite(Date.parse(manifest.checkedAt)))issues.push("INVALID_CHECKED_AT");
  const forbiddenPattern=/(secret|token|password|credential|api[_-]?key|private[_-]?key)/i;
  for(const [key,value] of Object.entries(manifest)){
    if(forbiddenPattern.test(key)&&key!=="secretIsolation")issues.push("FORBIDDEN_SECRET_FIELD:"+key);
    if(typeof value==="string"&&value.length>500)issues.push("VALUE_TOO_LONG:"+key);
  }
  return{valid:issues.length===0,issues};
}

export function publicEarthSignalDeploymentEvidence(manifest={}){
  const validation=validateEarthSignalDeploymentManifest(manifest);
  if(!validation.valid)return{ok:false,issues:validation.issues,evidence:null};
  const evidence={};
  for(const key of SAFE_KEYS)if(key in manifest)evidence[key]=manifest[key];
  return{ok:true,issues:[],evidence};
}
