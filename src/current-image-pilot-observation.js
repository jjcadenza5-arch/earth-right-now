export function pilotObservationStatus(ledger,{now=new Date()}={}){
 const required=Math.max(2,Number(ledger?.requiredSuccessfulRenewalDates)||2);
 const allowed=new Set(Array.isArray(ledger?.allowedSourceIds)?ledger.allowedSourceIds:[]);
 const observations=Array.isArray(ledger?.observations)?ledger.observations:[];
 const valid=observations.filter(o=>o?.state==="RENEWED"&&o?.event==="schedule"&&/^\d{4}-\d{2}-\d{2}$/.test(String(o.utcDate||""))&&Array.isArray(o.items)&&o.items.length===allowed.size&&o.items.every(x=>allowed.has(x.id)&&Number.isFinite(Number(x.evidenceAgeMinutes))));
 const dates=[...new Set(valid.map(o=>o.utcDate))].sort();
 const latest=valid.slice().sort((a,b)=>Date.parse(b.observedAt)-Date.parse(a.observedAt))[0]||null;
 const ageHours=latest?Math.max(0,(now.getTime()-Date.parse(latest.observedAt))/36e5):null;
 const enoughDates=dates.length>=required;
 const recent=ageHours!==null&&ageHours<=48;
 const expansionReady=enoughDates&&recent;
 return{
  state:expansionReady?"OBSERVATION_REQUIREMENT_MET":"OBSERVING",
  requiredSuccessfulRenewalDates:required,
  successfulScheduledRenewalDates:dates.length,
  dates,
  latestScheduledRenewalAt:latest?.observedAt||null,
  latestAgeHours:ageHours===null?null:Number(ageHours.toFixed(1)),
  expansionReady,
  nextAction:expansionReady?"EDITORIAL_REVIEW_BEFORE_ANY_PILOT_EXPANSION":"KEEP_TWO_SOURCE_PILOT_AND_WAIT_FOR_SCHEDULED_RENEWALS",
  safety:{automaticExpansionAllowed:false,allowedSourceIds:[...allowed]}
 };
}
