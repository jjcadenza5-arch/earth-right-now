import fs from "node:fs";import assert from "node:assert/strict";
const sitemap=fs.readFileSync("scripts/build-destination-pages.mjs","utf8");
assert.ok(!sitemap.includes("review/inside-ern.html"));
const index=fs.readFileSync("index.html","utf8");assert.ok(!index.includes("/review/"));
console.log("ERN operator review lab stays outside visitor discovery");
