import {EARTH_SIGNAL_API_CONTRACT} from "./earth-signal-api-contract.js";
import {earthSignalBackendReadiness} from "./earth-signal-backend-readiness.js";
import {earthSignalPrivacyDraftStatus} from "./earth-signal-privacy-notice-draft.js";
import {earthSignalDeploymentReadiness} from "./earth-signal-deployment-readiness.js";
import {EARTH_SIGNAL_CAPABILITIES} from "./earth-signal-capabilities.js";
import {earthSignalLaunchReadiness} from "./earth-signal-launch-readiness.js";

export function earthSignalStatusReport(capabilities=EARTH_SIGNAL_CAPABILITIES,{deploymentEvidence={}}={}){
 const launch=earthSignalLaunchReadiness(capabilities);
 const backend=earthSignalBackendReadiness(capabilities);
 const privacyDraft=earthSignalPrivacyDraftStatus();
 const deployment=earthSignalDeploymentReadiness(deploymentEvidence);
 const ready=launch.ready&&deployment.ready;
 return{
  feature:"Earth Signals",
  mode:ready?"CONTRIBUTION_ENABLED":"READ_ONLY",
  ready,
  backendContract:{version:EARTH_SIGNAL_API_CONTRACT.version,contributionPath:EARTH_SIGNAL_API_CONTRACT.contributionPath,ttlMinutes:EARTH_SIGNAL_API_CONTRACT.ttlMinutes},
  backendFoundation:{
   state:backend.state,
   deployedTransport:deployment.ready,
   failClosedHttpAdapter:backend.foundation.failClosedHttpAdapter,
   durableStorageContract:backend.foundation.durableStorageContract,
   storageSchemaValidation:backend.foundation.storageSchemaValidation,
   gatedServiceLayer:backend.foundation.gatedServiceLayer,
   subjectScopedRateLimitContract:backend.foundation.subjectScopedRateLimitContract,
   rawNetworkIdentifiersStored:backend.foundation.rawNetworkIdentifiersStored
  },
  privacyNoticeDraft:{contentReady:privacyDraft.contentReady,published:privacyDraft.published,activationSatisfied:privacyDraft.activationSatisfied,status:privacyDraft.status},
  deployment:{state:deployment.state,ready:deployment.ready,missing:deployment.missing},
  checks:launch.items,
  blockers:[...launch.blockers,...(!deployment.ready?["Production deployment evidence"]:[])],
  truth:"Architecture readiness and an API contract are not production capability; deployment evidence must also pass."
 };
}

export function earthSignalStatusText(capabilities=EARTH_SIGNAL_CAPABILITIES,options={}){
 const r=earthSignalStatusReport(capabilities,options);
 return r.ready?"Earth Signals · contribution enabled":`Earth Signals · read-only · ${r.blockers.length} blocker${r.blockers.length===1?"":"s"}`;
}
