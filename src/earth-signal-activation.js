export const EARTH_SIGNAL_ACTIVATION_REQUIREMENTS=Object.freeze([
 "transport","rateLimits","moderation","reporting","expiryDeletion","privacyNotice"
]);
export function earthSignalActivationStatus(capabilities={}){
 const checks=Object.fromEntries(EARTH_SIGNAL_ACTIVATION_REQUIREMENTS.map(k=>[k,capabilities[k]===true]));
 const missing=EARTH_SIGNAL_ACTIVATION_REQUIREMENTS.filter(k=>!checks[k]);
 return{enabled:missing.length===0,checks,missing};
}
export function earthSignalFeatureMode(capabilities={}){
 return earthSignalActivationStatus(capabilities).enabled?"CONTRIBUTION_ENABLED":"READ_ONLY";
}
