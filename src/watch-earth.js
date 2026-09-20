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
