import { checkResult,healthTransition } from "./health-transition.js";

function knownSourceIds(sources){
  return new Set((sources||[]).map(source=>String(source?.id||"")).filter(Boolean));
}

export function healthCheckReport(sources,observations={},options={}){
  const checkedAt=options.checkedAt||new Date().toISOString(),proposals=[],unobserved=[];
  const knownIds=knownSourceIds(sources);
  const unknownObservationIds=Object.keys(observations||{}).filter(id=>!knownIds.has(String(id))).sort();

  for(const source of sources||[]){
    const observation=observations?.[source.id];
    if(!observation){unobserved.push(source.id);continue}
    const result=checkResult(observation),next=healthTransition(source,result,{checkedAt});
    proposals.push({
      id:source.id,
      before:source.health,
      proposed:next.health,
      reason:next.failureReason||null,
      lastSuccessfulCheck:next.lastSuccessfulCheck||source.lastSuccessfulCheck||null,
      changed:next.health!==source.health,
      next
    });
  }

  return{
    checkedAt,
    proposals,
    unobserved,
    unknownObservationIds,
    changes:proposals.filter(x=>x.changed).length
  };
}

export function safeHealthPatch(report){
  return(report?.proposals||[]).map(({id,before,proposed,reason,lastSuccessfulCheck})=>({id,before,proposed,reason,lastSuccessfulCheck}));
}

export function healthReportAudit(report){
  const issues=[];
  if((report?.unknownObservationIds||[]).length)issues.push("UNKNOWN_OBSERVATION_IDS");
  if((report?.unobserved||[]).length)issues.push("UNOBSERVED_SOURCES");
  return{
    ok:issues.length===0,
    issues,
    unknownObservationIds:[...(report?.unknownObservationIds||[])],
    unobserved:[...(report?.unobserved||[])]
  };
}
