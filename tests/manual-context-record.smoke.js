import assert from "node:assert/strict";
import {manualContextRecord,currentManualContext} from "../src/manual-context-record.js";
const policy={maxAgeMinutes:60,allowedFields:["attendance_level","opening_status","summit_temperature","summit_wind","paris_temperature_weather"]};
const r=manualContextRecord({
  sourceId:"paris-eiffel-live-visitor-context",
  observedAt:"2026-09-28T17:00:00Z",
  verifiedBy:"HUMAN_OFFICIAL_PAGE_REVIEW",
  fields:{attendance_level:"High",opening_status:"Open",summit_temperature:"+21.8 C"}
},policy);
assert.equal(r.ok,true);
assert.equal(r.record.cameraTruth,false);
assert.equal(r.record.mayCreateLiveLabel,false);
assert.equal(currentManualContext(r,{now:new Date("2026-09-28T17:59:00Z")}).ok,true);
assert.equal(currentManualContext(r,{now:new Date("2026-09-28T18:01:00Z")}).reason,"STALE_CONTEXT");
assert.equal(manualContextRecord({...r.record,observedAt:"bad",verifiedBy:"human",fields:{attendance_level:"Low"}},policy).reason,"VALID_OBSERVED_AT_REQUIRED");
assert.equal(manualContextRecord({sourceId:"x",observedAt:"2026-09-28T17:00:00Z",verifiedBy:"human",fields:{camera_live:true}},policy).reason,"UNAPPROVED_CONTEXT_FIELD");
console.log("ERN manual context records expire and cannot smuggle camera truth");
