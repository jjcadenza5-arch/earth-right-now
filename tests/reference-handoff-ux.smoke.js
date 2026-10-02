import assert from "node:assert/strict";import fs from "node:fs";
const app=fs.readFileSync("src/app-lite.js","utf8"),css=fs.readFileSync("src/styles-lite.css","utf8");
for(const phrase of ["Live view temporarily unavailable","Open official source","ERN does not currently have a usable live/current source for this place."])assert.ok(app.includes(phrase),phrase+" missing");
assert.ok(app.includes("referenceHandoffUrl"),"reference handoff must use URL-safety path");
assert.ok(css.includes(".map-pin.reference"),"reference-only Atlas pin styling missing");
assert.ok(css.includes(".reference-handoff"),"main-area reference recovery styling missing");
console.log("ERN reference-only visitor recovery UX passed");
