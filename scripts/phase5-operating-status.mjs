import fs from "node:fs";
import {execFileSync} from "node:child_process";

const read=path=>JSON.parse(fs.readFileSync(path,"utf8"));
const run=(script,args=[])=>JSON.parse(execFileSync(process.execPath,[script,...args],{encoding:"utf8"}));

const approval=read("data/phase5-entry-approval.json");
const business=read("data/business-readiness.json");
const opportunities=read("data/commercial-link-opportunities.json");
const attribution=run("scripts/commercial-attribution-status.mjs");
const placement=run("scripts/commercial-placement-preflight.mjs");
const inventory=run("scripts/commercial-inventory-status.mjs");
const inventoryPartners=inventory?.partnerRegistry?.rows||[];
const inventoryOffers=inventory?.travelOfferRegistry?.rows||[];
const horizon=run("scripts/commercial-verification-horizon.mjs");
const gates=run("scripts/external-gate-register.mjs");

const constraints=approval?.constraints||{};
const closedSeparateGates=
  constraints.pilot2ActivationApproved===false&&
  constraints.submissionPublicActivationApproved===false&&
  constraints.nowMomentMediaActivationApproved===false&&
  constraints.generativeGuidePublicActivationApproved===false&&
  constraints.analyticsActivationApproved===false&&
  constraints.socialChannelActivationApproved===false&&
  constraints.otherSeparateFeatureGatesApproved===false&&
  approval?.automaticExpansionAllowed===false;

const payoutReady=business?.revenueInfrastructure?.payoutMethodConfigured===true;
const report={
  schemaVersion:1,
  generatedAt:new Date().toISOString(),
  phase:"PHASE_5",
  label:"Broader Public Operations & Monetization",
  entryApproved:approval?.approved===true,
  separateFeatureGatesRemainOff:closedSeparateGates,
  commercial:{
    inventoryStage:inventory?.stage||null,
    publicActivationAllowedByVerifiedInventory:inventory?.publicActivationAllowed===true,
    activePartners:inventory?.partnerRegistry?.active||0,
    activePartnerIds:inventoryPartners.filter(x=>x.active).map(x=>x.id),
    currentVerifiedOffers:inventory?.travelOfferRegistry?.current||0,
    currentVerifiedOfferIds:inventoryOffers.filter(x=>x.current).map(x=>x.id),
    placeCoverage:inventory?.travelOfferRegistry?.placeCoverage||0,
    sourceIneligibleOffers:inventory?.travelOfferRegistry?.sourceIneligible||0,
    inventoryNote:"Counts reflect current source/catalog eligibility as well as commercial verification; a verified offer tied to a non-current or unknown ERN place is fail-closed from current inventory.",
    privateOpportunityQueue:(opportunities?.opportunities||[]).length,
    opportunityQueuePublic:false,
    payoutMethodConfigured:payoutReady,
    payoutReadiness:payoutReady?"READY":"HUMAN_ACCOUNT_ACTION_REQUIRED",
    payoutBlocksPublicERN:false,
    payoutBlocksTrackedLinks:false,
    payoutBlocksReceivingPayouts:!payoutReady,
    placementPreflightOk:placement?.ok===true,
    placementWarnings:placement?.warn||[],
    telemetryConfigured:attribution?.telemetryConfigured===true,
    outboundMeasurementActive:attribution?.outboundMeasurementActive===true
  },
  maintenance:{
    commercialVerificationAttention:horizon?.summary?.attention??null,
    partnerHorizon:horizon?.summary?.partners||null,
    offerHorizon:horizon?.summary?.offers||null,
    urgentVerification:horizon?.urgent||[]
  },
  safety:{
    automaticPilot2ActivationAllowed:false,
    automaticCommercialPlacementAllowed:false,
    automaticLinkRewritingAllowed:false,
    paidRankingAllowed:false,
    bookingInferenceAllowed:false,
    revenueInferenceAllowed:false,
    automaticExternalActionAllowed:false,
    commercialPlacementPreflightRequired:true,
    affiliateDisclosureRequired:true
  },
  humanActions:gates?.openGates?.filter(g=>g?.eligibleNow===true).map(g=>g.id)||[],
  next:!approval?.approved
    ?"REQUIRE_EXPLICIT_PHASE5_APPROVAL"
    :!closedSeparateGates
      ?"STOP_SEPARATE_GATE_BOUNDARY_VIOLATION"
      :"CONTINUE_PHASE5_NON_GATED_OPERATIONS"
};
console.log(JSON.stringify(report,null,2));
if(!report.entryApproved||!report.separateFeatureGatesRemainOff)process.exitCode=1;
