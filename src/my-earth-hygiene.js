const LIMITS={places:500,windows:500,recents:50};
export function myEarthHygiene(snapshot,{validPlaceIds=[],validWindowIds=[]}={}){
 const places=new Set(validPlaceIds),windows=new Set(validWindowIds);
 let retired=0,duplicates=0,truncated=0;
 const keep=(xs,set,max)=>{const seen=new Set(),out=[];for(const x of xs||[]){if(!set.has(x)){retired++;continue}if(seen.has(x)){duplicates++;continue}seen.add(x);if(out.length>=max){truncated++;continue}out.push(x)}return out};
 const data={...snapshot,favoritePlaceIds:keep(snapshot?.favoritePlaceIds,places,LIMITS.places),favoriteWindowIds:keep(snapshot?.favoriteWindowIds,windows,LIMITS.windows),recentPlaceIds:keep(snapshot?.recentPlaceIds,places,LIMITS.recents),recentWindowIds:keep(snapshot?.recentWindowIds,windows,LIMITS.recents)};
 return{data,removed:retired+duplicates+truncated,retired,duplicates,truncated};
}
