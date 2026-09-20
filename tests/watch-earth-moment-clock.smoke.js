import { immersiveWatchEarthSources } from "../src/immersive-watch-earth.js";
import { buildDynamicWatchEarth } from "../src/dynamic-watch-earth.js";
const now=new Date("2026-03-20T12:00:00Z"),checkedAt=now.toISOString(),s={id:"x",placeId:"x",title:"X",country:"X",truth:"LIVE_VIDEO",permission:"EMBED_ALLOWED",health:"HEALTHY",playback:"EMBED",embedUrl:"https://www.youtube.com/embed/live_stream?channel=x",sourceUrl:"https://youtube.com/watch?v=x",checkedAt,lastSuccessfulCheck:checkedAt,quality:90,moment:90,freshness:90,lat:0,lon:0,categories:["Cities & Streets"]};
console.assert(immersiveWatchEarthSources([s],{now}).length===1,"current source should be immersive at the requested moment");
const future=new Date("2026-04-20T12:00:00Z");
console.assert(immersiveWatchEarthSources([s],{now:future}).length===0,"expired source must not survive because wall clock differs");
console.assert(buildDynamicWatchEarth([s],{limit:20,now:future}).length===0,"dynamic Watch Earth must use one currentness clock end-to-end");
console.log("ERN Watch Earth moment-clock checks passed");
