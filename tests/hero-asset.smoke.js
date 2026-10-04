import assert from "node:assert/strict";
import {readFileSync} from "node:fs";
const svg=readFileSync(new URL("../assets/ern-fuji-hero.svg",import.meta.url),"utf8");
assert.match(svg,/^<svg\b/,"Mount Fuji hero must be a valid SVG document");
assert.match(svg,/Mount Fuji at sunrise/,"Mount Fuji hero title missing");
assert.match(svg,/Same Planet/,"Approved editorial hero phrase missing");
assert.match(svg,/Brighter Perspectives/,"Approved editorial hero phrase missing");
console.log("ERN Mount Fuji hero asset integrity passed");
