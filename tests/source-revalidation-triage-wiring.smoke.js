import assert from "node:assert/strict";import fs from "node:fs";
const pkg=fs.readFileSync("package.json","utf8"),wf=fs.readFileSync(".github/workflows/operations-watch.yml","utf8"),cli=fs.readFileSync("scripts/operations-operator-brief.mjs","utf8"),brief=fs.readFileSync("src/operations-operator-brief.js","utf8"),integrity=fs.readFileSync("src/operations-packet-integrity.js","utf8");
assert.match(pkg,/"sources:revalidation-triage"/);assert.match(wf,/sources:revalidation-triage.*source-revalidation-triage\.json/s);assert.match(cli,/sourceRevalidationTriage=await optional\(args\[16\]\)/);assert.match(brief,/Source revalidation triage/);assert.match(integrity,/"source-revalidation-triage\.json"/);
console.log("ERN source revalidation triage operations wiring passed");
