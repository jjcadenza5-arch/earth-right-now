import assert from "node:assert/strict";import fs from "node:fs";import {spawnSync} from "node:child_process";
const src=fs.readFileSync("scripts/featured-curation-preflight.mjs","utf8");
assert.match(src,/future-dated verification timestamp/);assert.match(src,/futureDated/);
const rows=JSON.parse(fs.readFileSync("data/sources.json","utf8")),now=Date.now();
for(const r of rows){const t=Date.parse(r.lastSuccessfulCheck||r.checkedAt||"");if(Number.isFinite(t))assert.ok(t<=now+5*60*1000,r.id+" is future dated")}
const run=spawnSync(process.execPath,["scripts/featured-curation-preflight.mjs"],{encoding:"utf8"});
assert.equal(run.status,0,run.stderr||run.stdout);
console.log("ERN featured curation rejects future-dated verification explicitly");
