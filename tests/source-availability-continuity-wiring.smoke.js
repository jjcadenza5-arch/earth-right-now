import fs from "node:fs";import assert from "node:assert/strict";
const pkg=JSON.parse(fs.readFileSync("package.json","utf8"));assert.equal(pkg.scripts["sources:availability-continuity"],"node scripts/source-availability-continuity.mjs");
const yml=fs.readFileSync(".github/workflows/operations-watch.yml","utf8");
assert.match(yml,/availability-previous\.json/);assert.match(yml,/ern-availability-/);assert.match(yml,/sources:availability-continuity/);assert.match(yml,/source-availability-continuity\.json/);
const cli=fs.readFileSync("scripts/operations-operator-brief.mjs","utf8");assert.match(cli,/availabilityContinuity/);
console.log("ERN availability continuity workflow wiring passed");
