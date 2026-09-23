import fs from "node:fs";import assert from "node:assert/strict";import {validateSource} from "../src/source-validator.js";
const rows=JSON.parse(fs.readFileSync("data/sources.json","utf8"));
const expected={"glenelg-sa":"PLACE_REFERENCE","brighton-sa":"PLACE_REFERENCE","amden-walensee-official":"REGION_REFERENCE","oeschinensee-official":"REGION_REFERENCE","verbier":"PLACE_REFERENCE","reykjavik-metoffice":"PLACE_REFERENCE","kaikoura-coast":"PLACE_REFERENCE"};
for(const [id,basis] of Object.entries(expected)){const s=rows.find(x=>x.id===id);assert.ok(s,id);assert.equal(s.coordinateBasis,basis,id);assert.match(s.coordinateSourceUrl,/^https:\/\//,id);assert.equal(s.checkedAt,"2026-09-23T14:20:00Z",id);assert.ok(s.freshnessEvidence,id);assert.deepEqual(validateSource(s),[],id);}
console.log("ERN source refresh and Atlas provenance tranche E passed");
