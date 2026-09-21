import {EARTH_SIGNAL_ACTIVATION_REQUIREMENTS,earthSignalActivationStatus,earthSignalFeatureMode} from "../src/earth-signal-activation.js";
console.assert(earthSignalFeatureMode({})==="READ_ONLY");
const all=Object.fromEntries(EARTH_SIGNAL_ACTIVATION_REQUIREMENTS.map(k=>[k,true]));
console.assert(earthSignalActivationStatus(all).enabled);
console.assert(earthSignalFeatureMode(all)==="CONTRIBUTION_ENABLED");
const incomplete={...all,privacyNotice:false};
console.assert(!earthSignalActivationStatus(incomplete).enabled);
console.assert(earthSignalActivationStatus(incomplete).missing.includes("privacyNotice"));
console.log("Earth Signal activation gate checks passed");
