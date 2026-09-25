import {EARTH_SIGNAL_API_CONTRACT} from "./earth-signal-api-contract.js";import {EARTH_SIGNAL_CAPABILITIES} from "./earth-signal-capabilities.js";import {earthSignalLaunchReadiness} from "./earth-signal-launch-readiness.js";
export function earthSignalStatusReport(capabilities=EARTH_SIGNAL_CAPABILITIES){
 const r=earthSignalLaunchReadiness(capabilities);
 return{feature:"Earth Signals",mode:r.ready?"CONTRIBUTION_ENABLED":"READ_ONLY",ready:r.ready,backendContract:{version:EARTH_SIGNAL_API_CONTRACT.version,contributionPath:EARTH_SIGNAL_API_CONTRACT.contributionPath,ttlMinutes:EARTH_SIGNAL_API_CONTRACT.ttlMinutes},checks:r.items,blockers:r.blockers,truth:"Architecture readiness and an API contract are not production capability."};
}
export function earthSignalStatusText(capabilities=EARTH_SIGNAL_CAPABILITIES){
 const r=earthSignalStatusReport(capabilities);return r.ready?"Earth Signals · contribution enabled":`Earth Signals · read-only · ${r.blockers.length} infrastructure blocker${r.blockers.length===1?"":"s"}`;
}
