import fs from "node:fs";import assert from "node:assert/strict";
const sources=JSON.parse(fs.readFileSync("data/sources.json","utf8"));
const observations=JSON.parse(fs.readFileSync("data/provider-observations.json","utf8"));
const confirmed={
 "auckland-viaduct-harbour":"2026-09-25T14:59:12.384Z",
 "bergen-ulriken":"2026-09-25T14:58:20.419Z",
 "cijin-beach-kaohsiung":"2026-09-25T14:58:26.918Z",
 "la-palma-aridane-valley":"2026-09-25T14:59:29.385Z",
 "la-palma-caldera-taburiente":"2026-09-25T14:59:21.300Z",
 "ponte-di-legno-adamello":"2026-09-25T14:58:57.886Z",
 "skeikampen-ski":"2026-09-25T14:58:39.667Z",
 "takayama-miyagawa-stream":"2026-09-25T14:59:07.202Z",
 "verbier":"2026-09-25T14:59:35.119Z"
};
for(const [id,ts] of Object.entries(confirmed)){
 const s=sources.find(x=>x.id===id);assert.ok(s,id);assert.equal(s.playbackVerifiedAt,ts,id+" catalog marker");
 const o=observations.find(x=>x.id===id&&x.confirmation==="HUMAN_PLAYBACK"&&x.observedAt===ts);assert.ok(o,id+" HUMAN_PLAYBACK ledger");
}
const metung=sources.find(x=>x.id==="metung-gippsland-lakes");assert.ok(metung);assert.equal(metung.health,"DEGRADED");assert.equal(metung.featuredHold,true);assert.equal(metung.failureReason,"VISITOR_PLAYBACK_REJECTED_2026-09-25");assert.equal("playbackVerifiedAt" in metung,false);
console.log("ERN operator review batch 16c76f3fbec0fc76 evidence remains applied");
