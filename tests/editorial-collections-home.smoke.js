import fs from "node:fs";import assert from "node:assert/strict";
const html=fs.readFileSync("index.html","utf8");
assert.match(html,/id="editorialCollections"/);
for(const q of ["Beaches","Mountains","Cities","Wildlife","Nature"])assert.ok(html.includes("./?q="+q+"#search"),"missing working discovery search route "+q);
assert.match(html,/Collections never change source truth or ranking/);
console.log("Phase 8 homepage exposes all evergreen editorial collections without changing truth semantics");
