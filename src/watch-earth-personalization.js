import { tasteScore } from "./local-taste.js";
import { interleaveWatchEarthProviders } from "./watch-earth-provider-interleave.js";
function ids(value){if(value instanceof Set)return value;return new Set(Array.isArray(value)?value.filter(Boolean):[])}
export function personalizeWatchEarth(items=[],{favoriteSourceIds=[],favoritePlaceIds=[],taste=null,limit=20,now=new Date()}={}){
 const sources=ids(favoriteSourceIds),places=ids(favoritePlaceIds),rows=(items||[]).filter(Boolean);
 if(!sources.size&&!places.size&&!taste?.signals)return rows.slice(0,limit);
 const scored=rows.map((source,index)=>({source,index,affinity:(sources.has(source.id)?200:0)+(places.has(source.placeId)?100:0)+tasteScore(source,taste)}));
 scored.sort((a,b)=>b.affinity-a.affinity||a.index-b.index);
 return interleaveWatchEarthProviders(scored.slice(0,limit).map(x=>x.source),{now});
}
