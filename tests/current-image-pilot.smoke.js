import fs from "node:fs";
import assert from "node:assert/strict";

const rows=JSON.parse(fs.readFileSync("data/sources.json","utf8"));
const pilotIds=["yellowstone-biscuit-basin-current-image","nz-ruapehu-current-image"];
for(const id of pilotIds){
  const s=rows.find(x=>x.id===id);
  assert.ok(s,id);
  assert.equal(s.truth,"LIVE_IMAGE");
  assert.equal(s.permission,"EMBED_ALLOWED");
  assert.equal(s.playback,"IMAGE_REFRESH");
  assert.match(s.sourceUrl,/^https:\/\//);
  assert.match(s.officialUrl,/^https:\/\//);
  assert.notEqual(s.sourceUrl,s.officialUrl);
  assert.ok(Number(s.refreshMs)>=600000);
}
const ruapehu=rows.find(x=>x.id==="nz-ruapehu-current-image");
assert.match(ruapehu.attribution,/GeoNet.*NHC.*ESNZ.*LINZ.*NEMA.*MBIE/i);

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
