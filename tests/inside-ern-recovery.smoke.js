import assert from "node:assert/strict";import {insideERNRecoveryStatus} from "../src/inside-ern-recovery.js";
const now=new Date("2026-09-24T08:30:00Z"),base={provider:"P",truth:"LIVE_VIDEO",permission:"EMBED_ALLOWED",playback:"EMBED",sourceUrl:"https://example.com",embedUrl:"https://couchtourist.com/embed/cam/1/",checkedAt:"2026-09-24T08:00:00Z",lastSuccessfulCheck:"2026-09-24T08:00:00Z",health:"HEALTHY"};
const sources=[
 {...base,id:"ready"},
 {...base,id:"stale-source",checkedAt:"2026-09-20T08:00:00Z",lastSuccessfulCheck:"2026-09-20T08:00:00Z"},
 {...base,id:"degraded",health:"DEGRADED"},
 {...base,id:"no-human"}
];
const observations=[
 {id:"ready",httpStatus:200,confirmation:"HUMAN_PLAYBACK",observedAt:"2026-09-24T08:10:00Z"},
 {id:"stale-source",httpStatus:200,confirmation:"HUMAN_PLAYBACK",observedAt:"2026-09-24T08:10:00Z"},
 {id:"degraded",httpStatus:200,confirmation:"HUMAN_PLAYBACK",observedAt:"2026-09-24T08:10:00Z"}
];
const r=insideERNRecoveryStatus(sources,observations,{now,limit:10});
assert.equal(r.ready,1);assert.equal(r.recoveryDebt,3);
assert.equal(r.readySources[0].id,"ready");
assert.equal(r.next[0].id,"degraded");assert.equal(r.next[0].action,"REPROVE_VISITOR_PLAYBACK");
assert.ok(r.next.some(x=>x.id==="stale-source"&&x.action==="REFRESH_SOURCE_AND_PLAYBACK"));
assert.ok(r.next.some(x=>x.id==="no-human"&&x.reason==="MISSING_CURRENT_HUMAN_PLAYBACK"));
console.log("ERN inside-ERN recovery queue passed");
