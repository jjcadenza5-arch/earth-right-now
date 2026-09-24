import fs from "node:fs";import assert from "node:assert/strict";
const lean=fs.readFileSync("scripts/lean-preflight.mjs","utf8");
assert.match(lean,/configuredInsideERN/);
assert.match(lean,/freshHumanProvenEmbeds/);
assert.match(lean,/currentImageRefreshes/);
assert.match(lean,/currentInsideERN/);
assert.ok(!lean.includes("playableInsideERN"));
assert.ok(!lean.includes("not enough playable inside-ERN windows"));
console.log("ERN lean preflight truthful inside metrics passed");
