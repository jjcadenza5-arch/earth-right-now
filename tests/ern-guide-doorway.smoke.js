import fs from "node:fs";
const html=fs.readFileSync("index.html","utf8"),suggestions=fs.readFileSync("src/earth-suggestions.js","utf8"),guide=fs.readFileSync("src/earth-guide.js","utf8");
for(const token of ["ERN GUIDE","Search a place — or just ask.","Ask ERN","Ask ERN Guide or search a place"])console.assert(html.includes(token),token);
console.assert(html.includes('id="ernAiInput"'),"preserve existing Guide/search input contract");
console.assert(html.includes('id="ernAiResults"'),"preserve existing results contract");
console.assert(suggestions.includes("What’s good on Earth right now?"),"signature ERN starter");
console.assert(suggestions.includes("Somewhere I’ve never heard of"),"small-place discovery starter");
console.assert(guide.includes("best truthful window ERN has"),"see-first truth boundary");
console.log("ERN Guide doorway smoke checks passed");
