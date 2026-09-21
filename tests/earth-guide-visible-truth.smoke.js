import assert from "node:assert/strict";import fs from "node:fs";
const app=fs.readFileSync(new URL("../src/app.js",import.meta.url),"utf8");
assert.match(app,/earthGuidePreferenceAction/);assert.match(app,/earthGuidePreferenceReply/);assert.match(app,/earthGuideWeatherBoundary/);
assert.match(app,/if\(preferenceAction\)/);assert.match(app,/weatherReply\?\.text\|\|earthGuideReply/);
console.log("ERN visible Guide truth wiring checks passed");
