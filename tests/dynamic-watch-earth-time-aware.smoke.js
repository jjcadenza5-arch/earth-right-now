import { buildDynamicWatchEarth } from "../src/dynamic-watch-earth.js";

const checkedAt=new Date().toISOString();
const base={truth:"LIVE_VIDEO",permission:"EMBED_ALLOWED",health:"HEALTHY",playback:"EMBED",embedUrl:"https://www.youtube.com/embed/test",sourceUrl:"https://example.com",checkedAt,lastSuccessfulCheck:checkedAt,quality:80,freshness:80,moment:70,categories:["Cities"],lat:0};
const rows=[
 {...base,id:"day",placeId:"day",country:"A",lon:0,embedUrl:"https://www.youtube.com/embed/day",sourceUrl:"https://www.youtube.com/watch?v=day"},
 {...base,id:"sunset",placeId:"sunset",country:"B",lon:90,embedUrl:"https://www.youtube.com/embed/sunset",sourceUrl:"https://www.youtube.com/watch?v=sunset"},
 {...base,id:"night-city",placeId:"night-city",country:"C",lon:180,embedUrl:"https://www.youtube.com/embed/night-city",sourceUrl:"https://www.youtube.com/watch?v=night-city"},
 {...base,id:"night-nature",placeId:"night-nature",country:"D",lon:180,categories:["Mountains & Nature"],embedUrl:"https://www.youtube.com/embed/night-nature",sourceUrl:"https://www.youtube.com/watch?v=night-nature"}
];
const result=buildDynamicWatchEarth(rows,{limit:3,now:new Date("2026-03-20T12:00:00Z")});
console.assert(result.length===3,"dynamic Watch Earth should return requested truthful windows");
console.assert(!result.some(x=>x.id==="night-nature"),"dark nature should stay behind stronger current moments when the journey is full");
console.assert(new Set(result.map(x=>x.placeId)).size===result.length,"dynamic Watch Earth should preserve place variety");
console.log("ERN dynamic time-aware Watch Earth integration checks passed");
