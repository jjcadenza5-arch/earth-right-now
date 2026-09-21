import assert from "node:assert/strict";import {guideLiveNowResult} from "../src/earth-guide-live-now.js";
const now=new Date("2026-09-21T12:00:00Z"),base={health:"HEALTHY",permission:"LINK_ONLY",playback:"EXTERNAL",sourceUrl:"https://example.com/live",checkedAt:"2026-09-21T11:00:00Z"};
const verified={...base,id:"v",truth:"EXTERNAL_LIVE"},available={...base,id:"a",truth:"LIVE_IMAGE"};
const x=guideLiveNowResult("what is happening right now",[verified,available],{now});
assert.equal(x.nearNowCount,1);assert.equal(x.currentCount,1);assert.equal(x.availableNonCurrentCount,1);
assert.equal(guideLiveNowResult("now",[],{now}).empty,true);
console.log("ERN Guide live-now evidence checks passed");
