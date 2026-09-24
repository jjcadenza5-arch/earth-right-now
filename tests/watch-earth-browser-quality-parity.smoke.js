import fs from "node:fs";import assert from "node:assert/strict";
const app=fs.readFileSync("src/app-lite.js","utf8");
assert.match(app,/function watchExperienceEligible/);
assert.match(app,/Number\(s\.quality\).*>=80/);
assert.match(app,/Number\(s\.moment\).*>=70/);
assert.match(app,/VISITOR_PLAYBACK_REJECTED\|NOT_LIVE\|VIDEO_UNAVAILABLE\|STALE_RECORDING\|BROKEN_EMBED/);
assert.match(app,/featureEligible\(s\)&&watchExperienceEligible\(s\)/);
new Function(app);
console.log("ERN browser/backend Watch Earth quality parity passed");
