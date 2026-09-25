import fs from "node:fs";import assert from "node:assert/strict";
const copy=fs.readFileSync("src/guide-public-copy.js","utf8"),app=fs.readFileSync("src/app-lite.js","utf8"),index=fs.readFileSync("index.html","utf8"),build=fs.readFileSync("scripts/build-release-snapshot.mjs","utf8");
for(const code of ["en","th","de","fr","es","ja","zh"])assert.match(copy,new RegExp(code+":\\{"));
for(const key of ["welcome","peaceful","golden","night","local","wildlife","beach","mountain","happening","city","surprise","current"])assert.ok(copy.includes(key+':"'),key);
assert.match(app,/function guideMsg\(/);assert.match(app,/guideMsg\("happening"\)/);assert.match(app,/guideMsg\("current"\)/);
assert.ok(index.indexOf("guide-public-copy.js")<index.indexOf("app-lite.js"));
assert.match(build,/guide-public-copy\.js/);
console.log("ERN public Guide reply copy is language-aware across seven interface languages");

const l10n=fs.readFileSync("src/earth-guide-l10n.js","utf8");
assert.match(l10n,/What is live right now\?/);
assert.match(l10n,/ตอนนี้มีอะไรสดอยู่\?/);
assert.match(l10n,/Was ist gerade live\?/);
assert.match(l10n,/Qu’est-ce qui est en direct maintenant \?/);
assert.match(l10n,/¿Qué está en vivo ahora\?/);
assert.match(l10n,/今ライブなのはどこ？/);
assert.match(l10n,/现在什么是直播的？/);
