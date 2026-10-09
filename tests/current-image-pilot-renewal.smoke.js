import fs from "node:fs";import assert from "node:assert/strict";
const rows=JSON.parse(fs.readFileSync("data/sources.json","utf8"));
const ids=["yellowstone-biscuit-basin-current-image","nz-ruapehu-current-image"];
for(const id of ids){const s=rows.find(x=>x.id===id);assert.ok(s,id);assert.equal(s.permission,"EMBED_ALLOWED");assert.equal(s.playback,"IMAGE_REFRESH");}
const ledger=JSON.parse(fs.readFileSync("data/current-image-pilot-observations.json","utf8"));
assert.deepEqual([...ledger.allowedSourceIds].sort(),[...ids].sort());
assert.equal(ledger.pilot,"CONTROLLED_IMAGE_REFRESH_2_SOURCE");
console.log("Pilot evidence renewal scope remains exactly two sources");
