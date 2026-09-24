import fs from "node:fs";import assert from "node:assert/strict";
const pkg=JSON.parse(fs.readFileSync("package.json","utf8"));assert.equal(pkg.scripts["watch-earth:balance"],"node scripts/watch-earth-product-balance-status.mjs");
const yml=fs.readFileSync(".github/workflows/operations-watch.yml","utf8");assert.match(yml,/npm run watch-earth:balance/);
const ops=fs.readFileSync("scripts/operations-status.mjs","utf8");assert.match(ops,/watchEarthProductBalance/);
console.log("ERN Watch Earth product balance wiring passed");
