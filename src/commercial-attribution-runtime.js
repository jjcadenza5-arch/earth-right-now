import {events} from "./telemetry.js";
import {activeAffiliatePartner,affiliatePartner} from "./affiliate-partners.js";
import {currentTravelOffer} from "./travel-offer-verification.js";

let offersPromise=null,partnersPromise=null,sourcesPromise=null;
async function json(path){return fetch(path,{cache:"no-store"}).then(r=>r.ok?r.json():[]).catch(()=>[])}
async function offers(){if(!offersPromise)offersPromise=json("./data/travel-offers.json");const list=await offersPromise;return Array.isArray(list)?list:[]}
async function partners(){if(!partnersPromise)partnersPromise=json("./data/affiliate-partners.json");const list=await partnersPromise;return Array.isArray(list)?list:[]}
async function sources(){if(!sourcesPromise)sourcesPromise=Promise.all([json("./data/sources.json"),json("./data/search-supplemental.json")]).then(([core,supplemental])=>[...(Array.isArray(core)?core:[]),...(Array.isArray(supplemental)?supplemental:[])]);return sourcesPromise}
function sourceEligible(source){return Boolean(source)&&source.health==="HEALTHY"&&["LIVE_VIDEO","LIVE_IMAGE","EXTERNAL_LIVE"].includes(source.truth)}
function currentPartner(raw){const parsed=affiliatePartner(raw);return Boolean(parsed&&activeAffiliatePartner(parsed,{now:Date.now()}))}
async function attributable(offer){
  if(!currentTravelOffer(offer,{now:Date.now()}))return false;
  const [partnerList,sourceList]=await Promise.all([partners(),sources()]);
  const partner=partnerList.find(x=>String(x?.id||"")===String(offer?.partnerId||""));
  if(!currentPartner(partner))return false;
  const source=sourceList.find(x=>String(x?.placeId||x?.id||"")===String(offer?.placeId||""));
  return sourceEligible(source);
}
document.addEventListener("click",async event=>{
  const link=event.target?.closest?.("a[data-offer-id]");
  if(!link)return;
  const id=String(link.dataset.offerId||"");
  if(!id)return;
  const offer=(await offers()).find(x=>String(x?.id||"")===id);
  if(!offer||!(await attributable(offer)))return;
  events.travelOption(offer);
},{capture:true});
