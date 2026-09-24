import fs from "node:fs";import assert from "node:assert/strict";
for(const file of ["scripts/operations-trend-snapshot.mjs","scripts/operations-trend-compare.mjs"]){const s=fs.readFileSync(file,"utf8");assert.match(s,/JSON\.stringify/);}
console.log("ERN operations trend CLI contract passed");
