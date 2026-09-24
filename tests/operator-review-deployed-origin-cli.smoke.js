import assert from "node:assert/strict";import {mkdtempSync,writeFileSync} from "node:fs";import {tmpdir} from "node:os";import path from "node:path";import {spawnSync} from "node:child_process";
const dir=mkdtempSync(path.join(tmpdir(),"ern-review-origin-")),file=path.join(dir,"packet.json");
writeFileSync(file,JSON.stringify({schemaVersion:1,kind:"ERN_OPERATOR_REVIEW_EVIDENCE",catalogMutationAllowed:false,networkStatus:"UNKNOWN_NOT_RECORDED",reviewOrigin:"https://wrong.example/review/inside-ern.html",items:[]}));
const r=spawnSync(process.execPath,["scripts/operator-review-evidence-status.mjs",file],{encoding:"utf8"});assert.equal(r.status,0,r.stderr);const out=JSON.parse(r.stdout);assert.equal(out.ok,false);assert.ok(out.rejected.some(x=>x.reason==="UNTRUSTED_REVIEW_ORIGIN"));
console.log("ERN review evidence CLI enforces deployed origin");
