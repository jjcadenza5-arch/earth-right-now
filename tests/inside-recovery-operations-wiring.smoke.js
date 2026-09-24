import fs from "node:fs";import assert from "node:assert/strict";
const yml=fs.readFileSync(".github/workflows/operations-watch.yml","utf8");
assert.match(yml,/npm run inside:recovery/);
const pkg=JSON.parse(fs.readFileSync("package.json","utf8"));assert.equal(pkg.scripts["inside:recovery"],"node scripts/inside-ern-recovery-status.mjs");
console.log("ERN inside-recovery operations wiring passed");
