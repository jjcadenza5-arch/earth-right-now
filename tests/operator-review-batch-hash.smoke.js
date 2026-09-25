import fs from "node:fs";import assert from "node:assert/strict";
const src=fs.readFileSync("scripts/build-operator-review.mjs","utf8");
assert.match(src,/const REVIEW_BATCH=\$\{JSON\.stringify\(reviewBatch\)\};/);
assert.ok(!src.includes('JSON.stringify("${reviewBatch}")'));
console.log("Operator review builder emits computed batch hash, not a literal template marker");
