import assert from "node:assert/strict";import {EARTH_SIGNAL_ACTIVATION_REQUIREMENTS} from "../src/earth-signal-activation.js";import {earthSignalLaunchReadiness,earthSignalLaunchSummary} from "../src/earth-signal-launch-readiness.js";
const empty=earthSignalLaunchReadiness({});
assert.ok(!empty.ready&&empty.blockers.length===EARTH_SIGNAL_ACTIVATION_REQUIREMENTS.length);
assert.ok(earthSignalLaunchSummary({}).includes("remain read-only"));
const all=Object.fromEntries(EARTH_SIGNAL_ACTIVATION_REQUIREMENTS.map(k=>[k,true]));
assert.ok(earthSignalLaunchReadiness(all).ready);
assert.ok(earthSignalLaunchSummary(all).includes("ready"));
console.log("Earth Signal launch readiness checks passed");
