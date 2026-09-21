import assert from "node:assert/strict";import {earthSignalPrivacyReadiness} from "../src/earth-signal-privacy-readiness.js";
assert.equal(earthSignalPrivacyReadiness({}).ready,false);
const notice={purpose:"Ephemeral visitor reports",signalTypes:"Structured signals and future media",retentionMinutes:45,locationOptional:true,publicLocationScope:"PLACE_ONLY",mediaMetadataStripped:true,reporting:"Visitors can report content",deletion:"Expired content is deleted"};
assert.equal(earthSignalPrivacyReadiness(notice).ready,true);
assert.equal(earthSignalPrivacyReadiness({...notice,locationOptional:false}).missing.includes("locationOptional"),true);
assert.equal(earthSignalPrivacyReadiness({...notice,retentionMinutes:60}).ready,false);
console.log("Earth Signal privacy readiness checks passed");
