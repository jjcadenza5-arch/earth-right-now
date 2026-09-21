import assert from "node:assert/strict";import {EARTH_SIGNAL_CAPABILITIES} from "../src/earth-signal-capabilities.js";import {earthSignalStatusReport,earthSignalStatusText} from "../src/earth-signal-status-report.js";
const r=earthSignalStatusReport();assert.equal(r.mode,"READ_ONLY");assert.equal(r.ready,false);assert.equal(r.blockers.length,6);assert.equal(r.truth,"Architecture readiness is not production capability.");
assert.match(earthSignalStatusText(),/read-only · 6 infrastructure blockers/);
const all=Object.fromEntries(Object.keys(EARTH_SIGNAL_CAPABILITIES).map(k=>[k,true]));assert.equal(earthSignalStatusReport(all).mode,"CONTRIBUTION_ENABLED");
console.log("Earth Signal operator status checks passed");
