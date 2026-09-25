import assert from "node:assert/strict";import {commercialOnboardingPlan} from "../src/commercial-onboarding-plan.js";
const now=new Date("2026-09-24T12:00:00Z");
const base={health:"HEALTHY",checkedAt:"2026-09-24T11:00:00Z",lastSuccessfulCheck:"2026-09-24T11:00:00Z",truth:"EXTERNAL_LIVE",playback:"EXTERNAL",quality:90,moment:85,freshness:90,categories:["Beach"]};
const sources=[
 {...base,id:"a1",placeId:"a",title:"Alpha",country:"A",region:"R",quality:95,moment:90},
 {...base,id:"a2",placeId:"a",title:"Alpha Alt",country:"A",region:"R",quality:88,moment:80},
 {...base,id:"b1",placeId:"b",title:"Beta",country:"A",region:"R",quality:94,moment:91},
 {...base,id:"c1",placeId:"c",title:"Gamma",country:"A",region:"R",quality:93,moment:90},
 {...base,id:"d1",placeId:"d",title:"Delta",country:"B",region:"R",quality:92,moment:88},
 {...base,id:"e1",placeId:"e",title:"Held",country:"C",region:"R",quality:99,moment:99,featuredHold:true},
 {...base,id:"orbit",placeId:"orbit",title:"Orbital view",country:"Earth",region:"Low Earth Orbit",quality:99,moment:99,travelResearchEligible:false}
];
const offers=[{id:"offer-a",placeId:"a",intent:"stay",title:"Stay",provider:"P",url:"https://example.com",affiliate:true,sponsored:false,verified:true,verifiedAt:"2026-09-24T00:00:00Z"}];
const researchCandidates=[{id:"research-b",placeId:"b",researchStatus:"RESEARCH_ONLY",publicActivationAllowed:false}];
const r=commercialOnboardingPlan({sources,offers,researchCandidates},{now,limit:5,maxPerCountry:2});
assert.ok(!r.items.some(x=>x.placeId==="a"));assert.ok(!r.items.some(x=>x.placeId==="b"));assert.ok(!r.items.some(x=>x.placeId==="e"));assert.ok(!r.items.some(x=>x.placeId==="orbit"));
assert.equal(r.items.filter(x=>x.country==="A").length,1);
assert.ok(r.items.some(x=>x.placeId==="c"));assert.ok(r.items.some(x=>x.placeId==="d"));assert.equal(r.currentOfferPlaceCount,1);assert.equal(r.researchedPlaceCount,1);
assert.equal(r.safety.publicRankingAffected,false);assert.equal(r.safety.demandForecast,false);assert.equal(r.safety.revenueForecast,false);assert.equal(r.safety.paidPriorityAllowed,false);assert.equal(r.safety.inventOffersAllowed,false);
console.log("ERN commercial onboarding planner passed");
