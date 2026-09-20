import { buildWatchEarth } from "../src/watch-earth.js";

const checkedAt = new Date().toISOString();
const base = {
  truth: "EXTERNAL_LIVE",
  permission: "LINK_ONLY",
  health: "HEALTHY",
  playback: "EXTERNAL",
  sourceUrl: "https://example.com/live",
  checkedAt,
  lastSuccessfulCheck: checkedAt,
  quality: 80,
  freshness: 80,
  moment: 70,
  categories: ["Cities"],
  lat: 0,
  lon: 0
};

const rows = [
  {...base,id:"sunset",placeId:"sunset",country:"A",lon:90},
  {...base,id:"night-city",placeId:"night-city",country:"B",lon:180},
  {...base,id:"day",placeId:"day",country:"C",lon:0},
  {...base,id:"same-place-2",placeId:"day",country:"C",lon:1},
  {...base,id:"stale",placeId:"stale",country:"D",lon:-90,checkedAt:"2020-01-01",lastSuccessfulCheck:"2020-01-01"}
];

const now = new Date("2026-03-20T12:00:00Z");
const result = buildWatchEarth(rows,{limit:4,maxPerCountry:2,maxPerPlace:1,now});
console.assert(!result.some(x=>x.id==="stale"),"stale source must never enter Watch Earth");
console.assert(result.filter(x=>x.placeId==="day").length===1,"first diversity pass should keep one window per place");
console.assert(result.length===4,"truthful pool may fill remaining slots when the catalog is smaller than the target journey");
console.log("ERN Watch Earth time-aware journey smoke checks passed");
