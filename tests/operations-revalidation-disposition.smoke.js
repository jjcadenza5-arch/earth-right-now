import fs from "node:fs";
import assert from "node:assert/strict";
import { operationsReport } from "../src/operations-report.js";

const sources=JSON.parse(fs.readFileSync("data/sources.json","utf8"));
const observations=JSON.parse(fs.readFileSync("data/provider-observations.json","utf8"));
const report=operationsReport(sources,{providerObservations:observations,checkedAt:"2026-09-25T02:27:44Z"});

const nextIds=new Set(report.revalidation.next.map(x=>x.id));
const deferred=new Map(report.revalidation.deferredItems.map(x=>[x.id,x.disposition]));

assert.equal(report.revalidation.total,report.revalidation.actionable+report.revalidation.deferred);
assert.equal(report.maintenance.sourceRevalidation.actionable,report.revalidation.actionable);
assert.equal(report.maintenance.sourceRevalidation.deferred,report.revalidation.deferred);

for(const id of ["maui-hale-pau-hana","blouberg-table-mountain","perdido-key-beach","pleasant-beach-lake-ontario","waikiki-south-shore","cold-lake-marina","jungfrau-region"]){
  assert.ok(!nextIds.has(id),`${id} must not appear as a next actionable revalidation item`);
}
assert.equal(deferred.get("maui-hale-pau-hana"),"CURATION_HOLD");
assert.equal(deferred.get("waikiki-south-shore"),"DEFERRED_PLAYBACK_REPROVE");
assert.equal(deferred.get("cold-lake-marina"),"DEFERRED_PLAYBACK_REPROVE");
assert.equal(deferred.get("jungfrau-region"),"DEFERRED_PROVIDER_OFFLINE");
assert.equal(report.revalidation.actionable,0);
assert.equal(report.revalidation.deferred,7);
assert.equal(report.revalidation.next.length,0);

console.log("ERN operations separates actionable revalidation from held/deferred maintenance");
