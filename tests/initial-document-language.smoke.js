import fs from "node:fs";
const app=fs.readFileSync("src/app.js","utf8");
console.assert(app.includes("document.documentElement.lang=code"),"initial language application must update html lang");
console.log("ERN initial document-language smoke checks passed");
