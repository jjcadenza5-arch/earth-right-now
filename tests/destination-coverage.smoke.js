import { destinationCoverage,destinationCoverageCopy } from "../src/destination-coverage.js";
const ps=[{country:"TH",region:"North",sources:[{checkedAt:"x"},{checkedAt:"x"}]},{country:"JP",region:"Kanto",sources:[{}]}];const x=destinationCoverage(ps);console.assert(x.destinations===2&&x.windows===3&&x.countries===2&&x.multiWindowDestinations===1);console.assert(destinationCoverageCopy(ps)==="2 destinations · 3 windows · 2 countries");
console.log("ERN destination coverage smoke checks passed");
