import fs from "node:fs";
import assert from "node:assert/strict";

const s=fs.readFileSync("scripts/build-destination-pages.mjs","utf8");
assert.match(s,/"mainEntityOfPage"|"mainEntity"/);
assert.match(s,/"isPartOf"/);
assert.match(s,/latestDate/);
assert.match(s,/<lastmod>/);
assert.match(s,/staticLastmod/);
assert.match(s,/BreadcrumbList/);
console.log("ERN destination SEO freshness wiring passed");
