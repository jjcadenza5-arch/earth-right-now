import { journeyDiversity,journeyDiversityCopy } from "../src/journey-diversity.js";
const xs=[{placeId:"a",country:"TH",categories:["City"]},{placeId:"b",country:"JP",categories:["City","Mountain"]},{placeId:"a",country:"TH",categories:["Water"]}];const x=journeyDiversity(xs);console.assert(x.windows===3&&x.places===2&&x.countries===2&&x.categories===3);console.assert(journeyDiversityCopy(xs)==="3 windows · 2 places · 2 countries");console.assert(journeyDiversityCopy([]).includes("No verified-current"));
console.log("ERN journey diversity smoke checks passed");
