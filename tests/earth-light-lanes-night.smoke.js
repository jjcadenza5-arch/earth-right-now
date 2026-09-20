import { earthLightLanes } from "../src/earth-light-lanes.js";
const checkedAt=new Date().toISOString(),base={truth:"EXTERNAL_LIVE",permission:"LINK_ONLY",health:"HEALTHY",playback:"EXTERNAL",sourceUrl:"https://example.com",checkedAt,lastSuccessfulCheck:checkedAt,quality:80,moment:80,lat:0,lon:180};
const lanes=earthLightLanes([{...base,id:"city",categories:["Cities & Streets"]},{...base,id:"nature",categories:["Mountains"]}],{now:new Date("2026-03-20T12:00:00Z")});
const night=lanes.find(x=>x.phase==="NIGHT");
console.assert(night?.items.some(x=>x.id==="city"),"night lane should retain city night scenes");
console.assert(!night?.items.some(x=>x.id==="nature"),"night lane should not promote dark nature merely because it is night");
console.log("ERN Earth light lane night-quality checks passed");
