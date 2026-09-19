import { partnerReview,partnerPublishable } from "../src/partner-review.js";
const paid={commercialStatus:"PAID_PARTNER"};
const blocked=partnerReview(paid,{decision:"APPROVED"});
console.assert(!blocked.ok&&!partnerPublishable(blocked),"payment must never bypass source review");
const ready=partnerReview({...paid,truthReviewed:true,permissionReviewed:true,healthReviewed:true},{decision:"APPROVED",reviewNote:"All source checks complete"});
console.assert(ready.ok&&partnerPublishable(ready));
const rejected=partnerReview({...paid,truthReviewed:true,permissionReviewed:true,healthReviewed:true},{decision:"REJECTED"});
console.assert(!partnerPublishable(rejected));
console.log("ERN partner review smoke checks passed");
