import {EARTH_SIGNAL_ACTIVATION_REQUIREMENTS} from "../src/earth-signal-activation.js";import {earthSignalLaunchReadiness,earthSignalLaunchSummary} from "../src/earth-signal-launch-readiness.js";
const empty=earthSignalLaunchReadiness({});
console.assert(!empty.ready&&empty.blockers.length===EARTH_SIGNAL_ACTIVATION_REQUIREMENTS.length);
console.assert(earthSignalLaunchSummary({}).includes("remain read-only"));
const all=Object.fromEntries(EARTH_SIGNAL_ACTIVATION_REQUIREMENTS.map(k=>[k,true]));
console.assert(earthSignalLaunchReadiness(all).ready);
console.assert(earthSignalLaunchSummary(all).includes("ready"));
console.log("Earth Signal launch readiness checks passed");
