import {validateOperatorReviewEvidence} from "./operator-review-evidence.js";

function hoursBetween(a,b){
  const x=Date.parse(a||""),y=Date.parse(b||"");
  return Number.isFinite(x)&&Number.isFinite(y)?Math.abs(x-y)/36e5:Infinity;
}
function availabilityById(report){
  return new Map((report?.results||[]).filter(x=>x?.id).map(x=>[String(x.id),x]));
}
function preflightById(report){
  return new Map((report?.rows||[]).filter(x=>x?.id).map(x=>[String(x.id),x]));
}

export function reviewEvidenceProposals(packet,{
  knownSourceIds=[],
  researchIds=[],
  availabilityReport=null,
  researchPreflight=null,
  maxEvidenceSeparationHours=24
}={}){
  const validated=validateOperatorReviewEvidence(packet,{knownSourceIds,researchIds});
  const availability=availabilityById(availabilityReport),preflight=preflightById(researchPreflight);
  const sourceProposals=[],researchProposals=[];

  for(const item of validated.sourceEvidence||[]){
    const a=availability.get(item.id)||null;
    const availabilityCurrent=Boolean(
      a &&
      a.outcome==="PAGE_REACHABLE" &&
      Number.isInteger(a.httpStatus) &&
      a.httpStatus>=200 && a.httpStatus<400 &&
      hoursBetween(item.observedAt,a.observedAt)<=maxEvidenceSeparationHours
    );

    if(item.outcome==="HUMAN_PLAYBACK_CONFIRMED"){
      sourceProposals.push(availabilityCurrent?{
        id:item.id,
        outcome:item.outcome,
        status:"READY_FOR_PROVIDER_OBSERVATION_PROPOSAL",
        reviewObservedAt:item.observedAt,
        availabilityObservedAt:a.observedAt,
        separationHours:Number(hoursBetween(item.observedAt,a.observedAt).toFixed(2)),
        availabilityOutcome:a.outcome,
        proposedObservation:{
          id:item.id,
          httpStatus:a.httpStatus,
          confirmation:"HUMAN_PLAYBACK",
          observedAt:item.observedAt,
          reason:"Human playback confirmed in deployed ERN review lab; independent provider-page availability evidence was also current."
        },
        proposedCatalogPlaybackMarker:{id:item.id,playbackVerifiedAt:item.observedAt},
        atomicProofUpdateRequired:true,
        automaticWriteAllowed:false
      }:{
        id:item.id,
        outcome:item.outcome,
        status:"NEEDS_FRESH_AVAILABILITY_EVIDENCE",
        reviewObservedAt:item.observedAt,
        availabilityObservedAt:a?.observedAt||null,
        availabilityOutcome:a?.outcome||null,
        proposedObservation:null,
        proposedCatalogPlaybackMarker:null,
        atomicProofUpdateRequired:false,
        automaticWriteAllowed:false
      });
      continue;
    }

    if(item.outcome==="PLAYBACK_FAILED"){
      sourceProposals.push({
        id:item.id,
        outcome:item.outcome,
        status:a?.outcome==="PAGE_MISSING"?"POSSIBLE_SOURCE_REMOVAL_REVIEW":"MANUAL_PLAYBACK_FAILURE_REVIEW",
        reviewObservedAt:item.observedAt,
        availabilityObservedAt:a?.observedAt||null,
        availabilityOutcome:a?.outcome||null,
        proposedObservation:null,
        proposedCatalogPlaybackMarker:null,
        atomicProofUpdateRequired:false,
        automaticWriteAllowed:false,
        note:"A human playback failure is not treated as a definitive provider/media removal automatically."
      });
      continue;
    }

    sourceProposals.push({
      id:item.id,
      outcome:item.outcome,
      status:"NO_AUTOMATIC_ACTION",
      reviewObservedAt:item.observedAt,
      availabilityObservedAt:a?.observedAt||null,
      availabilityOutcome:a?.outcome||null,
      proposedObservation:null,
      proposedCatalogPlaybackMarker:null,
      atomicProofUpdateRequired:false,
      automaticWriteAllowed:false
    });
  }

  for(const item of validated.researchEvidence||[]){
    const p=preflight.get(item.id)||null;
    if(item.outcome==="HUMAN_PLAYBACK_CONFIRMED"){
      researchProposals.push({
        id:item.id,
        outcome:item.outcome,
        status:p?.technicalReady?"READY_FOR_PERMISSION_AND_EDITORIAL_REVIEW":"NEEDS_TECHNICAL_PREFLIGHT",
        reviewObservedAt:item.observedAt,
        technicalReady:Boolean(p?.technicalReady),
        preflightOutcome:p?.outcome||null,
        catalogPromotionAllowed:false,
        automaticWriteAllowed:false,
        note:"Human playback plus technical readiness still does not confirm per-video/provider permission or editorial approval."
      });
      continue;
    }
    researchProposals.push({
      id:item.id,
      outcome:item.outcome,
      status:item.outcome==="PLAYBACK_FAILED"?"RESEARCH_PLAYBACK_FAILED":"NO_AUTOMATIC_ACTION",
      reviewObservedAt:item.observedAt,
      technicalReady:Boolean(p?.technicalReady),
      preflightOutcome:p?.outcome||null,
      catalogPromotionAllowed:false,
      automaticWriteAllowed:false
    });
  }

  return{
    schemaVersion:1,
    generatedAt:new Date().toISOString(),
    validation:{ok:validated.ok,summary:validated.summary||null,rejected:validated.rejected||[]},
    catalogMutationAllowed:false,
    automaticHealthChangeAllowed:false,
    automaticPermissionApprovalAllowed:false,
    playbackProofUpdateAtomicityRequired:true,
    sourceProposals,
    researchProposals,
    summary:{
      sourceReady:sourceProposals.filter(x=>x.status==="READY_FOR_PROVIDER_OBSERVATION_PROPOSAL").length,
      sourceNeedsAvailability:sourceProposals.filter(x=>x.status==="NEEDS_FRESH_AVAILABILITY_EVIDENCE").length,
      sourceFailureReview:sourceProposals.filter(x=>["MANUAL_PLAYBACK_FAILURE_REVIEW","POSSIBLE_SOURCE_REMOVAL_REVIEW"].includes(x.status)).length,
      researchReadyForReview:researchProposals.filter(x=>x.status==="READY_FOR_PERMISSION_AND_EDITORIAL_REVIEW").length,
      researchNeedsPreflight:researchProposals.filter(x=>x.status==="NEEDS_TECHNICAL_PREFLIGHT").length
    },
    note:"Proposal layer only. Confirmed source playback proposes the HUMAN_PLAYBACK observation and matching playbackVerifiedAt marker as one manual atomic proof update. Nothing is written automatically."
  };
}
