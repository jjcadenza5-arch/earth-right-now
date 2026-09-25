function providerKey(source={}){
  const provider=String(source.provider||"").trim();
  if(provider)return provider;
  for(const raw of [source.sourceUrl,source.officialUrl]){
    try{return new URL(raw).hostname.toLowerCase().replace(/^www\./,"")}catch{}
  }
  return "Unknown";
}

function currentEnough(source,now,maxAgeDays){
  const t=Date.parse(source.checkedAt||source.lastSuccessfulCheck||"");
  if(!Number.isFinite(t))return false;
  return now.getTime()-t<=maxAgeDays*864e5;
}

export function providerDiscoveryQueue(sources=[],providerFamilyReport=null,{now=new Date(),maxAgeDays=7,limit=8}={}){
  const researchedProviders=new Set((providerFamilyReport?.items||[]).map(x=>String(x.provider||"").trim()).filter(Boolean));
  const groups=new Map();

  for(const source of sources||[]){
    if(source.health!=="HEALTHY")continue;
    if(source.playback!=="EXTERNAL")continue;
    if(!["EXTERNAL_LIVE","LIVE_VIDEO","LIVE_IMAGE"].includes(source.truth))continue;
    if(!currentEnough(source,now,maxAgeDays))continue;
    const provider=providerKey(source);
    if(researchedProviders.has(provider))continue;
    const g=groups.get(provider)||{
      provider,
      sourceCount:0,
      liveVideoCount:0,
      liveImageCount:0,
      countries:new Set(),
      ids:[],
      sampleUrls:[]
    };
    g.sourceCount++;
    if(["EXTERNAL_LIVE","LIVE_VIDEO"].includes(source.truth))g.liveVideoCount++;
    if(source.truth==="LIVE_IMAGE")g.liveImageCount++;
    if(source.country)g.countries.add(source.country);
    g.ids.push(source.id);
    const url=source.officialUrl||source.sourceUrl;
    if(url&&g.sampleUrls.length<3&&!g.sampleUrls.includes(url))g.sampleUrls.push(url);
    groups.set(provider,g);
  }

  const items=[...groups.values()].map(g=>({
    provider:g.provider,
    sourceCount:g.sourceCount,
    liveVideoCount:g.liveVideoCount,
    liveImageCount:g.liveImageCount,
    countryCount:g.countries.size,
    ids:g.ids.sort(),
    sampleUrls:g.sampleUrls,
    researchOnly:true,
    permissionKnown:false,
    embedKnown:false,
    humanPlaybackKnown:false,
    nextAction:"RESEARCH_PROVIDER_TERMS_AND_BRANDED_EMBED_PATH",
    score:g.liveVideoCount*20+g.liveImageCount*8+Math.min(g.sourceCount,10)*4+Math.min(g.countries.size,5)*3
  })).sort((a,b)=>b.score-a.score||b.liveVideoCount-a.liveVideoCount||b.sourceCount-a.sourceCount||a.provider.localeCompare(b.provider)).slice(0,Math.max(0,limit));

  return{
    generatedAt:now.toISOString(),
    state:items.length?"DISCOVERY_READY":"NO_DISCOVERY_CANDIDATES",
    total:items.length,
    maxAgeDays,
    items,
    primary:items[0]||null,
    nextAction:items.length?"RESEARCH_PRIMARY_PROVIDER_TERMS":"EXPAND_CATALOG_RESEARCH",
    safety:{
      catalogMutationAllowed:false,
      embedPermissionInferred:false,
      playbackInferred:false,
      providerContactAllowed:false,
      humanReviewRequested:false
    },
    note:"Discovery ranking uses ERN's existing healthy/current external-live catalog only. It prioritizes research leverage, not provider quality, permission, embedability or visitor ranking."
  };
}
