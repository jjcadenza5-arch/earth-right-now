import fs from "node:fs";import assert from "node:assert/strict";import {validateSource} from "../src/source-validator.js";
const rows=JSON.parse(fs.readFileSync("data/sources.json","utf8"));
const ids=["mpala-watering-hole","lajes-pico-harbour","roque-observatory","cijin-beach-kaohsiung","cancun-live-aqua-beach","taitung-jinzun","bergen-ulriken"];
for(const id of ids){const s=rows.find(x=>x.id===id);assert.ok(s,id);assert.equal(s.coordinateBasis,"PLACE_REFERENCE",id);assert.match(s.coordinateSourceUrl,/^https:\/\//,id);assert.deepEqual(validateSource(s),[],id);}
console.log("ERN Atlas coordinate provenance tranche H passed");
