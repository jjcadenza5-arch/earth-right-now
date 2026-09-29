import {execFileSync} from "node:child_process";
function run(path){return JSON.parse(execFileSync(process.execPath,[path],{encoding:"utf8"}))}
const product=run("scripts/whole-product-status.mjs");
const gates=run("scripts/external-gate-register.mjs");
const stage=gates.phase||"STAGE_R_EXTERNAL_GATE_TRIGGER_REGISTER";
const label="External-gate readiness and evidence-driven activation";
const coreComplete=product.conclusion==="STABLE_BETA_READY";
const report={
 schemaVersion:1,
 currentStage:stage,
 phaseNumber:null,
 phaseLabel:label,
 coreStableBeta:coreComplete,
 coreComplete,
 completionState:coreComplete?"CORE_COMPLETE_EXTERNAL_OPTIONAL":"CORE_INCOMPLETE",
 openExternalGates:gates.count,
 eligibleExternalGates:(gates.eligibleNow||[]).map(x=>x.id),
 blockedExternalGates:(gates.waiting||[]).map(x=>x.id),
 nextTimedReview:gates.nextTimedReview||null,
 next:gates.next,
 interpretation:coreComplete
   ?"ERN core website is complete as a stable beta. Stage R now tracks optional external/account/provider activations and ongoing maintenance; open external gates are not unfinished core website work."
   :"ERN core website still has blocking gaps that must be repaired before completion.",
 safety:gates.safety
};
console.log(JSON.stringify(report,null,2));
