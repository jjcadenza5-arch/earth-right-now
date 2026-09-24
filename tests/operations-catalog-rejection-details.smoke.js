import assert from "node:assert/strict";import fs from "node:fs";
const src=fs.readFileSync("src/operations-report.js","utf8");
assert.match(src,/rejectedDetails:gate\.rejectedDetails\|\|\[\]/);
console.log("ERN operations report retains catalog gate rejection details");
