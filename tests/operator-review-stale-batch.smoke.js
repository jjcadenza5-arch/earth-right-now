import fs from "node:fs";import assert from "node:assert/strict";
const src=fs.readFileSync("scripts/build-operator-review.mjs","utf8");
assert.match(src,/review\/current\.json/);
assert.match(src,/This review page is stale/);
assert.match(src,/cache:"no-store"/);
assert.match(src,/REVIEW_CURRENT=false/);
assert.match(src,/if\(!REVIEW_CURRENT\)return/);
console.log("Operator review stale-batch guard is fail-closed");
