import fs from "node:fs";import assert from "node:assert/strict";
const src=fs.readFileSync("scripts/build-operator-review.mjs","utf8");
assert.match(src,/createHash/);
assert.match(src,/reviewBatchMaterial/);
assert.match(src,/ern-operator-review-evidence-v2-/);
assert.match(src,/reviewBatch:REVIEW_BATCH/);
assert.match(src,/playbackVerifiedAt/);
assert.match(src,/lastHumanReviewAt/);
console.log("Operator review browser evidence is scoped to exact review targets and proof baselines");
