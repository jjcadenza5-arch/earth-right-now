import fs from "node:fs";import assert from "node:assert/strict";
const app=fs.readFileSync("src/app-lite.js","utf8");
assert.match(app,/function installVisualFallback/);
assert.match(app,/img\.addEventListener\("error"/);
assert.match(app,/if\(!wrap\.querySelector\("\.scenic-poster"\)\)wrap\.append\(scenicPoster\(s\)\)/);
assert.match(app,/MULTI_SITE_UNPINNED/);
assert.match(app,/multi-location collection/);
console.log("ERN visible poster fallback and Atlas unpinned wiring passed");
