import assert from "node:assert/strict";
import {
  EARTH_SIGNAL_API_VERSION,
  EARTH_SIGNAL_API_CONTRACT,
  earthSignalSubmissionEnvelope,
  earthSignalServerRecord,
  earthSignalPublicResponse
} from "../src/earth-signal-api-contract.js";

const known=["chiang-mai","flam-aurlandsfjord"];
const valid=earthSignalSubmissionEnvelope({
  type:"BEAUTIFUL_LIGHT",
  placeId:"chiang-mai",
  placeLabel:"Chiang Mai",
  createdAt:"2000-01-01T00:00:00Z",
  locationPermission:true,
  nearPlace:true
},{knownPlaceIds:known});
assert.equal(valid.ok,true);
assert.equal(valid.request.apiVersion,EARTH_SIGNAL_API_VERSION);
assert.equal(valid.request.locationEvidence,"NEAR_PLACE");
assert.ok(valid.serverMustIgnore.includes("createdAt"));

assert.equal(earthSignalSubmissionEnvelope({type:"BUSY",placeId:"unknown"},{knownPlaceIds:known}).reason,"UNKNOWN_PLACE");
assert.equal(earthSignalSubmissionEnvelope({type:"BUSY",placeId:"chiang-mai",text:"hello"},{knownPlaceIds:known}).reason,"FREE_TEXT_NOT_ACCEPTED");
assert.equal(earthSignalSubmissionEnvelope({type:"BUSY",placeId:"chiang-mai",lat:18.7},{knownPlaceIds:known}).reason,"PRECISE_COORDINATES_NOT_ACCEPTED");

const now=new Date("2026-09-25T03:00:00Z");
const stored=earthSignalServerRecord(valid.request,{id:"sig-1",now});
assert.equal(stored.ok,true);
assert.equal(stored.record.createdAt,"2026-09-25T03:00:00.000Z");
assert.equal(stored.record.storageExpiryAt,"2026-09-25T03:45:00.000Z");
assert.equal(stored.record.moderation,"STRUCTURED");

const publicRow=earthSignalPublicResponse(stored.record);
assert.equal(publicRow.id,"sig-1");
assert.equal(publicRow.nearPlaceVerified,true);
assert.equal("locationEvidence" in publicRow,false);
assert.equal(EARTH_SIGNAL_API_CONTRACT.freeTextAccepted,false);
assert.equal(EARTH_SIGNAL_API_CONTRACT.preciseCoordinatesAccepted,false);
assert.equal(EARTH_SIGNAL_API_CONTRACT.responseCache,"no-store");

console.log("Earth Signal API contract is server-timestamped, bounded and privacy-minimal");
