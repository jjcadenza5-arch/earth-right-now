import assert from "node:assert/strict";import {operatorReviewQueue} from "../src/operator-review-queue.js";
const sources=[
 {id:"due",title:"Due",provider:"P",playback:"EMBED",permission:"EMBED_ALLOWED",health:"HEALTHY",playbackVerifiedAt:"2026-09-24T00:00:00Z",embedUrl:"https://couchtourist.com/embed/cam/1/",sourceUrl:"https://couchtourist.com/cams/a",quality:90,freshness:95,moment:90,checkedAt:"2026-09-24T00:00:00Z",lastSuccessfulCheck:"2026-09-24T00:00:00Z"},
 {id:"restore",title:"Restore",provider:"P",playback:"EMBED",permission:"EMBED_ALLOWED",health:"HEALTHY",embedUrl:"https://couchtourist.com/embed/cam/2/",sourceUrl:"https://couchtourist.com/cams/b",quality:88,freshness:95,moment:85,checkedAt:"2026-09-24T09:00:00Z",lastSuccessfulCheck:"2026-09-24T09:00:00Z"},
 {id:"held",title:"Held",provider:"P",playback:"EMBED",permission:"EMBED_ALLOWED",health:"HEALTHY",playbackVerifiedAt:"2026-09-24T00:00:00Z",embedUrl:"https://couchtourist.com/embed/cam/3/",sourceUrl:"https://couchtourist.com/cams/c",quality:99,freshness:99,moment:99,featuredHold:true}
];
const observations=[{id:"due",confirmation:"HUMAN_PLAYBACK",observedAt:"2026-09-24T00:00:00Z",httpStatus:200}];
const r=operatorReviewQueue(sources,observations,{now:new Date("2026-09-24T18:30:00Z"),limit:8,targetReady:5});
assert.equal(r.items[0].id,"due");assert.equal(r.items[0].reviewMode,"RENEW");assert.match(r.items[0].reason,/DUE_/);
assert.ok(r.items.some(x=>x.id==="restore"&&x.reviewMode==="RESTORE"));assert.ok(!r.items.some(x=>x.id==="held"));assert.equal(r.readyShortfall,4);assert.equal(r.renewalRequiredCount,1);assert.equal(r.projectedReadyWithoutRenewal,0);assert.equal(r.recommendedRestorationCount,1);assert.equal(r.primaryItems[0].id,"due");assert.equal(r.primaryItems[1].id,"restore");assert.ok(r.renewable.some(x=>x.id==="due"));assert.ok(!r.renewable.some(x=>x.id==="restore"));assert.ok(!r.renewable.some(x=>x.id==="held"));
assert.equal(r.safety.catalogMutationAllowed,false);assert.equal(r.safety.automaticPlaybackVerificationAllowed,false);
console.log("ERN operator review queue renewal priority passed");

const expiredSources=[
 {id:"expired",title:"Expired",provider:"P",playback:"EMBED",permission:"EMBED_ALLOWED",health:"HEALTHY",playbackVerifiedAt:"2026-09-23T00:00:00Z",embedUrl:"https://couchtourist.com/embed/cam/4/",sourceUrl:"https://couchtourist.com/cams/d",quality:92,freshness:95,moment:90,checkedAt:"2026-09-24T17:00:00Z",lastSuccessfulCheck:"2026-09-24T17:00:00Z"},
 {id:"never",title:"Never",provider:"P",playback:"EMBED",permission:"EMBED_ALLOWED",health:"HEALTHY",embedUrl:"https://couchtourist.com/embed/cam/5/",sourceUrl:"https://couchtourist.com/cams/e",quality:91,freshness:95,moment:90,checkedAt:"2026-09-24T17:00:00Z",lastSuccessfulCheck:"2026-09-24T17:00:00Z"}
];
const expiredObs=[{id:"expired",confirmation:"HUMAN_PLAYBACK",observedAt:"2026-09-23T00:00:00Z",httpStatus:200}];
const ex=operatorReviewQueue(expiredSources,expiredObs,{now:new Date("2026-09-24T18:30:00Z"),limit:8,targetReady:2});
assert.equal(ex.primaryItems[0].id,"expired");
assert.equal(ex.primaryItems[0].reviewMode,"RENEW");
assert.equal(ex.primaryItems[0].action,"RENEW_EXPIRED_VISITOR_PLAYBACK");
assert.equal(ex.primaryItems[0].reason,"EXPIRED");
assert.equal(ex.renewalCount,1);assert.equal(ex.renewalRequiredCount,1);assert.equal(ex.projectedReadyWithoutRenewal,0);
assert.ok(ex.primaryItems.some(x=>x.id==="never"&&x.reviewMode==="RESTORE"));

