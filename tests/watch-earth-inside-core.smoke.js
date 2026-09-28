import assert from "node:assert/strict";
import { preserveWatchEarthInsideCore } from "../src/watch-earth-inside-core.js";

const now=new Date("2026-09-28T10:00:00Z");
const external=i=>({id:"e"+i,title:"External "+i,health:"HEALTHY",truth:"EXTERNAL_LIVE",permission:"LINK_ONLY",playback:"EXTERNAL",sourceUrl:"https://example.com/e"+i,checkedAt:now.toISOString(),lastSuccessfulCheck:now.toISOString()});
const inside=i=>({id:"i"+i,title:"Inside "+i,health:"HEALTHY",truth:"LIVE_VIDEO",permission:"EMBED_ALLOWED",playback:"EMBED",sourceUrl:"https://example.com/i"+i,embedUrl:"https://couchtourist.com/embed/cam/"+(8000+i)+"/",checkedAt:now.toISOString(),lastSuccessfulCheck:now.toISOString()});

const input=[external(0),external(1),inside(0),external(2),external(3),inside(1),external(4),external(5),inside(2),inside(3),inside(4),external(6)];
const before=input.map(x=>x.id).sort();
const out=preserveWatchEarthInsideCore(input,{now,preferredInside:5,earlyWindow:8});
assert.equal(out.length,input.length);
assert.deepEqual(out.map(x=>x.id).sort(),before);
assert.equal(out.slice(0,8).filter(x=>x.id.startsWith("i")).length,5);
assert.equal(out.filter(x=>x.id.startsWith("i")).length,5);
assert.deepEqual(preserveWatchEarthInsideCore(out,{now,preferredInside:5,earlyWindow:8}).map(x=>x.id),out.map(x=>x.id));
console.log("ERN Watch Earth inside-core preservation passed");
