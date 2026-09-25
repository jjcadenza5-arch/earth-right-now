import assert from "node:assert/strict";
import {createInMemoryGuideAiRateLimiter,guideAiRateSubject,GUIDE_AI_RATE_POLICY} from "../src/guide-ai-rate-limit.js";

assert.equal(guideAiRateSubject("192.0.2.1").reason,"OPAQUE_RATE_SUBJECT_REQUIRED");
assert.equal(guideAiRateSubject("person@example.com").reason,"OPAQUE_RATE_SUBJECT_REQUIRED");
const limiter=createInMemoryGuideAiRateLimiter();
const subject="anon_AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA";
const now=new Date("2026-09-25T08:00:00Z");
const first=await limiter.begin({subject,now});assert.equal(first.allowed,true);
const concurrent=await limiter.check({subject,now});assert.equal(concurrent.reason,"CONCURRENT_REQUEST_LIMIT");
await limiter.end({subject});
for(let i=1;i<GUIDE_AI_RATE_POLICY.maxRequestsPerSubject;i++){
  const r=await limiter.begin({subject,now:new Date(now.getTime()+i*1000)});assert.equal(r.allowed,true);await limiter.end({subject});
}
const blocked=await limiter.check({subject,now:new Date(now.getTime()+30000)});
assert.equal(blocked.reason,"RATE_LIMIT");
const other=await limiter.check({subject:"anon_BBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBB",now:new Date(now.getTime()+30000)});
assert.equal(other.allowed,true);
console.log("Guide AI rate limiting is pseudonymous, per-subject and concurrency-bounded");
