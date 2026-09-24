import fs from "node:fs";import assert from "node:assert/strict";
const yml=fs.readFileSync(".github/workflows/operations-watch.yml","utf8");assert.match(yml,/inside-recovery\.json ern-ops\/embed-research\.json/);
const script=fs.readFileSync("scripts/operations-operator-brief.mjs","utf8");assert.match(script,/recoveryPath/);assert.match(script,/researchPath/);
console.log("ERN actionable operator brief wiring passed");
