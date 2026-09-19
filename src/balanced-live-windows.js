import { currentSource,discoverableSource } from "./discovery-eligibility.js";import { playbackCapability } from "./playback-capability.js";
export function balancedLiveWindows(sources,{limit=8,maxPerCountry=2,maxPerPlace=1}={}){
 const pool=(sources||[]).filter(s=>discoverableSource(s)&&currentSource(s)&&playbackCapability(s).action!=="UNAVAILABLE").sort((a,b)=>(b.quality||0)-(a.quality||0));
 const countries=new Map(),places=new Map(),out=[];for(const s of pool){const country=s.country||"Unknown",place=s.placeId||s.id;if((countries.get(country)||0)>=maxPerCountry||(places.get(place)||0)>=maxPerPlace)continue;out.push(s);countries.set(country,(countries.get(country)||0)+1);places.set(place,(places.get(place)||0)+1);if(out.length>=limit)break}return out;
}
