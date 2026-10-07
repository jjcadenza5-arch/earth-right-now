import fs from "node:fs";
import {affiliatePartner,activeAffiliatePartner} from "../src/affiliate-partners.js";
import {currentTravelOffer} from "../src/travel-offer-verification.js";

const read=p=>JSON.parse(fs.readFileSync(p,"utf8"));
const partners=read("data/affiliate-partners.json"),offers=read("data/travel-offers.json"),coreSources=read("data/sources.json"),supplementalSources=read("data/search-supplemental.json"),platforms=read("data/affiliate-platform-research.json"),opportunities=read("data/commercial-link-opportunities.json"),business=read("data/business-readiness.json"),activation=read("data/affiliate-activation.json"),revenueReadiness=read("data/affiliate-revenue-readiness.json"),index=fs.readFileSync("index.html","utf8"),destinationBuilder=fs.readFileSync("scripts/build-destination-pages.mjs","utf8");
const now=Date.now(),fail=[],warn=[],partnerMap=new Map();
for(const raw of partners){
  const p=affiliatePartner(raw);
  if(!p){fail.push("invalid partner record: "+String(raw?.id||"unknown"));continue}
  partnerMap.set(p.id,{raw,p,active:activeAffiliatePartner(p,{now})});
}
for(const o of offers){
  if(!o?.affiliate)continue;
  if(!o.partnerId){fail.push("affiliate offer missing partnerId: "+String(o?.id||"unknown"));continue}
  const partner=partnerMap.get(String(o.partnerId));
  if(!partner)fail.push("affiliate offer references missing partner: "+o.id+" -> "+o.partnerId);
  else if(!partner.active)fail.push("affiliate offer references inactive partner: "+o.id+" -> "+o.partnerId);
  if(!currentTravelOffer(o,{now}))fail.push("affiliate offer is not currently verified: "+String(o?.id||"unknown"));
}
const tp=platforms.find(x=>x?.id==="travelpayouts");
const tpBacked=partners.some(x=>/Travelpayouts/i.test(String(x?.name||"")));
if(tpBacked&&!tp)fail.push("Travelpayouts-backed partners exist but platform state is missing");
if(tp){
  if(tp.relationshipActive!==true)fail.push("Travelpayouts relationship must be explicitly active");
  if(tp.driveAutomationAllowed!==false)fail.push("Travelpayouts Drive automation must remain disabled");
  if(tp.manualToolsOnly!==true)fail.push("Travelpayouts relationship must remain manual-tools-only");
  if(tp.automaticLinkRewritingAllowed!==false)fail.push("Travelpayouts automatic link rewriting must remain disabled");
  if(tp.automaticPlacementAllowed!==false)fail.push("Travelpayouts automatic placement must remain disabled");
  if(tp.rankingAffectedByCommission!==false||tp.paidRankingAllowed!==false)fail.push("Travelpayouts commission may not affect ranking");
  if(tp.payoutMethodConfigured!==true)warn.push("Travelpayouts project is active but payout method is not configured yet");
}
if(business.publicSurface!==false)fail.push("business readiness must remain non-public");
if(business.revenueInfrastructure?.travelpayoutsProjectActive!==true)fail.push("Travelpayouts active project state missing from business readiness");
if(typeof business.revenueInfrastructure?.payoutMethodConfigured!=="boolean")fail.push("Travelpayouts payout readiness must be explicitly recorded as true or false");
if(business.revenueInfrastructure?.paidRankingAllowed!==false)fail.push("business readiness may not enable paid ranking");
if(opportunities.publicActivationAllowed!==false)fail.push("commercial opportunity queue must remain public-OFF");
if(opportunities.principles?.automaticPlacementAllowed!==false)fail.push("commercial opportunity queue automatic placement must remain disabled");
if(opportunities.principles?.automaticLinkRewritingAllowed!==false)fail.push("commercial opportunity queue automatic link rewriting must remain disabled");
if(opportunities.principles?.commissionMayNotAffectEditorialRanking!==true)fail.push("commercial queue must preserve editorial ranking independence");
if(!revenueReadiness?.earningRule)fail.push("affiliate revenue readiness earning rule missing");
if(revenueReadiness?.safeguards?.researchOpportunityDoesNotEqualRevenueActive!==true)fail.push("affiliate readiness must distinguish research from revenue-active");
if(revenueReadiness?.safeguards?.exactTrackedLinkRequired!==true)fail.push("affiliate readiness exact tracked-link gate missing");
if(revenueReadiness?.safeguards?.manualVerificationRequired!==true)fail.push("affiliate readiness manual verification gate missing");
if(revenueReadiness?.safeguards?.automaticLinkRewriting!==false||revenueReadiness?.safeguards?.automaticAffiliatePlacement!==false)fail.push("affiliate readiness may not enable automatic monetization");
if(revenueReadiness?.safeguards?.commissionCannotAffectEarthRanking!==true)fail.push("affiliate readiness must preserve ranking independence");
const verifiedTpByProgram={};
for(const [program,p] of Object.entries(activation?.travelpayoutsVerifiedPrograms||{})){
  verifiedTpByProgram[program]=Object.values(p?.destinationLinks||{}).filter(d=>String(d?.state||"").includes("VERIFIED")&&d?.publicPlacementAllowed===true).length;
}
const verifiedTpTotal=Object.values(verifiedTpByProgram).reduce((a,b)=>a+b,0);
if(revenueReadiness?.currentVerifiedEvidence?.travelpayouts?.verifiedDestinationLinks!==verifiedTpTotal)fail.push("affiliate revenue readiness Travelpayouts verified-link count drift");
for(const [program,count] of Object.entries(verifiedTpByProgram)){
  if(revenueReadiness?.currentVerifiedEvidence?.travelpayouts?.byProgram?.[program]!==count)fail.push("affiliate revenue readiness program count drift: "+program);
}
const activationViator=(activation?.waves||[]).flatMap(w=>w?.programs||[]).find(p=>p?.id==="viator");
if(revenueReadiness?.currentVerifiedEvidence?.viator?.relationshipActive!==(activationViator?.state==="ACTIVE_TRACKED_LINK_CREATED"))fail.push("affiliate revenue readiness Viator state drift");
const sourceByPlaceId=new Map([...coreSources,...supplementalSources].map(s=>[String(s?.placeId||s?.id||""),s]).filter(([id])=>Boolean(id)));
const sourceRevenueEligible=s=>Boolean(s)&&s.health==="HEALTHY"&&["LIVE_VIDEO","LIVE_IMAGE","EXTERNAL_LIVE"].includes(s.truth);
const publicRevenueActiveOffers=offers.filter(o=>o?.affiliate&&currentTravelOffer(o,{now})&&partnerMap.get(o.partnerId)?.active&&sourceRevenueEligible(sourceByPlaceId.get(String(o.placeId||""))));
const publicRevenueActiveByProgram={};
for(const o of publicRevenueActiveOffers)publicRevenueActiveByProgram[o.partnerId]=(publicRevenueActiveByProgram[o.partnerId]||0)+1;
if(revenueReadiness?.currentPublicRevenueActive?.offerCount!==publicRevenueActiveOffers.length)fail.push("affiliate revenue readiness public-active source-eligible offer count drift");
for(const [program,count] of Object.entries(publicRevenueActiveByProgram)){
  if(revenueReadiness?.currentPublicRevenueActive?.byProgram?.[program]!==count)fail.push("affiliate revenue readiness public-active program count drift: "+program);
}
for(const x of opportunities.opportunities||[]){
  if(!x?.id||!x?.destination||!x?.partnerCandidate||!x?.state)fail.push("invalid commercial opportunity record");
  if(x?.url||x?.trackedUrl||x?.public===true)fail.push("planning opportunity contains public/tracked placement data: "+String(x?.id||"unknown"));
}

