import fs from "node:fs";import assert from "node:assert/strict";
const rows=JSON.parse(fs.readFileSync("data/sources.json","utf8"));
const ids=["kilauea-summit","yellowstone-national-park","san-diego-zoo","georgia-aquarium","zermatt-matterhorn","chamonix-mont-blanc","whistler-blackcomb","florida-now"];
for(const id of ids){const x=rows.find(r=>r.id===id);assert.ok(x,id);assert.equal(x.checkedAt,"2026-09-23T09:36:00+07:00");assert.equal(x.lastSuccessfulCheck,x.checkedAt);assert.ok(String(x.freshnessEvidence||"").length>60,id+" freshness evidence");assert.equal(x.failureReason,null)}
console.log("ERN official source revalidation tranche A passed");
