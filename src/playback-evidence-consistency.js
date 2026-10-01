function ageHours(iso,nowMs){const t=Date.parse(iso||"");return Number.isFinite(t)?Math.max(0,(nowMs-t)/36e5):Infinity}
function normalizeIso(iso){const t=Date.parse(iso||"");return Number.isFinite(t)?new Date(t).toISOString():null}
function latest(rows=[]){return [...rows].sort((a,b)=>Date.parse(b?.observedAt||0)-Date.parse(a?.observedAt||0))[0]||null}
export function playbackEvidenceConsistency(sources=[],observations=[],{now=new Date(),freshHours=24,toleranceMinutes=2}={}){
  const n=now instanceof Date?now.getTime():Number(now);
  const grouped=new Map();
  for(const obs of observations||[]){
    if(!obs?.id)continue;
    const id=String(obs.id);
    const rows=grouped.get(id)||[];
    rows.push(obs);
    grouped.set(id,rows);
  }
  const issues=[],rows=[];
  for(const source of sources||[]){
    const marker=normalizeIso(source?.playbackVerifiedAt);
    const history=grouped.get(String(source?.id||""))||[];
    const obs=latest(history);
    const humanObs=latest(history.filter(x=>x?.confirmation==="HUMAN_PLAYBACK"));
    const failedHumanObs=latest(history.filter(x=>x?.confirmation==="HUMAN_PLAYBACK_FAILED"));
    const human=Boolean(humanObs);
    const observedAt=normalizeIso(humanObs?.observedAt);
    const sourceFailureAt=normalizeIso(source?.lastFailedCheck);
    const playbackFailureAt=normalizeIso(failedHumanObs?.observedAt);
    const failureAt=[sourceFailureAt,playbackFailureAt].filter(Boolean).sort((a,b)=>Date.parse(b)-Date.parse(a))[0]||null;
    const humanSupersededByFailure=Boolean(human&&observedAt&&failureAt&&Date.parse(failureAt)>Date.parse(observedAt));
    const freshHuman=human&&!humanSupersededByFailure&&Number.isFinite(n)&&ageHours(observedAt,n)<=freshHours;
    if(marker&&source.playback!=="EMBED"){
      issues.push({id:source.id,code:"PLAYBACK_MARKER_ON_NON_EMBED",playback:source.playback,playbackVerifiedAt:marker});
    }
    if(!marker&&freshHuman&&source.playback==="EMBED"){
      issues.push({id:source.id,code:"FRESH_HUMAN_OBSERVATION_MISSING_CATALOG_MARKER",observedAt});
    }
    if(marker&&!human){
      issues.push({id:source.id,code:"CATALOG_MARKER_WITHOUT_HUMAN_OBSERVATION",playbackVerifiedAt:marker,observationKind:obs?.confirmation||null});
    }
    if(marker&&human&&observedAt){
      const separationMinutes=Math.abs(Date.parse(marker)-Date.parse(observedAt))/6e4;
      if(separationMinutes>toleranceMinutes)issues.push({id:source.id,code:"PLAYBACK_EVIDENCE_TIMESTAMP_MISMATCH",playbackVerifiedAt:marker,observedAt,separationMinutes:Number(separationMinutes.toFixed(1))});
    }
    if(marker||history.length||failureAt)rows.push({id:source.id,title:source.title,playback:source.playback,playbackVerifiedAt:marker,observationKind:humanObs?.confirmation||obs?.confirmation||null,latestObservationKind:obs?.confirmation||null,observedAt,failureAt,humanSupersededByFailure,freshHuman});
  }
  const known=new Set((sources||[]).map(x=>String(x.id)));
  for(const obs of observations||[])if(obs?.id&&obs?.scope!=="RESEARCH_GAP"&&!known.has(String(obs.id)))issues.push({id:String(obs.id),code:"UNKNOWN_SOURCE_OBSERVATION",observedAt:normalizeIso(obs.observedAt)});
  return{
    generatedAt:new Date(n).toISOString(),
    freshHours,toleranceMinutes,
    summary:{catalogMarkers:rows.filter(x=>x.playbackVerifiedAt).length,humanObservations:rows.filter(x=>x.observationKind==="HUMAN_PLAYBACK").length,freshHumanObservations:rows.filter(x=>x.freshHuman).length,issues:issues.length},
    consistent:issues.length===0,
    issues,
    rows,
    safety:{catalogMutationAllowed:false,automaticHealthChangeAllowed:false,automaticPlaybackVerificationAllowed:false},
    note:"Read-only consistency audit between catalog playbackVerifiedAt markers and the latest HUMAN_PLAYBACK observation per source. Later non-playback provider observations do not erase historical human playback evidence. A later recorded playback failure still supersedes an older success for freshness checks."
  };
}
