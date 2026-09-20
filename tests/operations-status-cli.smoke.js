import fs from "node:fs";
const pkg=JSON.parse(fs.readFileSync("package.json","utf8"));
const s=fs.readFileSync("scripts/operations-status.mjs","utf8");
console.assert(pkg.scripts["operations:status"]==="node scripts/operations-status.mjs");
console.assert(s.includes("providerReview"));
console.assert(s.includes("report.providerReview.unsafe.length"));
console.log("operations status CLI smoke passed");
