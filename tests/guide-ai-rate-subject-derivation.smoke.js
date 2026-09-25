import assert from "node:assert/strict";
import {deriveGuideAiRateSubject,GUIDE_AI_RATE_SUBJECT_POLICY} from "../src/guide-ai-rate-subject-derivation.js";

const missing=await deriveGuideAiRateSubject("");
assert.equal(missing.ok,false);
assert.equal(missing.reason,"RAW_RATE_INPUT_REQUIRED");

const noDigest=await deriveGuideAiRateSubject("198.51.100.4");
assert.equal(noDigest.reason,"RATE_SUBJECT_DIGEST_REQUIRED");

let seenRaw=null;
const derived=await deriveGuideAiRateSubject("198.51.100.4",{digest:async raw=>{seenRaw=raw;return "Z".repeat(48)}});
assert.equal(seenRaw,"198.51.100.4");
assert.equal(derived.ok,true);
assert.match(derived.subject,/^anon_/);
assert.equal(derived.rawStored,false);
assert.equal(derived.subject.length,5+48);
assert.equal(GUIDE_AI_RATE_SUBJECT_POLICY.rawIdentifierStored,false);

const failed=await deriveGuideAiRateSubject("198.51.100.4",{digest:async()=>{throw new Error("nope")}});
assert.equal(failed.reason,"RATE_SUBJECT_DIGEST_FAILED");

console.log("Guide AI rate subjects derive through an injected one-way digest without retaining raw identity");
