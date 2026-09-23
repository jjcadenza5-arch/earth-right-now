import fs from "node:fs";import assert from "node:assert/strict";import {validateSource} from "../src/source-validator.js";
const rows=JSON.parse(fs.readFileSync("data/sources.json","utf8"));
const expected={
 "meads-bay-anguilla":"PLACE_REFERENCE","druif-beach-aruba":"PLACE_REFERENCE","chicago-field-skyline":"PLACE_REFERENCE",
 "nyc-skyline-jersey-city-earthcam":"PLACE_REFERENCE","windjammer-lauderdale":"PLACE_REFERENCE","marco-island-beach":"PLACE_REFERENCE",
 "sint-maarten-little-bay":"PLACE_REFERENCE","dublin-temple-bar":"PLACE_REFERENCE","tbilisi-freedom-square":"PLACE_REFERENCE",
 "kilauea-summit":"REGION_REFERENCE","zermatt-matterhorn":"PLACE_REFERENCE","st-moritz":"PLACE_REFERENCE","lake-lucerne-official":"REGION_REFERENCE"
};
for(const [id,basis] of Object.entries(expected)){
 const s=rows.find(x=>x.id===id);assert.ok(s,id);assert.equal(s.coordinateBasis,basis,id);assert.match(s.coordinateSourceUrl,/^https:\/\//,id);assert.deepEqual(validateSource(s),[],id);
}
console.log("ERN Atlas coordinate provenance tranche C passed");
