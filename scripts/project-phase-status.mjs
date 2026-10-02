import fs from "node:fs";
import {execFileSync} from "node:child_process";
function run(path){return JSON.parse(execFileSync(process.execPath,[path],{encoding:"utf8"}))}
const product=run("scripts/whole-product-status.mjs");
const gates=run("scripts/external-gate-register.mjs");
const stage=gates.phase||"STAGE_R_EXTERNAL_GATE_TRIGGER_REGISTER";
const approvals=[];
for(let n=5;n<=20;n++){
  const path=`data/phase${n}-entry-approval.json`;
  if(!fs.existsSync(path))continue;
  try{const row=JSON.parse(fs.readFileSync(path,"utf8"));if(row?.approved===true)approvals.push(row)}catch{}
}
approvals.sort((a,b)=>Number(a.phase||0)-Number(b.phase||0));
const active=approvals.at(-1)||null;
const phaseNumber=Number(active?.phase||4);
const phaseLabel=String(active?.label||(phaseNumber===4?"Controlled Infrastructure Pilots":"Approved Project Phase"));
const slug=phaseLabel.toUpperCase().replace(/[^A-Z0-9]+/g,"_").replace(/^_|_$/g,"");
const phaseState=String(active?.phaseState||(phaseNumber===4?"ACTIVE_LIMITED_EARTH_SIGNALS_PILOT":`ACTIVE_PHASE${phaseNumber}_${slug}`));
const coreComplete=product.conclusion==="STABLE_BETA_READY";
const completionState=coreComplete?String(active?.completionState||(phaseNumber===4?"CORE_COMPLETE_PHASE_4_ACTIVE":`CORE_COMPLETE_PHASE_${phaseNumber}_ACTIVE`)):"CORE_INCOMPLETE";
const next=String(active?.next||(phaseNumber===4?"OBSERVE_EARTH_SIGNALS_LIMITED_PILOT":`CONTINUE_PHASE${phaseNumber}_NON_GATED_WORK`));
const interpretation=coreComplete
 ?String(active?.interpretation||(phaseNumber===4
   ?"ERN Phase 3 is complete and Phase 4 is active. The limited Earth Signals public pilot is active under verified safeguards; Submission and Now Moment media remain separate gated lanes."
   :`ERN core is complete and Phase ${phaseNumber} — ${phaseLabel} — is active under its recorded constraints. Separate feature gates remain independently gated unless explicitly approved.`))
 :"ERN core website still has blocking gaps that must be repaired before later phases can proceed.";
const report={
 schemaVersion:2,
 currentStage:stage,
 phaseNumber,
 phaseLabel,
 phaseState,
 coreStableBeta:coreComplete,
 coreComplete,
 completionState,
 openExternalGates:gates.count,
 eligibleExternalGates:(gates.eligibleNow||[]).map(x=>x.id),
 blockedExternalGates:(gates.waiting||[]).map(x=>x.id),
 nextTimedReview:gates.nextTimedReview||null,
 next,
 interpretation,
 activeApprovalFile:active?`data/phase${phaseNumber}-entry-approval.json`:null,
 approvedPhaseCount:approvals.length,
 safety:gates.safety
};
console.log(JSON.stringify(report,null,2));
