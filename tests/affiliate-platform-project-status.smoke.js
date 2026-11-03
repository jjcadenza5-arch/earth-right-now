import assert from "node:assert/strict";
import {affiliatePlatformResearchStatus} from "../src/affiliate-platform-research.js";

const base={
 id:"trip-com",name:"Trip.com via Travelpayouts",intents:["stay"],
 programUrl:"https://www.travelpayouts.com/",termsUrl:"https://www.travelpayouts.com/terms",
 programStatus:"AVAILABLE_PROJECT_STATUS_CHECK_REQUIRED",applicationRequired:false,
 relationshipActive:false,credentialsConfigured:false,publicActivationAllowed:false,
 trackedLinksAllowed:false,paidRankingAllowed:false,termsReviewedAt:"2026-10-03T09:35:00Z"
};
const ok=affiliatePlatformResearchStatus([base],{now:Date.parse("2026-10-03T09:50:00Z")});
assert.equal(ok.invalid,0);
const bad=affiliatePlatformResearchStatus([{...base,applicationRequired:true}],{now:Date.parse("2026-10-03T09:50:00Z")});
assert.equal(bad.invalid,1);
assert.ok(bad.items[0].reasons.includes("PROJECT_STATUS_CHECK_MUST_NOT_REQUIRE_APPLICATION"));
console.log("Travelpayouts project-status research remains fail-closed without inventing a manual application.");

const overdue=affiliatePlatformResearchStatus([base],{now:Date.parse("2026-11-03T12:00:00Z")});
assert.equal(overdue.valid,0);assert.equal(overdue.invalid,1);
assert.equal(overdue.heldForTermsReview,1);assert.equal(overdue.blockingInvalid,0);
assert.equal(overdue.researchCandidates,0);assert.equal(overdue.activePlatforms,0);assert.equal(overdue.linkToolPlatforms,0);
assert.equal(overdue.items[0].valid,false);assert.deepEqual(overdue.items[0].reasons,["TERMS_REVIEW_STALE"]);
assert.equal(overdue.items[0].termsReviewedAt,base.termsReviewedAt);
const staleUnsafe=affiliatePlatformResearchStatus([{...base,paidRankingAllowed:true}],{now:Date.parse("2026-11-03T12:00:00Z")});
assert.equal(staleUnsafe.heldForTermsReview,0);assert.equal(staleUnsafe.blockingInvalid,1);assert.equal(staleUnsafe.items[0].valid,false);
console.log("Expired affiliate research remains unusable but does not abort diagnostic generation; policy failures still block");
