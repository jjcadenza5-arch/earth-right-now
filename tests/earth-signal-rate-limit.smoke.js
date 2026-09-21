import assert from "node:assert/strict";import {EARTH_SIGNAL_RATE_POLICY,earthSignalRateDecision} from "../src/earth-signal-rate-limit.js";
const now=new Date("2026-09-21T12:00:00Z"),row=(i,placeId="a")=>({placeId,createdAt:`2026-09-21T11:5${i}:00Z`});
assert.equal(earthSignalRateDecision([],{placeId:"a"},{now}).allowed,true);
assert.equal(earthSignalRateDecision([row(7),row(8),row(9)],{placeId:"a"},{now}).reason,"PLACE_LIMIT");
const spread=[row(4,"a"),row(5,"b"),row(6,"c"),row(7,"d"),row(8,"e"),row(9,"f")];
assert.equal(earthSignalRateDecision(spread,{placeId:"g"},{now}).reason,"RATE_LIMIT");
assert.equal(earthSignalRateDecision([row(0)],{placeId:"a"},{now}).allowed,true,"older boundary data must not block current window");
assert.equal(EARTH_SIGNAL_RATE_POLICY.maxActivePerPlace,3);
console.log("Earth Signal rate limit contract checks passed");
