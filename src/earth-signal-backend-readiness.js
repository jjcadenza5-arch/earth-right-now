import {EARTH_SIGNAL_API_CONTRACT} from "./earth-signal-api-contract.js";
import {earthSignalLaunchReadiness} from "./earth-signal-launch-readiness.js";

export const EARTH_SIGNAL_BACKEND_FOUNDATION=Object.freeze({
  contractVersion:EARTH_SIGNAL_API_CONTRACT.version,
  structuredSubmission:true,
  serverOwnedFreshness:true,
  boundedRetention:true,
  privacyMinimalPublicProjection:true,
  failClosedHttpAdapter:true,
  deployedTransport:false
});

export function earthSignalBackendReadiness(capabilities={}){
  const launch=earthSignalLaunchReadiness(capabilities);
  return{
    state:launch.ready?"DEPLOYED_CAPABILITIES_REQUIRED":"PREPARED_NOT_DEPLOYED",
    foundation:EARTH_SIGNAL_BACKEND_FOUNDATION,
    activationReady:launch.ready,
    launchBlockers:launch.blockers,
    truth:launch.ready
      ?"Capability flags alone do not prove a production endpoint is deployed."
      :"Backend foundation exists in code, but ERN remains read-only until real infrastructure capabilities are deployed and verified."
  };
}
