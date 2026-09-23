const providers=[
 {match:/youtube\.com|youtu\.be/i,kind:"video-platform",requiresProviderCheck:true,defaultPermission:"LINK_ONLY"},
 {match:/couchtourist\.com/i,kind:"reviewed-embed-provider",requiresProviderCheck:true,defaultPermission:"EMBED_ALLOWED"},
 {match:/earthcam\.com|youtube\.com\/watch\?v=bwQyNMjsG3k/i,kind:"external-live-provider",requiresProviderCheck:true,defaultPermission:"LINK_ONLY"},
 {match:/skylinewebcams\.com/i,kind:"external-live-provider",requiresProviderCheck:true,defaultPermission:"LINK_ONLY"},
 {match:/webcam-lapalma\.de/i,kind:"external-live-provider",requiresProviderCheck:true,defaultPermission:"LINK_ONLY"},
 {match:/visit-chiyoda\.tokyo/i,kind:"official-tourism-live",requiresProviderCheck:true,defaultPermission:"LINK_ONLY"},
 {match:/usgs\.gov/i,kind:"public-agency",requiresProviderCheck:false,defaultPermission:"LINK_ONLY"},
 {match:/\.gov\.th|pattaya\.go\.th/i,kind:"public-agency",requiresProviderCheck:false,defaultPermission:"LINK_ONLY"},
 {match:/sanparks\.org/i,kind:"public-agency",requiresProviderCheck:false,defaultPermission:"LINK_ONLY"},
 {match:/ecan\.govt\.nz/i,kind:"public-agency",requiresProviderCheck:false,defaultPermission:"LINK_ONLY"},
 {match:/marinesafety\.sa\.gov\.au/i,kind:"public-agency",requiresProviderCheck:false,defaultPermission:"LINK_ONLY"}
];
export function providerPolicy(source){const url=[source.sourceUrl,source.embedUrl,source.officialUrl].filter(Boolean).join(" ");return providers.find(p=>p.match.test(url))||{kind:"unknown",requiresProviderCheck:true,defaultPermission:"UNKNOWN"}}
export function needsDeepValidation(source){const p=providerPolicy(source);return p.requiresProviderCheck||source.playback==="EMBED"||source.truth==="LIVE_VIDEO"}
export function permissionEscalationAllowed(source,targetPermission){const p=providerPolicy(source);if(targetPermission==="LINK_ONLY")return true;if(targetPermission==="EMBED_ALLOWED")return p.kind==="reviewed-embed-provider"&&source.permission==="EMBED_ALLOWED";if(targetPermission==="PARTNER_PERMISSION")return source.permission==="PARTNER_PERMISSION";return false}
