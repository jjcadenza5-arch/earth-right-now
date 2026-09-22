import { watchEarthSnapshot } from "../src/watch-earth.js";
const checkedAt=new Date().toISOString(),base={truth:"EXTERNAL_LIVE",permission:"LINK_ONLY",health:"HEALTHY",playback:"EXTERNAL",sourceUrl:"https://example.com",checkedAt,lastSuccessfulCheck:checkedAt,quality:80,moment:80,categories:["Cities & Streets"],lat:0};
const rows=[{...base,id:"a",placeId:"a",country:"A",lon:0},{...base,id:"b",placeId:"b",country:"B",lon:180},{...base,id:"c",placeId:"c",country:"C",lon:20}];
const x=watchEarthSnapshot(rows,{limit:3,now:new Date("2026-03-20T12:00:00Z")});
console.assert(x.count===3&&x.places===3&&x.countries===3,"snapshot should expose journey breadth");
console.assert(x.providers===1&&x.embeds===0&&x.embedShare===0,"snapshot should expose provider and embed concentration");
console.assert(Object.values(x.phases).reduce((a,b)=>a+b,0)===3,"solar phase counts should cover the journey");
console.assert(x.nightCities>=1,"snapshot should expose promoted night-city presence");
console.log("ERN Watch Earth journey diagnostics checks passed");
