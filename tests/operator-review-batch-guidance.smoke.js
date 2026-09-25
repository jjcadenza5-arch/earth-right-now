import fs from "node:fs";import assert from "node:assert/strict";
const src=fs.readFileSync("scripts/build-operator-review.mjs","utf8");
assert.match(src,/This review is batch-isolated/);
assert.match(src,/Primary human checks currently shown/);
assert.match(src,/for this exact review batch/);
console.log("Operator review page explains batch isolation and primary review count");
