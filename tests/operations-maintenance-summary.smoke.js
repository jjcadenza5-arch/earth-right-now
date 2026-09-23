import fs from "node:fs";import assert from "node:assert/strict";import {operationsReport} from "../src/operations-report.js";
const sources=JSON.parse(fs.readFileSync("data/sources.json","utf8"));
const r=operationsReport(sources,{checkedAt:"2026-09-23T12:00:00Z"});
assert.ok(r.maintenance);assert.ok(r.maintenance.atlas);assert.ok(r.maintenance.sourceRevalidation);
assert.equal(r.maintenance.atlas.total,sources.length);
assert.ok(r.maintenance.atlas.mappedWithEvidence<=r.maintenance.atlas.mapped);
assert.ok(Array.isArray(r.maintenance.sourceRevalidation.next));
console.log("ERN consolidated maintenance operations status passed");
