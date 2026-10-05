import fs from "node:fs";
import assert from "node:assert/strict";

const targets=JSON.parse(fs.readFileSync("data/provider-generated-targets.json","utf8"));
const families=JSON.parse(fs.readFileSync("data/embed-provider-families.json","utf8"));
const sources=JSON.parse(fs.readFileSync("data/sources.json","utf8"));

const ids=[
  "usgs-yellowstone-biscuit-basin-current-image",
  "usgs-yellowstone-lake-current-image",
  "geonet-ruapehu-north-current-image",
  "geonet-taranaki-current-image",
  "geonet-ngauruhoe-current-image",
  "geonet-tongariro-current-image",
  "geonet-whakaari-tekaha-current-image",
  "usgs-kilauea-v3cam-current-image"
];

for(const id of ids){
  const t=targets.find(x=>x.id===id);
  assert.ok(t, id+" target");
  assert.equal(t.integrationKind,"PROVIDER_AUTHORIZED_CURRENT_IMAGE");
  assert.equal(t.truthIfApproved,"LIVE_IMAGE");
  assert.match(t.exactTargetUrl,/^https:\/\//);
  assert.equal(t.promotionAllowed,false);
  assert.equal(t.catalogMutationAllowed,false);
  assert.equal(t.automaticGenerationAllowed,false);
  assert.equal(t.reviewedAt,null);
  assert.equal(t.reviewOutcome,null);
  assert.ok(families.some(f=>f.id===t.providerFamilyId), id+" family");
  const s=sources.find(x=>x.id===t.sourceId);
  assert.ok(s, id+" source");
  assert.equal(s.truth,"LIVE_IMAGE");
  assert.equal(s.permission,"LINK_ONLY");
  assert.equal(s.playback,"EXTERNAL");
}

const usgs=targets.filter(x=>ids.includes(x.id)&&["usgs-yellowstone-volcano-cameras","usgs-kilauea-live"].includes(x.providerFamilyId));
assert.equal(usgs.length,3);
assert.ok(usgs.every(x=>/USGS|U.S. Geological Survey|Yellowstone|Volcano Observatory/i.test(x.provider)));

const geonet=targets.filter(x=>ids.includes(x.id)&&x.providerFamilyId==="geonet-volcano-cameras");
assert.equal(geonet.length,5);
assert.ok(geonet.every(x=>/GeoNet/i.test(x.provider)));
assert.ok(geonet.every(x=>/10_MINUTES/.test(x.refreshSemantics)));

console.log("Authorized current-image staging stays exact, source-bound and fail-closed");
