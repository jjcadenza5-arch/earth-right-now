import { watchEarthMomentLabel } from "../src/watch-earth-moment-copy.js";
const day={lat:0,lon:0,categories:["Beautiful Earth"]},nightCity={lat:0,lon:180,categories:["Cities & Streets"]},nightNature={lat:0,lon:180,categories:["Mountains"]},now=new Date("2026-03-20T12:00:00Z");
console.assert(watchEarthMomentLabel(day,now)==="Daylight now","DAY solar phase should produce daylight copy");
console.assert(watchEarthMomentLabel(nightCity,now)==="Night lights","city night should receive night-lights copy");
console.assert(watchEarthMomentLabel(nightNature,now)==="Night now","dark nature should not be described as night lights");
console.log("ERN Watch Earth moment-copy phase alignment checks passed");
