import { tasteScore } from "./local-taste.js";
import { interleaveWatchEarthProviders } from "./watch-earth-provider-interleave.js";
function ids(value){if(value instanceof Set)return value;return new Set(Array.isArray(value)?value.filter(Boolean):[])}
export function personalizeWatchEarth(items=[],{favoriteSourceIds=[],favoritePlaceIds=[],taste=null,limit=20,now=new Date()}={}){
 const sources=ids(favoriteSourceIds),places=ids(favoritePlaceIds),rows=(items||[]).filter(Boolean),cap=Math.max(0,Math.min(limit,rows.length));
 if(!sources.size&&!places.size&&!taste?.signals)return rows.slice(0,cap);
 const scored=rows.map((source,index)=>({source,index,affinity:(sources.has(source.id)?200:0)+(places.has(source.placeId)?100:0)+Math.min(12,tasteScore(source,taste)*.35)-index*.5}));
 scored.sort((a,b)=>b.affinity-a.affinity||a.index-b.index);
 const discoverySlots=cap>1?Math.min(4,Math.max(1,Math.ceil(cap*.2))):0,personalizedSlots=Math.max(0,cap-discoverySlots),chosen=scored.slice(0,personalizedSlots).map(x=>x.source),chosenIds=new Set(chosen.map(x=>x.id));
 for(const source of rows){if(chosen.length>=cap)break;if(!chosenIds.has(source.id)){chosen.push(source);chosenIds.add(source.id)}}
 return interleaveWatchEarthProviders(chosen,{now});
}
