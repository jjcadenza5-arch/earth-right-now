import assert from "node:assert/strict";import {EARTH_SIGNAL_ACTIVATION_REQUIREMENTS,earthSignalActivationStatus,earthSignalFeatureMode} from "../src/earth-signal-activation.js";
assert.ok(earthSignalFeatureMode({})==="READ_ONLY");
const all=Object.fromEntries(EARTH_SIGNAL_ACTIVATION_REQUIREMENTS.map(k=>[k,true]));
assert.ok(earthSignalActivationStatus(all).enabled);
assert.ok(earthSignalFeatureMode(all)==="CONTRIBUTION_ENABLED");
const incomplete={...all,privacyNotice:false};
assert.ok(!earthSignalActivationStatus(incomplete).enabled);
assert.ok(earthSignalActivationStatus(incomplete).missing.includes("privacyNotice"));
console.log("Earth Signal activation gate checks passed");
