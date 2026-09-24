import { currentSource } from "./discovery-eligibility.js";
import { currentTravelOffer } from "./travel-offer-verification.js";

function placeKey(source){return String(source?.placeId||source?.id||"").trim()}
function scoreGroup(group){
  const quality=Math.max(...group.map(s=>Number(s.quality)||0),0);
  const moment=Math.max(...group.map(s=>Number(s.moment)||0),0);
  const freshness=Math.max(...group.map(s=>Number(s.freshness)||0),0);
  const healthyCurrent=group.filter(s=>s.health==="HEALTHY"&&currentSource(s)).length;
  return Number((quality+moment*.25+freshness*.15+Math.min(3,healthyCurrent)*4).toFixed(2));
}

export function commercialOnboardingPlan({sources=[],offers=[]}={}, {now=Date.now(),limit=12,maxPerCountry=2}={}){
  const currentOfferPlaces=new Set((offers||[]).filter(o=>currentTravelOffer(o,{now})).map(o=>String(o.placeId||"")));
  const groups=new Map();
  for(const source of sources||[]){
    const key=placeKey(source);
    if(!key||source.featuredHold===true||source.health!=="HEALTHY"||!currentSource(source))continue;
    if((Number(source.quality)||0)<80)continue;
    const group=groups.get(key)||[];
    group.push(source);groups.set(key,group);
  }

  const ranked=[...groups.entries()].map(([placeId,group])=>{
    const best=[...group].sort((a,b)=>(Number(b.quality)||0)-(Number(a.quality)||0)||(Number(b.moment)||0)-(Number(a.moment)||0)||String(a.id).localeCompare(String(b.id)))[0];
    const categories=[...new Set(group.flatMap(s=>s.categories||[]).map(String))].slice(0,8);
    return{
      placeId,
      title:best?.title||placeId,
      region:best?.region||null,
      country:best?.country||null,
      score:scoreGroup(group),
      currentWindows:group.length,
      bestQuality:Math.max(...group.map(s=>Number(s.quality)||0),0),
      bestMoment:Math.max(...group.map(s=>Number(s.moment)||0),0),
      categories,
      alreadyCovered:currentOfferPlaces.has(placeId),
      recommendedAction:currentOfferPlaces.has(placeId)?"MAINTAIN_VERIFIED_OFFER":"RESEARCH_REAL_TRAVEL_OPTIONS",
      rationale:"Strong current ERN content with no current verified travel offer. Editorial onboarding priority only."
    };
  }).filter(x=>!x.alreadyCovered).sort((a,b)=>b.score-a.score||b.bestQuality-a.bestQuality||a.placeId.localeCompare(b.placeId));

  const counts=new Map(),selected=[];
  for(const item of ranked){
    const country=item.country||"Unknown",n=counts.get(country)||0;
    if(n>=maxPerCountry)continue;
    selected.push(item);counts.set(country,n+1);
    if(selected.length>=limit)break;
  }

  return{
    generatedAt:new Date(now instanceof Date?now.getTime():Number(now)).toISOString(),
    candidatePlaces:ranked.length,
    selected:selected.length,
    maxPerCountry,
    items:selected,
    safety:{
      publicRankingAffected:false,
      demandForecast:false,
      revenueForecast:false,
      paidPriorityAllowed:false,
      inventOffersAllowed:false
    },
    note:"Private editorial onboarding plan only. Scores measure ERN content readiness, not visitor demand, conversion probability, revenue, or sponsor value."
  };
}
