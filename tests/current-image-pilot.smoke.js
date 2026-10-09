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

// Other reviewed current-image sources may be approved independently.
// The controlled renewal workflow must keep its two original pilots valid,
// without downgrading separately approved providers.
for(const source of rows.filter(x=>x.playback==="IMAGE_REFRESH")){
  assert.equal(source.permission,"EMBED_ALLOWED",source.id);
  assert.match(source.sourceUrl,/^https:\/\//,source.id);
  assert.ok(Number(source.refreshMs)>=600000,source.id);
}
console.log("Two protected pilot sources retain their contract; independently approved current-image sources remain valid");
