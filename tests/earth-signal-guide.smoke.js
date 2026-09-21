import assert from "node:assert/strict";import {earthSignalsForPlace,earthSignalGuideSummary} from "../src/earth-signal-guide.js";
const now=new Date("2026-09-21T12:00:00Z"),signals=[
 {type:"RAINING",createdAt:"2026-09-21T11:58:00Z",placeId:"chiang-mai"},
 {type:"BUSY",createdAt:"2026-09-21T11:50:00Z",placeId:"chiang-mai"},
 {type:"PEACEFUL",createdAt:"2026-09-21T11:59:00Z",placeId:"other"},
 {type:"WORTH_SEEING",createdAt:"2026-09-21T10:00:00Z",placeId:"chiang-mai"}
];
const rows=earthSignalsForPlace(signals,"chiang-mai",{now});
assert.ok(rows.length===2,"only fresh signals for the requested place");
assert.ok(rows[0].type==="RAINING","newest visitor evidence first");
const summary=earthSignalGuideSummary(signals,{id:"chiang-mai",title:"Chiang Mai"},{now});
assert.ok(summary.kind==="VISITOR_REPORT");
assert.ok(summary.text.startsWith("Visitors are reporting"),"Guide must attribute visitor evidence");
assert.ok(!earthSignalGuideSummary(signals,{id:"none"},{now}),"Guide must not invent activity");
console.log("Earth Signal Guide evidence checks passed");
