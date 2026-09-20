import { destinationCoverage,destinationCoverageCopy } from "../src/destination-coverage.js";
const now=new Date(),checkedAt=now.toISOString(),base={truth:"EXTERNAL_LIVE",permission:"LINK_ONLY",health:"HEALTHY",playback:"EXTERNAL",sourceUrl:"https://example.com",checkedAt,lastSuccessfulCheck:checkedAt};
const ps=[{country:"TH",region:"North",sources:[{...base,id:"a",placeId:"a"},{...base,id:"b",placeId:"a"}]},{country:"JP",region:"Kanto",sources:[{...base,id:"c",placeId:"c"}]}],x=destinationCoverage(ps,{now});
console.assert(x.destinations===2&&x.windows===3&&x.countries===2&&x.multiWindowDestinations===1);
console.assert(x.currentDestinations===2&&x.referenceOnlyDestinations===0);
console.assert(destinationCoverageCopy(ps,{now})==="2 destinations · 3 views · 2 countries");
console.log("ERN destination coverage smoke checks passed");
