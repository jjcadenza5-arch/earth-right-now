import fs from "node:fs";import assert from "node:assert/strict";
const css=fs.readFileSync("src/styles-lite.css","utf8");
for(const id of ["#home","#watch","#destinations","#search","#map","#saved"])assert.match(css,new RegExp(id.replace("#","\\#")));
assert.match(css,/scroll-margin-top:96px/);
assert.match(css,/scroll-margin-top:74px/);
console.log("ERN sticky-header section landing offsets passed");
