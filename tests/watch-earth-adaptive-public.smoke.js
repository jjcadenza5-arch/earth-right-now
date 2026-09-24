import fs from "node:fs";import assert from "node:assert/strict";
const app=fs.readFileSync("src/app-lite.js","utf8");
assert.match(app,/function adaptiveWatchLimit/);
assert.match(app,/inside<5/);
assert.match(app,/Math\.min\(external,12\)/);
assert.match(app,/const setLimit=adaptiveWatchLimit\(sorted,20\)/);
assert.equal((app.match(/out\.length>=20/g)||[]).length,0);
new Function(app);
console.log("ERN public adaptive Watch Earth wiring passed");
