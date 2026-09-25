import assert from "node:assert/strict";
import {createInMemoryEarthSignalRateLimiter,earthSignalRateSubject,deriveEarthSignalRateSubject} from "../src/earth-signal-rate-limiter-contract.js";

assert.equal(earthSignalRateSubject({subject:""}).reason,"RATE_SUBJECT_REQUIRED");
assert.equal(earthSignalRateSubject({subject:"x".repeat(97)}).reason,"RATE_SUBJECT_TOO_LONG");
assert.equal(earthSignalRateSubject({subject:"192.0.2.1"}).reason,"OPAQUE_RATE_SUBJECT_REQUIRED");
assert.equal(earthSignalRateSubject({subject:"person@example.com"}).reason,"OPAQUE_RATE_SUBJECT_REQUIRED");
const derived=await deriveEarthSignalRateSubject("client_token_ABCDEFGHIJKLMNOPQRSTUV",{digest:async token=>"Z".repeat(48)});
assert.equal(derived.ok,true);
assert.match(derived.subject,/^anon_/);

const limiter=createInMemoryEarthSignalRateLimiter();
const now=new Date("2026-09-25T05:30:00Z");

for(let i=0;i<3;i++){
  const r=await limiter.commit({subject:"anon_AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA",placeId:"chiang-mai",now:new Date(now.getTime()+i*1000)});
  assert.equal(r.allowed,true);
}
const placeBlocked=await limiter.check({subject:"anon_AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA",placeId:"chiang-mai",now:new Date(now.getTime()+4000)});
assert.equal(placeBlocked.allowed,false);
assert.equal(placeBlocked.reason,"PLACE_LIMIT");

for(let i=0;i<3;i++){
  const r=await limiter.commit({subject:"anon_AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA",placeId:"flam",now:new Date(now.getTime()+(5000+i*1000))});
  assert.equal(r.allowed,true);
}
const globalBlocked=await limiter.check({subject:"anon_AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA",placeId:"other",now:new Date(now.getTime()+9000)});
assert.equal(globalBlocked.reason,"RATE_LIMIT");

const otherVisitor=await limiter.check({subject:"anon_BBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBB",placeId:"chiang-mai",now:new Date(now.getTime()+9000)});
assert.equal(otherVisitor.allowed,true);

const firstReport=await limiter.commit({subject:"anon_AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA",action:"REPORT",targetId:"sig-1",now:new Date(now.getTime()+10000)});
assert.equal(firstReport.allowed,true);
const duplicateReport=await limiter.check({subject:"anon_AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA",action:"REPORT",targetId:"sig-1",now:new Date(now.getTime()+11000)});
assert.equal(duplicateReport.allowed,false);
assert.equal(duplicateReport.reason,"DUPLICATE_REPORT");
const otherReporter=await limiter.check({subject:"anon_BBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBB",action:"REPORT",targetId:"sig-1",now:new Date(now.getTime()+11000)});
assert.equal(otherReporter.allowed,true);

console.log("Earth Signal rate limiting is subject-scoped, place-bounded and does not let one visitor consume another visitor's quota");
