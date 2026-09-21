import {earthSignalActivationStatus} from "./earth-signal-activation.js";
export function earthSignalLaunchReadiness(capabilities={}){
 const activation=earthSignalActivationStatus(capabilities);
 const labels={transport:"Submission transport",rateLimits:"Rate limiting",moderation:"Moderation",reporting:"Reporting",expiryDeletion:"Automatic expiry/deletion",privacyNotice:"Updated privacy notice"};
 return{ready:activation.enabled,items:Object.entries(activation.checks).map(([key,passed])=>({key,label:labels[key]||key,passed})),blockers:activation.missing.map(key=>labels[key]||key)};
}
export function earthSignalLaunchSummary(capabilities={}){
 const r=earthSignalLaunchReadiness(capabilities);
 return r.ready?"Earth Signals contribution infrastructure is ready.":`Earth Signals remain read-only · ${r.blockers.length} launch blocker${r.blockers.length===1?"":"s"} remaining.`;
}
