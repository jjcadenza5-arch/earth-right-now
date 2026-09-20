import { diverseCuration } from "./curation.js";
import { immersiveWatchEarthSources } from "./immersive-watch-earth.js";
import { uniquePlayableJourney } from "./journey-variety.js";
import { beautifulWatchEarth } from "./watch-earth-beauty.js";
import { runtimeHealthySources } from "./runtime-source-health.js";
export function buildDynamicWatchEarth(sources,{limit=20,now=new Date()}={}){
 const healthy=runtimeHealthySources(sources);
 const qualified=immersiveWatchEarthSources(diverseCuration(healthy,{limit:Math.max(limit*2,40),requireCurrent:true}));
 return uniquePlayableJourney(beautifulWatchEarth(qualified,{limit:Math.max(limit*2,40),now}),{limit});
}
