import assert from "node:assert/strict";
import { providerObservationBatch } from "../src/provider-observation-batch.js";
const r=providerObservationBatch([
 {id:"a",httpStatus:200,observedAt:"2026-09-20T12:00:00Z"},
 {id:"b",httpStatus:200,confirmation:"MEDIA_ENDPOINT",observedAt:"2026-09-20T12:00:00Z"},
 {id:"c",httpStatus:404,failure:"MEDIA_GONE",reason:"Gone",observedAt:"2026-09-20T12:00:00Z"},
 {id:"b",httpStatus:200,confirmation:"HUMAN_PLAYBACK",observedAt:"2026-09-21T12:00:00Z"},
 {httpStatus:200}
],{knownSourceIds:["a","b","c"]});
assert.equal(r.total,3);
assert.equal(r.observations.a.providerConfirmed,false);
assert.equal(r.observations.b.confirmation,"HUMAN_PLAYBACK");
assert.equal(r.observations.b.observedAt,"2026-09-21T12:00:00.000Z");
assert.equal(r.observations.c.definitiveFailure,true);
assert.deepEqual(r.rejected.map(x=>x.reason),["MISSING_SOURCE_ID"]);
assert.equal(r.superseded.length,1);
const reverse=providerObservationBatch([
 {id:"x",httpStatus:200,confirmation:"HUMAN_PLAYBACK",observedAt:"2026-09-25T02:00:00Z"},
 {id:"x",httpStatus:200,confirmation:"MEDIA_ENDPOINT",observedAt:"2026-09-24T02:00:00Z"}
],{knownSourceIds:["x"]});
assert.equal(reverse.observations.x.confirmation,"HUMAN_PLAYBACK");
assert.equal(reverse.rejected.length,0);
console.log("provider observation renewal history selects newest valid evidence");
