import {execFileSync} from "node:child_process";
function run(path){return JSON.parse(execFileSync(process.execPath,[path],{encoding:"utf8"}))}
const product=run("scripts/whole-product-status.mjs");
const gates=run("scripts/external-gate-register.mjs");
const stage=gates.phase||"STAGE_R_EXTERNAL_GATE_TRIGGER_REGISTER";
const phase5=JSON.parse((await import("node:fs")).readFileSync("data/phase5-entry-approval.json","utf8"));
const phase5Active=phase5?.approved===true;
const coreComplete=product.conclusion==="STABLE_BETA_READY";
const report={
 schemaVersion:1,
 currentStage:stage,
 phaseNumber:phase5Active?5:4,
 phaseLabel:phase5Active?"Broader Public Operations & Monetization":"Controlled Infrastructure Pilots",
 phaseState:phase5Active?"ACTIVE_PHASE5_SEPARATE_GATES_OFF":"ACTIVE_LIMITED_EARTH_SIGNALS_PILOT",
 coreStableBeta:coreComplete,
 coreComplete,
 completionState:coreComplete?(phase5Active?"CORE_COMPLETE_PHASE_5_ACTIVE":"CORE_COMPLETE_PHASE_4_ACTIVE"):"CORE_INCOMPLETE",
 openExternalGates:gates.count,
 eligibleExternalGates:(gates.eligibleNow||[]).map(x=>x.id),
 blockedExternalGates:(gates.waiting||[]).map(x=>x.id),
 nextTimedReview:gates.nextTimedReview||null,
 next:phase5Active?"CONTINUE_PHASE5_NON_GATED_OPERATIONS":"OBSERVE_EARTH_SIGNALS_LIMITED_PILOT",
 interpretation:coreComplete
   ?(phase5Active?"ERN core is complete and Phase 5 entry is approved. Broader operations and monetization may proceed only in non-gated lanes; Pilot 2, Submission public intake, Now Moment media, public generative Guide, analytics, social channels and other separate feature gates remain independently gated.":"ERN Phase 3 is complete and Phase 4 is active. The limited Earth Signals public pilot is now active under verified safeguards; Submission and Now Moment media remain separate gated lanes.")
   :"ERN core website still has blocking gaps that must be repaired before Phase 4 can proceed.",
 safety:gates.safety
};
console.log(JSON.stringify(report,null,2));
