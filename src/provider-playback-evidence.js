import { providerObservationBatch } from "./provider-observation-batch.js";

function representativeSources(rows=[]){
  const degraded=rows.filter(x=>x.health==="DEGRADED");
  const healthy=rows.filter(x=>x.health==="HEALTHY").sort((a,b)=>(b.quality||0)-(a.quality||0));
  return [...degraded,...healthy.slice(0,Math.max(1,2-degraded.length))]
    .filter((x,i,a)=>a.findIndex(y=>y.id===x.id)===i);
}

export function providerPlaybackEvidenceStatus(sources=[],entries=[]){
  const embeds=sources.filter(x=>x.playback==="EMBED"&&x.permission==="EMBED_ALLOWED");
  const batch=providerObservationBatch(entries,{knownSourceIds:sources.map(x=>x.id)});
  const groups=new Map();
  for(const source of embeds){
    const provider=String(source.provider||"Unknown").trim()||"Unknown";
    if(!groups.has(provider))groups.set(provider,[]);
    groups.get(provider).push(source);
  }
  const providers=[...groups.entries()].map(([provider,rows])=>{
    const representatives=representativeSources(rows);
    const checks=representatives.map(source=>{
      const observation=batch.observations[source.id]||null;
      const humanPlayback=observation?.httpOk===true&&observation?.evidenceKind==="HUMAN_PLAYBACK";
      const mediaConfirmed=observation?.httpOk===true&&["HUMAN_PLAYBACK","MEDIA_ENDPOINT"].includes(observation?.evidenceKind);
      return {
        id:source.id,
        title:source.title,
        health:source.health,
        humanPlayback,
        mediaConfirmed,
        observedAt:observation?.observedAt||null,
        evidenceKind:observation?.evidenceKind||null,
        command:`npm run provider:record -- ${source.id} 200 HUMAN_PLAYBACK "" "<browser + deployed-origin playback note>"`
      };
    });
    const missingHumanPlayback=checks.filter(x=>!x.humanPlayback);
    const mandatoryDegraded=checks.filter(x=>x.health==="DEGRADED");
    return {
      provider,
      insideERN:rows.length,
      representatives:checks,
      verifiedHumanPlayback:checks.length-missingHumanPlayback.length,
      missingHumanPlayback:missingHumanPlayback.map(x=>x.id),
      degradedRepresentatives:mandatoryDegraded.map(x=>x.id),
      ready:missingHumanPlayback.length===0
    };
  }).sort((a,b)=>a.provider.localeCompare(b.provider));
  const missing=providers.flatMap(x=>x.representatives.filter(y=>!y.humanPlayback).map(y=>({provider:x.provider,...y})));
  return {
    insideERN:embeds.length,
    providerFamilies:providers.length,
    providerFamiliesReady:providers.filter(x=>x.ready).length,
    representativeChecks:providers.reduce((n,x)=>n+x.representatives.length,0),
    representativeHumanPlayback:providers.reduce((n,x)=>n+x.verifiedHumanPlayback,0),
    ready:providers.length>0&&missing.length===0&&batch.rejected.length===0,
    providers,
    missing,
    rejectedObservations:batch.rejected,
    note:"HTTP reachability and provider-page metadata are not playback proof. Ready requires HUMAN_PLAYBACK for every representative source, including every degraded inside-ERN source."
  };
}
