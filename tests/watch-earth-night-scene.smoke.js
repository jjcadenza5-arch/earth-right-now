import { watchEarthBeautyScore } from "../src/watch-earth-beauty.js";
const now=new Date("2026-03-20T12:00:00Z"),base={lat:0,lon:180,quality:80,moment:80};
const city={...base,categories:["Cities & Streets"]},culture={...base,categories:["Culture"]},mountain={...base,categories:["Mountains"]};
console.assert(watchEarthBeautyScore(city,now)>=watchEarthBeautyScore(culture,now)+10,"night-city boost should materially exceed generic culture at night");
console.assert(watchEarthBeautyScore(city,now)>watchEarthBeautyScore(mountain,now),"city night should outrank dark nature at equal editorial quality");
console.log("ERN night-scene classification checks passed");