const efficientSources=[
 {id:"due1",title:"Due 1",provider:"P",playback:"EMBED",permission:"EMBED_ALLOWED",health:"HEALTHY",playbackVerifiedAt:"2026-09-24T00:30:00Z",embedUrl:"https://x/1",sourceUrl:"https://x/a",quality:95,freshness:95,moment:90,checkedAt:"2026-09-24T17:00:00Z",lastSuccessfulCheck:"2026-09-24T17:00:00Z"},
 {id:"due2",title:"Due 2",provider:"P",playback:"EMBED",permission:"EMBED_ALLOWED",health:"HEALTHY",playbackVerifiedAt:"2026-09-24T01:00:00Z",embedUrl:"https://x/2",sourceUrl:"https://x/b",quality:94,freshness:95,moment:90,checkedAt:"2026-09-24T17:00:00Z",lastSuccessfulCheck:"2026-09-24T17:00:00Z"},
 {id:"due3",title:"Due 3",provider:"P",playback:"EMBED",permission:"EMBED_ALLOWED",health:"HEALTHY",playbackVerifiedAt:"2026-09-24T01:30:00Z",embedUrl:"https://x/3",sourceUrl:"https://x/c",quality:93,freshness:95,moment:90,checkedAt:"2026-09-24T17:00:00Z",lastSuccessfulCheck:"2026-09-24T17:00:00Z"},
 {id:"current1",title:"Current 1",provider:"P",playback:"EMBED",permission:"EMBED_ALLOWED",health:"HEALTHY",playbackVerifiedAt:"2026-09-24T12:00:00Z",embedUrl:"https://x/4",sourceUrl:"https://x/d",quality:92,freshness:95,moment:90,checkedAt:"2026-09-24T17:00:00Z",lastSuccessfulCheck:"2026-09-24T17:00:00Z"},
 {id:"current2",title:"Current 2",provider:"P",playback:"EMBED",permission:"EMBED_ALLOWED",health:"HEALTHY",playbackVerifiedAt:"2026-09-24T12:30:00Z",embedUrl:"https://x/5",sourceUrl:"https://x/e",quality:91,freshness:95,moment:90,checkedAt:"2026-09-24T17:00:00Z",lastSuccessfulCheck:"2026-09-24T17:00:00Z"},
 {id:"current3",title:"Current 3",provider:"P",playback:"EMBED",permission:"EMBED_ALLOWED",health:"HEALTHY",playbackVerifiedAt:"2026-09-24T13:00:00Z",embedUrl:"https://x/6",sourceUrl:"https://x/f",quality:90,freshness:95,moment:90,checkedAt:"2026-09-24T17:00:00Z",lastSuccessfulCheck:"2026-09-24T17:00:00Z"}
];
const efficientObs=efficientSources.map(x=>({id:x.id,confirmation:"HUMAN_PLAYBACK",observedAt:x.playbackVerifiedAt,httpStatus:200}));
const efficient=operatorReviewQueue(efficientSources,efficientObs,{now:new Date("2026-09-24T19:00:00Z"),limit:10,targetReady:5});
assert.equal(efficient.ready,6);assert.equal(efficient.renewalCount,3);assert.equal(efficient.projectedReadyWithoutRenewal,3);assert.equal(efficient.renewalRequiredCount,2);assert.equal(efficient.primaryItems.filter(x=>x.reviewMode==="RENEW").length,2);assert.equal(efficient.backlogItems.filter(x=>x.reviewMode==="RENEW").length,1);
