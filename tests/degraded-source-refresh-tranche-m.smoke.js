import fs from "node:fs";import assert from "node:assert/strict";import {watchEarthEligible} from "../src/watch-earth.js";
const rows=JSON.parse(fs.readFileSync("data/sources.json","utf8")),now=new Date("2026-09-24T10:50:00Z");
for(const id of ["waikiki-south-shore","cold-lake-marina"]){
 const s=rows.find(x=>x.id===id);assert.ok(s,id);assert.equal(s.checkedAt,"2026-09-24T10:45:00Z",id);assert.equal(s.lastSuccessfulCheck,"2026-09-24T10:45:00Z",id);assert.equal(s.health,"DEGRADED",id);assert.equal(s.failureReason,"VISITOR_PLAYBACK_REJECTED_2026-09-20",id);assert.equal(s.playbackVerifiedAt,undefined,id);assert.ok(s.freshnessEvidence.includes("health stays DEGRADED"),id);assert.equal(watchEarthEligible(s,{now}),false,id);
}
console.log("ERN degraded source refresh tranche M passed");
