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
 phaseState:"ACTIVE_INFRASTRUCTURE_VERIFIED_PUBLIC_PILOT_OFF",
 coreStableBeta:coreComplete,
 coreComplete,
 completionState:coreComplete?"CORE_COMPLETE_PHASE_4_ACTIVE":"CORE_INCOMPLETE",
 openExternalGates:gates.count,
 eligibleExternalGates:(gates.eligibleNow||[]).map(x=>x.id),
 blockedExternalGates:(gates.waiting||[]).map(x=>x.id),
 nextTimedReview:gates.nextTimedReview||null,
 next:"EARTH_SIGNALS_LIMITED_PILOT_REQUIRES_EXPLICIT_ACTIVATION_DECISION",
 interpretation:coreComplete
   ?"ERN Phase 3 is complete and Phase 4 is active. Earth Signals and Submission infrastructure are deployed fail-closed; the next numbered-phase gate is an explicit decision on the first limited Earth Signals public pilot."
   :"ERN core website still has blocking gaps that must be repaired before Phase 4 can proceed.",
 safety:gates.safety
};
console.log(JSON.stringify(report,null,2));
