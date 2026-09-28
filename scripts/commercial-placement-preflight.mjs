import fs from "node:fs";
import {affiliatePartner,activeAffiliatePartner} from "../src/affiliate-partners.js";
import {currentTravelOffer} from "../src/travel-offer-verification.js";

const read=p=>JSON.parse(fs.readFileSync(p,"utf8"));
const partners=read("data/affiliate-partners.json"),offers=read("data/travel-offers.json"),platforms=read("data/affiliate-platform-research.json"),index=fs.readFileSync("index.html","utf8");
const now=Date.now(),fail=[],partnerMap=new Map();
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
if(tp){
  if(tp.driveAutomationAllowed!==false)fail.push("Travelpayouts Drive automation must remain disabled");
  if(tp.manualToolsOnly!==true)fail.push("Travelpayouts relationship must remain manual-tools-only");
}
if(/emrldtp\.com\/|Travelpayouts Drive/i.test(index))fail.push("Travelpayouts Drive bootstrap returned to public homepage");
const report={ok:fail.length===0,checkedAt:new Date(now).toISOString(),activePartners:[...partnerMap.values()].filter(x=>x.active).map(x=>x.p.id),affiliateOffers:offers.filter(x=>x?.affiliate).map(x=>({id:x.id,partnerId:x.partnerId||null,current:currentTravelOffer(x,{now})})),driveAutomationPresent:/emrldtp\.com\//i.test(index),fail,safety:{automaticPlacementAllowed:false,automaticLinkRewritingAllowed:false,paidRankingAllowed:false}};
console.log(JSON.stringify(report,null,2));
if(fail.length)process.exit(1);
