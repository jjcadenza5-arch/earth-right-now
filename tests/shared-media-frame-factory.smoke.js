import fs from "node:fs";import assert from "node:assert/strict";
const app=fs.readFileSync("src/app-lite.js","utf8");
assert.equal((app.match(/createElement\(["']iframe["']\)/g)||[]).length,1);
assert.match(app,/function createMediaFrame/);
assert.match(app,/const frame=createMediaFrame\(s,\{preview:true/);
assert.match(app,/const f=createMediaFrame\(s,\{onload:/);
assert.match(app,/preview\?"fullscreen; picture-in-picture":"autoplay; fullscreen; picture-in-picture"/);
assert.match(app,/frame\.referrerPolicy="strict-origin-when-cross-origin"/);
console.log("ERN shared media frame factory passed");
