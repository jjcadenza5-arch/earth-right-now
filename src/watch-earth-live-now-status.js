import { buildDynamicWatchEarth } from "./dynamic-watch-earth.js";
import { watchEarthSnapshot } from "./watch-earth.js";
import { recencyState } from "./source-recency.js";

export function watchEarthLiveNowStatus(sources=[],{now=new Date(),limit=5,minCurated=5}={}){
 const moment=now instanceof Date?now:new Date(now);
 const items=buildDynamicWatchEarth(sources,{limit,now:moment});
 const snap=watchEarthSnapshot(items,{limit,now:moment});
 const stale=(sources||[]).filter(s=>["STALE_CHECK","EXPIRED_CHECK","UNKNOWN"].includes(recencyState(s,{now:moment})));
 const curatedFloor=Math.min(Math.max(1,Number(minCurated)||5),limit);
 const status=items.length>=limit?"FULL":items.length>=curatedFloor?"CURATED":items.length>0?"THIN":"EMPTY";
 return{
  checkedAt:moment.toISOString(),
  status,
  target:limit,
  targetRole:"CEILING_NOT_QUOTA",
  curatedFloor,
  count:items.length,
  capacityRemaining:Math.max(0,limit-items.length),
  shortfall:status==="THIN"?Math.max(0,curatedFloor-items.length):0,
  places:new Set(items.map(s=>s.placeId||s.id)).size,
  countries:new Set(items.map(s=>s.country||"Unknown")).size,
  providers:new Set(items.map(s=>s.provider||"Unknown")).size,
  inside:snap.inside,
  daylight:snap.daylight,
  golden:snap.golden,
  nightCities:snap.nightCities,
  ids:items.map(s=>s.id),
  staleOrExpiredCatalogSources:stale.length,
  note:"Watch Earth target is a ceiling, not a quota. If fewer than five verified live streams remain, report the shortfall instead of inserting still images, external-only sources or unverified feeds. This report uses the actual current clock and does not replace HUMAN_PLAYBACK or release evidence."
 };
}
