import fs from "node:fs";import assert from "node:assert/strict";
const rows=JSON.parse(fs.readFileSync("data/sources.json","utf8"));
const pilots=rows.filter(x=>x.currentImagePilot===true);
assert.equal(pilots.length,2);
for(const s of pilots){assert.equal(s.permission,"EMBED_ALLOWED");assert.equal(s.playback,"IMAGE_REFRESH");assert.ok(["yellowstone-biscuit-basin-current-image","nz-ruapehu-current-image"].includes(s.id))}
console.log("Pilot evidence renewal scope remains exactly two sources");
