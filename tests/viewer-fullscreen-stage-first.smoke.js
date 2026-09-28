import fs from "node:fs";
import assert from "node:assert/strict";
const app=fs.readFileSync("src/app-lite.js","utf8");
assert.match(app,/stage\?\.requestFullscreen/);
assert.match(app,/stage\?\.webkitRequestFullscreen/);
assert.match(app,/video\?\.webkitEnterFullscreen/);
assert.doesNotMatch(app,/target=media\|\|stage/);
assert.match(app,/viewer\.classList\.add\("faux-fullscreen"\)/);
console.log("ERN viewer fullscreen stage-first fallback passed");
