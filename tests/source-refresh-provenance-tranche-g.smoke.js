import fs from "node:fs";import assert from "node:assert/strict";import {validateSource} from "../src/source-validator.js";
const rows=JSON.parse(fs.readFileSync("data/sources.json","utf8"));
const expected={"kitzbuhel":"REGION_REFERENCE","flam-fjord-official":"REGION_REFERENCE","cape-town-earthtv":"PLACE_REFERENCE","statue-liberty-harbor-earthcam":"PLACE_REFERENCE","statue-liberty-earthcam":"PLACE_REFERENCE","tbilisi-mtkvari-river":"PLACE_REFERENCE"};
for(const [id,basis] of Object.entries(expected)){const s=rows.find(x=>x.id===id);assert.ok(s,id);assert.equal(s.coordinateBasis,basis,id);assert.match(s.coordinateSourceUrl,/^https:\/\//,id);assert.equal(s.checkedAt,"2026-09-24T13:47:00+07:00",id);assert.ok(s.freshnessEvidence,id);assert.deepEqual(validateSource(s),[],id);}
console.log("ERN source refresh and Atlas provenance tranche G passed");
