import { journeyCopy } from "../src/watch-earth-copy.js";
const day={title:"Day City",truth:"LIVE_VIDEO",playback:"EMBED",lat:0,lon:0,categories:["Cities & Streets"]};
const timed=journeyCopy({index:0,total:1,source:day,playing:true},{now:new Date("2026-03-20T12:00:00Z")});
console.assert(timed.counter==="1 / 1"&&timed.action==="Pause journey","existing journey controls should remain intact");
console.assert(timed.moment==="Daylight now","journey copy should expose the truthful local light moment");
console.assert(journeyCopy(null).moment==="","empty journey should not invent a moment");
console.log("ERN Watch Earth journey-copy checks passed");
