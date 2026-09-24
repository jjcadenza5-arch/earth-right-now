import assert from "node:assert/strict";import {spawnSync} from "node:child_process";
const r=spawnSync(process.execPath,["scripts/provider-worklist.mjs"],{encoding:"utf8"});
assert.equal(r.status,0,r.stderr);const out=JSON.parse(r.stdout);
for(const id of ["maui-hale-pau-hana","waikiki-south-shore","cold-lake-marina"])assert.ok(out.deferred.some(x=>x.id===id),id+" should be deferred");
for(const id of ["maui-hale-pau-hana","waikiki-south-shore","cold-lake-marina"])assert.ok(!out.next.some(x=>x.id===id),id+" leaked into actionable next");
assert.equal(out.summary.actionable,out.next.length<=20?out.summary.actionable:out.summary.actionable);
assert.ok(out.summary.deferred>=3);
console.log("ERN provider worklist respects holds and known playback rejections");
