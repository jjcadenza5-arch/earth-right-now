import fs from "node:fs";
import {execFileSync} from "node:child_process";
const read=p=>JSON.parse(fs.readFileSync(p,"utf8"));
const run=p=>JSON.parse(execFileSync(process.execPath,[p],{encoding:"utf8"}));

const phase=run("scripts/project-phase-status.mjs");
const status=run("scripts/phase9-operating-status.mjs");
const localization=run("scripts/phase9-localized-discovery-status.mjs");
const plan=read("data/phase9-workplan.json");
const builder=fs.readFileSync("scripts/build-destination-pages.mjs","utf8");
const releaseBuilder=fs.readFileSync("scripts/build-release-snapshot.mjs","utf8");
const blockers=[];

if(Number(phase.phaseNumber)<9)blockers.push("CANONICAL_PHASE_BEFORE_9");
if(status.entryApproved!==true||status.separateFeatureGatesRemainOff!==true)blockers.push("PHASE9_OPERATING_BOUNDARY");
if(localization.valid!==true)blockers.push("LOCALIZED_DISCOVERY_REGISTRY_INVALID");
for(const token of ["localizedDiscoverUrl","discoveryAlternates","localizedDiscoverRows","languageNav"]){
  if(!builder.includes(token))blockers.push("LOCALIZED_BUILDER_WIRING_"+token);
}
for(const locale of ["th","de","fr","ja","zh","es"]){
  if(!releaseBuilder.includes('new URL("../"+locale+"/",import.meta.url)'))blockers.push("RELEASE_TREE_MISSING_"+locale);
}
const unfinished=(plan.lanes||[]).filter(x=>x.id!=="phase9-exit-review"&&x.status!=="COMPLETE");
const ready=blockers.length===0&&unfinished.length===0;
const report={
  schemaVersion:1,
  phase:9,
  label:"Phase 9 Exit Review",
  ready,
  blockers,
  unfinishedLanes:unfinished.map(x=>x.id),
  separateFeatureGatesRemainOff:status.separateFeatureGatesRemainOff,
  localeCount:localization.localeCount,
  collectionCount:localization.collectionCount,
  next:ready?"MARK_PHASE9_COMPLETE":"FINISH_PHASE9_LANES",
  safety:{
    automaticPostingAllowed:false,
    analyticsActivationAllowed:false,
    socialAccountActionAllowed:false,
    payoutAccountActionAllowed:false,
    pilot2ActivationAllowed:false,
    submissionPublicActivationAllowed:false,
    nowMomentMediaActivationAllowed:false,
    generativeGuidePublicActivationAllowed:false,
    separateFeatureActivationAllowed:false
  }
};
console.log(JSON.stringify(report,null,2));
if(!ready)process.exitCode=1;
