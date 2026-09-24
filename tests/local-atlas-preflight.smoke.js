import fs from "node:fs";import assert from "node:assert/strict";
const preflight=fs.readFileSync("scripts/whole-product-preflight.mjs","utf8");
assert.match(preflight,/world-map-natural-earth\.svg/);
assert.ok(!preflight.includes("BlankMap-Equirectangular"));
console.log("ERN whole-product preflight guards local Atlas vector");
