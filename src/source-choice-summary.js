import { discoverableSource } from "./discovery-eligibility.js";import { playbackCapability } from "./playback-capability.js";
export function sourceChoiceCounts(place){
 const sources=(place?.sources||[]).filter(discoverableSource),inside=sources.filter(s=>playbackCapability(s).action==="PLAY").length,external=sources.filter(s=>playbackCapability(s).action==="EXTERNAL").length;
 return{available:sources.length,inside,external};
}
export function sourceChoiceSummary(place){const x=sourceChoiceCounts(place),parts=[];if(x.inside)parts.push(x.inside+" inside ERN");if(x.external)parts.push(x.external+" at source");return parts.join(" · ")||"No available windows";}
