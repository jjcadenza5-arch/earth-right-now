import assert from "node:assert/strict";
import {
  earthSignalCreateTransaction,
  earthSignalListProjection,
  earthSignalReportTransaction
} from "../src/earth-signal-server-pipeline.js";

const now=new Date("2026-09-25T04:30:00Z");
const known=["chiang-mai","flam-aurlandsfjord"];
const created=earthSignalCreateTransaction(
  {type:"PEACEFUL",placeId:"chiang-mai",placeLabel:"Chiang Mai",createdAt:"1999-01-01T00:00:00Z"},
  {knownPlaceIds:known,history:[],id:"sig-1",now}
);
assert.equal(created.ok,true);
assert.equal(created.stage,"READY_TO_PERSIST");
assert.equal(created.record.createdAt,"2026-09-25T04:30:00.000Z");
assert.equal(created.public.placeId,"chiang-mai");
assert.equal(created.retention.expiryAt,"2026-09-25T05:15:00.000Z");

const badPlace=earthSignalCreateTransaction(
  {type:"BUSY",placeId:"unknown"},
  {knownPlaceIds:known,history:[],id:"sig-2",now}
);
assert.deepEqual({ok:badPlace.ok,stage:badPlace.stage,reason:badPlace.reason},{ok:false,stage:"VALIDATION",reason:"UNKNOWN_PLACE"});


const active=[
  created.record,
  {...created.record,id:"sig-old",createdAt:"2026-09-25T03:00:00.000Z",storageExpiryAt:"2026-09-25T03:45:00.000Z"},
  {...created.record,id:"sig-review",reported:true}
];
const list=earthSignalListProjection(active,{placeId:"chiang-mai",now});
assert.equal(list.length,1);
assert.equal(list[0].id,"sig-1");

const report=earthSignalReportTransaction({signalId:"sig-1",reason:"MISLEADING",createdAt:"2026-09-25T04:31:00Z"},active);
assert.equal(report.ok,true);
assert.equal(report.immediateVisibility,"HIDE_PENDING_REVIEW");

const missing=earthSignalReportTransaction({signalId:"none",reason:"SPAM"},active);
assert.equal(missing.reason,"SIGNAL_NOT_FOUND");

console.log("Earth Signal server pipeline composes validation, moderation, retention and reporting without shared visitor-rate state");
