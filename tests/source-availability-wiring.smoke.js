import fs from "node:fs";import assert from "node:assert/strict";
const pkg=JSON.parse(fs.readFileSync("package.json","utf8"));assert.equal(pkg.scripts["sources:availability"],"node scripts/source-availability-status.mjs");
const yml=fs.readFileSync(".github/workflows/operations-watch.yml","utf8");
assert.match(yml,/npm --silent run sources:availability/);assert.match(yml,/source-availability\.json/);
const script=fs.readFileSync("scripts/source-availability-status.mjs","utf8");assert.match(script,/limit:24/);assert.match(script,/maxPerHost:4/);assert.match(script,/concurrency:4/);
console.log("ERN source availability workflow wiring passed");
