import assert from "node:assert/strict";
import {createInMemoryEarthSignalRateLimiter,earthSignalRateSubject} from "../src/earth-signal-rate-limiter-contract.js";

assert.equal(earthSignalRateSubject({subject:""}).reason,"RATE_SUBJECT_REQUIRED");
assert.equal(earthSignalRateSubject({subject:"x".repeat(161)}).reason,"RATE_SUBJECT_TOO_LONG");

const limiter=createInMemoryEarthSignalRateLimiter();
const now=new Date("2026-09-25T05:30:00Z");

for(let i=0;i<3;i++){
  const r=await limiter.commit({subject:"visitor-a",placeId:"chiang-mai",now:new Date(now.getTime()+i*1000)});
  assert.equal(r.allowed,true);
}
const placeBlocked=await limiter.check({subject:"visitor-a",placeId:"chiang-mai",now:new Date(now.getTime()+4000)});
assert.equal(placeBlocked.allowed,false);
assert.equal(placeBlocked.reason,"PLACE_LIMIT");

for(let i=0;i<3;i++){
  const r=await limiter.commit({subject:"visitor-a",placeId:"flam",now:new Date(now.getTime()+(5000+i*1000))});
  assert.equal(r.allowed,true);
}
const globalBlocked=await limiter.check({subject:"visitor-a",placeId:"other",now:new Date(now.getTime()+9000)});
assert.equal(globalBlocked.reason,"RATE_LIMIT");

const otherVisitor=await limiter.check({subject:"visitor-b",placeId:"chiang-mai",now:new Date(now.getTime()+9000)});
assert.equal(otherVisitor.allowed,true);

console.log("Earth Signal rate limiting is subject-scoped, place-bounded and does not let one visitor consume another visitor's quota");
