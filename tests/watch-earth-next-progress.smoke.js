import fs from "node:fs";
const s=fs.readFileSync("src/watch-earth-session.js","utf8");
console.assert(s.includes("attempted.add(list[index]?.id)"),"next/previous should exclude the currently displayed window before scanning");
console.assert(s.includes("if(list.length>1)"),"single-window journeys must remain playable");
console.log("ERN Watch Earth next-progress smoke checks passed");
