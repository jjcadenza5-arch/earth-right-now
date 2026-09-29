import assert from "node:assert/strict";
import {spawnSync} from "node:child_process";
const r=spawnSync(process.execPath,["scripts/external-gate-register.mjs"],{encoding:"utf8"});
assert.equal(r.status,0,r.stderr);
const x=JSON.parse(r.stdout);
assert.equal(x.phase,"STAGE_R_EXTERNAL_GATE_TRIGGER_REGISTER");
assert(Array.isArray(x.openGates));
for(const g of x.openGates){assert.equal(g.reopenOnlyWhen,true);assert(g.trigger);assert(g.beforeTrigger)}
assert.ok(Object.prototype.hasOwnProperty.call(x,"nextTimedReview"));assert.ok(Array.isArray(x.untimedWaiting));if(x.nextTimedReview){assert(x.nextTimedReview.id);assert(x.nextTimedReview.nextEligibleAt);assert.equal(x.nextTimedReview.beforeTrigger,"DO_NOT_RETEST_OR_ROTATE_KEY");}
for(const k of ["inventTriggerEvidenceAllowed","automaticExternalActionAllowed","automaticCredentialRotationAllowed","automaticPublicActivationAllowed","automaticPartnerClaimAllowed","timePassingAloneCountsAsSuccess"])assert.equal(x.safety[k],false);
for(const id of ["guide-ai-public-activation","seoul-context-validation-and-activation"])assert(x.openGates.some(g=>g.id===id),`missing explicit external gate ${id}`);
const guide=x.openGates.find(g=>g.id==="guide-ai-public-activation");assert.equal(guide.beforeTrigger,"DETERMINISTIC_ONLY");
const seoul=x.openGates.find(g=>g.id==="seoul-context-validation-and-activation");assert.equal(seoul.beforeTrigger,"KEEP_CONTEXT_PUBLIC_OFF");
const v=x.openGates.find(g=>g.id==="viator-api-activation");
if(v){assert.equal(v.beforeTrigger,"DO_NOT_RETEST_OR_ROTATE_KEY");assert(v.nextEligibleAt)}
console.log("Stage R trigger register is evidence-gated and anti-loop safe");
