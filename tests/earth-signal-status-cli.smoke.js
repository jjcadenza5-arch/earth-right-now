import fs from "node:fs";import assert from "node:assert/strict";
const p=JSON.parse(fs.readFileSync("package.json","utf8"));
const script=fs.readFileSync("scripts/earth-signal-status.mjs","utf8");
assert.equal(p.scripts["earth-signals:status"],"node scripts/earth-signal-status.mjs");
assert.match(script,/earthSignalStatusReport/);assert.match(script,/JSON\.stringify/);
console.log("Earth Signals status CLI wiring passed");
