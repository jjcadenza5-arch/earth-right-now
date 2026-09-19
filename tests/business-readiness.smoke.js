import { businessReadiness } from "../src/business-readiness.js";
const current=businessReadiness();
console.assert(current.foundationReady,"current ERN business foundation should be ready");
console.assert(!current.commerciallyActive,"business foundation must not imply live monetization");
console.assert(current.remaining.includes("submissionTransport")&&current.remaining.includes("affiliateInventory")&&current.remaining.includes("partnerReviewWorkflow"));
console.assert(businessReadiness({submissionTransport:true,affiliateInventory:true,partnerReviewWorkflow:true}).score===100);
console.log("ERN business readiness smoke checks passed");
