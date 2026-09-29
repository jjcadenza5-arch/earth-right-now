export function staleMaintenanceClass(source){
 const reason=String(source?.failureReason||"");
 if(/OFF_SEASON|SEASONAL/i.test(reason))return{class:"SEASONAL_OFF_SEASON",action:"DEFER_UNTIL_SEASON_OR_MATERIAL_PROVIDER_CHANGE",urgency:15};
 if(/PLAYBACK_UNVERIFIED|PLAYBACK_REJECTED|BROKEN_EMBED|VIDEO_UNAVAILABLE/i.test(reason))return{class:"PLAYBACK_EVIDENCE_DEBT",action:"REVERIFY_REAL_PLAYBACK_BEFORE_PROMOTION",urgency:85};
 if(source?.health==="DEGRADED")return{class:"DEGRADED_SOURCE_EVIDENCE",action:"REVIEW_CURRENT_PROVIDER_EVIDENCE",urgency:80};
 if(source?.truth==="EXTERNAL_LIVE"&&source?.playback==="EXTERNAL")return{class:"EDITORIAL_CURRENTNESS_DEBT",action:"RECONFIRM_PROVIDER_EXPLICIT_CURRENT_OR_LIVE_EVIDENCE",urgency:45};
 return{class:"GENERIC_RECHECK",action:"RECHECK_SOURCE_CURRENTNESS",urgency:30};
}
