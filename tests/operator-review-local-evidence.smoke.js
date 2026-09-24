import fs from "node:fs";import assert from "node:assert/strict";
const build=fs.readFileSync("scripts/build-operator-review.mjs","utf8");
for(const token of ["HUMAN_PLAYBACK_CONFIRMED","PLAYBACK_FAILED","INCONCLUSIVE","UNKNOWN_NOT_RECORDED","ERN_OPERATOR_REVIEW_EVIDENCE","localStorage","Download JSON"])assert.ok(build.includes(token),token);
assert.match(build,/review-actions button.*disabled/);
const pkg=JSON.parse(fs.readFileSync("package.json","utf8"));assert.equal(pkg.scripts["inside:review-evidence"],"node scripts/operator-review-evidence-status.mjs");
console.log("ERN local review evidence capture wiring passed");
