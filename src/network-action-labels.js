import { playbackCapability } from "./playback-capability.js";import { sourceActionForNetwork } from "./network-source-action.js";import { currentWindowAction } from "./current-window-label.js";
export function sourceActionMetaForNetwork(source,networkState){
 const base=playbackCapability(source),cap=networkState?sourceActionForNetwork(source,networkState):base;
 let label=currentWindowAction(source);
 if(cap.networkReason==="OFFLINE")label="Offline";
 else if(cap.networkReason==="CONSTRAINED_EMBED"&&cap.action==="EXTERNAL")label="Open source";
 else if(cap.networkReason==="CONSTRAINED_EMBED")label="Data-saving mode";
 return{label,external:cap.action==="EXTERNAL",disabled:cap.action==="UNAVAILABLE",networkReason:cap.networkReason||null,aria:(cap.action==="EXTERNAL"?label+" for "+source.title+" (opens provider)":label+" for "+source.title)};
}
