import { currentSource } from "./discovery-eligibility.js";import { playbackCapability } from "./playback-capability.js";
export function immersiveWatchEarthSources(sources){return(sources||[]).filter(s=>currentSource(s)&&playbackCapability(s).action==="PLAY")}
