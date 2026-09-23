import fs from "node:fs";import assert from "node:assert/strict";import {atlasMaintenanceSummary} from "../src/atlas-maintenance-summary.js";
const rows=JSON.parse(fs.readFileSync("data/sources.json","utf8"));const iss=rows.find(x=>x.id==="iss-planet-earth");assert.ok(iss);
const r=atlasMaintenanceSummary(rows,{now:new Date("2026-09-23T12:00:00Z"),limit:100});
assert.ok(r.intentionalDynamic>=1);assert.ok(!r.next.unmapped.some(x=>x.id==="iss-planet-earth"));assert.ok(!r.next.legacy.some(x=>x.id==="iss-planet-earth"));
console.log("ERN dynamic Atlas maintenance boundary passed");
