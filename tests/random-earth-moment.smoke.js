import { surprisePool,surpriseSource } from "../src/random-earth.js";
const now=new Date("2026-03-20T12:00:00Z"),base={truth:"EXTERNAL_LIVE",permission:"LINK_ONLY",health:"HEALTHY",playback:"EXTERNAL",sourceUrl:"https://example.com",checkedAt:now.toISOString(),lastSuccessfulCheck:now.toISOString(),quality:80};
const current={...base,id:"a",placeId:"a"},preview={id:"p",placeId:"p",truth:"PREVIEW",permission:"UNKNOWN",health:"UNKNOWN",playback:"PREVIEW",sourceUrl:"https://example.com/p"};
console.assert(surprisePool([current,preview],{now})[0]?.id==="a","Surprise should prefer a verified-current view at requested moment");
const future=new Date("2026-04-20T12:00:00Z");console.assert(surprisePool([current,preview],{now:future}).some(x=>x.id==="p"),"when current evidence expires Surprise may fall back to discoverable reference choices");
console.assert(surpriseSource([current],()=>0,{now})?.id==="a","Surprise source should pass moment context through playback choice");
console.log("ERN Surprise moment checks passed");
