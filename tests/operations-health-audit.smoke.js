import { operationsReport } from "../src/operations-report.js";

const now="2026-09-19T05:00:00.000Z";
const source={id:"camera-a",placeId:"place-a",title:"Camera A",provider:"Provider",country:"Testland",region:"Test",categories:["Useful Earth"],truth:"EXTERNAL_LIVE",permission:"LINK_ONLY",health:"HEALTHY",playback:"EXTERNAL",sourceUrl:"https://example.com/live",embedUrl:null,thumbnailUrl:null,attribution:"Provider",checkedAt:now,lastSuccessfulCheck:now,failureReason:null,quality:80,freshness:80,moment:80,story:"Test",lat:0,lon:0,timeZone:"UTC",rightsBasis:"Link-only test source",officialUrl:"https://example.com/"};

const report=operationsReport([source],{checkedAt:now,healthObservations:{"camera-a":{httpOk:true,providerConfirmed:true}}});
console.assert(report.snapshot.total===1,"operations report should include catalog snapshot");
console.assert(report.healthAutomation?.complete===true,"complete health batch should audit green");
console.assert(report.healthAutomation?.proposals===1,"health proposal count should be visible");

const partial=operationsReport([source],{checkedAt:now,healthObservations:{"wrong-id":{httpOk:true,providerConfirmed:true}}});
console.assert(partial.healthAutomation?.complete===false,"mismatched health batch must not look complete");
console.assert(partial.healthAutomation.issues.includes("UNKNOWN_OBSERVATION_IDS"),"unknown observation IDs should reach operations output");
console.assert(partial.healthAutomation.issues.includes("UNOBSERVED_SOURCES"),"unobserved catalog sources should reach operations output");
console.log("ERN operations health-audit smoke checks passed");
