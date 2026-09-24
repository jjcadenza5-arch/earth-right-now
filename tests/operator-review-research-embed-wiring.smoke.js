import assert from "node:assert/strict";import fs from "node:fs";
const s=fs.readFileSync("scripts/build-operator-review.mjs","utf8");
assert.match(s,/allowedResearchEmbedUrl/);assert.match(s,/type==="research"\?allowedResearchEmbedUrl/);assert.match(s,/allowedEmbedUrl\(rawEmbed\)/);
console.log("ERN operator review uses research-only embed allowance");
