import fs from "node:fs";import assert from "node:assert/strict";
const rows=JSON.parse(fs.readFileSync("data/sources.json","utf8"));
const ids=["nyc-skyline-jersey-city-earthcam","meads-bay-anguilla","windjammer-lauderdale","druif-beach-aruba","marco-island-beach","dublin-temple-bar","chicago-field-skyline","sint-maarten-little-bay","tbilisi-freedom-square"];
for(const id of ids){const x=rows.find(r=>r.id===id);assert.ok(x,id);assert.equal(x.checkedAt,"2026-09-23T09:40:00+07:00");assert.equal(x.lastSuccessfulCheck,x.checkedAt);assert.ok(String(x.freshnessEvidence||"").length>55,id+" freshness evidence");assert.equal(x.failureReason,null)}
console.log("ERN EarthCam source revalidation tranche B passed");