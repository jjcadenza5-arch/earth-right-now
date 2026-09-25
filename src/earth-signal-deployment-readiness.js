export const EARTH_SIGNAL_DEPLOYMENT_REQUIREMENTS=Object.freeze([
  "httpsEndpoint",
  "durableStorage",
  "serverRateLimits",
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
    moderation:evidence.moderation===true,
    reportQueue:evidence.reportQueue===true,
    expiryCleanup:evidence.expiryCleanup===true,
    publishedPrivacyNotice:Boolean(evidence.privacyUrl)&&/^https:\/\//i.test(String(evidence.privacyUrl))&&evidence.privacyPublished===true,
    secretIsolation:evidence.secretIsolation===true,
    observability:evidence.observability===true,
    costGuard:evidence.costGuard===true
  };
  const missing=EARTH_SIGNAL_DEPLOYMENT_REQUIREMENTS.filter(key=>!checks[key]);
  return{
    ready:missing.length===0,
    state:missing.length===0?"DEPLOYMENT_EVIDENCE_COMPLETE":"NOT_DEPLOYED",
    checks,
    missing,
    truth:"Deployment evidence must describe real production infrastructure; local code and test doubles do not satisfy it."
  };
}

export function earthSignalCapabilitiesFromDeployment(evidence={}){
  const readiness=earthSignalDeploymentReadiness(evidence);
  if(!readiness.ready){
    return{
      transport:false,
      rateLimits:false,
      moderation:false,
      reporting:false,
      expiryDeletion:false,
      privacyNotice:false
    };
  }
  return{
    transport:true,
    rateLimits:true,
    moderation:true,
    reporting:true,
    expiryDeletion:true,
    privacyNotice:true
  };
}
