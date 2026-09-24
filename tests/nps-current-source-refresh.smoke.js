import fs from "node:fs";import assert from "node:assert/strict";
const rows=JSON.parse(fs.readFileSync("data/sources.json","utf8"));
for(const id of ["grand-canyon-national-park","mount-rainier-national-park","glacier-national-park"]){
 const r=rows.find(x=>x.id===id);assert.ok(r,id);assert.equal(r.health,"HEALTHY");assert.equal(r.permission,"LINK_ONLY");assert.equal(r.playback,"EXTERNAL");assert.equal(r.checkedAt,"2026-09-24T15:12:00Z");assert.equal(r.lastSuccessfulCheck,"2026-09-24T15:12:00Z");assert.match(r.freshnessEvidence,/Fresh official National Park Service/);
}
console.log("ERN NPS current-source refresh remains link-only and healthy");
