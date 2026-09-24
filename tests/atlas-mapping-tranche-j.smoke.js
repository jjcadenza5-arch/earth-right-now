import fs from "node:fs";import assert from "node:assert/strict";import {validateSource} from "../src/source-validator.js";
const rows=JSON.parse(fs.readFileSync("data/sources.json","utf8"));
const expected={
 "kijihiki-plateau":["PLACE_REFERENCE",41.943912,140.616395],
 "blouberg-table-mountain":["PLACE_REFERENCE",-33.7973,18.461],
 "perdido-key-beach":["PLACE_REFERENCE",30.295185,-87.440376],
 "maui-hale-pau-hana":["PLACE_REFERENCE",20.7182,-156.4466],
 "metung-gippsland-lakes":["PLACE_REFERENCE",-37.8921089,147.8542936],
 "ponte-di-legno-adamello":["REGION_REFERENCE",46.2586,10.5087]
};
for(const [id,[basis,lat,lon]] of Object.entries(expected)){const s=rows.find(x=>x.id===id);assert.ok(s,id);assert.equal(s.coordinateBasis,basis,id);assert.equal(s.lat,lat,id);assert.equal(s.lon,lon,id);assert.match(s.coordinateSourceUrl,/^https:\/\//,id);assert.ok(s.coordinateNote,id);assert.deepEqual(validateSource(s),[],id);}
const intentional=new Set(["DYNAMIC_UNPINNED","MULTI_SITE_UNPINNED"]);
const unresolved=rows.filter(s=>!intentional.has(s.mapBehavior)&&(!Number.isFinite(s.lat)||!Number.isFinite(s.lon)));
assert.deepEqual(unresolved.map(s=>s.id),[],"every static single-location source should now be mapped");
const mapped=rows.filter(s=>Number.isFinite(s.lat)&&Number.isFinite(s.lon));
assert.ok(mapped.every(s=>s.coordinateBasis&&s.coordinateSourceUrl),"every mapped source must have coordinate provenance");
console.log("ERN Atlas mapping tranche J and static mapping completeness passed");
