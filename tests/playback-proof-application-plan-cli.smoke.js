import assert from "node:assert/strict";import {mkdtempSync,writeFileSync} from "node:fs";import path from "node:path";import {tmpdir} from "node:os";import {spawnSync} from "node:child_process";
const dir=mkdtempSync(path.join(tmpdir(),"ern-proof-plan-")),file=path.join(dir,"proposals.json");
writeFileSync(file,JSON.stringify({sourceProposals:[]}));
const r=spawnSync(process.execPath,["scripts/playback-proof-application-plan.mjs",file],{encoding:"utf8"});
assert.equal(r.status,0,r.stderr);const out=JSON.parse(r.stdout);assert.equal(out.total,0);assert.equal(out.safety.automaticWriteAllowed,false);assert.equal(out.safety.partialProofUpdateAllowed,false);
console.log("ERN playback proof application CLI passed");
