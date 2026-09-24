import fs from "node:fs";import assert from "node:assert/strict";
const pkg=JSON.parse(fs.readFileSync("package.json","utf8"));assert.equal(pkg.scripts["inside:research"],"node scripts/embed-research-status.mjs");
const yml=fs.readFileSync(".github/workflows/operations-watch.yml","utf8");assert.match(yml,/npm run inside:research/);
console.log("ERN embed research audit wiring passed");
