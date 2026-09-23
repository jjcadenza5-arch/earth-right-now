import { buildDynamicWatchEarth } from "./dynamic-watch-earth.js";
import { watchEarthSnapshot } from "./watch-earth.js";
import { recencyState } from "./source-recency.js";

export function watchEarthLiveNowStatus(sources=[],{now=new Date(),limit=20}={}){
 const moment=now instanceof Date?now:new Date(now);
 const items=buildDynamicWatchEarth(sources,{limit,now:moment});
 const snap=watchEarthSnapshot(items,{limit,now:moment});
 const stale=(sources||[]).filter(s=>["STALE_CHECK","EXPIRED_CHECK","UNKNOWN"].includes(recencyState(s,{now:moment})));
 const status=items.length>=limit?"FULL":items.length>0?"PARTIAL":"EMPTY";
 return{
  checkedAt:moment.toISOString(),
  status,
  target:limit,
  count:items.length,
  shortfall:Math.max(0,limit-items.length),
  places:new Set(items.map(s=>s.placeId||s.id)).size,
  countries:new Set(items.map(s=>s.country||"Unknown")).size,
  providers:new Set(items.map(s=>s.provider||"Unknown")).size,
  inside:snap.inside,
  daylight:snap.daylight,
  golden:snap.golden,
  nightCities:snap.nightCities,
  ids:items.map(s=>s.id),
  staleOrExpiredCatalogSources:stale.length,
  note:"This report uses the actual current clock. It is operational freshness evidence only and does not replace HUMAN_PLAYBACK or release evidence."
 };
}
