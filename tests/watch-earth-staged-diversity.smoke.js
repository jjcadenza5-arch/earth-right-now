import { buildWatchEarth } from "../src/watch-earth.js";
const checkedAt=new Date().toISOString(),base={truth:"EXTERNAL_LIVE",permission:"LINK_ONLY",health:"HEALTHY",playback:"EXTERNAL",sourceUrl:"https://example.com",checkedAt,lastSuccessfulCheck:checkedAt,quality:80,freshness:80,moment:80,categories:["Cities"],lat:0};
const rows=[
 {...base,id:"a1",placeId:"a1",country:"A",lon:0},
 {...base,id:"a2",placeId:"a2",country:"A",lon:10},
 {...base,id:"a3",placeId:"a3",country:"A",lon:20},
 {...base,id:"b1",placeId:"b1",country:"B",lon:30},
 {...base,id:"a1-alt",placeId:"a1",country:"A",lon:1}
];
const result=buildWatchEarth(rows,{limit:4,maxPerCountry:1,maxPerPlace:1,now:new Date("2026-03-20T12:00:00Z")});
console.assert(result.length===4,"truthful pool should fill the requested journey");
console.assert(new Set(result.map(x=>x.placeId)).size===4,"country cap should relax before place variety");
console.log("ERN Watch Earth staged diversity checks passed");
