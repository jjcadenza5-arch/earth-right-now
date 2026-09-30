export function assessEarthSignalLiveHealth(payload={}, {pilotActive=false}={}){
  const issues=[];
  const state=payload?.state&&typeof payload.state==="object"?payload.state:{};
  const limits=state?.limits&&typeof state.limits==="object"?state.limits:{};
  if(payload?.ok!==true)issues.push("HEALTH_NOT_OK");
  if(payload?.durableStorage!==true)issues.push("DURABLE_STORAGE_NOT_READY");
  if(payload?.rateSubjectSecretConfigured!==true)issues.push("RATE_SUBJECT_SECRET_NOT_CONFIGURED");
  if(payload?.reviewTokenConfigured!==true)issues.push("REVIEW_TOKEN_NOT_CONFIGURED");
  if(payload?.rawNetworkIdentifiersStored!==false)issues.push("RAW_NETWORK_IDENTIFIER_POLICY_VIOLATION");
  if(payload?.secretValuesExposed!==false)issues.push("SECRET_EXPOSURE_POLICY_VIOLATION");
  if(state?.ok!==true)issues.push("DURABLE_STATE_NOT_OK");
  if(pilotActive&&payload?.contributionsEnabled!==true)issues.push("PILOT_RUNTIME_NOT_ENABLED");
  if(!pilotActive&&payload?.contributionsEnabled===true)issues.push("UNEXPECTED_RUNTIME_ENABLEMENT");

  const signals=Number(state?.signals);
  const reports=Number(state?.reports);
  const maxActiveSignals=Number(limits?.maxActiveSignals);
  const maxRetainedReports=Number(limits?.maxRetainedReports);
  if(!Number.isFinite(signals)||signals<0)issues.push("INVALID_SIGNAL_COUNT");
  if(!Number.isFinite(reports)||reports<0)issues.push("INVALID_REPORT_COUNT");
  if(Number.isFinite(signals)&&Number.isFinite(maxActiveSignals)&&signals>maxActiveSignals)issues.push("SIGNAL_CAP_EXCEEDED");
  if(Number.isFinite(reports)&&Number.isFinite(maxRetainedReports)&&reports>maxRetainedReports)issues.push("REPORT_CAP_EXCEEDED");

  return{
    healthy:issues.length===0,
    pilotActive:Boolean(pilotActive),
    contributionsEnabled:payload?.contributionsEnabled===true,
    issues,
    metrics:{
      signals:Number.isFinite(signals)?signals:null,
      reports:Number.isFinite(reports)?reports:null,
      maxActiveSignals:Number.isFinite(maxActiveSignals)?maxActiveSignals:null,
      maxRetainedReports:Number.isFinite(maxRetainedReports)?maxRetainedReports:null
    },
    privacy:{
      rawNetworkIdentifiersStored:payload?.rawNetworkIdentifiersStored===true,
      secretValuesExposed:payload?.secretValuesExposed===true
    }
  };
}
