import fs from "node:fs";import assert from "node:assert/strict";
const app=fs.readFileSync("src/app-lite.js","utf8");
assert.match(app,/function verificationWindowHours/);
assert.match(app,/playback==="EMBED"\)return 24/);
assert.match(app,/truth==="EXTERNAL_LIVE".*return 72/);
assert.match(app,/verificationAgeHours\(s\)<=verificationWindowHours\(s\)/);
const rows=JSON.parse(fs.readFileSync("data/sources.json","utf8"));
for(const id of ["bergen-ulriken","skeikampen-ski","cijin-beach-kaohsiung"]){const s=rows.find(x=>x.id===id);assert.ok(s,id);assert.equal(s.lastSuccessfulCheck,"2026-09-24T08:05:00Z",id);assert.equal(s.health,"HEALTHY",id);}
const observations=JSON.parse(fs.readFileSync("data/provider-observations.json","utf8"));
for(const id of ["bergen-ulriken","skeikampen-ski","cijin-beach-kaohsiung"]){const o=observations.find(x=>x.id===id);assert.ok(o,id);assert.equal(o.confirmation,"HUMAN_PLAYBACK",id);assert.equal(o.observedAt,"2026-09-24T08:05:00Z",id);}
console.log("ERN currentness gate and fresh human playback evidence passed");
