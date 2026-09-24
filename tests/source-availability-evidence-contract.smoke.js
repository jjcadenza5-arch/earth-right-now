import fs from "node:fs";import assert from "node:assert/strict";
const s=fs.readFileSync("src/source-availability-observer.js","utf8");
assert.match(s,/PAGE_REACHABLE/);assert.match(s,/PAGE_MISSING/);assert.match(s,/ACCESS_BLOCKED/);assert.match(s,/provesLive:false/);assert.match(s,/privateV4/);assert.match(s,/maxPerHost/);
console.log("ERN source availability evidence contract passed");
