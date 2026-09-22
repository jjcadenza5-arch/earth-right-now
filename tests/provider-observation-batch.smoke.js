import assert from "node:assert/strict";
import { providerObservationBatch } from "../src/provider-observation-batch.js";
const at="2026-09-20T12:00:00Z";
const r=providerObservationBatch([
 {id:"a",httpStatus:200},
 {id:"b",httpStatus:200,confirmation:"MEDIA_ENDPOINT"},
 {id:"c",httpStatus:404,failure:"MEDIA_GONE",reason:"Gone"},
 {id:"b",httpStatus:200,confirmation:"HUMAN_PLAYBACK"},
 {httpStatus:200}
],{observedAt:at,knownSourceIds:["a","b","c"]});
assert.equal(r.total,3);
assert.equal(r.observations.a.providerConfirmed,false);
assert.equal(r.observations.a.evidenceKind,"HTTP_ONLY");
assert.equal(r.observations.b.providerConfirmed,true);
assert.equal(r.observations.c.definitiveFailure,true);
assert.deepEqual(r.rejected.map(x=>x.reason),["DUPLICATE_SOURCE_ID","MISSING_SOURCE_ID"]);
console.log("provider observation batch passed");

const guarded=providerObservationBatch([{id:"ghost",httpStatus:200}],{observedAt:at,knownSourceIds:["a"]});
assert.equal(guarded.total,0);
assert.equal(guarded.rejected[0].reason,"UNKNOWN_SOURCE_ID");

const ledger=JSON.parse(await import("node:fs/promises").then(fs=>fs.readFile(new URL("../data/provider-observations.json",import.meta.url),"utf8")));
const known=providerObservationBatch(ledger,{knownSourceIds:["mpala-watering-hole"]});
console.assert(known.total===1&&known.rejected.length===0&&known.observations["mpala-watering-hole"].providerConfirmed===true);
