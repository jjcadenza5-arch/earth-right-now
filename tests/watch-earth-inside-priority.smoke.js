import assert from "node:assert/strict";import {buildWatchEarth} from "../src/watch-earth.js";
const now=new Date("2026-09-24T08:30:00Z"),base={health:"HEALTHY",permission:"LINK_ONLY",checkedAt:now.toISOString(),lastSuccessfulCheck:now.toISOString(),quality:90,moment:80,freshness:90,categories:["Cities & Streets"],lat:0,lon:0};
const external=Array.from({length:8},(_,i)=>({...base,id:"e"+i,placeId:"e"+i,country:"E"+i,truth:"EXTERNAL_LIVE",playback:"EXTERNAL",sourceUrl:"https://example.com/e"+i,quality:100-i}));
const inside=Array.from({length:3},(_,i)=>({...base,id:"i"+i,placeId:"i"+i,country:"I"+i,truth:"LIVE_VIDEO",permission:"EMBED_ALLOWED",playback:"EMBED",sourceUrl:"https://example.com/i"+i,embedUrl:"https://couchtourist.com/embed/cam/"+(9000+i)+"/",quality:60-i}));
const out=buildWatchEarth([...external,...inside],{limit:6,now});
assert.equal(out.length,6);
assert.deepEqual(out.slice(0,3).map(x=>x.id).sort(),["i0","i1","i2"]);
console.log("ERN Watch Earth inside priority parity passed");
