export const EARTH_SIGNAL_PRIVACY_REQUIREMENTS=Object.freeze([
 "purpose","signalTypes","retention","locationOptional","publicLocationScope","mediaMetadata","reporting","deletion"
]);
export function earthSignalPrivacyReadiness(notice={}){
 const checks={
  purpose:Boolean(notice.purpose),
  signalTypes:Boolean(notice.signalTypes),
  retention:notice.retentionMinutes===45,
  locationOptional:notice.locationOptional===true,
  publicLocationScope:notice.publicLocationScope==="PLACE_ONLY",
  mediaMetadata:notice.mediaMetadataStripped===true,
  reporting:Boolean(notice.reporting),
  deletion:Boolean(notice.deletion)
 };
 const missing=EARTH_SIGNAL_PRIVACY_REQUIREMENTS.filter(k=>!checks[k]);
 return{ready:missing.length===0,checks,missing};
}
