import { recencyState } from "./source-recency.js";
import { providerObservationBatch } from "./provider-observation-batch.js";

function observationAgeHours(observedAt,now){
  const t=Date.parse(observedAt||""),n=now instanceof Date?now.getTime():Date.parse(now||"");
  return Number.isFinite(t)&&Number.isFinite(n)?Math.max(0,(n-t)/36e5):Infinity;
}
function evidenceFor(batch,id,now,maxAgeHours){
  const observation=batch.observations[id]||null;
  if(!observation)return{observation:null,current:false,human:false,media:false};
  const current=observationAgeHours(observation.observedAt,now)<=maxAgeHours;
  return{
    observation,
    current,
    human:current&&observation.httpOk===true&&observation.evidenceKind==="HUMAN_PLAYBACK",
    media:current&&observation.httpOk===true&&["HUMAN_PLAYBACK","MEDIA_ENDPOINT"].includes(observation.evidenceKind)
  };
}
export function insideERNRecoveryStatus(sources=[],entries=[],{now=new Date(),observationMaxAgeHours=24,limit=20}={}){
  const embeds=(sources||[]).filter(s=>s.playback==="EMBED");
  const batch=providerObservationBatch(entries,{observedAt:now instanceof Date?now.toISOString():now,knownSourceIds:(sources||[]).map(s=>s.id)});
  const ready=[],queue=[];
  for(const source of embeds){
    const evidence=evidenceFor(batch,source.id,now,observationMaxAgeHours);
    const recency=recencyState(source,{now});
    const permissionOk=source.permission==="EMBED_ALLOWED";
    if(source.health==="HEALTHY"&&permissionOk&&recency==="CURRENT_CHECK"&&evidence.human){
      ready.push({id:source.id,title:source.title,provider:source.provider||null,observedAt:evidence.observation?.observedAt||null});
      continue;
    }
    let priority=50,action="PROVE_VISITOR_PLAYBACK",reason="MISSING_CURRENT_HUMAN_PLAYBACK";
    if(!permissionOk){priority=120;action="REVIEW_EMBED_PERMISSION";reason="EMBED_PERMISSION_NOT_ALLOWED"}
    else if(source.health==="DEGRADED"){priority=110;action="REPROVE_VISITOR_PLAYBACK";reason="DEGRADED_EMBED"}
    else if(source.health==="OFFLINE"){priority=105;action="CONFIRM_RECOVERY_OR_REMOVE";reason="OFFLINE_EMBED"}
    else if(source.health!=="HEALTHY"){priority=100;action="VERIFY_SOURCE_HEALTH";reason="UNCONFIRMED_EMBED_HEALTH"}
    else if(recency!=="CURRENT_CHECK"){priority=90;action="REFRESH_SOURCE_AND_PLAYBACK";reason=recency}
    else if(evidence.media&&!evidence.human){priority=75;action="PROVE_VISITOR_PLAYBACK";reason="MEDIA_CONFIRMED_HUMAN_PLAYBACK_MISSING"}
    else if(evidence.observation&&!evidence.current){priority=70;action="REPROVE_VISITOR_PLAYBACK";reason="STALE_PLAYBACK_EVIDENCE"}
    queue.push({
      id:source.id,title:source.title,provider:source.provider||null,health:source.health,recency,
      action,reason,priority,observedAt:evidence.observation?.observedAt||null,
      lastSuccessfulCheck:source.lastSuccessfulCheck||source.checkedAt||null,
      sourceUrl:source.sourceUrl||null,embedUrl:source.embedUrl||null,
      requiredEvidence:action==="REVIEW_EMBED_PERMISSION"?["PERMISSION_REVIEW"]:["HUMAN_PLAYBACK"]
    });
  }
  queue.sort((a,b)=>b.priority-a.priority||(Date.parse(a.lastSuccessfulCheck||0)||0)-(Date.parse(b.lastSuccessfulCheck||0)||0)||a.id.localeCompare(b.id));
  return{
    generatedAt:now instanceof Date?now.toISOString():new Date(now).toISOString(),
    insideERN:embeds.length,
    ready:ready.length,
    recoveryDebt:queue.length,
    degraded:queue.filter(x=>x.reason==="DEGRADED_EMBED").length,
    staleSource:queue.filter(x=>["STALE_CHECK","EXPIRED_CHECK"].includes(x.reason)).length,
    missingHumanPlayback:queue.filter(x=>x.reason==="MISSING_CURRENT_HUMAN_PLAYBACK").length,
    stalePlaybackEvidence:queue.filter(x=>x.reason==="STALE_PLAYBACK_EVIDENCE").length,
    readySources:ready,
    next:queue.slice(0,limit),
    rejectedObservations:batch.rejected,
    note:"Recovery status is read-only. A source becomes ready only with healthy/current source state, EMBED_ALLOWED permission and current HUMAN_PLAYBACK evidence."
  };
}
