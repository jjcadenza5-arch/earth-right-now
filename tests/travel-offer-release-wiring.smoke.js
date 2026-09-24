import fs from "node:fs";import assert from "node:assert/strict";
const build=fs.readFileSync("scripts/build-release-snapshot.mjs","utf8");
const pages=fs.readFileSync(".github/workflows/pages.yml","utf8");
const preflight=fs.readFileSync("scripts/public-launch-preflight.mjs","utf8");
assert.match(build,/data\/travel-offers\.json/);
assert.match(build,/cp\(new URL\("\.\.\/data\/travel-offers\.json"/);
assert.match(pages,/"data\/travel-offers\.json"/);
assert.match(preflight,/verified travel-offer registry is not shipped/);
console.log("ERN travel-offer public release wiring passed");
