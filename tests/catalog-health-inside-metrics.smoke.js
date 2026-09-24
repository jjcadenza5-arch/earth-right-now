import assert from "node:assert/strict";import {catalogHealthSummary} from "../src/catalog-health-summary.js";
const now=new Date().toISOString(),old="2026-09-20T00:00:00Z";
const rows=[
 {id:"proven",health:"HEALTHY",truth:"LIVE_VIDEO",permission:"EMBED_ALLOWED",playback:"EMBED",embedUrl:"https://couchtourist.com/embed/cam/1/",sourceUrl:"https://example.com/1",checkedAt:now,lastSuccessfulCheck:now,playbackVerifiedAt:now},
 {id:"unproven",health:"HEALTHY",truth:"LIVE_VIDEO",permission:"EMBED_ALLOWED",playback:"EMBED",embedUrl:"https://couchtourist.com/embed/cam/2/",sourceUrl:"https://example.com/2",checkedAt:now,lastSuccessfulCheck:now},
 {id:"image",health:"HEALTHY",truth:"LIVE_IMAGE",permission:"EMBED_ALLOWED",playback:"IMAGE_REFRESH",sourceUrl:"https://example.com/img.jpg",checkedAt:now,lastSuccessfulCheck:now,refreshIntervalSeconds:60,freshnessEvidence:"updates every minute"},
 {id:"stale",health:"HEALTHY",truth:"LIVE_VIDEO",permission:"EMBED_ALLOWED",playback:"EMBED",embedUrl:"https://couchtourist.com/embed/cam/3/",sourceUrl:"https://example.com/3",checkedAt:old,lastSuccessfulCheck:old,playbackVerifiedAt:now}
];
const r=catalogHealthSummary(rows);
assert.equal(r.configuredInsideERN,4);
assert.equal(r.provenEmbeddedInsideERN,1);
assert.equal(r.currentImageInsideERN,1);
assert.equal(r.currentInsideERN,2);
console.log("ERN catalog health truthful inside counts passed");
