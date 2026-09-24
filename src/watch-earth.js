import { sourceStatus } from "./health-policy.js";
import { recencyState } from "./source-recency.js";
import { playbackCapability } from "./playback-capability.js";
import { watchEarthBeautyScore } from "./watch-earth-beauty.js";
import { solarMoment } from "./solar-moment.js";
import { watchEarthExperienceEligible,watchEarthExperienceScore } from "./watch-earth-experience.js";
import { nearNowEvidence } from "./now-evidence.js";
import { embedPlaybackCurrent } from "./embed-playback-current.js";

export function watchEarthEligible(s,{now=new Date()}={}) {
  return !!s &&
    sourceStatus(s,{now}).live &&
    nearNowEvidence(s,{now}) &&
    s.health === "HEALTHY" &&
    s.featuredHold !== true &&
    s.permission !== "UNKNOWN" &&
    recencyState(s,{now}) === "CURRENT_CHECK" &&
    embedPlaybackCurrent(s,{now}) &&
    playbackCapability(s,{now}).action !== "UNAVAILABLE" &&
    watchEarthExperienceEligible(s);
}

function rankedPool(sources, now) {
  return (sources || [])
    .filter(s=>watchEarthEligible(s,{now}))
    .sort((a, b) => {
      const insideA = playbackCapability(a,{now}).action === "PLAY" ? 6 : 0;
      const insideB = playbackCapability(b,{now}).action === "PLAY" ? 6 : 0;
      return (watchEarthBeautyScore(b, now) + watchEarthExperienceScore(b)*.35 + insideB) -
        (watchEarthBeautyScore(a, now) + watchEarthExperienceScore(a)*.35 + insideA);
    });
}

export function buildWatchEarth(
  sources,
  { limit = 20, maxPerCountry = 3, maxPerPlace = 1, now = new Date() } = {}
) {
  const pool = rankedPool(sources, now);
  const countries = new Map();
  const places = new Map();
  const out = [];

  // Fresh inside-ERN windows are the preferred product experience. Reserve a
  // small truthful core before filling the rest of the journey with the best
  // current external windows. This never bypasses watchEarthEligible().
  const insidePool=pool.filter(source=>playbackCapability(source,{now}).action==="PLAY");
  for(const source of insidePool){
    if(out.length>=Math.min(5,limit))break;
    const country=source.country||"Unknown",place=source.placeId||source.id;
    if((countries.get(country)||0)>=maxPerCountry)continue;
    if((places.get(place)||0)>=maxPerPlace)continue;
    out.push(source);
    countries.set(country,(countries.get(country)||0)+1);
    places.set(place,(places.get(place)||0)+1);
  }

  for (const source of pool) {
    const country = source.country || "Unknown";
    const place = source.placeId || source.id;
    if ((countries.get(country) || 0) >= maxPerCountry) continue;
    if ((places.get(place) || 0) >= maxPerPlace) continue;
    out.push(source);
    countries.set(country, (countries.get(country) || 0) + 1);
    places.set(place, (places.get(place) || 0) + 1);
    if (out.length >= limit) return out;
  }

  // First relax country concentration while preserving distinct places.
  for (const source of pool) {
    if (out.includes(source)) continue;
    const place = source.placeId || source.id;
    if ((places.get(place) || 0) >= maxPerPlace) continue;
    out.push(source);
    places.set(place, (places.get(place) || 0) + 1);
    if (out.length >= limit) return out;
  }

  // Only if the truthful current catalog is still smaller than the journey do we
  // allow another window from an already represented place.
  for (const source of pool) {
    if (out.includes(source)) continue;
    out.push(source);
    if (out.length >= limit) break;
  }
  return out;
}

export function watchEarthFallback(sources, { limit = 20, now = new Date() } = {}) {
  return buildWatchEarth(sources, { limit, now });
}

export function watchEarthSnapshot(sources,{limit=20,now=new Date()}={}){
 const items=buildWatchEarth(sources,{limit,now});
 const phases=new Map();let inside=0,nightCities=0,daylight=0,golden=0,unknownLight=0;
 for(const s of items){const phase=solarMoment(s,now).phase;phases.set(phase,(phases.get(phase)||0)+1);if(playbackCapability(s,{now}).action==="PLAY")inside++;if(phase==="NIGHT"&&/(Cities|Harbour|Skyline|Urban|Streets|Landmarks)/i.test((s.categories||[]).join(" ")))nightCities++;if(phase==="DAY")daylight++;if(["SUNRISE","SUNSET","MORNING_GOLDEN","EVENING_GOLDEN"].includes(phase))golden++;if(phase==="UNKNOWN")unknownLight++}
 const providers=new Set(items.map(s=>s.provider||"Unknown")).size;const embeds=items.filter(s=>s.playback==="EMBED").length;
 return{count:items.length,places:new Set(items.map(s=>s.placeId||s.id)).size,countries:new Set(items.map(s=>s.country||"Unknown")).size,providers,embeds,embedShare:items.length?Number((embeds/items.length).toFixed(3)):0,inside,nightCities,daylight,golden,unknownLight,knownLight:items.length-unknownLight,phases:Object.fromEntries(phases)};
}
