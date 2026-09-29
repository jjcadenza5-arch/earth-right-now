export const EARTH_SIGNAL_DEPLOYMENT_REQUIREMENTS=Object.freeze([
  "httpsEndpoint",
  "durableStorage",
  "serverRateLimits",
  "pseudonymousRateSubjects",
  "moderation",
  "reportQueue",
  "expiryCleanup",
  "publishedPrivacyNotice",
  "secretIsolation",
  "observability",
  "costGuard"
]);

export function earthSignalDeploymentReadiness(evidence={}){
  const checks={
    httpsEndpoint:Boolean(evidence.endpointUrl)&&/^https:\/\//i.test(String(evidence.endpointUrl)),
    durableStorage:evidence.durableStorage===true,
    serverRateLimits:evidence.serverRateLimits===true,
    pseudonymousRateSubjects:evidence.pseudonymousRateSubjects===true&&evidence.rawNetworkIdentifiersStored===false,
    moderation:evidence.moderation===true,
    reportQueue:evidence.reportQueue===true,
    expiryCleanup:evidence.expiryCleanup===true,
    publishedPrivacyNotice:Boolean(evidence.privacyUrl)&&/^https:\/\//i.test(String(evidence.privacyUrl))&&evidence.privacyPublished===true,
    secretIsolation:evidence.secretIsolation===true,
    observability:evidence.observability===true,
    costGuard:evidence.costGuard===true
  };
  const missing=EARTH_SIGNAL_DEPLOYMENT_REQUIREMENTS.filter(key=>!checks[key]);
  const deployed=checks.httpsEndpoint&&evidence.status==="DEPLOYED";
  return{
    deployed,
    ready:missing.length===0,
    state:missing.length===0?"DEPLOYMENT_EVIDENCE_COMPLETE":deployed?"DEPLOYED_EVIDENCE_PARTIAL":"NOT_DEPLOYED",
    checks,
    missing,
    truth:"Deployment evidence must describe real production infrastructure; deployment alone does not authorize public contribution activation."
  };
}

export function earthSignalCapabilitiesFromDeployment(evidence={}){
  const readiness=earthSignalDeploymentReadiness(evidence);
  return{
    transport:readiness.checks.httpsEndpoint&&readiness.checks.durableStorage,
    rateLimits:readiness.checks.serverRateLimits&&readiness.checks.pseudonymousRateSubjects,
    moderation:readiness.checks.moderation,
    reporting:readiness.checks.reportQueue,
    expiryDeletion:readiness.checks.expiryCleanup,
    privacyNotice:readiness.checks.publishedPrivacyNotice
  };
}
