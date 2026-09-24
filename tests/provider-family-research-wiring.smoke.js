import assert from "node:assert/strict";import fs from "node:fs";
const pkg=fs.readFileSync("package.json","utf8"),wf=fs.readFileSync(".github/workflows/operations-watch.yml","utf8"),cli=fs.readFileSync("scripts/operations-operator-brief.mjs","utf8"),brief=fs.readFileSync("src/operations-operator-brief.js","utf8"),integrity=fs.readFileSync("src/operations-packet-integrity.js","utf8");
assert.match(pkg,/"inside:provider-family-research"/);assert.match(wf,/inside:provider-family-research.*provider-family-research\.json/s);assert.match(cli,/providerFamilyResearch=await optional\(args\[13\]\)/);assert.match(brief,/Provider-family research/);assert.match(integrity,/"provider-family-research\.json"/);
console.log("ERN provider-family research operations wiring passed");
