import fs from "node:fs";import assert from "node:assert/strict";import {validateSource} from "../src/source-validator.js";import {atlasMaintenanceSummary} from "../src/atlas-maintenance-summary.js";
const rows=JSON.parse(fs.readFileSync("data/sources.json","utf8"));
const ids=["dolomiti-superski","florida-now","coogee-randwick-beaches","jungfrau-region"];
for(const id of ids){const s=rows.find(x=>x.id===id);assert.ok(s,id);assert.equal(s.coordinateBasis,"MULTI_SITE_COLLECTION",id);assert.equal(s.mapBehavior,"MULTI_SITE_UNPINNED",id);assert.equal(s.lat,undefined,id);assert.equal(s.lon,undefined,id);assert.ok(s.coordinateNote,id);assert.deepEqual(validateSource(s),[],id);}
const r=atlasMaintenanceSummary(rows,{now:new Date("2026-09-24T06:47:00Z"),limit:100});
for(const id of ids)assert.ok(!r.next.unmapped.some(x=>x.id===id),id+" must not be coordinate debt");
assert.ok(r.intentionalUnpinned>=ids.length+1);
console.log("ERN multi-site unpinned Atlas contract passed");
