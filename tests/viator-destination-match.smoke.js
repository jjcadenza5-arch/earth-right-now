import assert from "node:assert/strict";
import {destinationAncestry,exactDestinationCandidates} from "../src/viator-destination-match.js";

const rows=[
 {destinationId:1,name:"New Zealand",type:"COUNTRY",parentDestinationId:null},
 {destinationId:2,name:"North Island",type:"REGION",parentDestinationId:1},
 {destinationId:3,name:"Auckland",type:"CITY",parentDestinationId:2,lookupId:"1.2.3",timeZone:"Pacific/Auckland"},
 {destinationId:4,name:"Auckland",type:"CITY",parentDestinationId:99},
 {destinationId:5,name:"Auckland Region",type:"REGION",parentDestinationId:1},
 {destinationId:99,name:"Elsewhere",type:"COUNTRY",parentDestinationId:null}
];

assert.deepEqual(destinationAncestry(rows,rows[2]).map(x=>x.name),["North Island","New Zealand"]);
const matches=exactDestinationCandidates(rows,{name:"Auckland",country:"New Zealand"});
assert.equal(matches.length,2);
assert.equal(matches[0].destinationId,"3");
assert.equal(matches[0].countryMatch,true);
assert.equal(matches[1].countryMatch,false);
assert.equal(exactDestinationCandidates(rows,{name:"Auck",country:"New Zealand"}).length,0);
console.log("Viator exact destination matching: ok");
