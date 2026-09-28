export const NOW_MOMENT_PHOTO_CAPABILITIES=Object.freeze({
  transport:false,
  objectStorage:false,
  durableMetadata:false,
  metadataSanitization:false,
  canonicalPlaceValidation:false,
  serverRateLimits:false,
  moderationQueue:false,
  abuseReporting:false,
  expiryCleanup:false,
  privacyNotice:false,
  secretIsolation:false,
  observability:false,
  costGuard:false
});

export function nowMomentPhotoActivation(capabilities={}){
  const required=Object.keys(NOW_MOMENT_PHOTO_CAPABILITIES);
  const missing=required.filter(k=>capabilities?.[k]!==true);
  return{ready:missing.length===0,mode:missing.length?"OFF":"PHOTO_ENABLED",missing};
}
