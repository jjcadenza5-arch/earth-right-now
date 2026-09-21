import assert from "node:assert/strict";import {EARTH_SIGNAL_MODERATION_POLICY,earthSignalModerationState,earthSignalReport} from "../src/earth-signal-moderation.js";
assert.ok(EARTH_SIGNAL_MODERATION_POLICY.autoPublishMedia===false);
assert.ok(!earthSignalModerationState({kind:"photo",moderation:"PENDING"}).visible);
assert.ok(earthSignalModerationState({kind:"photo",moderation:"APPROVED"}).visible);
assert.ok(!earthSignalModerationState({kind:"signal",reported:true}).visible);
assert.ok(earthSignalReport({signalId:"s1",reason:"PRIVACY",createdAt:"2026-09-21T12:00:00Z"}).ok);
assert.ok(!earthSignalReport({signalId:"s1",reason:"LIKE"}).ok);
console.log("Earth Signal moderation contract checks passed");
