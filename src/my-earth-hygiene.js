const LIMITS={places:500,windows:500,recents:50};
export function myEarthHygiene(snapshot,{validPlaceIds=[],validWindowIds=[]}={}){
 const places=new Set(validPlaceIds),windows=new Set(validWindowIds),keep=(xs,set,max)=>[...new Set((xs||[]).filter(x=>set.has(x)))].slice(0,max);
 const data={...snapshot,favoritePlaceIds:keep(snapshot?.favoritePlaceIds,places,LIMITS.places),favoriteWindowIds:keep(snapshot?.favoriteWindowIds,windows,LIMITS.windows),recentPlaceIds:keep(snapshot?.recentPlaceIds,places,LIMITS.recents),recentWindowIds:keep(snapshot?.recentWindowIds,windows,LIMITS.recents)};
 const removed=(snapshot?.favoritePlaceIds?.length||0)-data.favoritePlaceIds.length+(snapshot?.favoriteWindowIds?.length||0)-data.favoriteWindowIds.length+(snapshot?.recentPlaceIds?.length||0)-data.recentPlaceIds.length+(snapshot?.recentWindowIds?.length||0)-data.recentWindowIds.length;
 return{data,removed:Math.max(0,removed)};
}
