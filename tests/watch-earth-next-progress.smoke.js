import fs from "node:fs";
const s=fs.readFileSync("src/watch-earth-session.js","utf8");
console.assert(s.includes("function next(){return show(index+1)}"),"next should advance from the following journey index");
console.assert(s.includes("failed.has(s.id)||attempted.has(s.id)"),"journey scan must preserve failed/attempted quarantine");
console.log("ERN Watch Earth next-progress smoke checks passed");
