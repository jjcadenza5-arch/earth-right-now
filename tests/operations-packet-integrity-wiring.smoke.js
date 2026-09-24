import fs from "node:fs";import assert from "node:assert/strict";
const pkg=JSON.parse(fs.readFileSync("package.json","utf8"));assert.equal(pkg.scripts["operations:packet-integrity"],"node scripts/operations-packet-integrity.mjs");
const yml=fs.readFileSync(".github/workflows/operations-watch.yml","utf8");assert.match(yml,/Validate operations packet/);assert.match(yml,/packet-integrity\.json/);assert.match(yml,/if: always\(\)/);assert.match(yml,/Retain operations packet/);
console.log("ERN operations packet integrity workflow wiring passed");
