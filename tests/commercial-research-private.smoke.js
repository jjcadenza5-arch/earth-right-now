import fs from "node:fs";import assert from "node:assert/strict";import {commercialResearchStatus} from "../src/commercial-research-candidates.js";
const sources=JSON.parse(fs.readFileSync("data/sources.json","utf8"));
const rows=JSON.parse(fs.readFileSync("data/commercial-research-candidates.json","utf8"));
const known=[...new Set(sources.map(s=>String(s.placeId||s.id||"")).filter(Boolean))];
const r=commercialResearchStatus(rows,{knownPlaceIds:known,now:Date.parse("2026-09-24T16:10:00Z")});
assert.equal(r.total,5);assert.equal(r.valid,5);assert.equal(r.invalid,0);assert.equal(r.placeCoverage,5);assert.equal(r.publicActivationAllowed,false);assert.equal(r.safety.automaticAffiliateActivationAllowed,false);assert.equal(r.safety.automaticPublicVisibilityAllowed,false);assert.equal(r.safety.paidRankingAllowed,false);assert.equal(r.safety.demandForecast,false);assert.equal(r.safety.revenueForecast,false);
for(const x of r.items){assert.equal(x.researchStatus,"RESEARCH_ONLY");assert.equal(x.affiliateStatus,"NOT_REVIEWED");assert.equal(x.contacted,false);assert.equal(x.valid,true)}
console.log("ERN commercial real-option research remains private and non-promotional");
