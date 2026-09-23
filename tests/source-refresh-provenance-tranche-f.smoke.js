import fs from "node:fs";import assert from "node:assert/strict";import {validateSource} from "../src/source-validator.js";
const rows=JSON.parse(fs.readFileSync("data/sources.json","utf8"));
const expected={"auckland-viaduct-harbour":"PLACE_REFERENCE","pattaya-city-live":"REGION_REFERENCE","ski-arlberg":"REGION_REFERENCE"};
for(const [id,basis] of Object.entries(expected)){const s=rows.find(x=>x.id===id);assert.ok(s,id);assert.equal(s.coordinateBasis,basis,id);assert.match(s.coordinateSourceUrl,/^https:\/\//,id);assert.equal(s.checkedAt,"2026-09-23T14:24:00Z",id);assert.ok(s.freshnessEvidence,id);assert.deepEqual(validateSource(s),[],id);}
console.log("ERN source refresh and Atlas provenance tranche F passed");
