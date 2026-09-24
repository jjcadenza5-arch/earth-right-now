import fs from "node:fs";import assert from "node:assert/strict";
const css=fs.readFileSync("src/styles-lite.css","utf8");
const mapRefs=[...css.matchAll(/url\(([^)]+)\)/g)].map(m=>m[1]);
assert.ok(mapRefs.some(x=>x.includes("world-map-natural-earth.svg")));
assert.ok(!mapRefs.some(x=>x.includes("BlankMap-Equirectangular")||x.includes("wikimedia")));
console.log("ERN Atlas has no remote map dependency");
