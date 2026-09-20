import { allowedEmbedUrl } from "./embed-policy.js";import { safeHttpUrl } from "./url-safety.js";import { currentSource } from "./discovery-eligibility.js";import { nearNowEvidence,explicitImageFreshness } from "./now-evidence.js";
export function playbackCapability(source,options={}){
 if(!source)return{action:"UNAVAILABLE",label:"Unavailable"};
 if(source.health==="OFFLINE")return{action:"UNAVAILABLE",label:"Temporarily unavailable"};
 const current=currentSource(source,options),nearNow=nearNowEvidence(source,options),external=safeHttpUrl(source.sourceUrl||source.officialUrl);
 if(source.truth==="PREVIEW"||source.playback==="PREVIEW")return external?{action:"EXTERNAL",label:"View reference image"}:{action:"UNAVAILABLE",label:"Unavailable"};
 if(source.permission==="LINK_ONLY"||source.playback==="EXTERNAL")return external?{action:"EXTERNAL",label:nearNow?"Open near-now source":"Open source"}:{action:"UNAVAILABLE",label:"Unavailable"};
 if(source.playback==="EMBED"&&source.embedUrl&&allowedEmbedUrl(source.embedUrl))return{action:"PLAY",label:nearNow?"Watch live":"View source"};
 if(source.playback==="IMAGE_REFRESH"&&safeHttpUrl(source.sourceUrl))return{action:"PLAY",label:nearNow&&explicitImageFreshness(source)?"View near-now image":"View source"};
 return external?{action:"EXTERNAL",label:nearNow?"Open near-now source":"Open source"}:{action:"UNAVAILABLE",label:"Unavailable"};
}
export function canPlayInsideERN(source,options={}){return playbackCapability(source,options).action==="PLAY"}
