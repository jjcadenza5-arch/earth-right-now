import {execFileSync} from "node:child_process";
function run(path){return JSON.parse(execFileSync(process.execPath,[path],{encoding:"utf8"}))}
const product=run("scripts/whole-product-status.mjs");
const gates=run("scripts/external-gate-register.mjs");
const stage=gates.phase||"STAGE_R_EXTERNAL_GATE_TRIGGER_REGISTER";
const label="External-gate readiness and evidence-driven activation";
const report={
 schemaVersion:1,
 currentStage:stage,
 phaseNumber:null,
 phaseLabel:label,
 coreStableBeta:product.conclusion==="STABLE_BETA_READY",
 openExternalGates:gates.count,
 eligibleExternalGates:(gates.eligibleNow||[]).map(x=>x.id),
 blockedExternalGates:(gates.waiting||[]).map(x=>x.id),
 next:gates.next,
 interpretation:"ERN is beyond core build/stable-beta hardening. Current work is evidence-gated external activation plus ongoing source/product quality maintenance. This is not a simple Phase 3/4 sequence; the canonical repository stage is Stage R.",
 safety:gates.safety
};
console.log(JSON.stringify(report,null,2));
