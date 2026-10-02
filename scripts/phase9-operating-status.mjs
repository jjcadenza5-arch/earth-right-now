import fs from "node:fs";
// Phase 9 status is read-only and must not activate gated capabilities.\n// Once complete, Phase 9 remains valid at canonical phase 9 or any later explicitly approved phase.
import {execFileSync} from "node:child_process";
const read=p=>JSON.parse(fs.readFileSync(p,"utf8"));
const run=p=>JSON.parse(execFileSync(process.execPath,[p],{encoding:"utf8"}));
const approval=read("data/phase9-entry-approval.json");
const plan=read("data/phase9-workplan.json");
const phase=run("scripts/project-phase-status.mjs");
const open=(plan.lanes||[]).filter(x=>x.gated!==true&&["ACTIVE","PLANNED"].includes(x.status));
const active=open.filter(x=>x.status==="ACTIVE");
const planned=open.filter(x=>x.status==="PLANNED");
const c=approval?.constraints||{};
const closed=
 c.socialAccountCreationApproved===false&&
 c.automaticPostingApproved===false&&
 c.analyticsActivationApproved===false&&
 c.payoutAccountActionApproved===false&&
 c.pilot2ActivationApproved===false&&
 c.submissionPublicActivationApproved===false&&
 c.nowMomentMediaActivationApproved===false&&
 c.generativeGuidePublicActivationApproved===false&&
 c.otherSeparateFeatureGatesApproved===false&&
 approval?.automaticExternalActionsAllowed===false;
const completed=plan.state==="COMPLETE"&&open.length===0;
const report={
 schemaVersion:1,phase:9,label:"International Reach & Localized Discovery",
 entryApproved:approval?.approved===true,
 canonicalPhaseNumber:phase.phaseNumber,
 state:plan.state,
 separateFeatureGatesRemainOff:closed,
 activeLanes:active.map(x=>x.id),
 plannedLanes:planned.map(x=>x.id),
 openNonGatedLaneCount:open.length,
 next:!approval?.approved?"REQUIRE_PHASE9_APPROVAL":!closed?"STOP_PHASE9_GATE_BOUNDARY_VIOLATION":completed?"PHASE9_COMPLETE":open.length?"CONTINUE_PHASE9_NON_GATED_LOCALIZED_DISCOVERY":"PHASE9_REVIEW_READY",
 safety:{
  automaticSocialAccountCreationAllowed:false,
  automaticPostingAllowed:false,
  analyticsActivationAllowed:false,
  payoutAccountActionAllowed:false,
  automaticPublicFeatureActivationAllowed:false
 }
};
console.log(JSON.stringify(report,null,2));
const canonicalOk=completed?Number(report.canonicalPhaseNumber)>=9:report.canonicalPhaseNumber===9;
if(!report.entryApproved||!report.separateFeatureGatesRemainOff||!canonicalOk)process.exitCode=1;
