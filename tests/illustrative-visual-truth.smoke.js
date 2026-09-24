import fs from "node:fs";import assert from "node:assert/strict";
const app=fs.readFileSync("src/app-lite.js","utf8"),css=fs.readFileSync("src/styles-lite.css","utf8");
assert.match(app,/dataset\.visualKind=img\?"source":"illustrative"/);
assert.match(app,/dataset\.visualKind="illustrative"/);
assert.match(css,/Illustrative visual/);
assert.match(css,/card-visual\[data-visual-kind="illustrative"\]/);
assert.match(css,/result-visual\[data-visual-kind="illustrative"\]/);
console.log("ERN illustrative visual truth labels passed");
