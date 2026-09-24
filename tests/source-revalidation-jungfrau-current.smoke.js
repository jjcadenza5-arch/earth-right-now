import fs from "node:fs";import assert from "node:assert/strict";import {sourceRevalidationTriage} from "../src/source-revalidation-triage.js";
const sources=JSON.parse(fs.readFileSync("data/sources.json","utf8")),j=sources.find(x=>x.id==="jungfrau-region");
assert.equal(j.health,"DEGRADED");assert.equal(j.playback,"EXTERNAL");assert.equal(j.permission,"LINK_ONLY");assert.match(j.failureReason,/OFFICIAL_COLLECTION_WEBCAMS_OFFLINE_2026-09-24/);assert.equal(j.lastFailedCheck,"2026-09-24T15:05:00Z");
const r=sourceRevalidationTriage(sources,{availability:{results:[]},continuity:{rows:[]}});
assert.equal(r.items.find(x=>x.id==="jungfrau-region")?.lane,"DEFERRED_PROVIDER_OFFLINE");
assert.ok(!r.immediate.some(x=>x.id==="jungfrau-region"));
console.log("ERN Jungfrau official offline collection is current and deferred");
