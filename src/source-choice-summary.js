import { discoverableSource } from "./discovery-eligibility.js";import { playbackCapability } from "./playback-capability.js";
export function sourceChoiceCounts(place,{now=new Date()}={}){
 const sources=(place?.sources||[]).filter(s=>discoverableSource(s)&&playbackCapability(s,{now}).action!=="UNAVAILABLE"),reference=sources.filter(s=>s.truth==="PREVIEW"||s.playback==="PREVIEW").length,liveLike=sources.filter(s=>s.truth!=="PREVIEW"&&s.playback!=="PREVIEW"),inside=liveLike.filter(s=>playbackCapability(s,{now}).action==="PLAY").length,external=liveLike.filter(s=>playbackCapability(s,{now}).action==="EXTERNAL").length;
 return{available:sources.length,inside,external,reference};
}
export function sourceChoiceSummary(place,options={}){const x=sourceChoiceCounts(place,options),parts=[];if(x.inside)parts.push(x.inside+" inside ERN");if(x.external)parts.push(x.external+" at source");if(x.reference)parts.push(x.reference+" reference "+(x.reference===1?"image":"images"));return parts.join(" · ")||"No available views";}
