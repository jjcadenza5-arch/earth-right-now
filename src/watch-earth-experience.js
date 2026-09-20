const BAD_REASONS=/VISITOR_PLAYBACK_REJECTED|NOT_LIVE|VIDEO_UNAVAILABLE|STALE_RECORDING|BROKEN_EMBED/i;
export function watchEarthExperienceEligible(source){
 if(!source||source.health!=="HEALTHY")return false;
 if(BAD_REASONS.test(String(source.failureReason||"")))return false;
 if((Number(source.quality)||0)<80)return false;
 if((Number(source.moment)||0)<70)return false;
 return true;
}
export function watchEarthExperienceScore(source){
 if(!watchEarthExperienceEligible(source))return -Infinity;
 return (Number(source.quality)||0)*.55+(Number(source.moment)||0)*.3+(Number(source.freshness)||0)*.15;
}
