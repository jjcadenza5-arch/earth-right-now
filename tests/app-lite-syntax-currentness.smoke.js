import fs from "node:fs";import assert from "node:assert/strict";
const app=fs.readFileSync("src/app-lite.js","utf8");
assert.ok(!app.includes(')}\\nfunction truthTone(s)'));
new Function(app);
console.log("ERN app-lite syntax after currentness edits passed");
