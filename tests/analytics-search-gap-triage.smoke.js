import assert from "node:assert/strict";
import {mkdtempSync,writeFileSync} from "node:fs";
import {tmpdir} from "node:os";
import path from "node:path";
import {spawnSync} from "node:child_process";
const dir=mkdtempSync(path.join(tmpdir(),"ern-gap-triage-"));
const a=path.join(dir,"analytics.json");
writeFileSync(a,JSON.stringify({
 generatedAt:"2026-10-05T11:00:00Z",windowDays:30,
 searchGaps:[
  {value:"new york",count:1},
  {value:"纽约",count:1},
  {value:"chiangmai",count:1}
 ]
}));
const r=spawnSync(process.execPath,["scripts/analytics-search-gap-triage.mjs",a],{encoding:"utf8"});
assert.equal(r.status,0,r.stderr);
const x=JSON.parse(r.stdout);
const by=q=>x.rows.find(v=>v.query===q);
assert.equal(by("new york").state,"CURRENTLY_RESOLVES");
assert.equal(by("纽约").state,"CURRENTLY_RESOLVES");
assert.equal(by("chiangmai").state,"GENUINE_CURRENT_GAP");
assert.equal(x.safety.automaticCatalogMutationAllowed,false);
assert.equal(x.safety.automaticAliasMutationAllowed,false);
console.log("Search-gap triage distinguishes resolved historical gaps from genuine current gaps");
