import fs from "node:fs";import assert from "node:assert/strict";import {watchEarthEligible} from "../src/watch-earth.js";import {embedPlaybackCurrent} from "../src/embed-playback-current.js";
const now=new Date("2026-09-24T09:15:00Z"),base={id:"e",placeId:"e",title:"Embed",health:"HEALTHY",truth:"LIVE_VIDEO",permission:"EMBED_ALLOWED",playback:"EMBED",embedUrl:"https://couchtourist.com/embed/cam/9999/",sourceUrl:"https://example.com",checkedAt:now.toISOString(),lastSuccessfulCheck:now.toISOString(),quality:90,moment:90,freshness:90,categories:["Beautiful Earth"]};
assert.equal(embedPlaybackCurrent(base,{now}),false);
assert.equal(watchEarthEligible(base,{now}),false);
const verified={...base,playbackVerifiedAt:"2026-09-24T09:00:00Z"};assert.equal(embedPlaybackCurrent(verified,{now}),true);assert.equal(watchEarthEligible(verified,{now}),true);
const stale={...verified,playbackVerifiedAt:"2026-09-22T09:00:00Z"};assert.equal(embedPlaybackCurrent(stale,{now}),false);assert.equal(watchEarthEligible(stale,{now}),false);
const app=fs.readFileSync("src/app-lite.js","utf8");assert.match(app,/function embedPlaybackCurrent/);assert.match(app,/verificationWindowHours\(s\)&&embedPlaybackCurrent\(s\)/);new Function(app);
console.log("ERN embed human-playback gate passed");
