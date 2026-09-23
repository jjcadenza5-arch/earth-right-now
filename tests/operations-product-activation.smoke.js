import fs from "node:fs";import assert from "node:assert/strict";import {operationsReport} from "../src/operations-report.js";
const sources=JSON.parse(fs.readFileSync("data/sources.json","utf8"));
const r=operationsReport(sources,{checkedAt:"2026-09-23T12:00:00Z"});
assert.equal(r.productActivation.business.foundationReady,true);
assert.equal(r.productActivation.business.commerciallyActive,false);
assert.equal(r.productActivation.earthSignals.mode,"READ_ONLY");
assert.equal(r.productActivation.earthSignals.ready,false);
assert.equal(r.productActivation.earthSignals.blockers.length,6);
console.log("ERN product activation operations status passed");
