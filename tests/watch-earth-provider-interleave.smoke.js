import assert from "node:assert/strict";
import { interleaveWatchEarthProviders } from "../src/watch-earth-provider-interleave.js";
const rows=[{id:"a1",provider:"A"},{id:"a2",provider:"A"},{id:"b1",provider:"B"},{id:"b2",provider:"B"},{id:"c1",provider:"C"}];
const out=interleaveWatchEarthProviders(rows);
assert.deepEqual(new Set(out.map(x=>x.id)),new Set(rows.map(x=>x.id)));
for(let i=1;i<out.length;i++)assert.notEqual(out[i].provider,out[i-1].provider,"adjacent providers should differ while alternatives remain");
const one=interleaveWatchEarthProviders([{id:"a1",provider:"A"},{id:"a2",provider:"A"}]);assert.equal(one.length,2);
console.log("ERN Watch Earth provider interleave checks passed");

const laneRows=[{id:"d1",provider:"A",lat:0,lon:0},{id:"n1",provider:"A",lat:0,lon:180,categories:["Cities & Streets"]},{id:"o1",provider:"B"}];
const laneOut=interleaveWatchEarthProviders(laneRows,{now:new Date("2026-03-20T12:00:00Z")});
assert.deepEqual(laneOut.map(x=>x.id),laneRows.map(x=>x.id),"provider interleave must not reorder across story lanes");
