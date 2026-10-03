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
