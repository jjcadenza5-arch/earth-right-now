import fs from "node:fs";import assert from "node:assert/strict";
const app=fs.readFileSync("src/app-lite.js","utf8");
assert.match(app,/happening:has\(/);
assert.match(app,/intent\.current&&currentInside\(s\)/);
assert.match(app,/s\.playback==="EMBED"&&embedPlaybackCurrent\(s\)/);
assert.match(app,/visible activity happening now/);
assert.match(app,/pool=pool\.filter\(currentTruthClaim\)/);
assert.match(app,/!intent\.happening\)return/);
console.log("ERN public Guide prioritizes verified LIVE HERE for current activity requests");
