import fs from "node:fs";
import {spawnSync} from "node:child_process";

const read=p=>JSON.parse(fs.readFileSync(p,"utf8"));
const plan=read("data/phase10-workplan.json");
const approval=read("data/phase10-entry-approval.json");
const run=(path)=>{
 const r=spawnSync(process.execPath,[path],{encoding:"utf8"});
 let output=null;
 try{output=JSON.parse(r.stdout)}catch{}
 return{ok:r.status===0,status:r.status,output,detail:(r.stderr||r.stdout||"").slice(0,800)};
};
const production=run("scripts/phase10-production-audit.mjs");
const business=run("scripts/phase10-business-architecture-audit.mjs");
const links=run("scripts/phase10-public-link-audit.mjs");
const issues=[];
if(!production.ok)issues.push({code:"PRODUCTION_AUDIT_FAILED",detail:production.detail});
if(!business.ok)issues.push({code:"BUSINESS_ARCHITECTURE_AUDIT_FAILED",detail:business.detail});
if(!links.ok)issues.push({code:"PUBLIC_LINK_AUDIT_FAILED",detail:links.detail});
const unfinished=(plan.lanes||[]).filter(x=>x.id!=="phase10-launch-review"&&x.status!=="COMPLETE");
if(unfinished.length)issues.push({code:"PHASE10_LANES_UNFINISHED",lanes:unfinished.map(x=>x.id)});
const c=approval.constraints||{};
const gatesClosed=
 c.pilot2ActivationApproved===false&&c.submissionPublicActivationApproved===false&&c.nowMomentMediaActivationApproved===false&&
 c.generativeGuidePublicActivationApproved===false&&c.analyticsActivationApproved===false&&c.socialAccountCreationApproved===false&&
 c.automaticPostingApproved===false&&c.payoutAccountActionApproved===false&&c.otherSeparateFeatureGatesApproved===false&&
 approval.automaticExternalActionsAllowed===false&&approval.spendAllowed===false&&approval.credentialExposureAllowed===false&&
 approval.irreversibleBusinessAccountChangesAllowed===false;
if(!gatesClosed)issues.push({code:"GATED_FEATURE_BOUNDARY_VIOLATION"});

const report={
 schemaVersion:1,phase:10,label:"ERN Launch & Business Readiness Review",
 ready:issues.length===0,issues,
 audits:{production:production.ok,business:business.ok,publicLinks:links.ok},
 sourceIntegrity:production.output?{importantSourceCount:production.output.importantSourceCount,totalSourceCount:production.output.totalSourceCount}:null,
 productIdentity:plan.productIdentity,
 separateFeatureGatesRemainOff:gatesClosed,
 unfinishedLanes:unfinished.map(x=>x.id),
 next:issues.length?"REPAIR_EXACT_LAUNCH_READINESS_ISSUES":"MARK_PHASE10_COMPLETE_AND_REQUEST_OWNER_LAUNCH_BUSINESS_REVIEW",
 safety:{automaticPublicActivationAllowed:false,automaticExternalAccountActionAllowed:false,spendAllowed:false,paidRankingAllowed:false}
};
console.log(JSON.stringify(report,null,2));
if(issues.length)process.exitCode=1;
