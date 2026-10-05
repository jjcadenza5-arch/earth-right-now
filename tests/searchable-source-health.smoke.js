import assert from "node:assert/strict";
import {buildSearchableCoveragePlan,runSearchableSourceHealth} from "../src/searchable-source-health.js";

const now=new Date("2026-10-05T00:00:00Z");
const core=[
 {id:"a",title:"A",provider:"P",health:"HEALTHY",sourceUrl:"https://example.com/shared"},
 {id:"b",title:"B",provider:"P",health:"HEALTHY",sourceUrl:"https://example.com/shared"},
 {id:"c",title:"C",provider:"Q",health:"HEALTHY",sourceUrl:"https://example.org/c"}
];
const supplemental=[
 {id:"d",title:"D",provider:"R",health:"HEALTHY",sourceUrl:"https://example.net/d"},
 {id:"e",title:"E",provider:"R",health:"OFFLINE",sourceUrl:"https://example.net/e"}
];
const plan=buildSearchableCoveragePlan(core,supplemental,{now,cycleDays:1});
assert.equal(plan.eligibleSources,4);
assert.equal(plan.eligibleUniqueUrls,3);
assert.equal(plan.cohortSources,4);
assert.equal(plan.cohortUniqueUrls,3);

const calls=[];
const fake=async url=>{
 calls.push(url);
 return {status:url.includes("example.org")?404:200,url,body:{cancel:async()=>{}}};
};
const first=await runSearchableSourceHealth(core,supplemental,{now,cycleDays:1,fetchImpl:fake,timeoutMs:100,concurrency:3});
assert.equal(calls.length,3,"shared URLs must be probed once");
assert.equal(first.results.length,4);
assert.equal(first.summary.missing,1);
assert.equal(first.summary.repair,0);
assert.equal(first.summary.watch,1);
assert.equal(first.safety.catalogMutationAllowed,false);
assert.equal(first.safety.pageReachabilityProvesLive,false);

const second=await runSearchableSourceHealth(core,supplemental,{
 now:new Date("2026-10-06T00:00:00Z"),cycleDays:1,fetchImpl:fake,timeoutMs:100,concurrency:3,previousState:first.state
});
assert.equal(second.summary.repair,1);
assert.equal(second.repairQueue.find(x=>x.id==="c")?.reason,"REPEATED_PAGE_MISSING");

const recovered=await runSearchableSourceHealth(core,supplemental,{
 now:new Date("2026-10-07T00:00:00Z"),cycleDays:1,
 fetchImpl:async url=>({status:200,url,body:{cancel:async()=>{}}}),timeoutMs:100,concurrency:3,previousState:second.state
});
assert.equal(recovered.summary.recovered,1);
console.log("ERN rotating searchable-source health checks passed");
