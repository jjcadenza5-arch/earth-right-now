import assert from "node:assert/strict";
import {earthSignalsForPlace,earthSignalGuideSummary} from "../src/earth-signal-guide.js";
import {earthSignalPulse} from "../src/earth-signal-pulse.js";

const now=new Date("2026-09-21T12:00:00Z");
const signals=[
 {type:"RAINING",createdAt:"2026-09-21T11:58:00Z",placeId:"chiang-mai",locationEvidence:"NEAR_PLACE"},
 {type:"RAINING",createdAt:"2026-09-21T11:57:00Z",placeId:"chiang-mai",locationEvidence:"UNVERIFIED"},
 {type:"BUSY",createdAt:"2026-09-21T11:50:00Z",placeId:"chiang-mai",locationEvidence:"UNVERIFIED"},
 {type:"PEACEFUL",createdAt:"2026-09-21T11:59:00Z",placeId:"other"},
 {type:"WORTH_SEEING",createdAt:"2026-09-21T10:00:00Z",placeId:"chiang-mai"}
];

const rows=earthSignalsForPlace(signals,"chiang-mai",{now});
assert.equal(rows.length,3);
assert.equal(rows[0].type,"RAINING");

const pulse=earthSignalPulse(signals,"chiang-mai",{now});
assert.equal(pulse.count,3);
assert.equal(pulse.leading.type,"RAINING");
assert.equal(pulse.leading.count,2);
assert.equal(pulse.leading.nearPlaceCount,1);
assert.equal(pulse.verified,false);
assert.match(pulse.truth,/not independent verification/);

const summary=earthSignalGuideSummary(signals,{id:"chiang-mai",title:"Chiang Mai"},{now});
assert.equal(summary.kind,"VISITOR_REPORT");
assert.equal(summary.verified,false);
assert.equal(summary.evidenceKind,"VISITOR_REPORT_AGGREGATE");
assert.match(summary.text,/Visitors have 2 recent reports of raining here at Chiang Mai/);
assert.match(summary.text,/1 marked near the place/);
assert.match(summary.text,/plus 1 other signal type/);
assert.match(summary.truth,/not independent verification/);
assert.ok(!earthSignalGuideSummary(signals,{id:"none"},{now}),"Guide must not invent activity");

console.log("Earth Signal Guide aggregates short-lived visitor reports without implying verification");
