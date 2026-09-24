function ms(iso){const n=Date.parse(iso||"");return Number.isFinite(n)?n:null}
function latestObservationById(observations=[]){
  const map=new Map();
  for(const o of observations||[]){
    const id=String(o?.id||"");if(!id)continue;
    const t=ms(o?.observedAt);if(t===null)continue;
    const prev=map.get(id);if(!prev||t>prev.t)map.set(id,{t,value:o});
  }
  return map;
}
export function playbackProofApplicationPlan(proposals,{sources=[],observations=[]}={}){
  const sourceById=new Map((sources||[]).map(s=>[String(s.id),s]));
  const observationById=latestObservationById(observations);
  const items=[];
  for(const p of proposals?.sourceProposals||[]){
    if(p?.status!=="READY_FOR_PROVIDER_OBSERVATION_PROPOSAL")continue;
    const id=String(p.id||""),source=sourceById.get(id)||null,existingObservation=observationById.get(id)?.value||null;
    const proposedMarker=p?.proposedCatalogPlaybackMarker?.playbackVerifiedAt||null;
    const proposedObservation=p?.proposedObservation||null;
    const proposedMs=ms(proposedMarker),observationMs=ms(proposedObservation?.observedAt);
    const reasons=[];
    if(!source)reasons.push("SOURCE_NOT_FOUND");
    if(source&&source.playback!=="EMBED")reasons.push("SOURCE_NOT_EMBED");
    if(source&&source.permission!=="EMBED_ALLOWED")reasons.push("SOURCE_PERMISSION_NOT_EMBED_ALLOWED");
    if(source&&source.health!=="HEALTHY")reasons.push("SOURCE_NOT_HEALTHY");
    if(!proposedObservation||proposedObservation.confirmation!=="HUMAN_PLAYBACK")reasons.push("PROPOSED_HUMAN_OBSERVATION_MISSING");
    if(proposedMs===null||observationMs===null||proposedMs!==observationMs)reasons.push("PROPOSED_PROOF_TIMESTAMPS_NOT_ATOMIC");
    const currentMarkerMs=ms(source?.playbackVerifiedAt),currentObservationMs=ms(existingObservation?.observedAt);
    if(proposedMs!==null&&currentMarkerMs!==null&&currentMarkerMs>=proposedMs)reasons.push("CATALOG_MARKER_NOT_OLDER");
    if(observationMs!==null&&currentObservationMs!==null&&currentObservationMs>=observationMs)reasons.push("OBSERVATION_LEDGER_NOT_OLDER");
    const ready=reasons.length===0;
    items.push({
      id,ready,reasons,
      expectedCurrent:{
        playbackVerifiedAt:source?.playbackVerifiedAt||null,
        latestObservationObservedAt:existingObservation?.observedAt||null,
        latestObservationKind:existingObservation?.confirmation||existingObservation?.evidenceKind||null
      },
      proposedAtomicUpdate:ready?{
        catalog:{id,playbackVerifiedAt:proposedMarker},
        observation:proposedObservation
      }:null,
      preconditions:{
        playback:"EMBED",
        permission:"EMBED_ALLOWED",
        health:"HEALTHY",
        expectedPlaybackVerifiedAt:source?.playbackVerifiedAt||null,
        expectedLatestObservationObservedAt:existingObservation?.observedAt||null
      },
      automaticWriteAllowed:false
    });
  }
  return{
    schemaVersion:1,
    generatedAt:new Date().toISOString(),
    total:items.length,
    ready:items.filter(x=>x.ready).length,
    blocked:items.filter(x=>!x.ready).length,
    items,
    safety:{
      automaticWriteAllowed:false,
      partialProofUpdateAllowed:false,
      staleOverwriteAllowed:false,
      sourceTruthMutationBeyondPlaybackMarkerAllowed:false
    },
    note:"Manual application plan only. Apply catalog marker + HUMAN_PLAYBACK observation together after re-checking preconditions against current main; never apply one side alone or overwrite newer evidence."
  };
}
