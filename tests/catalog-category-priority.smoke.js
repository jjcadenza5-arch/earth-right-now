import { recoveryNeeds } from "../src/catalog-balance.js";
const base={health:"HEALTHY",permission:"LINK_ONLY",playback:"EXTERNAL",truth:"EXTERNAL_LIVE",sourceUrl:"https://example.com"};
const rows=[
 {...base,id:"a",country:"A",provider:"P1",categories:["Beautiful Earth","Cities & Harbours"]},
 {...base,id:"b",country:"B",provider:"P2",categories:["Useful Earth","Wildlife"]},
 {...base,id:"c",country:"C",provider:"P3",categories:["Interesting Earth","Mountains & Snow"]}
];
const need=recoveryNeeds(rows).find(x=>x.startsWith("underrepresented categories:"));
console.assert(need&&!need.includes("Beautiful Earth")&&!need.includes("Useful Earth")&&!need.includes("Interesting Earth"),"editorial moment families must not crowd out concrete catalog gaps");
console.assert(need.includes("Cities & Harbours")||need.includes("Wildlife")||need.includes("Mountains & Snow"));
console.log("ERN catalog category priority smoke checks passed");
