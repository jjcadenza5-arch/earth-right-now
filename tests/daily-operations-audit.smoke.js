import fs from "node:fs";import assert from "node:assert/strict";
const yml=fs.readFileSync(".github/workflows/operations-watch.yml","utf8");
assert.match(yml,/schedule:/);assert.match(yml,/cron: "17 0 \* \* \*"/);
assert.match(yml,/workflow_dispatch:/);assert.match(yml,/npm run provider:worklist/);
assert.match(yml,/npm run sources:horizon/);assert.match(yml,/npm run watch-earth:now/);assert.match(yml,/npm run operations:status/);
console.log("ERN daily operations audit workflow passed");
