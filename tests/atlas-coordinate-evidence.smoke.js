import fs from "node:fs";import assert from "node:assert/strict";import {validateSource} from "../src/source-validator.js";
const rows=JSON.parse(fs.readFileSync("data/sources.json","utf8"));
const ids=["grand-canyon-national-park","yellowstone-national-park","mount-rainier-national-park","glacier-national-park"];
for(const id of ids){const x=rows.find(r=>r.id===id);assert.ok(x);assert.equal(x.coordinateBasis,"PLACE_REFERENCE");assert.ok(Number.isFinite(x.lat)&&Number.isFinite(x.lon));assert.match(x.coordinateSourceUrl,/^https:\/\//);assert.deepEqual(validateSource(x),[])}
const invalid={...rows.find(r=>r.id===ids[0]),coordinateBasis:"CAMERA_GUESS"};assert.ok(validateSource(invalid).includes("invalid coordinateBasis"));
const missingSource={...rows.find(r=>r.id===ids[0]),coordinateSourceUrl:null};assert.ok(validateSource(missingSource).includes("coordinateBasis requires coordinateSourceUrl"));
console.log("ERN Atlas coordinate evidence tranche passed");