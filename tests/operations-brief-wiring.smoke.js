import fs from "node:fs";import assert from "node:assert/strict";
const pkg=JSON.parse(fs.readFileSync("package.json","utf8"));assert.equal(pkg.scripts["operations:brief"],"node scripts/operations-operator-brief.mjs");
const yml=fs.readFileSync(".github/workflows/operations-watch.yml","utf8");assert.match(yml,/operations:trend-snapshot -- ern-ops\/source-availability\.json/);assert.match(yml,/operations:brief/);assert.match(yml,/operator-brief\.md/);assert.match(yml,/guide-ai-status\.json/);assert.match(yml,/local-directory-status\.json/);assert.match(yml,/now-moment-media-status\.json/);assert.match(yml,/phase5-readiness\.json/);assert.match(yml,/phase5:readiness/);assert.match(yml,/phase9:status/);assert.match(yml,/phase9-operating-status\.json/);
console.log("ERN operator brief workflow wiring passed");

const briefScript=fs.readFileSync("scripts/operations-operator-brief.mjs","utf8");assert.match(briefScript,/const localDirectory=await optional\(args\[25\]\)/);assert.match(briefScript,/guideAi,localDirectory/);

assert.match(briefScript,/const nowMomentMedia=await optional\(args\[27\]\)/);assert.match(briefScript,/participationInfrastructure,nowMomentMedia,businessControl,externalGates/);

assert.match(briefScript,/const phase5Readiness=await optional\(args\[32\]\)/);assert.match(briefScript,/phase4Observation,phase5Readiness/);

assert.match(yml,/phase6-operating-status\.json/);
assert.match(yml,/phase6:status/);
assert.match(briefScript,/const phase6OperatingStatus=await optional\(args\[34\]\)/);
assert.match(briefScript,/phase5OperatingStatus,phase6OperatingStatus/);

assert.match(yml,/phase7-operating-status\.json/);assert.match(yml,/phase7:status/);
assert.match(briefScript,/const phase7OperatingStatus=await optional\(args\[35\]\)/);assert.match(briefScript,/phase6OperatingStatus,phase7OperatingStatus/);

assert.match(yml,/phase8-operating-status\.json/);assert.match(yml,/phase8:status/);
assert.match(briefScript,/const phase8OperatingStatus=await optional\(args\[36\]\)/);assert.match(briefScript,/phase7OperatingStatus,phase8OperatingStatus/);

assert.match(briefScript,/const phase9OperatingStatus=await optional\(args\[37\]\)/);assert.match(briefScript,/phase8OperatingStatus,phase9OperatingStatus/);\nassert.match(yml,/phase10-operating-status\\.json/);assert.match(yml,/phase10:status/);\nassert.match(briefScript,/const phase10OperatingStatus=await optional\\(args\\[38\\]\\)/);assert.match(briefScript,/phase9OperatingStatus,phase10OperatingStatus/);
