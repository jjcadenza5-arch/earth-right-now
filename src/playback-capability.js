import { allowedEmbedUrl } from "./embed-policy.js";import { safeHttpUrl } from "./url-safety.js";import { currentSource } from "./discovery-eligibility.js";
export function playbackCapability(source,options={}){
 if(!source)return{action:"UNAVAILABLE",label:"Unavailable"};
 if(source.health==="OFFLINE")return{action:"UNAVAILABLE",label:"Temporarily unavailable"};
 const current=currentSource(source,options),external=safeHttpUrl(source.sourceUrl||source.officialUrl);
 if(source.permission==="LINK_ONLY"||source.playback==="EXTERNAL")return external?{action:"EXTERNAL",label:current?"Open current source":"Open source"}:{action:"UNAVAILABLE",label:"Unavailable"};
 if(source.playback==="EMBED"&&source.embedUrl&&allowedEmbedUrl(source.embedUrl))return{action:"PLAY",label:current?"Watch live":"View source"};
 if(source.playback==="IMAGE_REFRESH"&&safeHttpUrl(source.sourceUrl))return{action:"PLAY",label:current?"View current image":"View source"};
 return external?{action:"EXTERNAL",label:current?"Open current source":"Open source"}:{action:"UNAVAILABLE",label:"Unavailable"};
}
export function canPlayInsideERN(source,options={}){return playbackCapability(source,options).action==="PLAY"}
