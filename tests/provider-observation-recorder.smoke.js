import fs from "node:fs";
const pkg=JSON.parse(fs.readFileSync("package.json","utf8"));
const s=fs.readFileSync("scripts/record-provider-observation.mjs","utf8");
console.assert(pkg.scripts["provider:record"]==="node scripts/record-provider-observation.mjs");
console.assert(s.includes("providerObservationBatch"));
console.assert(s.includes("knownSourceIds"));
console.assert(s.includes("Observation rejected"));
console.assert(s.includes("entries.filter(x=>x.id!==id)"));
console.log("provider observation recorder smoke passed");
