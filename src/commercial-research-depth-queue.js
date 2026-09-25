const INTENT_PRIORITY=["activities","tickets","transport","eat","stay","services"];
function placeKey(source){return String(source?.placeId||source?.id||"").trim()}
function scorePlace(group){
  const quality=Math.max(...group.map(x=>Number(x.quality)||0),0);
  const moment=Math.max(...group.map(x=>Number(x.moment)||0),0);
  const freshness=Math.max(...group.map(x=>Number(x.freshness)||0),0);
  return Number((quality+moment*.2+freshness*.1).toFixed(2));
}
export function commercialResearchDepthQueue({sources=[],researchStatus=null}={}, {limit=12,maxPerCountry=2,targetIntentDiversity=2}={}){
  const coverage=researchStatus?.byPlace||{};
  const groups=new Map();
  for(const source of sources||[]){
    const key=placeKey(source);
    if(!key||source.health!=="HEALTHY"||source.featuredHold===true||source.commercialDepthResearchHold===true||(Number(source.quality)||0)<80)continue;
    const group=groups.get(key)||[];group.push(source);groups.set(key,group);
  }
  const rows=[];
  for(const [placeId,cov] of Object.entries(coverage)){
    const group=groups.get(placeId);if(!group?.length)continue;
    const best=[...group].sort((a,b)=>(Number(b.quality)||0)-(Number(a.quality)||0)||String(a.id).localeCompare(String(b.id)))[0];
    const covered=INTENT_PRIORITY.filter(k=>(cov?.intents?.[k]||0)>0);
    if(covered.length>=targetIntentDiversity)continue;
    const missing=INTENT_PRIORITY.filter(k=>(cov?.intents?.[k]||0)===0);
    if(!missing.length)continue;
    rows.push({
      placeId,title:best.title||placeId,country:best.country||null,region:best.region||null,
      researchCount:Number(cov?.total)||0,
      coveredIntents:covered,
      missingIntents:missing,
      recommendedIntent:missing[0],
      score:scorePlace(group),
      recommendedAction:"RESEARCH_REAL_OPTION_FOR_MISSING_INTENT",
      publicActivationAllowed:false,
      affiliateRelationshipImplied:false,
      paidRankingAllowed:false
    });
  }
  rows.sort((a,b)=>b.score-a.score||a.placeId.localeCompare(b.placeId));
  const selected=[],countryCounts=new Map();
  for(const row of rows){
    const country=row.country||"Unknown",count=countryCounts.get(country)||0;
    if(count>=maxPerCountry)continue;
    selected.push(row);countryCounts.set(country,count+1);
    if(selected.length>=limit)break;
  }
  return{
    generatedAt:new Date().toISOString(),
    totalCoveredPlaces:Object.keys(coverage).length,
    depthCandidates:rows.length,
    selected:selected.length,
    maxPerCountry,
    targetIntentDiversity,
    items:selected,
    safety:{publicActivationAllowed:false,automaticAffiliateActivationAllowed:false,automaticContactAllowed:false,paidRankingAllowed:false,demandForecast:false,revenueForecast:false},
    note:"Private research-depth queue only. By default it stops once a place has two distinct researched travel intents, and sources explicitly placed on commercialDepthResearchHold are excluded until materially new evidence appears. This prevents endless category-filling or forced duplicate research. Deeper research should require an explicit later decision. It does not invent options, contact businesses, activate offers, imply affiliate relationships, or affect public ranking."
  };
}
