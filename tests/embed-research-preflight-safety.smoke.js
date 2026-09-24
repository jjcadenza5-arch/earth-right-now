import fs from "node:fs";import assert from "node:assert/strict";
const s=fs.readFileSync("src/embed-research-preflight.js","utf8");
assert.match(s,/permissionConfirmed:false/);assert.match(s,/humanPlaybackConfirmed:false/);assert.match(s,/promotionAllowed:false/);assert.match(s,/Technical preflight only/);
console.log("ERN embed research preflight safety contract passed");
