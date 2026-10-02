import assert from "node:assert/strict";
import {spawnSync} from "node:child_process";
const r=spawnSync(process.execPath,["scripts/phase10-public-link-audit.mjs"],{encoding:"utf8"});
assert.equal(r.status,0,r.stdout+"\n"+r.stderr);
const x=JSON.parse(r.stdout);
assert.equal(x.ok,true);
assert.equal(x.issues.length,0);
assert.ok(x.checkedFiles>=15);
console.log("Phase 10 public route, link and asset audit passed");
