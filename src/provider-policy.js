const providers=[
 {match:/youtube\.com|youtu\.be/i,kind:"video-platform",requiresProviderCheck:true,defaultPermission:"LINK_ONLY"},
 {match:/usgs\.gov/i,kind:"public-agency",requiresProviderCheck:false,defaultPermission:"LINK_ONLY"},
 {match:/\.gov\.th|pattaya\.go\.th/i,kind:"public-agency",requiresProviderCheck:false,defaultPermission:"LINK_ONLY"},
 {match:/sanparks\.org/i,kind:"public-agency",requiresProviderCheck:false,defaultPermission:"LINK_ONLY"},
 {match:/ecan\.govt\.nz/i,kind:"public-agency",requiresProviderCheck:false,defaultPermission:"LINK_ONLY"},
 {match:/marinesafety\.sa\.gov\.au/i,kind:"public-agency",requiresProviderCheck:false,defaultPermission:"LINK_ONLY"}
];
export function providerPolicy(source){const url=[source.sourceUrl,source.embedUrl,source.officialUrl].filter(Boolean).join(" ");return providers.find(p=>p.match.test(url))||{kind:"unknown",requiresProviderCheck:true,defaultPermission:"UNKNOWN"}}
export function needsDeepValidation(source){const p=providerPolicy(source);return p.requiresProviderCheck||source.playback==="EMBED"||source.truth==="LIVE_VIDEO"}
