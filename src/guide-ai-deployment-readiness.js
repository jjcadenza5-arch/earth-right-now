import {guideAiCostEvidence} from "./guide-ai-cost-guard.js";

export const GUIDE_AI_DEPLOYMENT_REQUIREMENTS=Object.freeze([
  "httpsEndpoint",
  "secretIsolation",
  "trustedContextRehydration",
  "rateLimits",
  "idempotency",
  "observability",
  "safetyBoundary",
  "publishedPrivacyNotice",
  "privacyDataHandling",
  "deterministicFallback",
  "costGuard"
]);

const https=value=>{try{return new URL(String(value)).protocol==="https:"}catch{return false}};

export function guideAiDeploymentReadiness(evidence={}){
  const cost=guideAiCostEvidence(evidence);
  const checks={
    httpsEndpoint:https(evidence.endpointUrl),
    secretIsolation:evidence.secretIsolation===true,
    trustedContextRehydration:evidence.trustedContextRehydration===true,
    rateLimits:evidence.rateLimits===true,
    idempotency:evidence.idempotency===true,
    observability:evidence.observability===true,
    safetyBoundary:evidence.safetyBoundary===true,
    publishedPrivacyNotice:evidence.privacyPublished===true&&https(evidence.privacyUrl),
    privacyDataHandling:evidence.providerDataHandlingReviewed===true&&evidence.rawPromptLoggingDisabled===true&&evidence.rawResponseLoggingDisabled===true&&evidence.visitorProfilingDisabled===true,
    deterministicFallback:evidence.deterministicFallback===true,
    costGuard:cost.ready
  };
  const missing=GUIDE_AI_DEPLOYMENT_REQUIREMENTS.filter(k=>!checks[k]);
  return{
    ready:missing.length===0,
    state:missing.length?"NOT_DEPLOYED":"DEPLOYMENT_EVIDENCE_COMPLETE",
    checks,
    missing,
    cost,
    truth:"Local code, mock endpoints and client-side model calls do not count as deployed Guide capability."
  };
}

export function guideAiCapabilitiesFromDeployment(evidence={}){
  const r=guideAiDeploymentReadiness(evidence);
  if(!r.ready)return{
    transport:false,secretIsolation:false,trustedContext:false,costGuard:false,
    rateLimits:false,idempotency:false,observability:false,safetyBoundary:false,privacyNotice:false,
    deterministicFallback:true
  };
  return{
    transport:true,secretIsolation:true,trustedContext:true,costGuard:true,
    rateLimits:true,idempotency:true,observability:true,safetyBoundary:true,privacyNotice:true,
    deterministicFallback:true
  };
}
