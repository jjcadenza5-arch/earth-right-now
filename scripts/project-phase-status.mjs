import {execFileSync} from "node:child_process";
function run(path){return JSON.parse(execFileSync(process.execPath,[path],{encoding:"utf8"}))}
const product=run("scripts/whole-product-status.mjs");
const gates=run("scripts/external-gate-register.mjs");
const stage=gates.phase||"STAGE_R_EXTERNAL_GATE_TRIGGER_REGISTER";
const coreComplete=product.conclusion==="STABLE_BETA_READY";
const report={
 schemaVersion:1,
 currentStage:stage,
 phaseNumber:4,
 phaseLabel:"Controlled Infrastructure Pilots",
 phaseState:"ACTIVE_LIMITED_EARTH_SIGNALS_PILOT",
 coreStableBeta:coreComplete,
 coreComplete,
 completionState:coreComplete?"CORE_COMPLETE_PHASE_4_ACTIVE":"CORE_INCOMPLETE",
 openExternalGates:gates.count,
 eligibleExternalGates:(gates.eligibleNow||[]).map(x=>x.id),
 blockedExternalGates:(gates.waiting||[]).map(x=>x.id),
 nextTimedReview:gates.nextTimedReview||null,
 next:"OBSERVE_EARTH_SIGNALS_LIMITED_PILOT",
 interpretation:coreComplete
   ?"ERN Phase 3 is complete and Phase 4 is active. The limited Earth Signals public pilot is now active under verified safeguards; Submission and Now Moment media remain separate gated lanes."
   :"ERN core website still has blocking gaps that must be repaired before Phase 4 can proceed.",
 safety:gates.safety
};
console.log(JSON.stringify(report,null,2));
