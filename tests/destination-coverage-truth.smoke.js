import { destinationCoverage,destinationCoverageCopy } from "../src/destination-coverage.js";
const now=new Date("2026-03-20T12:00:00Z"),checkedAt=now.toISOString(),live={id:"l",placeId:"a",truth:"EXTERNAL_LIVE",permission:"LINK_ONLY",health:"HEALTHY",playback:"EXTERNAL",sourceUrl:"https://example.com/live",checkedAt,lastSuccessfulCheck:checkedAt},preview={id:"p",placeId:"b",truth:"PREVIEW",permission:"UNKNOWN",health:"UNKNOWN",playback:"PREVIEW",sourceUrl:"https://example.com/photo"};
const places=[{id:"a",country:"A",sources:[live]},{id:"b",country:"B",sources:[preview]}],x=destinationCoverage(places,{now});
console.assert(x.currentDestinations===1&&x.referenceOnlyDestinations===1,"coverage must distinguish current destinations from reference-only destinations");
console.assert(destinationCoverageCopy(places,{now}).includes("2 views"),"mixed discovery should use neutral views wording");
console.assert(!destinationCoverageCopy(places,{now}).includes("2 windows"),"mixed discovery must not imply reference photos are live windows");
console.log("ERN destination coverage truth checks passed");
