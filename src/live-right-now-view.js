import { balancedLiveWindows } from "./balanced-live-windows.js";import { buildLocalTaste,tasteScore } from "./local-taste.js";import { loadFavorites } from "./favorites.js";import { loadFavoritePlaces } from "./place-favorites.js";import { loadRecentWindows } from "./recent-windows.js";import { loadRecentPlaces } from "./recent-places.js";
export function currentLocalTaste(sources,places=[]){return buildLocalTaste({sources,places,favoriteWindowIds:[...loadFavorites()],favoritePlaceIds:[...loadFavoritePlaces()],recentWindowIds:loadRecentWindows(),recentPlaceIds:loadRecentPlaces()})}
export function personalizedLiveItems(sources,{places=[],limit=8,now=new Date(),taste=null}={}){
 const base=balancedLiveWindows(sources,{limit:Math.max(limit*3,limit),now});if(!base.length)return[];
 const local=taste||currentLocalTaste(sources,places);if(!local.signals)return base.slice(0,limit);
 const ranked=base.map((s,i)=>({s,i,score:-i+Math.min(4,tasteScore(s,local)*.18)})).sort((a,b)=>b.score-a.score||a.i-b.i);
 const chosen=ranked.slice(0,Math.max(1,limit-2)).map(x=>x.s),ids=new Set(chosen.map(x=>x.id));
 for(const s of base){if(chosen.length>=limit)break;if(!ids.has(s.id)){chosen.push(s);ids.add(s.id)}}
 return chosen;
}
export function liveRightNowModel(sources,{places=[],limit=8,now=new Date(),taste=null}={}){const local=taste||currentLocalTaste(sources,places),items=personalizedLiveItems(sources,{places,limit,now,taste:local});return{items,empty:items.length===0,personalized:Boolean(local.signals),copy:items.length?(local.signals?"Live Right Now · shaped gently by My Earth":"Verified current windows"):"No verified current windows right now"}}
