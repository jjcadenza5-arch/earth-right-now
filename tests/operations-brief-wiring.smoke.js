import fs from "node:fs";import assert from "node:assert/strict";
const pkg=JSON.parse(fs.readFileSync("package.json","utf8"));assert.equal(pkg.scripts["operations:brief"],"node scripts/operations-operator-brief.mjs");
const yml=fs.readFileSync(".github/workflows/operations-watch.yml","utf8");assert.match(yml,/operations:trend-snapshot -- ern-ops\/source-availability\.json/);assert.match(yml,/operations:brief/);assert.match(yml,/operator-brief\.md/);assert.match(yml,/guide-ai-status\.json/);assert.match(yml,/local-directory-status\.json/);
console.log("ERN operator brief workflow wiring passed");

const briefScript=fs.readFileSync("scripts/operations-operator-brief.mjs","utf8");assert.match(briefScript,/const localDirectory=await optional\(args\[25\]\)/);assert.match(briefScript,/guideAi,localDirectory/);
