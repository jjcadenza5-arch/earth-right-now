import fs from "node:fs";import assert from "node:assert/strict";
const app=fs.readFileSync("src/app-lite.js","utf8");
assert.match(app,/s\.truth==="LIVE_VIDEO"\)return isInside\(s\)\?"LIVE HERE":"LIVE VIDEO ↗"/);
assert.match(app,/s\.truth==="LIVE_IMAGE"\)return isInside\(s\)\?"CURRENT IMAGE":"CURRENT IMAGE ↗"/);
assert.match(app,/\["LIVE_VIDEO","LIVE_IMAGE","EXTERNAL_LIVE"\]\.includes\(s\.truth\)\)return"external-live"/);
console.log("ERN public truth/playback separation passed");
