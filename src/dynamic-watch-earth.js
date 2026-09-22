import { immersiveWatchEarthSources } from "./immersive-watch-earth.js";
import { uniquePlayableJourney } from "./journey-variety.js";
import { runtimeWatchEarthSources } from "./runtime-source-health.js";
import { buildWatchEarth } from "./watch-earth.js";
import { balanceWatchEarthMoments } from "./watch-earth-mix.js";
import { broadenWatchEarthRegions } from "./watch-earth-region-breadth.js";
import { diversifyDeliveryHosts } from "./watch-earth-delivery-diversity.js";
import { arrangeWatchEarthJourney } from "./watch-earth-story-flow.js";
import { diversifyWatchEarthProviders } from "./watch-earth-provider-diversity.js";
import { interleaveWatchEarthProviders } from "./watch-earth-provider-interleave.js";

export function buildDynamicWatchEarth(sources,{limit=20,now=new Date()}={}){
  const healthy=runtimeWatchEarthSources(sources,now);
  const immersive=immersiveWatchEarthSources(healthy,{now});
  const candidatePool=immersive.length>=Math.min(limit,8)?immersive:[...immersive,...healthy.filter(s=>!immersive.includes(s))];
  const ranked=buildWatchEarth(candidatePool,{
    limit:Math.max(limit*2,40),
    maxPerCountry:3,
    maxPerPlace:1,
    now
  });
  const unique=uniquePlayableJourney(ranked,{limit:Math.max(limit*2,40)});
  const broad=broadenWatchEarthRegions(unique,{limit:Math.max(limit*2,40),maxPerRegion:6});
  const delivery=diversifyDeliveryHosts(broad,{limit:Math.max(limit*2,40),maxPerHost:4});
  const providers=diversifyWatchEarthProviders(delivery,{limit:Math.max(limit*2,40),maxPerProvider:6});
  return interleaveWatchEarthProviders(arrangeWatchEarthJourney(balanceWatchEarthMoments(providers,{limit,now}),{now}),{now});
}
