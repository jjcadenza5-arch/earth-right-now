import assert from "node:assert/strict";
import {providerObservationBatch} from "../src/provider-observation-batch.js";

const entries=[
 {id:"known",httpStatus:200,confirmation:"HUMAN_PLAYBACK",observedAt:"2026-09-29T10:00:00Z",reason:"ok"},
 {id:"gap",scope:"RESEARCH_GAP",httpStatus:200,confirmation:"OFFICIAL_RESEARCH",observedAt:"2026-09-29T10:00:00Z",reason:"visual gap",sourceUrl:"https://example.test/gap"},
 {id:"typo",httpStatus:200,confirmation:"HUMAN_PLAYBACK",observedAt:"2026-09-29T10:00:00Z",reason:"bad id"}
];
const r=providerObservationBatch(entries,{knownSourceIds:["known"]});
assert.equal(r.total,1);
assert.equal(r.researchOnly.length,1);
assert.equal(r.researchOnly[0].id,"gap");
assert.equal(r.rejected.length,1);
assert.equal(r.rejected[0].id,"typo");
assert.equal(r.rejected[0].reason,"UNKNOWN_SOURCE_ID");
console.log("Provider observations preserve explicit research gaps while rejecting unknown source-health ids");
