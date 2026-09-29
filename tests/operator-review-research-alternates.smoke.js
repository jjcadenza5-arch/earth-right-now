import fs from "node:fs";
import assert from "node:assert/strict";

const src=fs.readFileSync("scripts/build-operator-review.mjs","utf8");
assert.match(src,/Alternate provider tests/);
assert.match(src,/does not require another code\/deploy cycle/);
assert.match(src,/researchFallbacks\.map\(x=>card\(x,"research"\)\)/);
assert.match(src,/Previously failed \/ deferred research/);
assert.match(src,/must not be casually retested/);
assert.match(src,/\.\.\.\[\.\.\.researchPrimary,\.\.\.researchFallbacks\]\.map/);
assert.ok(!src.includes('researchDeferred.map(x=>card(x,"research"))'));
console.log("Operator review exposes unfailed fallbacks while keeping failed research deferred");
