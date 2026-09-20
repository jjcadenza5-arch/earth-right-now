import { balancedLiveWindows } from "./balanced-live-windows.js";import { buildDynamicWatchEarth } from "./dynamic-watch-earth.js";import { buildLocalTaste,tasteScore,tasteSummary } from "./local-taste.js";import { loadFavorites } from "./favorites.js";import { loadFavoritePlaces } from "./place-favorites.js";import { loadRecentWindows } from "./recent-windows.js";import { loadRecentPlaces } from "./recent-places.js";
export function currentLocalTaste(sources,places=[]){if(typeof localStorage==="undefined")return{signals:0,categories:new Map(),countries:new Map(),places:new Map()};return buildLocalTaste({sources,places,favoriteWindowIds:[...loadFavorites()],favoritePlaceIds:[...loadFavoritePlaces()],recentWindowIds:loadRecentWindows(),recentPlaceIds:loadRecentPlaces()})}
export function personalizedLiveItems(sources,{places=[],limit=8,now=new Date(),taste=null}={}){
 const journey=buildDynamicWatchEarth(sources,{limit:Math.max(limit*3,limit),now});const base=journey.length?journey:balancedLiveWindows(sources,{limit:Math.max(limit*3,limit),now});if(!base.length)return[];
 const local=taste||currentLocalTaste(sources,places);if(!local.signals)return base.slice(0,limit);
 const ranked=base.map((s,i)=>({s,i,score:-i*.25+Math.min(4,tasteScore(s,local)*.35)})).sort((a,b)=>b.score-a.score||a.i-b.i);
 const chosen=ranked.slice(0,Math.max(1,limit-2)).map(x=>x.s),ids=new Set(chosen.map(x=>x.id));
 for(const s of base){if(chosen.length>=limit)break;if(!ids.has(s.id)){chosen.push(s);ids.add(s.id)}}
 return chosen;
}
export function liveRightNowModel(sources,{places=[],limit=8,now=new Date(),taste=null}={}){const local=taste||currentLocalTaste(sources,places),items=personalizedLiveItems(sources,{places,limit,now,taste:local});const summary=tasteSummary(local);return{items,empty:items.length===0,personalized:Boolean(local.signals),taste:summary,copy:items.length?(local.signals?"Live Right Now · shaped gently by My Earth":"Verified near-now windows"):"No verified near-now windows right now"}}
