import { groupByPlace } from "./place-model.js";
import { currentSource } from "./discovery-eligibility.js";
import { playbackCapability } from "./playback-capability.js";

function placeRank(place,now){const sources=place.sources||[],current=sources.filter(s=>currentSource(s,{now})).length,inside=sources.filter(s=>currentSource(s,{now})&&playbackCapability(s,{now}).action==="PLAY").length;return inside*100+current*10+sources.length}
export function atlasClusterDestinations(cluster,{now=new Date()}={}){return groupByPlace(cluster?.sources||[],{now}).sort((a,b)=>placeRank(b,now)-placeRank(a,now))}
export function atlasClusterSummary(cluster,options={}){const destinations=atlasClusterDestinations(cluster,options),views=(cluster?.sources||[]).length,countries=[...new Set(destinations.map(p=>p.country).filter(Boolean))];return{destinations,windows:views,views,destinationCount:destinations.length,countries,title:destinations.length===1?destinations[0].title:`${destinations.length} destinations · ${views} views${countries.length===1?" · "+countries[0]:""}`}}
