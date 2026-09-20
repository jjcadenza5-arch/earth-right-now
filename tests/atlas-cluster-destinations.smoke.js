import { atlasClusterDestinations,atlasClusterSummary } from "../src/atlas-cluster-destinations.js";
const now=new Date().toISOString();
const sources=[
 {id:"a",placeId:"p",title:"Beach north",country:"X",health:"HEALTHY",truth:"EXTERNAL_LIVE",permission:"LINK_ONLY",playback:"EXTERNAL",sourceUrl:"https://example.test/a",checkedAt:now,lastSuccessfulCheck:now},
 {id:"b",placeId:"p",title:"Beach south",country:"X",health:"HEALTHY",truth:"EXTERNAL_LIVE",permission:"LINK_ONLY",playback:"EXTERNAL",sourceUrl:"https://example.test/b",checkedAt:now,lastSuccessfulCheck:now},
 {id:"c",placeId:"q",title:"Harbour",country:"X",health:"HEALTHY",truth:"EXTERNAL_LIVE",permission:"LINK_ONLY",playback:"EXTERNAL",sourceUrl:"https://example.test/c",checkedAt:now,lastSuccessfulCheck:now}
];
const destinations=atlasClusterDestinations({sources}),summary=atlasClusterSummary({sources});
console.assert(destinations.length===2,"cluster drawer must collapse duplicate windows into destinations");
console.assert(destinations.find(x=>x.id==="p").sources.length===2,"destination must retain all Choose a Window options");
console.assert(summary.destinationCount===2&&summary.windows===3&&summary.title.includes("2 destinations · 3 views"));
console.log("ERN Atlas cluster destination smoke checks passed");
