import fs from "node:fs";
const s=fs.readFileSync("src/live-window-view.js","utf8");
console.assert(s.includes('className:"window-truth-line"'));
console.assert(!s.includes('className:"window-evidence"'),"live cards should not stack redundant evidence labels");
console.assert(!s.includes('className:"live-window-state"'),"live cards should consolidate state and freshness");
console.log("ERN live-window calm truth-line smoke checks passed");
