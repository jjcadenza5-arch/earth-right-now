import fs from "node:fs";import assert from "node:assert/strict";
const app=fs.readFileSync("src/app-lite.js","utf8");
assert.match(app,/\[\.\.\.unmapped,\.\.\.multiSite,\.\.\.dynamic\]/);
assert.match(app,/Multi-location collection/);
assert.match(app,/Moving Earth view/);
assert.match(app,/Awaiting map evidence/);
console.log("ERN intentional-unpinned Atlas UI passed");
