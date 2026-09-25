import assert from "node:assert/strict";
import {createInMemoryEarthSignalStorage} from "../src/earth-signal-storage-contract.js";
import {
  createEarthSignalService,
  listEarthSignalService,
  reportEarthSignalService,
  cleanupEarthSignalService
} from "../src/earth-signal-service.js";

const allCapabilities={transport:true,rateLimits:true,moderation:true,reporting:true,expiryDeletion:true,privacyNotice:true};
const storage=createInMemoryEarthSignalStorage();
const now=new Date("2026-09-25T06:00:00Z");

await assert.rejects(
  ()=>createEarthSignalService({type:"PEACEFUL",placeId:"chiang-mai"},{capabilities:{},storage,knownPlaceIds:["chiang-mai"],id:"sig-1",now}),
  error=>error.code==="EARTH_SIGNALS_NOT_ACTIVATED"
);

const created=await createEarthSignalService(
  {type:"PEACEFUL",placeId:"chiang-mai",placeLabel:"Chiang Mai"},
  {capabilities:allCapabilities,storage,knownPlaceIds:["chiang-mai"],id:"sig-1",now}
);
assert.equal(created.ok,true);
assert.equal(created.persisted,true);

const listed=await listEarthSignalService({capabilities:allCapabilities,storage,placeId:"chiang-mai",now});
assert.equal(listed.signals.length,1);
assert.equal(listed.signals[0].id,"sig-1");

const reported=await reportEarthSignalService(
  {signalId:"sig-1",reason:"WRONG_PLACE",createdAt:"2026-09-25T06:01:00Z"},
  {capabilities:allCapabilities,storage,now}
);
assert.equal(reported.ok,true);
assert.equal(reported.persisted,true);
assert.equal(storage.snapshot().signals[0].reported,true);

const hidden=await listEarthSignalService({capabilities:allCapabilities,storage,placeId:"chiang-mai",now});
assert.equal(hidden.signals.length,0);

const cleanup=await cleanupEarthSignalService({capabilities:allCapabilities,storage,now:new Date("2026-09-25T06:46:00Z")});
assert.equal(cleanup.deleted,1);

console.log("Earth Signal service layer stays gated and composes persistence, visibility, reporting and expiry");
