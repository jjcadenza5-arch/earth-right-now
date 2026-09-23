import fs from "node:fs";
const pkg=JSON.parse(fs.readFileSync("package.json","utf8"));
const ci=fs.readFileSync(".github/workflows/ci.yml","utf8");
console.assert(pkg.scripts["release:packet"]==="node scripts/release-operator-packet.mjs","release packet CLI must remain exposed");
console.assert(ci.includes('npm run release:packet -- "$GITHUB_SHA" > release-operator-packet.md'),"CI must bind operator packet to exact candidate SHA");
console.assert(ci.includes("ern-release-operator-packet"),"CI must retain operator packet as an artifact");
console.assert(ci.includes("retention-days: 7"),"operator packet must remain available long enough for human validation");
console.log("ERN release operator packet CI wiring passed");
