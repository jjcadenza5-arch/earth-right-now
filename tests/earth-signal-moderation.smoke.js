import {EARTH_SIGNAL_MODERATION_POLICY,earthSignalModerationState,earthSignalReport} from "../src/earth-signal-moderation.js";
console.assert(EARTH_SIGNAL_MODERATION_POLICY.autoPublishMedia===false);
console.assert(!earthSignalModerationState({kind:"photo",moderation:"PENDING"}).visible);
console.assert(earthSignalModerationState({kind:"photo",moderation:"APPROVED"}).visible);
console.assert(!earthSignalModerationState({kind:"signal",reported:true}).visible);
console.assert(earthSignalReport({signalId:"s1",reason:"PRIVACY",createdAt:"2026-09-21T12:00:00Z"}).ok);
console.assert(!earthSignalReport({signalId:"s1",reason:"LIKE"}).ok);
console.log("Earth Signal moderation contract checks passed");
