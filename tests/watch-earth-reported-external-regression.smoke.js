import assert from "node:assert/strict";
import fs from "node:fs";
import { watchEarthEligible } from "../src/watch-earth.js";

const rows=JSON.parse(fs.readFileSync("data/sources.json","utf8"));
const now=new Date("2026-10-05T13:10:00Z");

for(const id of ["mexico-popocatepetl-current-image","karakol-ski-base"]){
  const source=rows.find(x=>x.id===id);
  assert.ok(source,id+" must remain in the searchable source catalog");
  assert.equal(source.permission,"LINK_ONLY");
  assert.equal(source.playback,"EXTERNAL");
  assert.equal(source.featuredHold,true);
  assert.equal(source.watchHold,true);
  assert.equal(watchEarthEligible(source,{now}),false,id+" must not enter Watch Earth while external-only");
}
console.log("ERN reported external Watch Earth regression checks passed");
