import fs from "node:fs";
import assert from "node:assert/strict";

const rows=JSON.parse(fs.readFileSync("data/sources.json","utf8"));
const pilotIds=["yellowstone-biscuit-basin-current-image","nz-ruapehu-current-image"];
const pilots=rows.filter(x=>x.currentImagePilot===true);
assert.deepEqual(pilots.map(x=>x.id).sort(),pilotIds.slice().sort());

for(const id of pilotIds){
  const s=rows.find(x=>x.id===id);
  assert.ok(s,id);
  assert.equal(s.truth,"LIVE_IMAGE");
  assert.equal(s.permission,"EMBED_ALLOWED");
  assert.equal(s.playback,"IMAGE_REFRESH");
  assert.match(s.sourceUrl,/^https:\/\//);
  assert.match(s.officialUrl,/^https:\/\//);
  assert.notEqual(s.sourceUrl,s.officialUrl);
  assert.equal(s.pilotPhase,"CONTROLLED_IMAGE_REFRESH_2_SOURCE");
  assert.ok(Number(s.refreshMs)>=600000);
  assert.ok(Number(s.refreshIntervalSeconds)>=600);
  assert.match(s.rightsBasis,/Public Domain|CC BY/i);
  assert.match(s.freshnessEvidence,/machine-verified/i);
}
const ruapehu=rows.find(x=>x.id==="nz-ruapehu-current-image");
assert.match(ruapehu.attribution,/GeoNet programme and sponsors/i);

const nonPilotReviewReady=[
 "yellowstone-lake-current-image",
 "nz-taranaki-current-image",
 "nz-ngauruhoe-current-image",
 "nz-tongariro-current-image",
 "nz-whakaari-current-image"
];
for(const id of nonPilotReviewReady){
  const s=rows.find(x=>x.id===id);
  assert.ok(s,id);
  assert.equal(s.permission,"LINK_ONLY");
  assert.equal(s.playback,"EXTERNAL");
}
console.log("Two-source current-image pilot stays scoped, attributed and fail-closed elsewhere");
