import assert from "node:assert/strict";import fs from "node:fs";
const src=fs.readFileSync("src/source-availability-observer.js","utf8"),wf=fs.readFileSync(".github/workflows/operations-watch.yml","utf8");
assert.ok(!src.includes("/;\\n    if(host==="),"literal \\n must not appear in executable source availability code");
const runs=[...wf.matchAll(/run: \|\n([\s\S]*?)(?=\n\s+- name:|\n\s+- uses:|$)/g)].map(m=>m[1]);
assert.ok(runs.length>=4);for(const block of runs.slice(0,4))assert.match(block,/set -euo pipefail/);
console.log("ERN operations fail-closed shell and availability syntax repair passed");
