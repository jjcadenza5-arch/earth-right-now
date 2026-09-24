import fs from "node:fs";import assert from "node:assert/strict";
const app=fs.readFileSync("src/app-lite.js","utf8");
assert.equal((app.match(/\\nfunction /g)||[]).length,0,"app-lite must not contain literal \\n function separators");
new Function(app);
console.log("ERN app-lite full syntax guard passed");
