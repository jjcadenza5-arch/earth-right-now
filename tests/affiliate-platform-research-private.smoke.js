import fs from "node:fs";import assert from "node:assert/strict";import {affiliatePlatformResearchStatus} from "../src/affiliate-platform-research.js";
const rows=JSON.parse(fs.readFileSync("data/affiliate-platform-research.json","utf8"));
const r=affiliatePlatformResearchStatus(rows,{now:Date.parse("2026-09-24T16:20:00Z")});
assert.equal(r.total,4);assert.equal(r.valid,4);assert.equal(r.invalid,0);assert.equal(r.publicActivationAllowed,false);
for(const x of r.items){assert.equal(x.relationshipActive,false);assert.equal(x.credentialsConfigured,false);assert.equal(x.trackedLinksAllowed,false);assert.equal(x.paidRankingAllowed,false)}
assert.equal(r.safety.automaticApplicationAllowed,false);assert.equal(r.safety.revenueForecast,false);
console.log("ERN affiliate platform research is private and non-activating");
