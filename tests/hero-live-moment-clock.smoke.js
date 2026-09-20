import { heroEligible,heroPool } from "../src/hero-eligibility.js";
import { liveInventory } from "../src/live-inventory.js";
import { orderedHeroSources } from "../src/hero-rotation.js";
const checked=new Date("2026-03-20T12:00:00Z"),s={id:"x",placeId:"x",title:"X",country:"X",truth:"LIVE_VIDEO",permission:"EMBED_ALLOWED",health:"HEALTHY",playback:"EMBED",embedUrl:"https://www.youtube.com/embed/ern-test",sourceUrl:"https://example.test/live",checkedAt:checked.toISOString(),lastSuccessfulCheck:checked.toISOString(),quality:80,moment:80,freshness:80,lat:0,lon:0,categories:["Cities & Streets"]};
console.assert(heroEligible(s,{now:checked})&&heroPool([s],{now:checked}).length===1&&liveInventory([s],{now:checked}).length===1,"current source should be eligible across hero/live inventory at one moment");
const future=new Date("2026-04-20T12:00:00Z");
console.assert(!heroEligible(s,{now:future})&&heroPool([s],{now:future}).length===0&&liveInventory([s],{now:future}).length===0,"expired source must disappear consistently across hero/live inventory");
console.assert(orderedHeroSources([s],future).length===1,"rotation may retain supplied fallback pool but must not misclassify it as current");
console.log("ERN hero/live moment-clock checks passed");
