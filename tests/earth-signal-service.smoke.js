import assert from "node:assert/strict";
import {createInMemoryEarthSignalStorage} from "../src/earth-signal-storage-contract.js";
import {createInMemoryEarthSignalRateLimiter} from "../src/earth-signal-rate-limiter-contract.js";
import {
  createEarthSignalService,
  listEarthSignalService,
  reportEarthSignalService,
  cleanupEarthSignalService
} from "../src/earth-signal-service.js";

const allCapabilities={transport:true,rateLimits:true,moderation:true,reporting:true,expiryDeletion:true,privacyNotice:true};
const storage=createInMemoryEarthSignalStorage();
const rateLimiter=createInMemoryEarthSignalRateLimiter();
const now=new Date("2026-09-25T06:00:00Z");

await assert.rejects(
  ()=>createEarthSignalService({type:"PEACEFUL",placeId:"chiang-mai"},{capabilities:{},storage,knownPlaceIds:["chiang-mai"],id:"sig-1",now}),
  error=>error.code==="EARTH_SIGNALS_NOT_ACTIVATED"
);

const created=await createEarthSignalService(
  {type:"PEACEFUL",placeId:"chiang-mai",placeLabel:"Chiang Mai"},
  {capabilities:allCapabilities,storage,rateLimiter,rateSubject:"browser-a",knownPlaceIds:["chiang-mai"],id:"sig-1",now}
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

const otherStorage=createInMemoryEarthSignalStorage();
const sharedLimiter=createInMemoryEarthSignalRateLimiter();
for(let i=0;i<6;i++){
  const made=await createEarthSignalService(
    {type:"BUSY",placeId:"chiang-mai"},
    {capabilities:allCapabilities,storage:otherStorage,rateLimiter:sharedLimiter,rateSubject:"browser-a",knownPlaceIds:["chiang-mai"],id:"a-"+i,now:new Date(now.getTime()+i*1000)}
  );
  assert.equal(made.ok,true);
}
const blocked=await createEarthSignalService(
  {type:"BUSY",placeId:"flam-aurlandsfjord"},
  {capabilities:allCapabilities,storage:otherStorage,rateLimiter:sharedLimiter,rateSubject:"browser-a",knownPlaceIds:["chiang-mai","flam-aurlandsfjord"],id:"a-7",now:new Date(now.getTime()+7000)}
);
assert.equal(blocked.reason,"RATE_LIMIT");
const independent=await createEarthSignalService(
  {type:"BUSY",placeId:"flam-aurlandsfjord"},
  {capabilities:allCapabilities,storage:otherStorage,rateLimiter:sharedLimiter,rateSubject:"browser-b",knownPlaceIds:["chiang-mai","flam-aurlandsfjord"],id:"b-1",now:new Date(now.getTime()+7000)}
);
assert.equal(independent.ok,true);

console.log("Earth Signal service keeps visitor rate limits subject-scoped and separate from public signal storage");
