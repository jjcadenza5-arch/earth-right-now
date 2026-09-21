import {EARTH_SIGNAL_CAPABILITIES} from "./earth-signal-capabilities.js";import {earthSignalLaunchReadiness} from "./earth-signal-launch-readiness.js";
export function earthSignalStatusReport(capabilities=EARTH_SIGNAL_CAPABILITIES){
 const r=earthSignalLaunchReadiness(capabilities);
 return{feature:"Earth Signals",mode:r.ready?"CONTRIBUTION_ENABLED":"READ_ONLY",ready:r.ready,checks:r.items,blockers:r.blockers,truth:"Architecture readiness is not production capability."};
}
export function earthSignalStatusText(capabilities=EARTH_SIGNAL_CAPABILITIES){
 const r=earthSignalStatusReport(capabilities);return r.ready?"Earth Signals · contribution enabled":`Earth Signals · read-only · ${r.blockers.length} infrastructure blocker${r.blockers.length===1?"":"s"}`;
}
