function scheduledSlotForDate(date){const d=new Date(date);d.setUTCHours(0,37,0,0);return d}
function firstSlotAfter(activatedAt){
 const a=new Date(activatedAt);if(!Number.isFinite(a.getTime()))return null;
 let slot=scheduledSlotForDate(a);if(slot<=a){slot=new Date(slot.getTime()+86400000)}
 return slot;
}
function expectedScheduleDates(ledger,now,graceHours=2){
 const first=firstSlotAfter(ledger?.activatedAt);if(!first)return[];
 const cutoff=new Date(now.getTime()-Math.max(0,Number(graceHours)||0)*36e5);
 const dates=[];for(let d=first;d<=cutoff;d=new Date(d.getTime()+86400000))dates.push(d.toISOString().slice(0,10));
 return dates;
}
export function pilotObservationStatus(ledger,{now=new Date(),scheduleGraceHours=2}={}){
 const required=Math.max(2,Number(ledger?.requiredSuccessfulRenewalDates)||2);
 const allowed=new Set(Array.isArray(ledger?.allowedSourceIds)?ledger.allowedSourceIds:[]);
 const observations=Array.isArray(ledger?.observations)?ledger.observations:[];
 const valid=observations.filter(o=>o?.state==="RENEWED"&&o?.event==="schedule"&&/^\d{4}-\d{2}-\d{2}$/.test(String(o.utcDate||""))&&Array.isArray(o.items)&&o.items.length===allowed.size&&o.items.every(x=>allowed.has(x.id)&&Number.isFinite(Number(x.evidenceAgeMinutes))));
 const dates=[...new Set(valid.map(o=>o.utcDate))].sort();
 const expected=expectedScheduleDates(ledger,now,scheduleGraceHours);
 const successful=new Set(dates),missing=expected.filter(d=>!successful.has(d));
 const latest=valid.slice().sort((a,b)=>Date.parse(b.observedAt)-Date.parse(a.observedAt))[0]||null;
 const ageHours=latest?Math.max(0,(now.getTime()-Date.parse(latest.observedAt))/36e5):null;
 const enoughDates=dates.length>=required;
 const recent=ageHours!==null&&ageHours<=48;
 const renewalOverdue=missing.length>0;
 const expansionReady=enoughDates&&recent&&!renewalOverdue;
 const first=firstSlotAfter(ledger?.activatedAt);
 let nextExpected=first;
 if(nextExpected){while(nextExpected<=now)nextExpected=new Date(nextExpected.getTime()+86400000)}
 const state=renewalOverdue?"RENEWAL_OVERDUE":expansionReady?"OBSERVATION_REQUIREMENT_MET":"OBSERVING";
 return{
  state,
  requiredSuccessfulRenewalDates:required,
  successfulScheduledRenewalDates:dates.length,
  dates,
  expectedScheduledRenewalDates:expected,
  missingExpectedScheduledRenewalDates:missing,
  renewalOverdue,
  nextExpectedScheduledAt:nextExpected?.toISOString()||null,
  latestScheduledRenewalAt:latest?.observedAt||null,
  latestAgeHours:ageHours===null?null:Number(ageHours.toFixed(1)),
  expansionReady,
  nextAction:renewalOverdue?"CHECK_CURRENT_IMAGE_PILOT_RENEWAL_WORKFLOW_AND_KEEP_PILOT_FAIL_CLOSED":expansionReady?"EDITORIAL_REVIEW_BEFORE_ANY_PILOT_EXPANSION":"KEEP_TWO_SOURCE_PILOT_AND_WAIT_FOR_SCHEDULED_RENEWALS",
  safety:{automaticExpansionAllowed:false,allowedSourceIds:[...allowed]}
 };
}
