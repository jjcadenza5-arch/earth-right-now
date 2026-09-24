import assert from "node:assert/strict";import fs from "node:fs";
const wf=fs.readFileSync(".github/workflows/operations-watch.yml","utf8");
assert.match(wf,/on:\n\s+push:\n\s+branches: \[main\]/);
for(const p of ["data/sources.json","data/provider-observations.json","data/embed-research-candidates.json","src/**","scripts/**","package.json"])assert.ok(wf.includes(`- "${p}"`),p);
assert.match(wf,/workflow_dispatch:/);assert.match(wf,/cron: "17 0 \* \* \*"/);
console.log("ERN operations push validation trigger passed");
