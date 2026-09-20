import { sourceStatus } from "./health-policy.js";
import { recencyState } from "./source-recency.js";
import { playbackCapability } from "./playback-capability.js";
import { watchEarthBeautyScore } from "./watch-earth-beauty.js";

export function watchEarthEligible(s) {
  return !!s &&
    sourceStatus(s).live &&
    s.health === "HEALTHY" &&
    s.permission !== "UNKNOWN" &&
    recencyState(s) === "CURRENT_CHECK" &&
    playbackCapability(s).action !== "UNAVAILABLE";
}

function rankedPool(sources, now) {
  return (sources || [])
    .filter(watchEarthEligible)
    .sort((a, b) => {
      const insideA = playbackCapability(a).action === "PLAY" ? 6 : 0;
      const insideB = playbackCapability(b).action === "PLAY" ? 6 : 0;
      return (watchEarthBeautyScore(b, now) + insideB) -
        (watchEarthBeautyScore(a, now) + insideA);
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
 const phases=new Map();let inside=0,nightCities=0;
 for(const s of items){const phase=(awaitSolarPhase(s,now));phases.set(phase,(phases.get(phase)||0)+1);if(playbackCapability(s).action==="PLAY")inside++;if(phase==="NIGHT"&&/(Cities|Harbour|Skyline|Urban|Streets|Landmarks)/i.test((s.categories||[]).join(" ")))nightCities++}
 return{count:items.length,places:new Set(items.map(s=>s.placeId||s.id)).size,countries:new Set(items.map(s=>s.country||"Unknown")).size,inside,nightCities,phases:Object.fromEntries(phases)};
}
function awaitSolarPhase(s,now){
 const rawLat=s?.lat,rawLon=s?.lon;if(rawLat===null||rawLat===undefined||rawLat===""||rawLon===null||rawLon===undefined||rawLon==="")return"UNKNOWN";
 const d=now instanceof Date?now:new Date(now),rad=Math.PI/180,lat=Number(rawLat),lon=Number(rawLon);if(!Number.isFinite(lat)||!Number.isFinite(lon)||Number.isNaN(d.getTime()))return"UNKNOWN";
 const start=Date.UTC(d.getUTCFullYear(),0,0),day=Math.floor((d-start)/86400000),hour=d.getUTCHours()+d.getUTCMinutes()/60+d.getUTCSeconds()/3600,gamma=2*Math.PI/365*(day-1+(hour-12)/24),decl=.006918-.399912*Math.cos(gamma)+.070257*Math.sin(gamma)-.006758*Math.cos(2*gamma)+.000907*Math.sin(2*gamma)-.002697*Math.cos(3*gamma)+.00148*Math.sin(3*gamma),eq=229.18*(.000075+.001868*Math.cos(gamma)-.032077*Math.sin(gamma)-.014615*Math.cos(2*gamma)-.040849*Math.sin(2*gamma)),minutes=d.getUTCHours()*60+d.getUTCMinutes()+d.getUTCSeconds()/60,trueSolar=(minutes+eq+4*lon+1440)%1440,ha=(trueSolar/4-180)*rad,e=Math.asin(Math.sin(lat*rad)*Math.sin(decl)+Math.cos(lat*rad)*Math.cos(decl)*Math.cos(ha))/rad;
 if(e<=-6)return"NIGHT";if(e<4)return"SUNRISE";if(e<12)return hour<12?"MORNING_GOLDEN":"EVENING_GOLDEN";return"DAY";
}
