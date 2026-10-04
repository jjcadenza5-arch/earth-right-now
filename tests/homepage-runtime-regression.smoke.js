import fs from "node:fs";
import assert from "node:assert/strict";
const app=fs.readFileSync("src/app-lite.js","utf8");
assert.ok(!app.includes('$(".mode-chip").forEach'),"single-element selector must never be used as a NodeList");
assert.ok(app.includes('document.querySelectorAll(".mode-chip").forEach'),"mode-chip rendering must use querySelectorAll");
assert.ok(app.includes("renderDiscoveryProof()"),"homepage discovery proof renderer must remain wired");
assert.ok(app.includes("renderWatch()"),"Watch Earth renderer must remain wired");
console.log("ERN homepage runtime regression checks passed");
