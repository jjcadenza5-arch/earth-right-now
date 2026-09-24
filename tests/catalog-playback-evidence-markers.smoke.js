import fs from "node:fs";import assert from "node:assert/strict";
const rows=JSON.parse(fs.readFileSync("data/sources.json","utf8"));
for(const id of ["bergen-ulriken","skeikampen-ski","cijin-beach-kaohsiung"]){const s=rows.find(x=>x.id===id);assert.equal(s.playbackVerifiedAt,"2026-09-24T08:05:00Z",id);}
const unverified=rows.filter(x=>x.playback==="EMBED"&&!["bergen-ulriken","skeikampen-ski","cijin-beach-kaohsiung"].includes(x.id));assert.ok(unverified.every(x=>!x.playbackVerifiedAt));
console.log("ERN catalog playback evidence markers passed");
