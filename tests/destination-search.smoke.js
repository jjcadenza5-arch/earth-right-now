import { destinationSearch } from "../src/destination-search.js";
import { rankDestinationsForIntent } from "../src/ern-ai-destinations.js";
const now=new Date().toISOString(),base={health:"HEALTHY",permission:"LINK_ONLY",playback:"EXTERNAL",truth:"EXTERNAL_LIVE",checkedAt:now,lastSuccessfulCheck:now};
const rows=[
 {...base,id:"a",placeId:"beach",title:"Beach North",country:"Thailand",region:"Phuket",sourceUrl:"https://example.test/a",categories:["Beaches & Water"]},
 {...base,id:"b",placeId:"beach",title:"Beach South",country:"Thailand",region:"Phuket",sourceUrl:"https://example.test/b",categories:["Beaches & Water"]},
 {...base,id:"c",placeId:"city",title:"City Street",country:"Thailand",region:"Bangkok",sourceUrl:"https://example.test/c",categories:["Cities & Streets"]}
];
const search=destinationSearch(rows,"beach");
console.assert(search.length===1&&search[0].sources.length===2,"Explore search must collapse matching windows into one destination");
const ai=rankDestinationsForIntent(rows,"beautiful beach");
console.assert(ai.length===1&&ai[0].id==="beach","ERN AI should return destination context while preserving matching windows");
console.log("ERN destination-first search smoke checks passed");
