const adverse=new Set(["PAGE_MISSING","TEMPORARY_ERROR","TIMEOUT","NETWORK_ERROR"]);
export function compareAvailabilityContinuity(previous,current){
  const prevById=new Map((previous?.results||[]).map(x=>[x.id,x]));
  const rows=[];
  for(const now of current?.results||[]){
    const prev=prevById.get(now.id)||null;
    let state="STABLE_OR_NEW";
    let severity="INFO";
    let action="NONE";
    if(now.outcome==="PAGE_REACHABLE"){
      if(prev&&prev.outcome!=="PAGE_REACHABLE"){
        state="RECOVERED_PAGE";
        severity="INFO";
        action="NONE";
      }
    }else if(now.outcome==="ACCESS_BLOCKED"){
      if(prev?.outcome==="ACCESS_BLOCKED"){
        state="REPEATED_ACCESS_LIMITATION";
        severity="NOTICE";
        action="REVIEW_HOST_ACCESS_PATTERN";
      }else{
        state="NEW_ACCESS_LIMITATION";
        severity="INFO";
        action="NONE";
      }
    }else if(now.outcome==="PAGE_MISSING"){
      if(prev?.outcome==="PAGE_MISSING"){
        state="PERSISTENT_MISSING_REVIEW";
        severity="REVIEW";
        action="MANUAL_SOURCE_REVIEW";
      }else{
        state="NEW_MISSING_OBSERVATION";
        severity="NOTICE";
        action="WAIT_FOR_REPEAT_OR_MANUAL_CHECK";
      }
    }else if(adverse.has(now.outcome)){
      if(prev&&adverse.has(prev.outcome)&&prev.outcome!=="PAGE_MISSING"){
        state="REPEATED_TRANSIENT_REVIEW";
        severity="NOTICE";
        action="RECHECK_PROVIDER_OR_NETWORK";
      }else{
        state="NEW_TRANSIENT_OBSERVATION";
        severity="INFO";
        action="NONE";
      }
    }else{
      state="INCONCLUSIVE";
      severity="INFO";
      action="NONE";
    }
    rows.push({
      id:now.id,
      previousOutcome:prev?.outcome||null,
      currentOutcome:now.outcome,
      state,severity,action,
      observedAt:now.observedAt||current?.generatedAt||null,
      previousObservedAt:prev?.observedAt||previous?.generatedAt||null,
      catalogMutationAllowed:false,
      automaticHealthChangeAllowed:false
    });
  }
  const incidents=rows.filter(x=>["REVIEW","NOTICE"].includes(x.severity));
  return{
    generatedAt:current?.generatedAt||new Date().toISOString(),
    previousGeneratedAt:previous?.generatedAt||null,
    currentGeneratedAt:current?.generatedAt||null,
    summary:{
      sampled:rows.length,
      recovered:rows.filter(x=>x.state==="RECOVERED_PAGE").length,
      persistentMissing:rows.filter(x=>x.state==="PERSISTENT_MISSING_REVIEW").length,
      repeatedTransient:rows.filter(x=>x.state==="REPEATED_TRANSIENT_REVIEW").length,
      repeatedAccessLimitation:rows.filter(x=>x.state==="REPEATED_ACCESS_LIMITATION").length,
      newMissing:rows.filter(x=>x.state==="NEW_MISSING_OBSERVATION").length
    },
    incidents,
    rows,
    note:"Continuity evidence is read-only. Repeated missing pages create manual review incidents only; no source health or truth changes occur automatically."
  };
}
