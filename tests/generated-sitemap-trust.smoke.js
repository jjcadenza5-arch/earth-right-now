import fs from "node:fs";import assert from "node:assert/strict";
const src=fs.readFileSync(new URL("../scripts/build-destination-pages.mjs",import.meta.url),"utf8");
assert.match(src,/about\.html/);assert.match(src,/privacy\.html/);
assert.match(src,/staticUrls/);
console.log("generated sitemap trust-page guard passed");
