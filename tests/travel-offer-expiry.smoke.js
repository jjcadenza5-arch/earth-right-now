import assert from "node:assert/strict";
import {offerVerificationState,currentTravelOffer} from "../src/travel-offer-verification.js";
const now=Date.parse("2026-09-29T09:00:00Z");
const base={id:"o",title:"Offer",provider:"Partner",placeId:"p",intent:"activities",url:"https://example.test/",verified:true,verifiedAt:"2026-09-28T09:00:00Z"};
assert.equal(currentTravelOffer(base,{now}),true);
assert.equal(currentTravelOffer({...base,expiresAt:"2026-09-30T09:00:00Z"},{now}),true);
assert.equal(offerVerificationState({...base,expiresAt:"2026-09-29T08:59:00Z"},{now}).reason,"OFFER_EXPIRED");
assert.equal(offerVerificationState({...base,expiresAt:"not-a-date"},{now}).reason,"INVALID_EXPIRES_AT");
console.log("Travel offers fail closed on explicit expiry");
