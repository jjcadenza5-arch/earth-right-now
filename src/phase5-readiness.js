export const PHASE5_MIN_PHASE4_OBSERVATION_HOURS=24;

export function assessPhase5Readiness({
  core={},
  phase4Observation={},
  participation={},
  media={},
  guide={},
  gates={},
  explicitHumanReviewApproved=false
}={}){
  const blockers=[];
  if(core?.conclusion!=="STABLE_BETA_READY")blockers.push("CORE_NOT_STABLE_BETA_READY");
  if(phase4Observation?.healthyNow!==true)blockers.push("PHASE4_PILOT_NOT_HEALTHY_NOW");
  if(phase4Observation?.observationWindowComplete!==true)blockers.push("PHASE4_MINIMUM_OBSERVATION_WINDOW_INCOMPLETE");
  if(participation?.phase4PilotActive!==true)blockers.push("EARTH_SIGNALS_LIMITED_PILOT_NOT_ACTIVE");
  if(participation?.workers?.submissions?.publicEnabled===true)blockers.push("SUBMISSION_PREMATURELY_PUBLIC");
  if(participation?.workers?.nowMomentMedia?.publicEnabled===true)blockers.push("NOW_MOMENT_MEDIA_PREMATURELY_PUBLIC");
  if(media?.publicActivationAllowed===true)blockers.push("NOW_MOMENT_MEDIA_ACTIVATION_NOT_SEPARATELY_REVIEWED");
  if(guide?.publicGenerativeActive===true)blockers.push("GENERATIVE_GUIDE_ACTIVATION_NOT_SEPARATELY_REVIEWED");

  const technicallyReviewEligible=blockers.length===0;
  const phase5EntryApproved=technicallyReviewEligible&&explicitHumanReviewApproved===true;
  return{
    technicallyReviewEligible,
    phase5EntryApproved,
    state:phase5EntryApproved
      ?"PHASE5_ENTRY_APPROVED"
      :technicallyReviewEligible
        ?"PHASE5_HUMAN_REVIEW_ELIGIBLE"
        :"PHASE4_OBSERVATION_CONTINUES",
    blockers,
    minimumPhase4ObservationHours:PHASE5_MIN_PHASE4_OBSERVATION_HOURS,
    automaticPhase5EntryAllowed:false,
    automaticPilot2ActivationAllowed:false,
    next:phase5EntryApproved
      ?"OPERATE_PHASE5_WITH_SEPARATE_FEATURE_GATES_OFF"
      :technicallyReviewEligible
        ?"HUMAN_REVIEW_BEFORE_PHASE5_ENTRY"
        :"CONTINUE_PHASE4_OBSERVATION"
  };
}
