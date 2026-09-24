import fs from "node:fs";import assert from "node:assert/strict";import {validateSource} from "../src/source-validator.js";
const rows=JSON.parse(fs.readFileSync("data/sources.json","utf8"));
const expected={
 "queenstown-airport-alps":{lat:-45.0220678,lon:168.7372513,source:"queenstownairport.co.nz"},
 "georgia-aquarium":{lat:33.7638778,lon:-84.3979549,source:"georgiaaquarium.org"}
};
for(const [id,e] of Object.entries(expected)){const s=rows.find(x=>x.id===id);assert.ok(s,id);assert.equal(s.coordinateBasis,"PLACE_REFERENCE",id);assert.equal(s.lat,e.lat,id);assert.equal(s.lon,e.lon,id);assert.match(s.coordinateSourceUrl,new RegExp(e.source.replaceAll(".","\\.")),id);assert.equal(s.checkedAt,"2026-09-24T13:47:00+07:00",id);assert.ok(s.freshnessEvidence,id);assert.deepEqual(validateSource(s),[],id);}
console.log("ERN official single-site Atlas mapping passed");
