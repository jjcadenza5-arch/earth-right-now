import fs from "node:fs";import assert from "node:assert/strict";
const app=fs.readFileSync("src/app-lite.js","utf8");
assert.match(app,/groupByPlace\(state\.sources\.filter\(s=>featureEligible\(s\)/);
assert.match(app,/basisCount=state\.sources\.filter\(s=>featureEligible\(s\)/);
assert.match(app,/verified-current mapped places shown/);
assert.ok(!app.includes('groupByPlace(state.sources.filter(s=>s.health!=="OFFLINE"'));
console.log("ERN public Atlas pins only feature-eligible current mapped sources");
