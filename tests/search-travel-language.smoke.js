import { searchEarth } from "../src/search-engine.js";
const now=new Date().toISOString(),base={truth:"EXTERNAL_LIVE",permission:"LINK_ONLY",health:"HEALTHY",playback:"EXTERNAL",sourceUrl:"https://example.com",checkedAt:now,lastSuccessfulCheck:now,quality:80,freshness:80,moment:80};
const sources=[
 {...base,id:"chiang-mai",title:"Chiang Mai Old City",region:"Chiang Mai",country:"Thailand",categories:["Cities & Streets"]},
 {...base,id:"zurich",title:"Zürich City",region:"Zürich",country:"Switzerland",categories:["Cities & Streets"]}
];
console.assert(searchEarth(sources,"I want to see Chiang Mai before I go")[0]?.id==="chiang-mai","travel phrasing should resolve the destination rather than matching filler words");
console.assert(searchEarth(sources,"show me live Zürich")[0]?.id==="zurich","current-intent travel phrasing should preserve place matching");
console.log("ERN natural travel search smoke checks passed");
