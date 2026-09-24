import assert from "node:assert/strict";import {operatorReviewQueue} from "../src/operator-review-queue.js";
const sources=[
 {id:"due",title:"Due",provider:"P",playback:"EMBED",permission:"EMBED_ALLOWED",health:"HEALTHY",playbackVerifiedAt:"2026-09-24T00:00:00Z",embedUrl:"https://couchtourist.com/embed/cam/1/",sourceUrl:"https://couchtourist.com/cams/a",quality:90,freshness:95,moment:90,checkedAt:"2026-09-24T00:00:00Z",lastSuccessfulCheck:"2026-09-24T00:00:00Z"},
 {id:"restore",title:"Restore",provider:"P",playback:"EMBED",permission:"EMBED_ALLOWED",health:"HEALTHY",embedUrl:"https://couchtourist.com/embed/cam/2/",sourceUrl:"https://couchtourist.com/cams/b",quality:88,freshness:95,moment:85,checkedAt:"2026-09-24T09:00:00Z",lastSuccessfulCheck:"2026-09-24T09:00:00Z"},
 {id:"held",title:"Held",provider:"P",playback:"EMBED",permission:"EMBED_ALLOWED",health:"HEALTHY",playbackVerifiedAt:"2026-09-24T00:00:00Z",embedUrl:"https://couchtourist.com/embed/cam/3/",sourceUrl:"https://couchtourist.com/cams/c",quality:99,freshness:99,moment:99,featuredHold:true}
];
const observations=[{id:"due",confirmation:"HUMAN_PLAYBACK",observedAt:"2026-09-24T00:00:00Z",httpStatus:200}];
const r=operatorReviewQueue(sources,observations,{now:new Date("2026-09-24T18:30:00Z"),limit:8,targetReady:5});
assert.equal(r.items[0].id,"due");assert.equal(r.items[0].reviewMode,"RENEW");assert.match(r.items[0].reason,/DUE_/);
assert.ok(r.items.some(x=>x.id==="restore"&&x.reviewMode==="RESTORE"));assert.ok(!r.items.some(x=>x.id==="held"));assert.equal(r.readyShortfall,4);assert.equal(r.recommendedRestorationCount,1);assert.equal(r.primaryItems[0].id,"due");assert.equal(r.primaryItems[1].id,"restore");
assert.equal(r.safety.catalogMutationAllowed,false);assert.equal(r.safety.automaticPlaybackVerificationAllowed,false);
console.log("ERN operator review queue renewal priority passed");
