import assert from "node:assert/strict";
import fs from "node:fs";
const app=fs.readFileSync(new URL("../src/app-lite.js",import.meta.url),"utf8");
const planning=fs.readFileSync(new URL("../src/travel-planning-client.js",import.meta.url),"utf8");
assert.ok(app.includes('const TP=globalThis.ERNTravelPlanning'),"travel planning helper wiring missing");
assert.ok(app.includes('offers:intent.planning?TP.guideOffers(state.travelOffers,items[0],state.affiliatePartners):[]'),"Guide planning links must derive only after editorial place matching");
assert.ok(app.includes('...(result.offers||[]).map(TP.guideLink)'),"Guide planning links must render after editorial results");
assert.ok(app.includes('offer=i=>current?TP.offerFor(state.travelOffers,s,i,state.affiliatePartners):null'),"reference-only viewer must gate every commercial offer behind current source truth");
assert.ok(app.includes('TP.localFor(approvedLocalPlaces(),s,re)'),"Before You Go should support reviewed local-place fallback through the travel-planning module");
assert.ok(app.includes('lp(/hotel|resort|chalet|guesthouse|hostel|stay|accommodation/)'),"Stay should prefer an approved exact-place local option before generic search");
assert.ok(planning.includes('ERN reviewed local place'),"local planning fallback should be disclosed as ERN reviewed, not affiliate");
assert.match(planning,/expires<=now/,"browser travel offer gate must enforce explicit expiry");
assert.match(planning,/partnerCurrent/,"browser travel offer gate must require an active partner");
assert.match(planning,/sourceEligible/,"browser travel offer gate must require a currently eligible ERN source");
const scoreBody=app.slice(app.indexOf("function guideScore("),app.indexOf("function guideNearby("));
assert.doesNotMatch(scoreBody,/travelOffer|affiliate|sponsored|provider/,"commercial availability must not enter Guide editorial scoring");
console.log("Guide planning is post-ranking, current-only and commercial-neutral");

assert.match(planning,/function localFor\(/,"travel-planning module owns exact-place local matching");

assert.ok(app.includes("TP.applyPlan("),"viewer planning buttons should use the modular planning renderer");
assert.match(planning,/function applyPlan\(/,"travel-planning module owns planning-link rendering");

// Attribution state must remain mutually exclusive as planning links change between local and affiliate routes.
assert.match(planning,/if\(o\)\{delete el\.dataset\.localPlaceId;/,"affiliate transition must clear previous reviewed-local attribution");
assert.match(planning,/else\{delete el\.dataset\.offerId;delete el\.dataset\.offerKind;/,"local or generic transition must clear previous affiliate attribution");
assert.match(planning,/else\{delete el\.dataset\.localPlaceId;el\.removeAttribute\("title"\)/,"generic fallback must clear previous reviewed-local attribution");
