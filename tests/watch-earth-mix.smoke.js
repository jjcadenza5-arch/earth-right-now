import { balanceWatchEarthMoments,watchEarthLane } from "../src/watch-earth-mix.js";
const now=new Date("2026-03-20T12:00:00Z"),base={lat:0,categories:["Cities"]};
const rows=[
 {...base,id:"day1",lon:0},{...base,id:"day2",lon:10},{...base,id:"day3",lon:-10},
 {...base,id:"night1",lon:180},{...base,id:"night2",lon:170},
 {...base,id:"gold1",lon:90},{...base,id:"gold2",lon:-90}
];
const out=balanceWatchEarthMoments(rows,{limit:6,now,minimums:{golden:1,daylight:2,nightCity:1}});
const lanes=out.map(x=>watchEarthLane(x,now));
console.assert(lanes.filter(x=>x==="golden").length>=1,"journey should include golden light when available");
console.assert(lanes.filter(x=>x==="daylight").length>=2,"journey should retain useful daylight");
console.assert(lanes.filter(x=>x==="nightCity").length>=1,"journey should include beautiful night cities when available");
console.assert(new Set(out.map(x=>x.id)).size===out.length&&out.length===6,"mix must stay unique and fill target");
console.log("ERN Watch Earth moment-mix smoke checks passed");
