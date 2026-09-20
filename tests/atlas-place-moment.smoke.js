import { groupByPlace } from "../src/place-model.js";import { atlasDestinationResults } from "../src/atlas-destinations.js";import { atlasClusterSummary } from "../src/atlas-cluster-destinations.js";
const now=new Date("2026-03-20T12:00:00Z"),base={title:"City",placeId:"p",country:"X",region:"Y",truth:"EXTERNAL_LIVE",permission:"LINK_ONLY",health:"HEALTHY",playback:"EXTERNAL",sourceUrl:"https://example.com",quality:80},fresh={...base,id:"fresh",checkedAt:now.toISOString(),lastSuccessfulCheck:now.toISOString()},old={...base,id:"old",quality:99,checkedAt:"2026-01-01T00:00:00Z",lastSuccessfulCheck:"2026-01-01T00:00:00Z"};
console.assert(groupByPlace([old,fresh],{now})[0].preferred.id==="fresh","place grouping must prefer current evidence at supplied moment");
console.assert(atlasDestinationResults([old,fresh],{current:true},"",{now}).length===1,"Atlas current filter should share supplied moment");
const future=new Date("2026-04-20T12:00:00Z");console.assert(atlasDestinationResults([old,fresh],{current:true},"",{now:future}).length===0,"Atlas current filter must expire stale verification");
console.assert(atlasClusterSummary({sources:[fresh]},{now}).title==="City","single destination cluster remains destination-first");
console.log("ERN Atlas/place moment checks passed");
