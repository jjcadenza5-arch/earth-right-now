import fs from "node:fs";import assert from "node:assert/strict";
const yml=fs.readFileSync(".github/workflows/operations-watch.yml","utf8");
for(const file of ["verification-horizon.json","watch-earth-now.json","watch-earth-balance.json","provider-worklist.json","inside-recovery.json","inside-provider-resilience.json","embed-research.json","operations-status.json"])assert.match(yml,new RegExp(file.replace(".","\\.")));
assert.match(yml,/actions\/upload-artifact@v4/);assert.match(yml,/retention-days: 14/);assert.match(yml,/if: always\(\)/);
console.log("ERN daily operations packet workflow passed");
