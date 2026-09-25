import assert from "node:assert/strict";import {playbackEvidenceConsistency} from "../src/playback-evidence-consistency.js";
const now=new Date("2026-09-24T12:00:00Z");
const sources=[
 {id:"ok",title:"OK",playback:"EMBED",playbackVerifiedAt:"2026-09-24T08:05:00Z"},
 {id:"fresh-missing",title:"Fresh missing",playback:"EMBED"},
 {id:"marker-no-human",title:"No human",playback:"EMBED",playbackVerifiedAt:"2026-09-24T09:00:00Z"},
 {id:"mismatch",title:"Mismatch",playback:"EMBED",playbackVerifiedAt:"2026-09-24T10:00:00Z"},
 {id:"external-marker",title:"External",playback:"EXTERNAL",playbackVerifiedAt:"2026-09-24T10:00:00Z"},
 {id:"stale-only",title:"Stale",playback:"EMBED"},
 {id:"failed-after-success",title:"Failed after success",playback:"EMBED",lastFailedCheck:"2026-09-24T11:30:00Z"}
];
const observations=[
 {id:"ok",confirmation:"HUMAN_PLAYBACK",observedAt:"2026-09-24T08:05:00Z"},
 {id:"fresh-missing",confirmation:"HUMAN_PLAYBACK",observedAt:"2026-09-24T11:00:00Z"},
 {id:"marker-no-human",confirmation:"MEDIA_ENDPOINT",observedAt:"2026-09-24T09:00:00Z"},
 {id:"mismatch",confirmation:"HUMAN_PLAYBACK",observedAt:"2026-09-24T10:10:00Z"},
 {id:"stale-only",confirmation:"HUMAN_PLAYBACK",observedAt:"2026-09-21T10:00:00Z"},
 {id:"failed-after-success",confirmation:"HUMAN_PLAYBACK",observedAt:"2026-09-24T10:30:00Z"},
 {id:"ghost",confirmation:"HUMAN_PLAYBACK",observedAt:"2026-09-24T11:00:00Z"}
];
const r=playbackEvidenceConsistency(sources,observations,{now,freshHours:24,toleranceMinutes:2});
assert.equal(r.consistent,false);
for(const code of ["FRESH_HUMAN_OBSERVATION_MISSING_CATALOG_MARKER","CATALOG_MARKER_WITHOUT_HUMAN_OBSERVATION","PLAYBACK_EVIDENCE_TIMESTAMP_MISMATCH","PLAYBACK_MARKER_ON_NON_EMBED","UNKNOWN_SOURCE_OBSERVATION"])assert.ok(r.issues.some(x=>x.code===code),code);
assert.ok(!r.issues.some(x=>x.id==="stale-only"&&x.code==="FRESH_HUMAN_OBSERVATION_MISSING_CATALOG_MARKER"));assert.ok(!r.issues.some(x=>x.id==="failed-after-success"&&x.code==="FRESH_HUMAN_OBSERVATION_MISSING_CATALOG_MARKER"));assert.equal(r.rows.find(x=>x.id==="failed-after-success").humanSupersededByFailure,true);
assert.equal(r.safety.catalogMutationAllowed,false);assert.equal(r.safety.automaticHealthChangeAllowed,false);assert.equal(r.safety.automaticPlaybackVerificationAllowed,false);
console.log("ERN playback evidence consistency audit passed");
