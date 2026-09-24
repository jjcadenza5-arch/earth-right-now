import assert from "node:assert/strict";import {operatorReviewQueue} from "../src/operator-review-queue.js";
const sources=[
 {id:"ready-a",title:"A",provider:"P",playback:"EMBED",permission:"EMBED_ALLOWED",health:"HEALTHY",embedUrl:"https://couchtourist.com/embed/cam/1/",sourceUrl:"https://couchtourist.com/cams/a",quality:90,freshness:95,moment:90,checkedAt:"2026-09-24T12:00:00Z",lastSuccessfulCheck:"2026-09-24T12:00:00Z"},
 {id:"ready-b",title:"B",provider:"P",playback:"EMBED",permission:"EMBED_ALLOWED",health:"HEALTHY",embedUrl:"https://couchtourist.com/embed/cam/2/",sourceUrl:"https://couchtourist.com/cams/b",quality:90,freshness:95,moment:90,checkedAt:"2026-09-24T12:00:00Z",lastSuccessfulCheck:"2026-09-24T12:00:00Z"},
 {id:"ready-c",title:"C",provider:"P",playback:"EMBED",permission:"EMBED_ALLOWED",health:"HEALTHY",embedUrl:"https://couchtourist.com/embed/cam/3/",sourceUrl:"https://couchtourist.com/cams/c",quality:90,freshness:95,moment:90,checkedAt:"2026-09-24T12:00:00Z",lastSuccessfulCheck:"2026-09-24T12:00:00Z"},
 ...["r1","r2","r3","r4"].map((id,i)=>({id,title:id,provider:"P",playback:"EMBED",permission:"EMBED_ALLOWED",health:"HEALTHY",embedUrl:`https://couchtourist.com/embed/cam/${10+i}/`,sourceUrl:`https://couchtourist.com/cams/${id}`,quality:90-i,freshness:95,moment:90,checkedAt:"2026-09-24T12:00:00Z",lastSuccessfulCheck:"2026-09-24T12:00:00Z"}))
];
const observations=["ready-a","ready-b","ready-c"].map(id=>({id,confirmation:"HUMAN_PLAYBACK",observedAt:"2026-09-24T12:00:00Z",httpStatus:200}));
const r=operatorReviewQueue(sources,observations,{now:new Date("2026-09-24T14:00:00Z"),targetReady:5,limit:10});
assert.equal(r.ready,3);assert.equal(r.targetReady,5);assert.equal(r.readyShortfall,2);assert.equal(r.recommendedRestorationCount,2);assert.deepEqual(r.primaryItems.map(x=>x.id),["r1","r2"]);assert.equal(r.backlogItems.length,2);
console.log("ERN operator review primary batch closes only the current inside shortfall");
