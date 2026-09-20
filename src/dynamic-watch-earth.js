import { immersiveWatchEarthSources } from "./immersive-watch-earth.js";
import { uniquePlayableJourney } from "./journey-variety.js";
import { runtimeHealthySources } from "./runtime-source-health.js";
import { buildWatchEarth } from "./watch-earth.js";
import { balanceWatchEarthMoments } from "./watch-earth-mix.js";

export function buildDynamicWatchEarth(sources,{limit=20,now=new Date()}={}){
  const healthy=runtimeHealthySources(sources,now);
  const immersive=immersiveWatchEarthSources(healthy,{now});
  const candidatePool=immersive.length>=Math.min(limit,8)?immersive:[...immersive,...healthy.filter(s=>!immersive.includes(s))];
  const ranked=buildWatchEarth(candidatePool,{
    limit:Math.max(limit*2,40),
    maxPerCountry:3,
    maxPerPlace:1,
    now
  });
  const unique=uniquePlayableJourney(ranked,{limit:Math.max(limit*2,40)});
  return balanceWatchEarthMoments(unique,{limit,now});
}
