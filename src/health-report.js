import { checkResult,healthTransition } from "./health-transition.js";

function knownSourceIds(sources){
  return new Set((sources||[]).map(source=>String(source?.id||"")).filter(Boolean));
}
function observationTime(value){
  const raw=String(value||"").trim(),time=Date.parse(raw);
  return Number.isFinite(time)?time:null;
}
function validObservation(observation,{checkedAt,maxObservationAgeHours=24}={}){
  if(!observation||typeof observation!=="object")return{ok:false,reason:"MISSING_OBSERVATION"};
  const reportTime=Date.parse(checkedAt),observed=observationTime(observation.observedAt);
  if(observed===null)return{ok:false,reason:"MISSING_OBSERVATION_TIME"};
  if(observed>reportTime+5*60*1000)return{ok:false,reason:"FUTURE_OBSERVATION"};
  if(reportTime-observed>maxObservationAgeHours*3600000)return{ok:false,reason:"STALE_OBSERVATION"};
  return{ok:true,observedAt:new Date(observed).toISOString()};
}

export function healthCheckReport(sources,observations={},options={}){
  const checkedAt=options.checkedAt||new Date().toISOString(),proposals=[],unobserved=[],invalidObservations=[];
  const knownIds=knownSourceIds(sources);
  const unknownObservationIds=Object.keys(observations||{}).filter(id=>!knownIds.has(String(id))).sort();

  for(const source of sources||[]){
    const observation=observations?.[source.id];
    if(!observation){unobserved.push(source.id);continue}
    const integrity=validObservation(observation,{checkedAt,maxObservationAgeHours:options.maxObservationAgeHours??24});
    if(!integrity.ok){invalidObservations.push({id:source.id,reason:integrity.reason});continue}
    const result=checkResult(observation),next=healthTransition(source,result,{checkedAt});
    proposals.push({
      id:source.id,
      observedAt:integrity.observedAt,
      before:source.health,
      proposed:next.health,
      reason:result?.reason||next.failureReason||null,
      lastSuccessfulCheck:next.lastSuccessfulCheck||source.lastSuccessfulCheck||null,
      changed:next.health!==source.health,
      outcome:result?.inconclusive===true?"INCONCLUSIVE":result?.ok===true?"CONFIRMED_HEALTHY":result?.definitive===true?"DEFINITIVE_FAILURE":"FAILED_CHECK",
      next
    });
  }

  return{checkedAt,proposals,unobserved,invalidObservations,unknownObservationIds,changes:proposals.filter(x=>x.changed).length};
}

export function safeHealthPatch(report){
  return(report?.proposals||[]).map(({id,observedAt,before,proposed,reason,lastSuccessfulCheck})=>({id,observedAt,before,proposed,reason,lastSuccessfulCheck}));
}

export function healthReportAudit(report){
  const issues=[];
  if((report?.unknownObservationIds||[]).length)issues.push("UNKNOWN_OBSERVATION_IDS");
  if((report?.unobserved||[]).length)issues.push("UNOBSERVED_SOURCES");
  if((report?.invalidObservations||[]).length)issues.push("INVALID_OBSERVATIONS");
  return{ok:issues.length===0,issues,unknownObservationIds:[...(report?.unknownObservationIds||[])],unobserved:[...(report?.unobserved||[])],invalidObservations:[...(report?.invalidObservations||[])]};
}
