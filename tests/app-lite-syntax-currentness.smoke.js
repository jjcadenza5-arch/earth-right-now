import fs from "node:fs";import assert from "node:assert/strict";
const app=fs.readFileSync("src/app-lite.js","utf8");
assert.equal((app.match(/\\nfunction /g)||[]).length,0,"app-lite must not contain literal \\n function separators");
new Function(app);
console.log("ERN app-lite full syntax guard passed");

assert.match(app,/Look now · /,"viewer should invite curiosity rather than explain the answer");
assert.match(app,/What is happening here in full daylight\?/,"daylight copy should create a question");
assert.doesNotMatch(app,/Why now · /,"old explanatory viewer label should be removed");

assert.match(app,/guideWhere:/,"Guide shell translations should exist");
assert.match(app,/guidePlaceholder:/,"Guide placeholder should localize");
assert.match(app,/guideStart:/,"Guide opening response should localize");
