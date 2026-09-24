import assert from "node:assert/strict";import fs from "node:fs";
const pkg=fs.readFileSync("package.json","utf8"),wf=fs.readFileSync(".github/workflows/operations-watch.yml","utf8"),cli=fs.readFileSync("scripts/operations-operator-brief.mjs","utf8"),brief=fs.readFileSync("src/operations-operator-brief.js","utf8"),integrity=fs.readFileSync("src/operations-packet-integrity.js","utf8");
assert.match(pkg,/"business:verification-horizon"/);
assert.match(wf,/business:verification-horizon.*commercial-verification-horizon\.json/s);
assert.match(wf,/commercial-verification-horizon\.json \| tee|submission-transport-readiness\.json ern-ops\/commercial-verification-horizon\.json/);
assert.match(cli,/commercialVerificationHorizon=await optional\(args\[11\]\)/);
assert.match(brief,/Commercial verification horizon/);
assert.match(integrity,/"commercial-verification-horizon\.json"/);
console.log("ERN commercial verification horizon wiring passed");
