export function recencyProviderDebt(items=[]){
  const groups=new Map();
  for(const item of items||[]){
    const provider=String(item?.provider||"Unknown").trim()||"Unknown";
    const g=groups.get(provider)||{provider,total:0,embed:0,external:0,healthy:0,degraded:0,ids:[]};
    g.total++;
    if(item?.playback==="EMBED")g.embed++;
    if(item?.playback==="EXTERNAL")g.external++;
    if(item?.health==="HEALTHY")g.healthy++;
    if(item?.health==="DEGRADED")g.degraded++;
    if(item?.id)g.ids.push(item.id);
    groups.set(provider,g);
  }
  const total=(items||[]).length;
  const providers=[...groups.values()].map(g=>({
    ...g,
    ids:g.ids.sort(),
    share:total?Number((g.total/total).toFixed(3)):0
  })).sort((a,b)=>b.total-a.total||a.provider.localeCompare(b.provider));
  const primary=providers[0]||null;
  return{
    total,
    providerCount:providers.length,
    concentrated:Boolean(primary&&total>=4&&primary.share>=0.5),
    primary,
    providers,
    note:"Maintenance concentration only. Provider debt may steer resilience/replacement research, but it does not lower source quality, permission or playback-proof requirements."
  };
}
