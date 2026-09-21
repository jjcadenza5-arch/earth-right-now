import assert from "node:assert/strict";import {earthSignalExpiryAt,earthSignalDeletionState,earthSignalRetentionRecord} from "../src/earth-signal-retention.js";
assert.equal(earthSignalExpiryAt("2026-09-21T12:00:00Z"),"2026-09-21T12:45:00.000Z");
assert.equal(earthSignalDeletionState({createdAt:"2026-09-21T12:00:00Z"},{now:new Date("2026-09-21T12:44:59Z")}).deleteNow,false);
assert.equal(earthSignalDeletionState({createdAt:"2026-09-21T12:00:00Z"},{now:new Date("2026-09-21T12:45:00Z")}).deleteNow,true);
assert.equal(earthSignalDeletionState({createdAt:"bad"},{now:new Date("2026-09-21T12:00:00Z")}).deleteNow,true,"invalid age fails closed");
const record=earthSignalRetentionRecord({id:"s1",placeId:"p1",createdAt:"2026-09-21T12:00:00Z",lat:1,lon:2});
assert.equal(record.permanent,false);assert.equal("lat" in record,false);assert.equal("lon" in record,false);
console.log("Earth Signal retention checks passed");
