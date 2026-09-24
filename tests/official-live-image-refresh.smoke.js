import fs from "node:fs";import assert from "node:assert/strict";
const rows=JSON.parse(fs.readFileSync("data/sources.json","utf8"));
for(const id of ["lake-lucerne-official","kaikoura-coast","reykjavik-metoffice","glenelg-sa","brighton-sa"]){
 const r=rows.find(x=>x.id===id);assert.ok(r,id);assert.equal(r.truth,"LIVE_IMAGE");assert.equal(r.health,"HEALTHY");assert.equal(r.permission,"LINK_ONLY");assert.equal(r.playback,"EXTERNAL");assert.equal(r.checkedAt,"2026-09-24T15:18:00Z");assert.equal(r.lastSuccessfulCheck,"2026-09-24T15:18:00Z");assert.ok((r.freshness||0)>=96);assert.match(r.freshnessEvidence,/Fresh/);
}
console.log("ERN official live-image source refresh remains external/link-only");
