import assert from "node:assert/strict";
import {validateEarthSignalStoredRecord,validateEarthSignalReportRecord} from "../src/earth-signal-record-schema.js";

const validSignal={
  id:"sig-1",
  type:"PEACEFUL",
  placeId:"chiang-mai",
  placeLabel:"Chiang Mai",
  createdAt:"2026-09-25T06:00:00.000Z",
  storageExpiryAt:"2026-09-25T06:45:00.000Z",
  locationEvidence:"UNVERIFIED",
  moderation:"STRUCTURED",
  reported:false
};
assert.equal(validateEarthSignalStoredRecord(validSignal).valid,true);

const coordinateLeak=validateEarthSignalStoredRecord({...validSignal,lat:18.78});
assert.equal(coordinateLeak.valid,false);
assert.ok(coordinateLeak.errors.includes("FORBIDDEN_LAT"));

const freeTextLeak=validateEarthSignalStoredRecord({...validSignal,comment:"nice"});
assert.equal(freeTextLeak.valid,false);
assert.ok(freeTextLeak.errors.includes("FORBIDDEN_COMMENT"));

const badExpiry=validateEarthSignalStoredRecord({...validSignal,storageExpiryAt:"2026-09-25T05:45:00.000Z"});
assert.ok(badExpiry.errors.includes("EXPIRY_NOT_AFTER_CREATION"));

assert.equal(validateEarthSignalReportRecord({
  signalId:"sig-1",reason:"PRIVACY",createdAt:"2026-09-25T06:01:00.000Z"
}).valid,true);

const badReport=validateEarthSignalReportRecord({
  signalId:"sig-1",reason:"OTHER",createdAt:"2026-09-25T06:01:00.000Z",message:"details"
});
assert.equal(badReport.valid,false);
assert.ok(badReport.errors.includes("UNSUPPORTED_REASON"));
assert.ok(badReport.errors.includes("FORBIDDEN_MESSAGE"));

console.log("Earth Signal storage schemas reject privacy-expanding and malformed records");
