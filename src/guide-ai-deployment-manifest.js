const SAFE_KEYS=new Set([
 "schemaVersion","status","endpointUrl","secretIsolation","trustedContextRehydration","rateLimits","observability","safetyBoundary",
 "privacyUrl","privacyPublished","providerDataHandlingReviewed","idempotency","rawPromptLoggingDisabled","rawResponseLoggingDisabled","visitorProfilingDisabled","deterministicFallback","monthlyCostCeilingUsd","hardStopConfigured","usageMetering","checkedAt","evidenceNote"
]);

export function validateGuideAiDeploymentManifest(manifest={}){
  const issues=[];
  if(manifest.schemaVersion!==1)issues.push("UNSUPPORTED_SCHEMA_VERSION");
  for(const key of Object.keys(manifest))if(!SAFE_KEYS.has(key))issues.push("UNSAFE_OR_UNKNOWN_FIELD:"+key);
  for(const key of ["endpointUrl","privacyUrl"]){
    const value=manifest[key];
    if(value!=null&&!/^https:\/\//i.test(String(value)))issues.push(key.toUpperCase()+"_NOT_HTTPS");
  }
  if(manifest.checkedAt!=null&&!Number.isFinite(Date.parse(manifest.checkedAt)))issues.push("INVALID_CHECKED_AT");
  const forbidden=/(api[_-]?key|secret[_-]?key|token|password|credential|private[_-]?key)/i;
  for(const [key,value] of Object.entries(manifest)){
    if(forbidden.test(key)&&key!=="secretIsolation")issues.push("FORBIDDEN_SECRET_FIELD:"+key);
    if(typeof value==="string"&&value.length>600)issues.push("VALUE_TOO_LONG:"+key);
  }
  return{valid:issues.length===0,issues};
}

export function publicGuideAiDeploymentEvidence(manifest={}){
  const v=validateGuideAiDeploymentManifest(manifest);
  if(!v.valid)return{ok:false,issues:v.issues,evidence:null};
  const evidence={};for(const key of SAFE_KEYS)if(key in manifest)evidence[key]=manifest[key];
  return{ok:true,issues:[],evidence};
}
