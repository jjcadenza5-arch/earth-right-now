import { currentSource } from "./discovery-eligibility.js";import { playbackCapability } from "./playback-capability.js";
export function immersiveWatchEarthSources(sources,{now=new Date()}={}){return(sources||[]).filter(s=>currentSource(s,{now})&&playbackCapability(s,{now}).action==="PLAY")}
