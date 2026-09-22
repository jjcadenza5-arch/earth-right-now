function ids(value){if(value instanceof Set)return value;return new Set(Array.isArray(value)?value.filter(Boolean):[])}
export function personalizeWatchEarth(items=[],{favoriteSourceIds=[],favoritePlaceIds=[],limit=20}={}){
 const sources=ids(favoriteSourceIds),places=ids(favoritePlaceIds),rows=(items||[]).filter(Boolean);
 if(!sources.size&&!places.size)return rows.slice(0,limit);
 const scored=rows.map((source,index)=>({source,index,affinity:(sources.has(source.id)?2:0)+(places.has(source.placeId)?1:0)}));
 scored.sort((a,b)=>b.affinity-a.affinity||a.index-b.index);
 return scored.slice(0,limit).map(x=>x.source);
}
