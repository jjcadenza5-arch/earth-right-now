import fs from "node:fs";import assert from "node:assert/strict";
const app=fs.readFileSync("src/app-lite.js","utf8");
assert.match(app,/function currentTruthClaim/);
assert.match(app,/if\(!currentTruthClaim\(s\)\)return"RECHECK DUE"/);
assert.match(app,/if\(s\.health==="DEGRADED"\)return"LIMITED SOURCE"/);
assert.match(app,/if\(s\.health==="OFFLINE"\)return"TEMPORARILY UNAVAILABLE"/);
assert.match(app,/if\(!currentTruthClaim\(s\)\)return"preview"/);
console.log("ERN public currentness label boundary passed");
