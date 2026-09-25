import assert from "node:assert/strict";
import {earthSignalHttpRequest} from "../src/earth-signal-http-adapter.js";

const allCapabilities={transport:true,rateLimits:true,moderation:true,reporting:true,expiryDeletion:true,privacyNotice:true};
const now=new Date("2026-09-25T05:00:00Z");

const disabled=earthSignalHttpRequest(
  {method:"POST",path:"/api/earth-signals",body:{type:"WORTH_SEEING",placeId:"chiang-mai"}},
  {capabilities:{},knownPlaceIds:["chiang-mai"],id:"sig-1",now}
);
assert.equal(disabled.status,503);
assert.equal(disabled.body.mode,"READ_ONLY");
assert.equal(disabled.body.reason,"EARTH_SIGNALS_NOT_ACTIVATED");

const created=earthSignalHttpRequest(
  {method:"POST",path:"/api/earth-signals",body:{type:"WORTH_SEEING",placeId:"chiang-mai",placeLabel:"Chiang Mai"}},
  {capabilities:allCapabilities,knownPlaceIds:["chiang-mai"],history:[],id:"sig-1",now}
);
assert.equal(created.status,201);
assert.equal(created.body.signal.id,"sig-1");
assert.equal(created.body.signal.placeId,"chiang-mai");
assert.equal(created.body.signal.expiresAt,"2026-09-25T05:45:00.000Z");

const bad=earthSignalHttpRequest(
  {method:"POST",path:"/api/earth-signals",body:{type:"BUSY",placeId:"unknown"}},
  {capabilities:allCapabilities,knownPlaceIds:["chiang-mai"],history:[],id:"sig-2",now}
);
assert.equal(bad.status,404);
assert.equal(bad.body.reason,"UNKNOWN_PLACE");

const record={
  id:"sig-1",
  type:"WORTH_SEEING",
  placeId:"chiang-mai",
  placeLabel:"Chiang Mai",
  createdAt:"2026-09-25T05:00:00.000Z",
  storageExpiryAt:"2026-09-25T05:45:00.000Z",
  moderation:"STRUCTURED",
  reported:false
};
const listed=earthSignalHttpRequest(
  {method:"GET",path:"/api/earth-signals",query:{placeId:"chiang-mai"}},
  {capabilities:allCapabilities,records:[record],now}
);
assert.equal(listed.status,200);
assert.equal(listed.body.signals.length,1);

const report=earthSignalHttpRequest(
  {method:"POST",path:"/api/earth-signals/sig-1/report",body:{reason:"PRIVACY"}},
  {capabilities:allCapabilities,records:[record],now}
);
assert.equal(report.status,202);
assert.equal(report.body.visibility,"HIDE_PENDING_REVIEW");

assert.equal(created.headers["cache-control"],"no-store");
assert.equal(listed.headers["cache-control"],"no-store");

console.log("Earth Signal HTTP adapter is fail-closed by default and only serves requests behind the full activation gate");
