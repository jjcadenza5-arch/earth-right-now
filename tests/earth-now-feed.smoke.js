import assert from "node:assert/strict";import {earthNowFeed,earthNowHeadline} from "../src/earth-now-feed.js";
const now=new Date("2026-09-21T12:00:00Z"),places=[{id:"a",title:"Market A"},{id:"b",title:"Beach B"}],signals=[
 {type:"BUSY",placeId:"a",createdAt:"2026-09-21T11:59:00Z"},
 {type:"BEAUTIFUL_LIGHT",placeId:"b",createdAt:"2026-09-21T11:55:00Z"},
 {type:"RAINING",placeId:"missing",createdAt:"2026-09-21T11:58:00Z"},
 {type:"PEACEFUL",placeId:"a",createdAt:"2026-09-21T10:00:00Z"}
];
const feed=earthNowFeed(signals,places,{now});
assert.ok(feed.length===2,"only fresh signals attached to known ERN places");
assert.ok(feed[0].placeId==="a","newest first");
assert.ok(earthNowHeadline(feed).text.includes("2 fresh signals across 2 places"));
assert.ok(!earthNowHeadline([]).active,"empty feed must not imply live visitor activity");
console.log("Earth Now feed contract checks passed");
