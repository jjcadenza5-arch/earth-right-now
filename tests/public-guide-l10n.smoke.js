import fs from "node:fs";import assert from "node:assert/strict";
const copy=fs.readFileSync("src/guide-public-copy.js","utf8"),app=fs.readFileSync("src/app-lite.js","utf8"),index=fs.readFileSync("index.html","utf8"),build=fs.readFileSync("scripts/build-release-snapshot.mjs","utf8");
for(const code of ["en","th","de","fr","es","ja","zh"])assert.match(copy,new RegExp(code+":\\{"));
for(const key of ["welcome","peaceful","golden","night","local","wildlife","beach","mountain","happening","city","surprise","current"])assert.ok(copy.includes(key+':"'),key);
assert.match(app,/function guideMsg\(/);assert.match(app,/guideMsg\("happening"\)/);assert.match(app,/guideMsg\("current"\)/);
assert.ok(index.indexOf("guide-public-copy.js")<index.indexOf("app-lite.js"));
assert.match(build,/guide-public-copy\.js/);
console.log("ERN public Guide reply copy is language-aware across seven interface languages");
