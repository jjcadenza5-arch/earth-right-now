const CONFIRMATIONS=new Set(["PROVIDER_API","MEDIA_ENDPOINT","HUMAN_PLAYBACK"]);
const DEFINITIVE_FAILURES=new Set(["PROVIDER_NOT_FOUND","MEDIA_GONE","PROVIDER_REMOVED"]);

export function providerHealthObservation(input,{observedAt=new Date().toISOString()}={}){
 if(!input||typeof input!=="object")return null;
 const time=Date.parse(observedAt);
 if(!Number.isFinite(time))return null;
 const httpStatus=Number.isInteger(input.httpStatus)?input.httpStatus:null;
 const confirmation=CONFIRMATIONS.has(input.confirmation)?input.confirmation:null;
 const failure=DEFINITIVE_FAILURES.has(input.failure)?input.failure:null;
 const httpOk=httpStatus!==null&&httpStatus>=200&&httpStatus<400;
 const providerConfirmed=Boolean(httpOk&&confirmation);
 const definitiveFailure=Boolean(failure);
 return{
  observedAt:new Date(time).toISOString(),
  httpOk,
  providerConfirmed,
  definitiveFailure,
  evidenceKind:confirmation||failure||(httpStatus!==null?"HTTP_ONLY":"INCONCLUSIVE"),
  reason:definitiveFailure?String(input.reason||"Provider/media confirmed unavailable").trim():providerConfirmed?null:String(input.reason||"Current media not confirmed").trim()
 };
}

export function providerObservationCanConfirmHealthy(observation){
 return Boolean(observation?.httpOk===true&&observation?.providerConfirmed===true&&CONFIRMATIONS.has(observation?.evidenceKind));
}
