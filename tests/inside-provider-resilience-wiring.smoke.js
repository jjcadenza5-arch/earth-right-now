import fs from "node:fs";import assert from "node:assert/strict";
const pkg=JSON.parse(fs.readFileSync("package.json","utf8"));assert.equal(pkg.scripts["inside:providers"],"node scripts/inside-provider-resilience-status.mjs");
const yml=fs.readFileSync(".github/workflows/operations-watch.yml","utf8");assert.match(yml,/npm run inside:providers/);
const ops=fs.readFileSync("scripts/operations-status.mjs","utf8");assert.match(ops,/insideProviderResilience/);
console.log("ERN inside provider resilience wiring passed");
