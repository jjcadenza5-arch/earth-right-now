import assert from "node:assert/strict";import {EARTH_SIGNAL_CAPABILITIES,earthSignalCapabilityEvidence} from "../src/earth-signal-capabilities.js";import {earthSignalActivationStatus} from "../src/earth-signal-activation.js";
assert.equal(Object.values(EARTH_SIGNAL_CAPABILITIES).every(v=>v===false),true,"future infrastructure must default closed");
assert.equal(earthSignalActivationStatus(EARTH_SIGNAL_CAPABILITIES).enabled,false);
assert.equal(earthSignalCapabilityEvidence().length,6);
assert.deepEqual(earthSignalCapabilityEvidence().map(x=>x.key).sort(),["expiryDeletion","moderation","privacyNotice","rateLimits","reporting","transport"].sort());
console.log("Earth Signal capability manifest checks passed");
