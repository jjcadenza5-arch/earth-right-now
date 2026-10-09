import fs from "node:fs";
import assert from "node:assert/strict";
import {execFileSync} from "node:child_process";

// Run after a renewal against the checked-out HEAD. Exact before/after
// evidence protects every non-pilot source and all ledger policy fields.
const previous=path=>JSON.parse(execFileSync("git",["show","HEAD:"+path],{encoding:"utf8"}));
const current=path=>JSON.parse(fs.readFileSync(path,"utf8"));
const ids=["yellowstone-biscuit-basin-current-image","nz-ruapehu-current-image"];
const allowed=new Set(ids),before=previous("data/sources.json"),after=current("data/sources.json");
assert.equal(after.length,before.length,"renewal cannot add or remove sources");
for(let i=0;i<before.length;i++){
 const old=before[i],next=after[i];
 assert.equal(next.id,old.id,"renewal cannot reorder sources");
 if(!allowed.has(old.id)){assert.deepEqual(next,old,old.id+" changed outside renewal scope");continue}
 assert.equal(next.truth,"LIVE_IMAGE",old.id);
 assert.equal(next.permission,"EMBED_ALLOWED",old.id);
 assert.equal(next.playback,"IMAGE_REFRESH",old.id);
 assert.equal(next.checkedAt,next.lastSuccessfulCheck,old.id+" timestamp mismatch");
 assert.ok(Date.parse(next.checkedAt)>=Date.parse(old.checkedAt||0),old.id+" check time moved backwards");
 assert.equal(next.failureReason,null,old.id+" failure not cleared");
 for(const key of new Set([...Object.keys(old),...Object.keys(next)])){
  if(["checkedAt","lastSuccessfulCheck","failureReason"].includes(key))continue;
  assert.deepEqual(next[key],old[key],old.id+" changed prohibited field "+key);
 }
}
for(const id of ids)assert.equal(before.filter(s=>s.id===id).length,1,id+" missing or duplicated");
const oldLedger=previous("data/current-image-pilot-observations.json");
const ledger=current("data/current-image-pilot-observations.json");
assert.deepEqual([...ledger.allowedSourceIds].sort(),[...ids].sort());
assert.equal(ledger.pilot,"CONTROLLED_IMAGE_REFRESH_2_SOURCE");
for(const key of new Set([...Object.keys(oldLedger),...Object.keys(ledger)])){
 if(key!=="observations")assert.deepEqual(ledger[key],oldLedger[key],"pilot ledger changed "+key);
}
const originalObs=oldLedger.observations,observations=ledger.observations;
assert.equal(observations.length,Math.min(30,originalObs.length+1),"expected one new observation");
assert.deepEqual(observations.slice(0,-1),originalObs.slice(-Math.min(originalObs.length,observations.length-1)),"previous observations changed");
const latest=observations.at(-1);
assert.equal(latest.state,"RENEWED");
assert.deepEqual(latest.items.map(x=>x.id).sort(),[...ids].sort(),"renewal recorded non-pilot source");
assert.ok(latest.items.every(x=>Number.isFinite(x.evidenceAgeMinutes)&&x.evidenceAgeMinutes>=0),"missing valid temporal evidence");
console.log("Two-source renewal changed only its permitted evidence fields and one observation");
