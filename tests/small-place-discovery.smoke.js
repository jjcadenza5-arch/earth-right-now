import {smallPlaceSignals,discoveryMix} from "../src/small-place-discovery.js";
const market={title:"Sunday Walking Market",region:"Small village",categories:["Markets"]},icon={title:"Iconic City Skyline",story:"World famous landmark"},coast={title:"Quiet Coast",story:"local beach promenade"};
console.assert(smallPlaceSignals(market).discoveryWorth,"market should qualify for discovery");
console.assert(smallPlaceSignals(market).localScore>smallPlaceSignals({title:"Generic beach"}).localScore,"strong local context should outrank a generic category word");
console.assert(!smallPlaceSignals(icon).discoveryWorth,"fame alone is not small-place signal");
console.assert(!smallPlaceSignals({title:"Civic landmark",region:"small town"}).famous,"landmark alone must not imply fame");
const mixed=discoveryMix([icon,market,coast],{limit:3,promote:true});console.assert(mixed.some(x=>x===market),"small place must remain visible");console.assert(mixed.length===3,"mix must preserve useful inventory");
const ranked=discoveryMix([{title:"Generic beach"},market,{title:"Local marina",story:"neighbourhood waterfront"}],{limit:3,promote:true});console.assert(ranked[0]!==ranked.find(x=>x.title==="Generic beach"),"weak generic category should not take the promoted local slot");
console.log("small-place discovery checks passed");
