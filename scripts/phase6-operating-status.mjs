import fs from "node:fs";
import {execFileSync} from "node:child_process";
const read=p=>JSON.parse(fs.readFileSync(p,"utf8"));
const run=p=>JSON.parse(execFileSync(process.execPath,[p],{encoding:"utf8"}));
const approval=read("data/phase6-entry-approval.json");
const plan=read("data/phase6-workplan.json");
const phase=run("scripts/project-phase-status.mjs");
const open=(plan.lanes||[]).filter(x=>x.gated!==true&&["ACTIVE","PLANNED"].includes(x.status));
const active=open.filter(x=>x.status==="ACTIVE");
const planned=open.filter(x=>x.status==="PLANNED");
const constraints=approval?.constraints||{};
const gatesClosed=
 constraints.pilot2ActivationApproved===false&&
 constraints.submissionPublicActivationApproved===false&&
 constraints.nowMomentMediaActivationApproved===false&&
 constraints.generativeGuidePublicActivationApproved===false&&
 constraints.analyticsActivationApproved===false&&
 constraints.socialChannelActivationApproved===false&&
 constraints.otherSeparateFeatureGatesApproved===false&&
 approval?.automaticExpansionAllowed===false;
const completed=plan.state==="COMPLETE"&&open.length===0;
const report={
 schemaVersion:1,
 phase:6,
 label:"Discovery & Growth",
 entryApproved:approval?.approved===true,
 canonicalPhaseNumber:phase.phaseNumber,
 state:plan.state,
 separateFeatureGatesRemainOff:gatesClosed,
 activeLanes:active.map(x=>x.id),
 plannedLanes:planned.map(x=>x.id),
 openNonGatedLaneCount:open.length,
 next:!approval?.approved?"REQUIRE_PHASE6_APPROVAL":!gatesClosed?"STOP_SEPARATE_GATE_BOUNDARY_VIOLATION":completed?"PHASE6_COMPLETE":open.length?"CONTINUE_PHASE6_NON_GATED_WORK":"PHASE6_REVIEW_READY",
 safety:{
  automaticSeparateGateActivationAllowed:false,
  analyticsActivationAllowed:false,
  socialAccountActionAllowed:false,
  generativeGuidePublicActivationAllowed:false,
  paidRankingAllowed:false
 }
};
console.log(JSON.stringify(report,null,2));
const canonicalOk=completed?Number(report.canonicalPhaseNumber)>=6:report.canonicalPhaseNumber===6;
if(!report.entryApproved||!report.separateFeatureGatesRemainOff||!canonicalOk)process.exitCode=1;
