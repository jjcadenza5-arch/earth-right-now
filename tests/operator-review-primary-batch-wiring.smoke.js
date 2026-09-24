import assert from "node:assert/strict";import fs from "node:fs";
const s=fs.readFileSync("scripts/build-operator-review.mjs","utf8");
assert.match(s,/reviewQueue\.primaryItems/);assert.match(s,/recommendedRestorationCount/);assert.match(s,/Additional restoration backlog/);assert.match(s,/insideBacklog/);
console.log("ERN operator review page uses minimal primary batch plus backlog");
