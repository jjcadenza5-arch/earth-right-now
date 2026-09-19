import { balancedLiveWindows } from "./balanced-live-windows.js";import { buildLocalTaste,tasteScore } from "./local-taste.js";import { loadFavorites } from "./favorites.js";import { loadFavoritePlaces } from "./place-favorites.js";import { loadRecentWindows } from "./recent-windows.js";import { loadRecentPlaces } from "./recent-places.js";
export function personalizedLiveItems(sources,{places=[],limit=8,now=new Date(),taste=null}={}){
 const base=balancedLiveWindows(sources,{limit:Math.max(limit*3,limit),now});if(!base.length)return[];
 const local=taste||buildLocalTaste({sources,places,favoriteWindowIds:[...loadFavorites()],favoritePlaceIds:[...loadFavoritePlaces()],recentWindowIds:loadRecentWindows(),recentPlaceIds:loadRecentPlaces()});
 if(!local.signals)return base.slice(0,limit);
 const indexed=new Map(base.map((s,i)=>[s.id,i]));
 return [...base].sort((a,b)=>{const affinity=tasteScore(b,local)-tasteScore(a,local);if(affinity)return affinity;return indexed.get(a.id)-indexed.get(b.id)}).slice(0,limit);
}
export function liveRightNowModel(sources,{places=[],limit=8,now=new Date(),taste=null}={}){const items=personalizedLiveItems(sources,{places,limit,now,taste});const personalized=Boolean((taste?.signals)||(!taste&&items.length));return{items,empty:items.length===0,personalized,copy:items.length?"Verified current windows":"No verified current windows right now"}}
