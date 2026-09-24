import assert from "node:assert/strict";import {mkdtempSync,writeFileSync} from "node:fs";import {tmpdir} from "node:os";import path from "node:path";import {spawnSync} from "node:child_process";
const dir=mkdtempSync(path.join(tmpdir(),"ern-history-recovery-")),empty=path.join(dir,"empty.json"),bad=path.join(dir,"bad.json"),availability=path.join(dir,"availability.json"),trend=path.join(dir,"trend.json");
writeFileSync(empty,"");writeFileSync(bad,"{not-json");
writeFileSync(availability,JSON.stringify({generatedAt:"2026-09-24T14:00:00Z",results:[{id:"a",outcome:"PAGE_REACHABLE",observedAt:"2026-09-24T14:00:00Z"}]}));
writeFileSync(trend,JSON.stringify({schemaVersion:1,generatedAt:"2026-09-24T14:00:00Z",catalog:{},watchEarth:{},insideERN:{},providers:{},release:{},maintenance:{},availability:null}));
for(const prev of [empty,bad]){
 const c=spawnSync(process.execPath,["scripts/source-availability-continuity.mjs",prev,availability],{encoding:"utf8"});assert.equal(c.status,0,c.stderr);const co=JSON.parse(c.stdout);assert.equal(co.previousGeneratedAt,null);assert.equal(co.summary.sampled,1);
 const t=spawnSync(process.execPath,["scripts/operations-trend-compare.mjs",prev,trend],{encoding:"utf8"});assert.equal(t.status,0,t.stderr);const to=JSON.parse(t.stdout);assert.equal(to.direction,"BASELINE");assert.equal(to.previousGeneratedAt,null);
}
console.log("ERN corrupted operations history recovers to baseline");
