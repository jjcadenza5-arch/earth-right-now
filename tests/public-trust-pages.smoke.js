import fs from "node:fs";
for(const p of ["privacy.html","about.html"])console.assert(fs.existsSync(p),`${p} must ship`);
const h=fs.readFileSync("index.html","utf8"),b=fs.readFileSync("scripts/build-release-snapshot.mjs","utf8");
console.assert(h.includes("./privacy.html")&&h.includes("./about.html"));
console.assert(b.includes("../privacy.html")&&b.includes("../about.html"));
console.log("ERN public trust pages smoke checks passed");
