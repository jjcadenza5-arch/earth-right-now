import assert from "node:assert/strict";import {spawnSync} from "node:child_process";
const r=spawnSync(process.execPath,["scripts/verification-horizon.mjs"],{encoding:"utf8"});
assert.equal(r.status,0,r.stderr);const out=JSON.parse(r.stdout);
for(const id of ["maui-hale-pau-hana","blouberg-table-mountain","perdido-key-beach","pleasant-beach-lake-ontario"]){
  const item=out.held.find(x=>x.id===id);assert.ok(item,id+" missing from held horizon");assert.equal(item.state,"HELD");assert.ok(!out.urgent.some(x=>x.id===id),id+" leaked into urgency");
}
assert.equal(out.summary.held,out.held.length);
console.log("ERN verification horizon separates curation holds from expiry urgency");
