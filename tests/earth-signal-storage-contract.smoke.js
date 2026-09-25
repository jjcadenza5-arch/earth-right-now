import assert from "node:assert/strict";
import {
  earthSignalStorageReadiness,
  assertEarthSignalStorage,
  createInMemoryEarthSignalStorage
} from "../src/earth-signal-storage-contract.js";

assert.equal(earthSignalStorageReadiness({}).ready,false);
assert.throws(()=>assertEarthSignalStorage({}),error=>error.code==="EARTH_SIGNAL_STORAGE_INCOMPLETE"&&error.missing.includes("putSignal"));

const store=createInMemoryEarthSignalStorage();
assert.equal(earthSignalStorageReadiness(store).ready,true);

await store.putSignal({
  id:"sig-1",
  type:"PEACEFUL",
  placeId:"chiang-mai",
  createdAt:"2026-09-25T05:00:00.000Z",
  storageExpiryAt:"2026-09-25T05:45:00.000Z",
  reported:false,
  locationEvidence:"UNVERIFIED",
  moderation:"STRUCTURED"
});
await store.putSignal({
  id:"sig-2",
  type:"BUSY",
  placeId:"flam-aurlandsfjord",
  createdAt:"2026-09-25T05:10:00.000Z",
  storageExpiryAt:"2026-09-25T05:55:00.000Z",
  reported:false,
  locationEvidence:"UNVERIFIED",
  moderation:"STRUCTURED"
});

const list=await store.listSignals({placeId:"chiang-mai",now:new Date("2026-09-25T05:30:00Z")});
assert.equal(list.length,1);
assert.equal(list[0].id,"sig-1");

await store.putReport({signalId:"sig-1",reason:"MISLEADING",createdAt:"2026-09-25T05:31:00.000Z"});
const afterReport=store.snapshot();
assert.equal(afterReport.signals.find(x=>x.id==="sig-1").reported,true);
assert.equal(afterReport.reports.length,1);

const deleted=await store.deleteExpired({now:new Date("2026-09-25T05:50:00Z")});
assert.equal(deleted.deleted,1);
assert.deepEqual(store.snapshot().signals.map(x=>x.id),["sig-2"]);

console.log("Earth Signal storage contract is explicit and the reference adapter preserves expiry/report semantics");
