import fs from "node:fs";import assert from "node:assert/strict";import {providerFamilyResearchStatus} from "../src/provider-family-research.js";
const rows=JSON.parse(fs.readFileSync("data/embed-provider-families.json","utf8"));
const youtube=rows.find(x=>x.id==="youtube");assert.ok(youtube);assert.equal(youtube.status,"RESEARCH_ONLY");assert.equal(youtube.usageMode,"PROVIDER_BRANDED_PLAYER_ONLY");assert.equal(youtube.playerBrandingRequired,true);assert.equal(youtube.restreamAllowed,false);assert.equal(youtube.permissionConfirmed,false);assert.equal(youtube.networkFamily,"youtube.com");
const report=providerFamilyResearchStatus(rows,{now:new Date("2026-09-24T15:55:00Z")});
const item=report.items.find(x=>x.id==="youtube");assert.equal(item.termsEvidenceState,"CURRENT");assert.equal(item.safeUsage,true);assert.equal(item.permissionConfirmed,false);assert.equal(item.promotionAllowed,false);
console.log("ERN YouTube provider-family research stays current, branded and non-promotional");
