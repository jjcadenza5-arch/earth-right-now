import fs from "node:fs";
import {execFileSync} from "node:child_process";
const run=p=>{const r=execFileSync(process.execPath,[p],{encoding:"utf8"});return JSON.parse(r)};
const read=p=>JSON.parse(fs.readFileSync(p,"utf8"));
const plan=read("data/phase7-workplan.json");
const phase=run("scripts/project-phase-status.mjs");
const qa=run("scripts/phase7-launch-qa.mjs");
const status=run("scripts/phase7-operating-status.mjs");
const blockers=[];
if(Number(phase.phaseNumber)<7)blockers.push("CANONICAL_PHASE_BEFORE_7");
if(qa.state!=="READY_NON_GATED_LAUNCH_PACKAGE")blockers.push("LAUNCH_PACKAGE_QA_NOT_READY");
if(status.entryApproved!==true||status.separateFeatureGatesRemainOff!==true)blockers.push("PHASE7_OPERATING_BOUNDARY");
const unfinished=(plan.lanes||[]).filter(x=>x.id!=="phase7-exit-review"&&x.status!=="COMPLETE");
if(unfinished.length)blockers.push("PHASE7_LANES_UNFINISHED");
const exitLane=(plan.lanes||[]).find(x=>x.id==="phase7-exit-review");
if(!exitLane||!["ACTIVE","COMPLETE"].includes(exitLane.status))blockers.push("EXIT_REVIEW_NOT_ACTIVE");
const report={
 schemaVersion:1,
 phase:7,
 label:"Phase 7 Exit Review",
 ready:blockers.length===0,
 blockers,
 completedLanes:(plan.lanes||[]).filter(x=>x.status==="COMPLETE").map(x=>x.id),
 exitLaneStatus:exitLane?.status||"MISSING",
 launchQa:qa.state,
 separateFeatureGatesRemainOff:status.separateFeatureGatesRemainOff,
 next:blockers.length?"FIX_PHASE7_EXIT_BLOCKERS":"MARK_PHASE7_COMPLETE_AND_ASSESS_NEXT_PHASE",
 safety:{
  socialAccountActionRequired:false,
  automaticPostingAllowed:false,
  analyticsActivationAllowed:false,
  payoutAccountActionAllowed:false,
  separateFeatureActivationAllowed:false
 }
};
console.log(JSON.stringify(report,null,2));
if(blockers.length)process.exitCode=1;
