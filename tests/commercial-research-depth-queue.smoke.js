import assert from "node:assert/strict";import {commercialResearchDepthQueue} from "../src/commercial-research-depth-queue.js";
const sources=[
 {id:"a",placeId:"a",title:"Alpha",country:"X",region:"R",health:"HEALTHY",quality:95,moment:90,freshness:90},
 {id:"b",placeId:"b",title:"Beta",country:"Y",region:"R",health:"HEALTHY",quality:90,moment:88,freshness:91},
 {id:"held",placeId:"held",title:"Held",country:"Z",health:"HEALTHY",quality:99,moment:99,freshness:99,featuredHold:true},
 {id:"depth-hold",placeId:"depth-hold",title:"Depth Hold",country:"Z",health:"HEALTHY",quality:98,moment:98,freshness:98,commercialDepthResearchHold:true}
];
const researchStatus={byPlace:{
 a:{total:1,intents:{stay:1,eat:0,transport:0,activities:0,tickets:0,services:0}},
 b:{total:2,intents:{stay:1,eat:0,transport:0,activities:1,tickets:0,services:0}},
 held:{total:1,intents:{stay:1,eat:0,transport:0,activities:0,tickets:0,services:0}},
 "depth-hold":{total:1,intents:{stay:1,eat:0,transport:0,activities:0,tickets:0,services:0}}
}};
const r=commercialResearchDepthQueue({sources,researchStatus},{limit:5,maxPerCountry:2,targetIntentDiversity:2});
assert.equal(r.items.length,1);assert.equal(r.items[0].placeId,"a");assert.equal(r.items[0].recommendedIntent,"activities");assert.equal(r.targetIntentDiversity,2);assert.ok(!r.items.some(x=>x.placeId==="b"));assert.ok(!r.items.some(x=>x.placeId==="depth-hold"));assert.ok(!r.items.some(x=>x.placeId==="held"));
assert.equal(r.safety.publicActivationAllowed,false);assert.equal(r.safety.automaticContactAllowed,false);assert.equal(r.safety.paidRankingAllowed,false);assert.equal(r.safety.demandForecast,false);assert.equal(r.safety.revenueForecast,false);
console.log("ERN private commercial research-depth queue stays non-promotional");
