import assert from "node:assert/strict";import {buildSourceAvailabilityPlan,probeSourceAvailability,runSourceAvailabilityProbe} from "../src/source-availability-observer.js";
const now=new Date("2026-09-24T10:00:00Z");
const base={title:"Test",provider:"P",health:"HEALTHY",truth:"EXTERNAL_LIVE",playback:"EXTERNAL",quality:90,checkedAt:"2026-09-20T00:00:00Z",lastSuccessfulCheck:"2026-09-20T00:00:00Z"};
const rows=[
 {...base,id:"a",sourceUrl:"https://example.com/a"},
 {...base,id:"b",sourceUrl:"https://example.com/b"},
 {...base,id:"c",sourceUrl:"https://example.com/c"},
 {...base,id:"d",sourceUrl:"https://example.com/d"},
 {...base,id:"e",sourceUrl:"https://example.com/e"},
 {...base,id:"f",sourceUrl:"http://127.0.0.1/private"},
 {...base,id:"g",sourceUrl:"http://192.168.1.2/private"},
 {...base,id:"h",sourceUrl:"file:///tmp/x"}
];
const plan=buildSourceAvailabilityPlan(rows,{now,limit:10,maxPerHost:2});
assert.equal(plan.length,2);assert.ok(plan.every(x=>x.host==="example.com"));assert.ok(plan.every(x=>!["f","g","h"].includes(x.id)));
const fake=async url=>({status:url.endsWith("/a")?200:404,url,body:{cancel:async()=>{}}});
const report=await runSourceAvailabilityProbe(rows,{now,limit:2,maxPerHost:2,concurrency:2,fetchImpl:fake,timeoutMs:100});
assert.equal(report.summary.total,2);assert.equal(report.summary.reachable,1);assert.equal(report.summary.missing,1);assert.ok(report.results.every(x=>x.evidenceKind==="PAGE_AVAILABILITY"&&x.provesLive===false));
const blocked=await probeSourceAvailability({id:"x",url:"https://blocked.example",host:"blocked.example"},{fetchImpl:async url=>({status:403,url,body:{cancel:async()=>{}}}),timeoutMs:100});
assert.equal(blocked.outcome,"ACCESS_BLOCKED");
console.log("ERN source availability observer passed");
