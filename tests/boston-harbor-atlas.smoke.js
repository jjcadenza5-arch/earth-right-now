import fs from "node:fs";import assert from "node:assert/strict";import {validateSource} from "../src/source-validator.js";
const rows=JSON.parse(fs.readFileSync("data/sources.json","utf8"));const s=rows.find(x=>x.id==="boston-harbor-islands");
assert.ok(s);assert.equal(s.coordinateBasis,"PLACE_REFERENCE");assert.equal(s.lat,42.3293333);assert.equal(s.lon,-70.8918056);assert.match(s.coordinateSourceUrl,/^https:\/\/www\.nps\.gov\/boha\//);assert.equal(s.checkedAt,"2026-09-24T13:47:00+07:00");assert.ok(s.freshnessEvidence);assert.deepEqual(validateSource(s),[]);
console.log("ERN Boston Harbor Islands Atlas mapping passed");
