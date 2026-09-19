import { groupByPlace } from "./place-model.js";
import { searchEarth } from "./search-engine.js";
import { currentSource } from "./discovery-eligibility.js";
import { playbackCapability } from "./playback-capability.js";

export function atlasDestinationResults(sources,filters={},query=""){
  const base=query?.trim()?searchEarth(sources,query):sources;
  const places=groupByPlace(base);
  return places.filter(place=>{
    if(filters.current&&!(place.sources||[]).some(currentSource))return false;
    if(filters.inside&&!(place.sources||[]).some(s=>currentSource(s)&&playbackCapability(s).action==="PLAY"))return false;
    return true;
  });
}
