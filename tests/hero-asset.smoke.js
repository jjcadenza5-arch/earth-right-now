import assert from "node:assert/strict";
import {readFileSync} from "node:fs";
const svg=readFileSync(new URL("../assets/ern-fuji-hero.svg",import.meta.url),"utf8");
assert.match(svg,/viewBox="0 0 1600 620"/,"Mount Fuji hero must retain its wide high-resolution vector canvas");
assert.match(svg,/Mount Fuji at sunrise/,"Mount Fuji hero identity must remain explicit");
assert.match(svg,/<svg[\s\S]*<\/svg>/,"Mount Fuji hero must remain valid SVG markup");
console.log("ERN local Mount Fuji hero vector integrity passed");
