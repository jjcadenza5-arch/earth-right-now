import { groupByPlace } from "./place-model.js";
import { currentSource } from "./discovery-eligibility.js";
import { playbackCapability } from "./playback-capability.js";

function placeRank(place){
 const sources=place.sources||[],current=sources.filter(currentSource).length,inside=sources.filter(s=>currentSource(s)&&playbackCapability(s).action==="PLAY").length;
 return inside*100+current*10+sources.length;
}
export function atlasClusterDestinations(cluster){
 return groupByPlace(cluster?.sources||[]).sort((a,b)=>placeRank(b)-placeRank(a));
}
export function atlasClusterSummary(cluster){
 const destinations=atlasClusterDestinations(cluster),windows=(cluster?.sources||[]).length,countries=[...new Set(destinations.map(p=>p.country).filter(Boolean))];
 return{destinations,windows,destinationCount:destinations.length,countries,title:destinations.length===1?destinations[0].title:`${destinations.length} destinations · ${windows} windows${countries.length===1?" · "+countries[0]:""}`};
}
