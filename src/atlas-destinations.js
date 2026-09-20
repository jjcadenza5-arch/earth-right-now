import { groupByPlace } from "./place-model.js";
import { searchEarth } from "./search-engine.js";
import { currentSource,discoverableSource } from "./discovery-eligibility.js";
import { playbackCapability } from "./playback-capability.js";

export function atlasDestinationResults(sources,filters={},query="",{now=new Date()}={}){
  const base=query?.trim()?searchEarth(sources,query,{now}):(sources||[]).filter(discoverableSource);
  const places=groupByPlace(base,{now});
  return places.filter(place=>{
    if(filters.current&&!(place.sources||[]).some(s=>currentSource(s,{now})))return false;
    if(filters.inside&&!(place.sources||[]).some(s=>currentSource(s,{now})&&playbackCapability(s,{now}).action==="PLAY"))return false;
    return true;
  });
}
