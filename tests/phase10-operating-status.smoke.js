import assert from "node:assert/strict";
import {spawnSync} from "node:child_process";
const r=spawnSync(process.execPath,["scripts/phase10-operating-status.mjs"],{encoding:"utf8"});
assert.equal(r.status,0,r.stderr);
const x=JSON.parse(r.stdout);
assert.equal(x.phase,10);
assert.equal(x.entryApproved,true);
assert.ok(Number(x.canonicalPhaseNumber)>=10);
assert.equal(x.separateFeatureGatesRemainOff,true);
if(x.state==="COMPLETE"){
  assert.equal(x.openNonGatedLaneCount,0);
  assert.equal(x.activeLanes.length,0);
  assert.equal(x.plannedLanes.length,0);
  assert.equal(x.next,"PHASE10_COMPLETE");
}else{
  assert.ok(x.openNonGatedLaneCount>0);
}
assert.equal(x.productIdentity.category,"The Live Discovery Engine");
assert.equal(x.productIdentity.tagline,"See before you go.");
for(const k of ["automaticPublicFeatureActivationAllowed","automaticExternalAccountActionAllowed","spendAllowed","credentialExposureAllowed","irreversibleBusinessAccountChangeAllowed","paidRankingAllowed"])assert.equal(x.safety[k],false);
console.log("Phase 10 launch/business readiness preserves all gated-feature and business boundaries");
