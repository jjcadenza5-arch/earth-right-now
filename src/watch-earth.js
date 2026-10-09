import { sourceStatus } from "./health-policy.js";
import { recencyState } from "./source-recency.js";
import { playbackCapability } from "./playback-capability.js";
import { watchEarthBeautyScore } from "./watch-earth-beauty.js";
import { solarMoment } from "./solar-moment.js";
import { watchEarthExperienceEligible,watchEarthExperienceScore } from "./watch-earth-experience.js";
import { nearNowEvidence } from "./now-evidence.js";
import { embedPlaybackCurrent } from "./embed-playback-current.js";
import { premiumVisualEligible } from "./watch-earth-visual-gate.js";

export function watchEarthEligible(s,{now=new Date()}={}){
 return !!s&&s.truth==="LIVE_VIDEO"&&s.playback==="EMBED"&&s.permission==="EMBED_ALLOWED"&&
  s.watchHold!==true&&s.featuredHold!==true&&s.health==="HEALTHY"&&
  sourceStatus(s,{now}).live&&nearNowEvidence(s,{now})&&
  recencyState(s,{now})==="CURRENT_CHECK"&&embedPlaybackCurrent(s,{now})&&
  playbackCapability(s,{now}).action==="PLAY"&&watchEarthExperienceEligible(s)&&premiumVisualEligible(s,{now});
}
function rankedPool(sources,now){
 return(sources||[]).filter(s=>watchEarthEligible(s,{now}))
  .sort((a,b)=>(watchEarthBeautyScore(b,now)+watchEarthExperienceScore(b)*.35)-
                (watchEarthBeautyScore(a,now)+watchEarthExperienceScore(a)*.35));
}
// Up to five truthful, playable moving-camera streams from distinct places.
// Prefer one country per slot before relaxing diversity; never pad with weak or stale sources.
export function buildWatchEarth(sources,{limit=5,maxPerCountry=1,maxPerPlace=1,now=new Date()}={}){
 const pool=rankedPool(sources,now),ceiling=Math.min(5,Math.max(0,Number(limit)||0));
 const countries=new Map(),places=new Map(),out=[];
 for(const pass of [0,1]){
  for(const source of pool){
   if(out.length>=ceiling)break;
   if(out.includes(source))continue;
   const country=source.country||"Unknown",place=source.placeId||source.id;
   if((places.get(place)||0)>=maxPerPlace)continue;
   if(pass===0&&(countries.get(country)||0)>=maxPerCountry)continue;
   out.push(source);
   countries.set(country,(countries.get(country)||0)+1);
   places.set(place,(places.get(place)||0)+1);
  }
 }
 return out;
}
export function watchEarthFallback(sources,{limit=5,now=new Date()}={}){
 return buildWatchEarth(sources,{limit,now});
}
export function watchEarthSnapshot(sources,{limit=5,now=new Date()}={}){
 const items=buildWatchEarth(sources,{limit,now});
 const phases=new Map();let inside=0,nightCities=0,daylight=0,golden=0,unknownLight=0;
 for(const s of items){const phase=solarMoment(s,now).phase;phases.set(phase,(phases.get(phase)||0)+1);if(playbackCapability(s,{now}).action==="PLAY")inside++;if(phase==="NIGHT"&&/(Cities|Harbour|Skyline|Urban|Streets|Landmarks)/i.test((s.categories||[]).join(" ")))nightCities++;if(phase==="DAY")daylight++;if(["SUNRISE","SUNSET","MORNING_GOLDEN","EVENING_GOLDEN"].includes(phase))golden++;if(phase==="UNKNOWN")unknownLight++}
 const providers=new Set(items.map(s=>s.provider||"Unknown")).size;const embeds=items.filter(s=>s.playback==="EMBED").length;
 return{count:items.length,places:new Set(items.map(s=>s.placeId||s.id)).size,countries:new Set(items.map(s=>s.country||"Unknown")).size,providers,embeds,embedShare:items.length?Number((embeds/items.length).toFixed(3)):0,inside,nightCities,daylight,golden,unknownLight,knownLight:items.length-unknownLight,phases:Object.fromEntries(phases)};
}
