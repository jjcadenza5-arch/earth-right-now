import fs from "node:fs";
import {execFileSync} from "node:child_process";
const read=p=>JSON.parse(fs.readFileSync(p,"utf8"));
const run=p=>JSON.parse(execFileSync(process.execPath,[p],{encoding:"utf8"}));
const approval=read("data/phase10-entry-approval.json");
const plan=read("data/phase10-workplan.json");
const phase=run("scripts/project-phase-status.mjs");
const open=(plan.lanes||[]).filter(x=>x.gated!==true&&["ACTIVE","PLANNED"].includes(x.status));
const active=open.filter(x=>x.status==="ACTIVE"),planned=open.filter(x=>x.status==="PLANNED");
const c=approval.constraints||{};
const gatesClosed=
 c.pilot2ActivationApproved===false&&
 c.submissionPublicActivationApproved===false&&
 c.nowMomentMediaActivationApproved===false&&
 c.generativeGuidePublicActivationApproved===false&&
 c.analyticsActivationApproved===false&&
 c.socialAccountCreationApproved===false&&
 c.automaticPostingApproved===false&&
 c.payoutAccountActionApproved===false&&
 c.otherSeparateFeatureGatesApproved===false&&
 approval.automaticExternalActionsAllowed===false&&
 approval.spendAllowed===false&&
 approval.credentialExposureAllowed===false&&
 approval.irreversibleBusinessAccountChangesAllowed===false;
const completed=plan.state==="COMPLETE"&&open.length===0;
const report={
 schemaVersion:1,
 phase:10,
 label:"ERN Launch & Business Readiness",
 entryApproved:approval.approved===true,
 canonicalPhaseNumber:phase.phaseNumber,
 state:plan.state,
 separateFeatureGatesRemainOff:gatesClosed,
 activeLanes:active.map(x=>x.id),
 plannedLanes:planned.map(x=>x.id),
 openNonGatedLaneCount:open.length,
 productIdentity:plan.productIdentity,
 next:!approval.approved?"REQUIRE_PHASE10_APPROVAL":!gatesClosed?"STOP_PHASE10_GATE_BOUNDARY_VIOLATION":completed?"PHASE10_COMPLETE":open.length?"CONTINUE_PHASE10_LAUNCH_READINESS":"PHASE10_REVIEW_READY",
 safety:{
  automaticPublicFeatureActivationAllowed:false,
  automaticExternalAccountActionAllowed:false,
  spendAllowed:false,
  credentialExposureAllowed:false,
  irreversibleBusinessAccountChangeAllowed:false,
  paidRankingAllowed:false
 }
};
console.log(JSON.stringify(report,null,2));
const canonicalOk=completed?Number(report.canonicalPhaseNumber)>=10:report.canonicalPhaseNumber===10;
if(!report.entryApproved||!report.separateFeatureGatesRemainOff||!canonicalOk)process.exitCode=1;
