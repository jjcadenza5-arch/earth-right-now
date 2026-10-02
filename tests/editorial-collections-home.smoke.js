import fs from "node:fs";import assert from "node:assert/strict";
const html=fs.readFileSync("index.html","utf8");
assert.match(html,/id="editorialCollections"/);
for(const id of ["beaches-water","mountains-snow","cities-streets","wildlife-nature","calm-scenic"])assert.ok(html.includes("./discover/"+id+"/"),"missing collection "+id);
assert.match(html,/Collections never change source truth or ranking/);
console.log("Phase 8 homepage exposes all evergreen editorial collections without changing truth semantics");
