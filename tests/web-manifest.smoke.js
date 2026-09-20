import fs from "node:fs";
const m=JSON.parse(fs.readFileSync("manifest.webmanifest","utf8")),h=fs.readFileSync("index.html","utf8"),b=fs.readFileSync("scripts/build-release-snapshot.mjs","utf8");
console.assert(m.name==="Earth Right Now"&&m.start_url==="/"&&m.display==="standalone");
console.assert(h.includes('rel="manifest" href="/manifest.webmanifest"'));
console.assert(b.includes('"../manifest.webmanifest"'),"release artifact must include manifest");
console.log("ERN web manifest smoke checks passed");
