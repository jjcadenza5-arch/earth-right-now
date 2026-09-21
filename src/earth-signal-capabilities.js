export const EARTH_SIGNAL_CAPABILITIES=Object.freeze({
 transport:false,
 rateLimits:false,
 moderation:false,
 reporting:false,
 expiryDeletion:false,
 privacyNotice:false
});
export function earthSignalCapabilities(overrides={}){
 return Object.freeze({...EARTH_SIGNAL_CAPABILITIES,...overrides});
}
export function earthSignalCapabilityEvidence(capabilities=EARTH_SIGNAL_CAPABILITIES){
 return Object.entries(capabilities).map(([key,ready])=>({key,ready:ready===true}));
}
