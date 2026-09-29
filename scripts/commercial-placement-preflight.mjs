import fs from "node:fs";
import {affiliatePartner,activeAffiliatePartner} from "../src/affiliate-partners.js";
import {currentTravelOffer} from "../src/travel-offer-verification.js";

const read=p=>JSON.parse(fs.readFileSync(p,"utf8"));
const partners=read("data/affiliate-partners.json"),offers=read("data/travel-offers.json"),platforms=read("data/affiliate-platform-research.json"),opportunities=read("data/commercial-link-opportunities.json"),index=fs.readFileSync("index.html","utf8");
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
if(opportunities.publicActivationAllowed!==false)fail.push("commercial opportunity queue must remain public-OFF");
if(opportunities.principles?.automaticPlacementAllowed!==false)fail.push("commercial opportunity queue automatic placement must remain disabled");
if(opportunities.principles?.automaticLinkRewritingAllowed!==false)fail.push("commercial opportunity queue automatic link rewriting must remain disabled");
if(opportunities.principles?.commissionMayNotAffectEditorialRanking!==true)fail.push("commercial queue must preserve editorial ranking independence");
for(const x of opportunities.opportunities||[]){
  if(!x?.id||!x?.destination||!x?.partnerCandidate||!x?.state)fail.push("invalid commercial opportunity record");
  if(x?.url||x?.trackedUrl||x?.public===true)fail.push("planning opportunity contains public/tracked placement data: "+String(x?.id||"unknown"));
}
if(/emrldtp\.com\/|Travelpayouts Drive/i.test(index))fail.push("Travelpayouts Drive bootstrap returned to public homepage");
const report={ok:fail.length===0,checkedAt:new Date(now).toISOString(),activePartners:[...partnerMap.values()].filter(x=>x.active).map(x=>x.p.id),affiliateOffers:offers.filter(x=>x?.affiliate).map(x=>({id:x.id,partnerId:x.partnerId||null,current:currentTravelOffer(x,{now})})),travelpayouts:tp?{relationshipActive:tp.relationshipActive===true,projectStatus:tp.projectStatus||null,availableProgramCountObserved:tp.availableProgramCountObserved??null,payoutMethodConfigured:tp.payoutMethodConfigured===true}:null,commercialOpportunityCount:(opportunities.opportunities||[]).length,driveAutomationPresent:/emrldtp\.com\//i.test(index),warn,fail,safety:{automaticPlacementAllowed:false,automaticLinkRewritingAllowed:false,paidRankingAllowed:false}};
console.log(JSON.stringify(report,null,2));
if(fail.length)process.exit(1);
