import {smallPlaceSignals,discoveryMix} from "../src/small-place-discovery.js";
const market={title:"Sunday Walking Market",region:"Small village",categories:["Markets"]},icon={title:"Iconic City Skyline",story:"World famous landmark"},coast={title:"Quiet Coast",story:"local beach promenade"};
console.assert(smallPlaceSignals(market).discoveryWorth,"market should qualify for discovery");
console.assert(!smallPlaceSignals(icon).discoveryWorth,"fame alone is not small-place signal");
const mixed=discoveryMix([icon,market,coast],{limit:3});console.assert(mixed.some(x=>x===market),"small place must remain visible");console.assert(mixed.length===3,"mix must preserve useful inventory");
console.log("small-place discovery checks passed");