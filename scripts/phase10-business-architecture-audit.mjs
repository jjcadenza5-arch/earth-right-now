import fs from "node:fs";
import {spawnSync} from "node:child_process";
import {rankingMayUsePayment} from "../src/commercial-policy.js";

const read=p=>fs.readFileSync(p,"utf8"),json=p=>JSON.parse(read(p));
const issues=[];
const business=json("data/phase10-business-architecture.json");
const future=json("data/phase10-future-differentiators.json");
const readiness=json("data/business-readiness.json");
const guide=json("data/guide-ai-deployment.json");
const media=json("data/now-moment-media-deployment.json");
const builder=read("scripts/build-destination-pages.mjs");
const crispy=read("docs/CRISPY_PORK_SKIN_STRATEGY.md");
const small=read("src/small-place-discovery.js");

const commercial=spawnSync(process.execPath,["scripts/commercial-placement-preflight.mjs"],{encoding:"utf8"});
if(commercial.status!==0)issues.push("COMMERCIAL_PREFLIGHT_FAILED");
if(JSON.stringify(business.visitorJourney)!==JSON.stringify(["Search","See Live","Discover","Decide","Go"]))issues.push("VISITOR_JOURNEY_MISMATCH");
if(rankingMayUsePayment()!==false||business.commercialRules?.paymentMayAffectEarthRanking!==false||business.commercialRules?.commissionMayAffectEarthRanking!==false)issues.push("PAID_RANKING_BOUNDARY");
if(business.commercialRules?.automaticLinkRewritingAllowed!==false||business.commercialRules?.automaticPlacementAllowed!==false||business.commercialRules?.automaticPartnerApplicationAllowed!==false||business.commercialRules?.automaticPayoutActionAllowed!==false)issues.push("AUTOMATIC_BUSINESS_ACTION_BOUNDARY");
if(!builder.includes("Plan after looking")||!builder.includes("Affiliate availability never affects ERN source ranking"))issues.push("POST_DISCOVERY_PLANNING_BOUNDARY_MISSING");
if(readiness.publicSurface!==false)issues.push("BUSINESS_READINESS_PUBLIC_SURFACE_ON");

if(future.publicActivationAllowed!==false)issues.push("FUTURE_DIFFERENTIATORS_PUBLIC_ON");
if(future.safety?.generativeGuidePublic!==false||future.safety?.nowMomentMediaPublic!==false||future.safety?.submissionPublic!==false||future.safety?.pilot2!==false||future.safety?.analytics!==false||future.safety?.socialActions!==false||future.safety?.payoutActions!==false||future.safety?.automaticExternalActions!==false)issues.push("FUTURE_GATE_BOUNDARY");
if(guide.publicActivation===true||guide.publicEnabled===true)issues.push("GENERATIVE_GUIDE_PUBLIC_ON");
if(media.publicActivation===true||media.publicEnabled===true)issues.push("NOW_MOMENT_MEDIA_PUBLIC_ON");
if(!future.items?.find(x=>x.id==="now-moments-45")?.visitorExplanation?.includes("45 minutes"))issues.push("NOW_MOMENT_EXPLANATION_MISSING");
if(!future.items?.find(x=>x.id==="crispy-pork-skin-serendipity")?.visitorExplanation)issues.push("SERENDIPITY_EXPLANATION_MISSING");
if(!/crispy pork skin/i.test(crispy)||!small.includes("small"))issues.push("SERENDIPITY_FOUNDATION_MISSING");

const report={
 schemaVersion:1,phase:10,label:"Launch & Business Readiness Architecture Audit",
 ok:issues.length===0,issues,
 businessState:business.state,
 futureDifferentiatorsPublic:false,
 safety:{paidRankingAllowed:false,automaticPlacementAllowed:false,automaticExternalActionsAllowed:false}
};
console.log(JSON.stringify(report,null,2));
if(issues.length)process.exitCode=1;
