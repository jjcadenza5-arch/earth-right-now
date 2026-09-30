export const PHASE4_EARTH_SIGNALS_MIN_OBSERVATION_HOURS=24;

export function assessPhase4EarthSignalsObservation({
  pilot={},
  deployment={},
  liveHealth={},
  now=new Date()
}={}){
  const issues=[];
  const activatedAt=Date.parse(pilot?.publicActivatedAt||"");
  const nowMs=now instanceof Date?now.getTime():Date.parse(now);
  const elapsedHours=Number.isFinite(activatedAt)&&Number.isFinite(nowMs)?Math.max(0,(nowMs-activatedAt)/3600000):null;
  const active=pilot?.state==="PUBLIC_PILOT_ACTIVE"&&pilot?.publicManifestActivationAllowed===true&&deployment?.publicActivationAllowed===true;
  if(!active)issues.push("PILOT_NOT_ACTIVE");
  if(deployment?.liveHealthVerified!==true)issues.push("ACTIVATION_HEALTH_NOT_VERIFIED");
  if(liveHealth?.healthy!==true)issues.push("CURRENT_LIVE_HEALTH_NOT_GREEN");
  if(liveHealth?.pilotActive!==true)issues.push("LIVE_OBSERVER_DOES_NOT_SEE_ACTIVE_PILOT");
  if(liveHealth?.contributionsEnabled!==true)issues.push("RUNTIME_CONTRIBUTIONS_NOT_ENABLED");
  if(liveHealth?.privacy?.rawNetworkIdentifiersStored===true)issues.push("RAW_NETWORK_IDENTIFIER_POLICY_VIOLATION");
  if(liveHealth?.privacy?.secretValuesExposed===true)issues.push("SECRET_EXPOSURE_POLICY_VIOLATION");
  const observationWindowComplete=Number.isFinite(elapsedHours)&&elapsedHours>=PHASE4_EARTH_SIGNALS_MIN_OBSERVATION_HOURS;
  const healthyNow=issues.length===0;
  return{
    healthyNow,
    observationWindowComplete,
    reviewEligible:healthyNow&&observationWindowComplete,
    state:!healthyNow?"HOLD_AND_REVIEW_HEALTH":observationWindowComplete?"OBSERVATION_WINDOW_COMPLETE_REVIEW_ELIGIBLE":"EARLY_OBSERVATION",
    elapsedHours:elapsedHours==null?null:Math.round(elapsedHours*10)/10,
    minimumObservationHours:PHASE4_EARTH_SIGNALS_MIN_OBSERVATION_HOURS,
    issues,
    automaticExpansionAllowed:false,
    next:!healthyNow?"REVIEW_OR_ROLL_BACK_IF_HEALTH_DEGRADES":observationWindowComplete?"HUMAN_REVIEW_BEFORE_ANY_PILOT_2":"CONTINUE_OBSERVING_PILOT_1"
  };
}
