export function ageHours(iso,now=Date.now(),futureSkewMinutes=5){if(!iso)return Infinity;const t=Date.parse(iso),n=now instanceof Date?now.getTime():Number(now);if(!Number.isFinite(t)||!Number.isFinite(n))return Infinity;const delta=n-t;if(delta < -Math.max(0,Number(futureSkewMinutes)||0)*60000)return Infinity;return Math.max(0,delta/36e5)}
function clockMinutes(value){const [h,m]=String(value||"").split(":").map(Number);return Number.isFinite(h)&&Number.isFinite(m)?h*60+m:null}
function localClock(now,timeZone){try{const d=now instanceof Date?now:new Date(Number(now));const parts=new Intl.DateTimeFormat("en-US",{timeZone,hour:"2-digit",minute:"2-digit",hourCycle:"h23",weekday:"short"}).formatToParts(d);const get=t=>parts.find(x=>x.type===t)?.value;return{minutes:Number(get("hour"))*60+Number(get("minute")),weekday:get("weekday")||null}}catch{return null}}
export function sourceAvailabilityState(source,{now=Date.now()}={}){
 const schedule=source?.availabilitySchedule;
 if(!schedule)return{restricted:false,open:true,reason:null};
 const start=clockMinutes(schedule.start),end=clockMinutes(schedule.end),local=localClock(now,schedule.timeZone||source?.timeZone);
 if(start===null||end===null||!local)return{restricted:true,open:false,reason:"INVALID_AVAILABILITY_SCHEDULE"};
 if(Array.isArray(schedule.weekdays)&&schedule.weekdays.length&&!schedule.weekdays.includes(local.weekday))return{restricted:true,open:false,reason:"OUTSIDE_PUBLISHED_LIVE_WINDOW",localMinutes:local.minutes,weekday:local.weekday};
 const open=end>start?local.minutes>=start&&local.minutes<end:local.minutes>=start||local.minutes<end;
 return{restricted:true,open,reason:open?null:"OUTSIDE_PUBLISHED_LIVE_WINDOW",localMinutes:local.minutes,weekday:local.weekday,timeZone:schedule.timeZone||source?.timeZone,start:schedule.start,end:schedule.end};
}
export function sourceAvailableNow(source,options={}){return sourceAvailabilityState(source,options).open}
export function verificationWindowHours(source,{insideHours=168,externalLiveHours=168,externalPageHours=336,imageHours=72}={}){if(source?.truth==="LIVE_IMAGE"||source?.playback==="IMAGE_REFRESH")return imageHours;if(source?.playback==="EMBED")return insideHours;if(source?.truth==="EXTERNAL_LIVE"||source?.truth==="PARTNER")return externalLiveHours;return externalPageHours}
export function recencyState(source,{now=Date.now(),...opts}={}){const age=ageHours(source.lastSuccessfulCheck||source.checkedAt,now),max=verificationWindowHours(source,opts);if(!Number.isFinite(age))return"UNKNOWN";if(age<=max)return"CURRENT_CHECK";if(age<=max*3)return"STALE_CHECK";return"EXPIRED_CHECK"}
export function requiresRecheck(source,opts){return recencyState(source,opts)!=="CURRENT_CHECK"}
export function verificationLabel(source,opts){const state=recencyState(source,opts);return state==="CURRENT_CHECK"?"Recently verified":state==="STALE_CHECK"?"Recheck due":state==="EXPIRED_CHECK"?"Verification expired":"Not yet verified"}
