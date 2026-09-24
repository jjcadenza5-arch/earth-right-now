import fs from "node:fs";import assert from "node:assert/strict";import {validateSource} from "../src/source-validator.js";
const rows=JSON.parse(fs.readFileSync("data/sources.json","utf8"));
const expected={
 "volcan-tajogaite":[28.612778,-17.866111],
 "sasagawa-nagare":[38.374444,139.458139],
 "waikiki-south-shore":[21.27406,-157.82628],
 "cold-lake-marina":[54.46578,-110.17009],
 "pleasant-beach-lake-ontario":[43.31788,-76.70581]
};
for(const [id,[lat,lon]] of Object.entries(expected)){const s=rows.find(x=>x.id===id);assert.ok(s,id);assert.equal(s.coordinateBasis,"PLACE_REFERENCE",id);assert.equal(s.lat,lat,id);assert.equal(s.lon,lon,id);assert.match(s.coordinateSourceUrl,/^https:\/\//,id);assert.ok(s.coordinateNote,id);assert.deepEqual(validateSource(s),[],id);}
console.log("ERN Atlas mapping tranche I passed");
