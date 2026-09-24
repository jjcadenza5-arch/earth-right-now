function ageHours(iso,nowMs){const t=Date.parse(iso||"");return Number.isFinite(t)?Math.max(0,(nowMs-t)/36e5):Infinity}
function normalizeIso(iso){const t=Date.parse(iso||"");return Number.isFinite(t)?new Date(t).toISOString():null}
export function playbackEvidenceConsistency(sources=[],observations=[],{now=new Date(),freshHours=24,toleranceMinutes=2}={}){
  const n=now instanceof Date?now.getTime():Number(now);
  const byId=new Map((observations||[]).filter(x=>x?.id).map(x=>[String(x.id),x]));
  const issues=[],rows=[];
  for(const source of sources||[]){
    const marker=normalizeIso(source?.playbackVerifiedAt);
    const obs=byId.get(String(source?.id||""))||null;
    const human=obs?.confirmation==="HUMAN_PLAYBACK";
    const observedAt=normalizeIso(obs?.observedAt);
    const freshHuman=human&&Number.isFinite(n)&&ageHours(observedAt,n)<=freshHours;
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
    if(marker||obs)rows.push({id:source.id,title:source.title,playback:source.playback,playbackVerifiedAt:marker,observationKind:obs?.confirmation||null,observedAt,freshHuman});
  }
  const known=new Set((sources||[]).map(x=>String(x.id)));
  for(const obs of observations||[])if(obs?.id&&!known.has(String(obs.id)))issues.push({id:String(obs.id),code:"UNKNOWN_SOURCE_OBSERVATION",observedAt:normalizeIso(obs.observedAt)});
  return{
    generatedAt:new Date(n).toISOString(),
    freshHours,toleranceMinutes,
    summary:{catalogMarkers:rows.filter(x=>x.playbackVerifiedAt).length,humanObservations:rows.filter(x=>x.observationKind==="HUMAN_PLAYBACK").length,freshHumanObservations:rows.filter(x=>x.freshHuman).length,issues:issues.length},
    consistent:issues.length===0,
    issues,
    rows,
    safety:{catalogMutationAllowed:false,automaticHealthChangeAllowed:false,automaticPlaybackVerificationAllowed:false},
    note:"Read-only consistency audit between catalog playbackVerifiedAt markers and HUMAN_PLAYBACK observations. It detects drift but never creates or refreshes playback proof."
  };
}
