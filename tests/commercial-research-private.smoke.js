import fs from "node:fs";import assert from "node:assert/strict";import {commercialResearchStatus} from "../src/commercial-research-candidates.js";
const sources=JSON.parse(fs.readFileSync("data/sources.json","utf8"));
const rows=JSON.parse(fs.readFileSync("data/commercial-research-candidates.json","utf8"));
const known=[...new Set(sources.map(s=>String(s.placeId||s.id||"")).filter(Boolean))];
const r=commercialResearchStatus(rows,{knownPlaceIds:known,now:Date.parse("2026-09-25T14:46:00Z")});
assert.equal(r.total,26);assert.equal(r.valid,26);assert.equal(r.invalid,0);assert.equal(r.placeCoverage,21);assert.equal(r.byIntent.stay,19);assert.equal(r.byIntent.tickets,6);assert.equal(r.byIntent.activities,1);
assert.equal(r.publicActivationAllowed,false);assert.equal(r.safety.automaticAffiliateActivationAllowed,false);assert.equal(r.safety.automaticPublicVisibilityAllowed,false);assert.equal(r.safety.paidRankingAllowed,false);assert.equal(r.safety.demandForecast,false);assert.equal(r.safety.revenueForecast,false);
assert.equal(r.byPlace["chicago-lakefront"].total,2);assert.equal(r.byPlace["chicago-lakefront"].intents.stay,1);assert.equal(r.byPlace["chicago-lakefront"].intents.tickets,1);assert.ok(r.byPlace["chicago-lakefront"].missingIntents.includes("eat"));
for(const x of r.items){assert.equal(x.researchStatus,"RESEARCH_ONLY");assert.equal(x.affiliateStatus,"NOT_REVIEWED");assert.equal(x.contacted,false);assert.equal(x.valid,true)}
console.log("ERN commercial real-option research remains private, valid and intent-aware");
