import fs from "node:fs";
import {execFileSync} from "node:child_process";
const read=p=>fs.readFileSync(p,"utf8");
const json=p=>JSON.parse(read(p));
const approval=json("data/phase6-entry-approval.json");
const plan=json("data/phase6-workplan.json");
const app=read("src/app-lite.js");
const travel=read("src/travel-planning-client.js");
const builder=read("scripts/build-destination-pages.mjs");
const release=read("scripts/build-release-snapshot.mjs");
const preflight=read("scripts/whole-product-preflight.mjs");
const index=read("index.html");
const phase=JSON.parse(execFileSync(process.execPath,["scripts/project-phase-status.mjs"],{encoding:"utf8"}));
const issues=[];
const phase6Complete=plan.state==="COMPLETE";
const need=(ok,code)=>{if(!ok)issues.push(code)};
need(approval?.approved===true,"PHASE6_APPROVAL_MISSING");
need(approval?.automaticExpansionAllowed===false,"PHASE6_AUTOMATIC_EXPANSION_BOUNDARY");
const constraints=approval?.constraints||{};
for(const key of ["pilot2ActivationApproved","submissionPublicActivationApproved","nowMomentMediaActivationApproved","generativeGuidePublicActivationApproved","analyticsActivationApproved","socialChannelActivationApproved","otherSeparateFeatureGatesApproved"])need(constraints[key]===false,"GATE_OPEN_"+key);
need(phase6Complete?Number(phase.phaseNumber)>=6:phase.phaseNumber===6,"CANONICAL_PHASE_INVALID_FOR_PHASE6");
need(app.includes("const intentGroups=")&&app.includes("ern:recent-searches:v1"),"SEARCH_DISCOVERY_INCOMPLETE");
need(app.includes("...(s.aliases||[])"),"SEARCH_ALIASES_MISSING");
need(builder.includes("Explore related places")&&builder.includes('id="placeFilter"'),"DESTINATION_PATHWAYS_INCOMPLETE");
need(builder.includes("discoverDefinitions")&&builder.includes('fs.writeFileSync("discover/index.html"'),"CRAWLABLE_DISCOVERY_INCOMPLETE");
need(index.includes('href="./discover/"'),"DISCOVER_HOME_PATH_MISSING");
need(travel.includes("partnerCurrent")&&travel.includes("sourceEligible"),"VERIFIED_ACTION_FAIL_CLOSED_MISSING");
need(app.includes('TP.offerFor(state.travelOffers,s,"stay",state.affiliatePartners)'),"VISITOR_ACTION_PARTNER_REGISTRY_MISSING");
need(release.includes('new URL("../discover/",import.meta.url)')&&release.includes("await rm(dist,{recursive:true,force:true})"),"RELEASE_RESILIENCE_INCOMPLETE");
need(preflight.includes("active-partner and source-eligibility boundaries"),"WHOLE_PRODUCT_ACTION_GUARD_MISSING");
const expectedComplete=["search-intent-discovery","destination-pathways","crawlable-growth","verified-action-pathways","performance-release-resilience"];
for(const id of expectedComplete)need(plan.lanes?.find(x=>x.id===id)?.status==="COMPLETE","LANE_NOT_COMPLETE_"+id);
need(plan.lanes?.find(x=>x.id==="phase6-discovery-qa")?.status==="ACTIVE","QA_LANE_NOT_ACTIVE");
const report={
 schemaVersion:1,
 phase:6,
 label:"Discovery & Growth exit QA",
 generatedAt:new Date().toISOString(),
 state:issues.length?"BLOCKED":phase6Complete?"PHASE6_COMPLETE_VERIFIED":"READY_TO_COMPLETE_PHASE6",
 issueCount:issues.length,
 issues,
 completedLanes:expectedComplete,
 qaLane:"phase6-discovery-qa",
 separateFeatureGatesRemainOff:issues.every(x=>!x.startsWith("GATE_OPEN_")&&!x.includes("AUTOMATIC_EXPANSION")),
 safety:{automaticGateActivationAllowed:false,analyticsActivationAllowed:false,socialAccountActionAllowed:false,generativeGuidePublicActivationAllowed:false,paidRankingAllowed:false},
 next:issues.length?"FIX_PHASE6_QA_ISSUES":phase6Complete?"NO_PHASE6_WORK_REOPENED":"COMPLETE_PHASE6_AND_ASSESS_NEXT_PHASE"
};
console.log(JSON.stringify(report,null,2));
if(issues.length)process.exitCode=1;
