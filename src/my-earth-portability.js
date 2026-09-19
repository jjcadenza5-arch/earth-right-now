const VERSION=1;
export function myEarthSnapshot({favoritePlaceIds=[],favoriteWindowIds=[],recentPlaceIds=[],recentWindowIds=[]}={}){
 return{version:VERSION,favoritePlaceIds:[...new Set(favoritePlaceIds)].slice(0,500),favoriteWindowIds:[...new Set(favoriteWindowIds)].slice(0,500),recentPlaceIds:[...new Set(recentPlaceIds)].slice(0,50),recentWindowIds:[...new Set(recentWindowIds)].slice(0,50),exportedAt:new Date().toISOString()};
}
function ids(x,key,max){return Array.isArray(x?.[key])?[...new Set(x[key].filter(v=>typeof v==="string"&&v.trim()).map(v=>v.trim()))].slice(0,max):[]}
export function validateMyEarthSnapshot(x){
 if(!x||typeof x!=="object"||Array.isArray(x)||x.version!==VERSION)return{ok:false,error:"Unsupported My Earth data"};
 return{ok:true,data:{version:VERSION,favoritePlaceIds:ids(x,"favoritePlaceIds",500),favoriteWindowIds:ids(x,"favoriteWindowIds",500),recentPlaceIds:ids(x,"recentPlaceIds",50),recentWindowIds:ids(x,"recentWindowIds",50)}};
}
export function mergeMyEarthSnapshot(current,incoming){
 const checked=validateMyEarthSnapshot(incoming);if(!checked.ok)return checked;const a=current||{},b=checked.data;
 const merge=(x,y,max)=>[...new Set([...(x||[]),...(y||[])])].slice(0,max);
 return{ok:true,data:{version:VERSION,favoritePlaceIds:merge(a.favoritePlaceIds,b.favoritePlaceIds,500),favoriteWindowIds:merge(a.favoriteWindowIds,b.favoriteWindowIds,500),recentPlaceIds:merge(b.recentPlaceIds,a.recentPlaceIds,50),recentWindowIds:merge(b.recentWindowIds,a.recentWindowIds,50)}};
}
