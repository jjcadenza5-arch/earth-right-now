import assert from "node:assert/strict";import fs from "node:fs";
const app=fs.readFileSync("src/app-lite.js","utf8"),css=fs.readFileSync("src/styles-lite.css","utf8");
for(const phrase of ["Source recheck due","Open source","Live view unavailable","ERN has no usable live/current source for this place.","Live stream available at the source","Open live source"])assert.ok(app.includes(phrase),phrase+" missing");
assert.ok(app.includes("safeExternalUrl"),"reference handoff must use URL-safety path");
assert.ok(css.includes(".map-pin.reference"),"reference-only Atlas pin styling missing");
assert.ok(css.includes(".reference-handoff"),"main-area reference recovery styling missing");
console.log("ERN reference-only visitor recovery UX passed");
