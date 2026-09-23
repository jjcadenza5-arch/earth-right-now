import fs from "node:fs";import assert from "node:assert/strict";import {validateSource} from "../src/source-validator.js";
const rows=JSON.parse(fs.readFileSync("data/sources.json","utf8"));
const expected={"sanparks-addo-video":"REGION_REFERENCE","sanparks-orpen-video":"PLACE_REFERENCE","boulders-penguins-sanparks":"PLACE_REFERENCE","nossob-kgalagadi":"PLACE_REFERENCE","takayama-miyagawa-stream":"PLACE_REFERENCE","takayama-miyagawa-current-image":"PLACE_REFERENCE"};
for(const [id,basis] of Object.entries(expected)){const s=rows.find(x=>x.id===id);assert.ok(s,id);assert.equal(s.coordinateBasis,basis,id);assert.match(s.coordinateSourceUrl,/^https:\/\//,id);assert.deepEqual(validateSource(s),[],id);}
console.log("ERN Atlas coordinate provenance tranche D passed");
