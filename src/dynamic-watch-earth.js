import { immersiveWatchEarthSources } from "./immersive-watch-earth.js";
import { uniquePlayableJourney } from "./journey-variety.js";
import { runtimeHealthySources } from "./runtime-source-health.js";
import { buildWatchEarth } from "./watch-earth.js";

export function buildDynamicWatchEarth(sources,{limit=20,now=new Date()}={}){
  const healthy=runtimeHealthySources(sources);
  const immersive=immersiveWatchEarthSources(healthy,{now});
  const ranked=buildWatchEarth(immersive,{
    limit:Math.max(limit*2,40),
    maxPerCountry:3,
    maxPerPlace:1,
    now
  });
  return uniquePlayableJourney(ranked,{limit});
}
