function providerKey(source){
  for(const raw of [source?.embedUrl,source?.sourceUrl,source?.officialUrl]){
    try{if(raw)return new URL(raw).hostname.toLowerCase().replace(/^www\./,"")}catch{}
  }
  return String(source?.provider||"Unknown").trim()||"Unknown";
}
export function insideProviderResilience(sources=[],{targetFamilies=2,maxDominantShare=.8}={}){
  const embeds=(sources||[]).filter(s=>s.playback==="EMBED"&&s.permission==="EMBED_ALLOWED");
  const groups=new Map();
  for(const source of embeds){
    const key=providerKey(source),g=groups.get(key)||{provider:key,count:0,healthy:0,degraded:0,ids:[]};
    g.count++;if(source.health==="HEALTHY")g.healthy++;if(source.health==="DEGRADED")g.degraded++;g.ids.push(source.id);groups.set(key,g);
  }
  const providers=[...groups.values()].sort((a,b)=>b.count-a.count||a.provider.localeCompare(b.provider));
  const dominant=providers[0]||null,dominantShare=embeds.length&&dominant?dominant.count/embeds.length:0;
  const families=providers.length;
  const singleProvider=families<=1&&embeds.length>0;
  const concentrated=dominantShare>maxDominantShare&&embeds.length>0;
  return{
    insideEmbeds:embeds.length,
    providerFamilies:families,
    targetFamilies,
    dominantProvider:dominant?.provider||null,
    dominantProviderCount:dominant?.count||0,
    dominantProviderShare:Number(dominantShare.toFixed(3)),
    maxDominantShare,
    resilient:embeds.length>0&&families>=targetFamilies&&!concentrated,
    singleProvider,
    concentrated,
    shortfallFamilies:Math.max(0,targetFamilies-families),
    providers,
    nextGoal:singleProvider?"REVIEW_SECOND_EMBED_PROVIDER":concentrated?"REDUCE_PROVIDER_CONCENTRATION":"MAINTAIN_DIVERSITY",
    note:"This is an operational resilience signal only. A second provider must still pass source truth, permission and HUMAN_PLAYBACK review before visitor promotion."
  };
}
