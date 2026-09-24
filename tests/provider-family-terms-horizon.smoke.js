import assert from "node:assert/strict";import {providerFamilyResearchStatus} from "../src/provider-family-research.js";
const base={id:"p",status:"RESEARCH_ONLY",provider:"P",familyLabel:"Player",researchUrl:"https://example.com/live",termsUrl:"https://example.com/terms",usageMode:"PROVIDER_BRANDED_PLAYER_ONLY",playerBrandingRequired:true,restreamAllowed:false};
let r=providerFamilyResearchStatus([{...base,termsReviewedAt:"2026-09-01T00:00:00Z"}],{now:new Date("2026-09-24T00:00:00Z"),maxTermsAgeDays:30});
assert.equal(r.items[0].termsEvidenceState,"CURRENT");assert.equal(r.needsTermsReview,0);
r=providerFamilyResearchStatus([{...base,termsReviewedAt:"2026-07-01T00:00:00Z"}],{now:new Date("2026-09-24T00:00:00Z"),maxTermsAgeDays:30});
assert.equal(r.items[0].termsEvidenceState,"STALE");assert.equal(r.needsTermsReview,1);assert.equal(r.attention[0].reason,"TERMS_REVIEW_STALE");
r=providerFamilyResearchStatus([{...base,usageMode:"RESTREAM",playerBrandingRequired:false,restreamAllowed:true,termsReviewedAt:"2026-09-24T00:00:00Z"}],{now:new Date("2026-09-24T00:00:00Z")});
assert.equal(r.unsafe.length,1);assert.equal(r.safety.restreamAllowed,false);
console.log("ERN provider terms freshness and anti-restream boundary passed");
