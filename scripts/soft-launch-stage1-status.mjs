import fs from "node:fs";
import {execFileSync} from "node:child_process";
const json=p=>JSON.parse(fs.readFileSync(p,"utf8"));
const approval=json("data/soft-launch-stage1-approval.json");
const workplan=json("data/soft-launch-stage1-workplan.json");
const phase10=JSON.parse(execFileSync(process.execPath,["scripts/phase10-operating-status.mjs"],{encoding:"utf8"}));
const business=json("data/business-readiness.json");
const partners=json("data/affiliate-partners.json");
const offers=json("data/travel-offers.json");
const future=json("data/phase10-future-differentiators.json");
const analyticsText=fs.readFileSync("src/analytics-config.js","utf8");
const domainPath=process.argv[2]||null;
let domain=null;
if(domainPath&&domainPath!=="-"&&fs.existsSync(domainPath)){
  try{domain=json(domainPath)}catch{}
}
const analyticsActive=/enabled\s*:\s*true/.test(analyticsText)&&!/provider\s*:\s*["']NONE["']/.test(analyticsText);
const constraints=approval.constraints||{};
const gatesClosed=
 constraints.pilot2===false&&constraints.submissionPublic===false&&constraints.nowMomentMediaPublic===false&&
 constraints.generativeGuidePublic===false&&constraints.analytics===false&&constraints.socialAccountActions===false&&
 constraints.payoutAccountActions===false&&constraints.otherSeparateFeatureGates===false&&constraints.paidMarketingAllowed===false&&
 constraints.newExternalAccountsAllowed===false&&constraints.spendAllowed===false&&constraints.irreversibleBusinessAccountChangesAllowed===false&&
 constraints.credentialExposureAllowed===false&&analyticsActive===false&&future.publicActivationAllowed===false;
const currentPartnerCount=(partners||[]).filter(x=>x.enabled===true).length;
const verifiedOfferCount=(offers||[]).filter(x=>x.verified===true).length;
const domainHealthy=domain?domain.state==="OK":null;
const blockers=[];
if(approval.approved!==true||approval.state!=="ACTIVE")blockers.push("SOFT_LAUNCH_APPROVAL_NOT_ACTIVE");
if(phase10.state!=="COMPLETE")blockers.push("PHASE10_NOT_COMPLETE");
if(!gatesClosed)blockers.push("GATED_FEATURE_OR_EXTERNAL_ACTION_BOUNDARY");
if(domain&&domainHealthy!==true)blockers.push("PUBLIC_DOMAIN_HEALTH");
const report={
 schemaVersion:1,
 stage:"SOFT_LAUNCH_OPERATING_STAGE_1",
 label:"ERN Soft Launch / Operating Stage 1",
 state:blockers.length?"ATTENTION_REQUIRED":"OPERATING",
 blockers,
 productIdentity:approval.productIdentity,
 operatingMode:workplan.mode,
 domain:domain?{host:domain.host||"earthrightnow.app",state:domain.state,healthy:domainHealthy}:{"host":"earthrightnow.app","state":"NOT_SUPPLIED_TO_THIS_RUN","healthy":null},
 commercialEvidence:{
  verifiedAffiliatePartners:currentPartnerCount,
  verifiedTravelOffers:verifiedOfferCount,
  travelpayoutsProjectActive:business.revenueInfrastructure?.travelpayoutsProjectActive===true,
  payoutMethodConfigured:business.revenueInfrastructure?.payoutMethodConfigured===true,
  trackedLinksAlreadyLive:business.revenueInfrastructure?.exactTrackedLinksAlreadyLive===true,
  trafficMeasured:false,
  bookingsMeasured:false,
  conversionsMeasured:false,
  revenueMeasured:false,
  interpretation:"Verified inventory and tracked-link readiness are operating facts. With ERN analytics OFF, this status does not infer visitor traffic, bookings, conversions or revenue."
 },
 gates:{
  pilot2:false,submissionPublic:false,nowMomentMediaPublic:false,generativeGuidePublic:false,
  analytics:false,socialAccountActions:false,payoutAccountActions:false,otherSeparateFeatureGates:false
 },
 safety:{
  broadFeatureExpansionAllowed:false,majorPromotionAllowed:false,paidMarketingAllowed:false,
  automaticExternalAccountActionAllowed:false,automaticCommercialPlacementAllowed:false,
  automaticLinkRewritingAllowed:false,paidRankingAllowed:false,bookingInferenceAllowed:false,revenueInferenceAllowed:false
 },
 next:blockers.length?"REPAIR_ONLY_CONFIRMED_SOFT_LAUNCH_BLOCKERS":"OPERATE_AND_REVIEW_ONLY_MATERIAL_EVIDENCE"
};
console.log(JSON.stringify(report,null,2));
if(blockers.length)process.exitCode=1;
