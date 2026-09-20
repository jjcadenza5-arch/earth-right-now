import fs from "node:fs";
const src=fs.readFileSync("src/window-tile-view.js","utf8");
console.assert(src.includes('className:"window-truth-line"'),"window cards should expose one quiet truth line");
console.assert(!src.includes('className:"window-state"'),"window cards should not duplicate truth state");
console.log("ERN window truth-line smoke checks passed");
