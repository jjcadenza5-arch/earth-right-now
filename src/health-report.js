import { checkResult,healthTransition } from "./health-transition.js";
export function healthCheckReport(sources,observations={},options={}){
  const checkedAt=options.checkedAt||new Date().toISOString(),proposals=[],unobserved=[];
  for(const source of sources||[]){
    const observation=observations[source.id];
    if(!observation){unobserved.push(source.id);continue}
    const result=checkResult(observation),next=healthTransition(source,result,{checkedAt});
    proposals.push({id:source.id,before:source.health,proposed:next.health,reason:next.failureReason||null,lastSuccessfulCheck:next.lastSuccessfulCheck||source.lastSuccessfulCheck||null,changed:next.health!==source.health,next});
  }
  return{checkedAt,proposals,unobserved,changes:proposals.filter(x=>x.changed).length}
}
export function safeHealthPatch(report){
  return(report?.proposals||[]).map(({id,before,proposed,reason,lastSuccessfulCheck})=>({id,before,proposed,reason,lastSuccessfulCheck}));
}
