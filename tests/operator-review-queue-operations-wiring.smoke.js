import assert from "node:assert/strict";import fs from "node:fs";
const pkg=fs.readFileSync("package.json","utf8"),wf=fs.readFileSync(".github/workflows/operations-watch.yml","utf8"),cli=fs.readFileSync("scripts/operations-operator-brief.mjs","utf8"),brief=fs.readFileSync("src/operations-operator-brief.js","utf8"),integrity=fs.readFileSync("src/operations-packet-integrity.js","utf8");
assert.match(pkg,/"inside:operator-review-queue"/);assert.match(wf,/inside:operator-review-queue.*operator-review-queue\.json/s);assert.match(cli,/operatorReviewQueue=await optional\(args\[14\]\)/);assert.match(brief,/Operator playback review queue/);assert.match(integrity,/"operator-review-queue\.json"/);
console.log("ERN operator review queue operations wiring passed");
