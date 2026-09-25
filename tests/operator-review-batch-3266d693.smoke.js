import fs from "node:fs";import assert from "node:assert/strict";
const s=JSON.parse(fs.readFileSync("data/sources.json","utf8"));
const o=JSON.parse(fs.readFileSync("data/provider-observations.json","utf8"));
for(const [id,ts] of Object.entries({"cijin-beach-kaohsiung":"2026-09-25T02:23:23.106Z","skeikampen-ski":"2026-09-25T02:23:31.053Z","bergen-ulriken":"2026-09-25T02:23:51.687Z"})){
 const row=s.find(x=>x.id===id);assert.equal(row.playbackVerifiedAt,ts);
 assert.ok(o.some(x=>x.id===id&&x.confirmation==="HUMAN_PLAYBACK"&&x.observedAt===ts));
}
const r=JSON.parse(fs.readFileSync("data/embed-research-candidates.json","utf8"));
const y=r.find(x=>x.id==="youtube-monterey-bay-cam");assert.equal(y.playbackReview,"HUMAN_PLAYBACK_FAILED");assert.equal(y.promotion,"BLOCKED_PLAYBACK_FAILED");assert.equal(y.reviewBatch,"3266d6937e58b239");
console.log("fresh operator renewals and Monterey playback failure applied");
