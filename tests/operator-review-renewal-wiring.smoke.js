import assert from "node:assert/strict";import fs from "node:fs";
const s=fs.readFileSync("scripts/build-operator-review.mjs","utf8");
assert.match(s,/operatorReviewQueue/);assert.match(s,/Renew \/ restore inside ERN/);assert.match(s,/RENEW LIVE HERE/);assert.match(s,/reviewQueue\.renewal/);assert.doesNotMatch(s,/insideERNRecoveryStatus\(/);
console.log("ERN operator review proactive renewal wiring passed");
