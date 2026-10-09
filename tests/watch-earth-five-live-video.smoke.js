import fs from "node:fs";
import assert from "node:assert/strict";
import {watchEarthEligible,buildWatchEarth} from "../src/watch-earth.js";
import {buildDynamicWatchEarth} from "../src/dynamic-watch-earth.js";
import {watchEarthLiveNowStatus} from "../src/watch-earth-live-now-status.js";
const sources=JSON.parse(fs.readFileSync(new URL("../data/sources.json",import.meta.url),"utf8"));
const now=new Date("2026-10-09T02:03:00Z");
const eligible=sources.filter(s=>watchEarthEligible(s,{now}));
assert.ok(eligible.length>=3,"Current daylight sample needs several premium live cameras");
assert.ok(!eligible.some(s=>["verbier","taiwan-heping-island-live","takayama-miyagawa-stream"].includes(s.id)),"Human-rejected, failed or weak views stay outside Watch Earth");
assert.ok(eligible.some(s=>!s.thumbnailUrl),"Do not depend on an optional thumbnail for live eligibility");
const takayama=sources.find(s=>s.id==="takayama-miyagawa-stream");\nassert.equal(takayama.watchHold,true);\nassert.match(takayama.failureReason,/VISITOR_PLAYBACK_REJECTED/);\nconst seed=eligible[0];
const bait=[
 {...seed,id:"not-video-still",placeId:"not-video-still",quality:100,moment:100,truth:"LIVE_IMAGE",playback:"IMAGE_REFRESH"},
 {...seed,id:"provider-only",placeId:"provider-only",quality:100,moment:100,truth:"EXTERNAL_LIVE",playback:"EXTERNAL",permission:"LINK_ONLY"},
 {...seed,id:"unproven-video",placeId:"unproven-video",quality:100,moment:100,playbackVerifiedAt:null}
];
const assertTruth=items=>{
 assert.ok(items.length<=5,"Watch Earth has an absolute five-stream ceiling");
 assert.equal(new Set(items.map(s=>s.placeId||s.id)).size,items.length,"No repeated destinations");
 for(const s of items){
  assert.equal(s.truth,"LIVE_VIDEO",s.id);
  assert.equal(s.playback,"EMBED",s.id);
  assert.equal(s.permission,"EMBED_ALLOWED",s.id);
  assert.ok(watchEarthEligible(s,{now}),s.id+" must pass all gates");
 }
};
const actual=buildWatchEarth([...sources,...bait],{limit:20,now});
assert.ok(actual.length>0&&actual.length<=5);
assertTruth(actual);
assert.ok(actual.every(s=>!bait.some(b=>b.id===s.id)));
const dynamic=buildDynamicWatchEarth(sources,{limit:20,now});
assert.equal(dynamic.length,actual.length);
assertTruth(dynamic);
const eligibleCountries=new Set(eligible.map(s=>s.country).filter(Boolean)).size;
if(dynamic.length===5&&eligibleCountries>=5)assert.equal(new Set(dynamic.map(s=>s.country)).size,5,"Use five countries when five qualified countries exist");
else assert.ok(new Set(dynamic.map(s=>s.country)).size>=1,"Never invent geographic diversity to fill five");
const sparse=buildWatchEarth([...eligible.slice(0,2),...bait],{limit:20,now});
assert.equal(sparse.length,2,"Do not pad five with unverified or nonvideo sources");
assertTruth(sparse);
const status=watchEarthLiveNowStatus(sources,{now});
assert.equal(status.target,5);
assert.equal(status.count,dynamic.length);
assert.equal(status.inside,dynamic.length);
const app=fs.readFileSync(new URL("../src/app-lite.js",import.meta.url),"utf8");
assert.match(app,/s.truth==="LIVE_VIDEO"&&s.playback==="EMBED"&&s.permission==="EMBED_ALLOWED"&&recentPlaybackProof\(s\)/);
assert.match(app,/sources\.filter\(s=>watchEligible\(s\)&&currentInside\(s\)\)/);
assert.doesNotMatch(app.slice(app.indexOf("function buildWatch("),app.indexOf("function generatedBackground")),/thumbnailUrl/);
const html=fs.readFileSync(new URL("../index.html",import.meta.url),"utf8");
assert.ok(html.includes('data-i18n="currentWindows">live camera streams.'),"Promise must match published UI");
assert.ok(html.includes('href="./places/"'),"Full searchable catalog must remain available");
console.log("Five verified embedded live-video streams only; nonvideo and stale sources stay in wider discovery");