if(!destinationBuilder.includes("currentTravelOffer")||!destinationBuilder.includes("activeAffiliatePartner"))fail.push("destination pages may surface affiliate links without current offer/partner gates");
if(!destinationBuilder.includes('rel="sponsored noopener noreferrer"'))fail.push("destination page affiliate links must carry sponsored rel");
if(!destinationBuilder.includes("Affiliate availability never affects ERN source ranking"))fail.push("destination page affiliate ranking-independence disclosure missing");
if(!destinationBuilder.includes("const offers=currentItems.length?offerForPlace(id):[]"))fail.push("stale-only destination pages may become commercial surfaces");
if(!destinationBuilder.includes("These entries are not paid placements"))fail.push("destination page local-place non-paid disclosure missing");

if(/emrldtp\.com\/|Travelpayouts Drive/i.test(index))fail.push("Travelpayouts Drive bootstrap returned to public homepage");
const report={ok:fail.length===0,checkedAt:new Date(now).toISOString(),activePartners:[...partnerMap.values()].filter(x=>x.active).map(x=>x.p.id),affiliateOffers:offers.filter(x=>x?.affiliate).map(x=>({id:x.id,partnerId:x.partnerId||null,current:currentTravelOffer(x,{now})})),travelpayouts:tp?{relationshipActive:tp.relationshipActive===true,projectStatus:tp.projectStatus||null,availableProgramCountObserved:tp.availableProgramCountObserved??null,payoutMethodConfigured:tp.payoutMethodConfigured===true}:null,commercialOpportunityCount:(opportunities.opportunities||[]).length,driveAutomationPresent:/emrldtp\.com\//i.test(index),warn,fail,safety:{automaticPlacementAllowed:false,automaticLinkRewritingAllowed:false,paidRankingAllowed:false}};
console.log(JSON.stringify(report,null,2));
if(fail.length)process.exit(1);
