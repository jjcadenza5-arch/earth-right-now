import fs from "node:fs";import assert from "node:assert/strict";
const css=fs.readFileSync("src/styles-lite.css","utf8");
assert.match(css,/\.hero-live iframe,.hero-live img\{width:100%;height:100%;border:0;object-fit:cover/);
assert.match(css,/pointer-events:none/);
assert.match(css,/heroLive\[data-visual-kind="illustrative"\]/);
console.log("ERN Hero media and illustrative truth styling passed");
