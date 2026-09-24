import fs from "node:fs";import assert from "node:assert/strict";
const status=fs.readFileSync("scripts/whole-product-status.mjs","utf8");
for(const token of ["configuredInsideERN","freshHumanProvenEmbeds","currentImageRefreshes","currentInsideERN"])assert.ok(status.includes(token),token);
assert.ok(!status.includes("21*86400000"));
assert.ok(!status.includes("insideERN:inside"));
const health=fs.readFileSync("src/catalog-health-summary.js","utf8");
for(const token of ["configuredInsideERN","provenEmbeddedInsideERN","currentImageInsideERN","embedPlaybackCurrent"])assert.ok(health.includes(token),token);
console.log("ERN whole-product and health inside metrics passed");
