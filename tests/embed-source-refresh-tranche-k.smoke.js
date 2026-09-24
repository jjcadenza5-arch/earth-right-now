import fs from "node:fs";import assert from "node:assert/strict";import {watchEarthEligible} from "../src/watch-earth.js";import {embedPlaybackCurrent} from "../src/embed-playback-current.js";
const rows=JSON.parse(fs.readFileSync("data/sources.json","utf8")),now=new Date("2026-09-24T09:15:00Z");
const ids=["ponte-di-legno-adamello","sasagawa-nagare","metung-gippsland-lakes","cancun-live-aqua-beach","chihshang-paradise-road","st-johns-harbour"];
for(const id of ids){
 const s=rows.find(x=>x.id===id);assert.ok(s,id);assert.equal(s.checkedAt,"2026-09-24T09:10:00Z",id);assert.equal(s.lastSuccessfulCheck,"2026-09-24T09:10:00Z",id);assert.equal(s.health,"HEALTHY",id);assert.ok(s.freshnessEvidence?.includes("deployed ERN playback remains separately unverified"),id);assert.equal(s.playbackVerifiedAt,undefined,id);assert.equal(embedPlaybackCurrent(s,{now}),false,id);assert.equal(watchEarthEligible(s,{now}),false,id);
}
console.log("ERN embed source refresh tranche K passed");
