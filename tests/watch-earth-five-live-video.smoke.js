import fs from "node:fs";
import assert from "node:assert/strict";
import {watchEarthEligible,buildWatchEarth} from "../src/watch-earth.js";
import {buildDynamicWatchEarth} from "../src/dynamic-watch-earth.js";
import {watchEarthLiveNowStatus} from "../src/watch-earth-live-now-status.js";
const sources=JSON.parse(fs.readFileSync(new URL("../data/sources.json",import.meta.url),"utf8"));
// Anchor catalog invariants to its latest evidence; the release preflight separately uses the actual clock.
const now=new Date(Math.max(...sources.map(s=>Date.parse(s.lastSuccessfulCheck||s.checkedAt||"" )).filter(Number.isFinite)));
const eligible=sources.filter(s=>watchEarthEligible(s,{now}));
assert.ok(eligible.length>=3,"Current daylight sample needs several premium live cameras");
assert.ok(!eligible.some(s=>["verbier","taiwan-heping-island-live","takayama-miyagawa-stream"].includes(s.id)),"Human-rejected, failed or weak views stay outside Watch Earth");
assert.equal(watchEarthEligible({...eligible[0],thumbnailUrl:undefined},{now}),true,"Do not depend on an optional thumbnail for live eligibility");
const takayama=sources.find(s=>s.id==="takayama-miyagawa-stream");
assert.equal(takayama.watchHold,true);
assert.match(takayama.failureReason,/VISITOR_PLAYBACK_REJECTED/);
const seed=eligible[0];
const bait=[
 {...seed,id:"not-video-still",placeId:"not-video-still",quality:100,moment:100,truth:"LIVE_IMAGE",playback:"IMAGE_REFRESH"},
 {...seed,id:"provider-only",placeId:"provider-only",quality:100,moment:100,truth:"EXTERNAL_LIVE",playback:"EXTERNAL",permission:"LINK_ONLY"},
 {...seed,id:"unproven-video",placeId:"unproven-video",quality:100,moment:100,playbackVerifiedAt:null}
];
const assertTruth=items=>{
 assert.ok(items.length<=10,"Watch Earth has an absolute ten-stream ceiling");
 assert.equal(new Set(items.map(s=>s.placeId||s.id)).size,items.length,"No repeated destinations");
 for(const s of items){
  assert.equal(s.truth,"LIVE_VIDEO",s.id);
  assert.equal(s.playback,"EMBED",s.id);
  assert.equal(s.permission,"EMBED_ALLOWED",s.id);
  assert.ok(watchEarthEligible(s,{now}),s.id+" must pass all gates");
 }
};
const actual=buildWatchEarth([...sources,...bait],{limit:20,now});
assert.ok(actual.length>0&&actual.length<=10);
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
assert.equal(status.target,10);
assert.equal(status.count,dynamic.length);
assert.equal(status.inside,dynamic.length);
const app=fs.readFileSync(new URL("../src/app-lite.js",import.meta.url),"utf8");
assert.match(app,/s.truth==="LIVE_VIDEO"&&s.playback==="EMBED"&&s.permission==="EMBED_ALLOWED"&&recentPlaybackProof\(s\)/);
assert.match(app,/sources\.filter\(s=>watchEligible\(s\)&&currentInside\(s\)\)/);
assert.doesNotMatch(app.slice(app.indexOf("function buildWatch("),app.indexOf("function generatedBackground")),/thumbnailUrl/);
const html=fs.readFileSync(new URL("../index.html",import.meta.url),"utf8");
assert.ok(html.includes('data-i18n="currentWindows">live camera streams.'),"Promise must match published UI");
assert.ok(html.includes('href="./places/"'),"Full searchable catalog must remain available");
console.log("Up to ten verified embedded live-video streams only; nonvideo and stale sources stay in wider discovery");
// Stage 1 capacity grows only when enough independent places pass every existing gate.
const expanded=Array.from({length:11},(_,i)=>({...seed,id:"stage-ten-"+i,placeId:"stage-ten-place-"+i,country:"Country"+i,provider:"Provider"+i,sourceUrl:"https://couchtourist.com/cam/"+(9100+i)+"/",embedUrl:"https://couchtourist.com/embed/cam/"+(9100+i)+"/"}));
const ten=buildWatchEarth([...expanded,...bait],{limit:20,now});
assert.equal(ten.length,10,"Stage 1 permits ten proven streams, never eleven or twenty");
assertTruth(ten);
assert.equal(buildDynamicWatchEarth(expanded,{limit:20,now}).length,10,"Dynamic journey uses the same ten-stream ceiling");
assert.equal(watchEarthLiveNowStatus(expanded,{now}).status,"FULL");
const establishedFive=expanded.slice(0,5);
const dueTwo=expanded.slice(5,7).map(s=>({...s,playbackVerifiedAt:"2020-01-01T00:00:00Z"}));
const waiting=watchEarthLiveNowStatus([...establishedFive,...dueTwo,...bait],{now});
assert.equal(waiting.count,5,"An expanded ceiling cannot renew two expired proofs");
assert.equal(waiting.status,"CURATED","Keep the established five usable while evidence is pending");
assert.equal(waiting.capacityRemaining,5);
assert.match(app.slice(app.indexOf("function buildWatch("),app.indexOf("function generatedBackground")),/limit=10/);
console.log("Ten-slot staging preserves the five-stream curated floor, rejects stale/nonvideo padding, and caps excess candidates");

// Five cards are a rotating window, while viewer navigation retains the full ten.
const windowCode=app.slice(app.indexOf("function watchWindow("),app.indexOf("function renderWatch("));
const visibleWindow=new Function(windowCode+";return watchWindow")();
const cards=Array.from({length:10},(_,i)=>({id:String(i+1)}));
const shown=new Set();
for(let step=0;step<10;step++){
 const window=visibleWindow(cards,step);
 assert.equal(window.length,5);
 assert.equal(new Set(window.map(x=>x.id)).size,5);
 for(const item of window)shown.add(item.id);
 assert.deepEqual(window.map(x=>x.id),visibleWindow([...cards].reverse(),step).map(x=>x.id));
}
assert.equal(shown.size,10,"All ten participate across rotation steps");
assert.deepEqual(visibleWindow(cards,10),visibleWindow(cards,0),"Window wraps after ten steps");
assert.equal(visibleWindow(cards.slice(0,2),0).length,2,"Never pad an undersized pool");
assert.equal(visibleWindow([],0).length,0);
assert.match(app,/state.watch=buildWatch\(state.sources\);const v=watchWindow\(state.watch\)/);
assert.match(app,/state.watchIndex=\(state.watchIndex\+d\+state.watch.length\)%state.watch.length/);
