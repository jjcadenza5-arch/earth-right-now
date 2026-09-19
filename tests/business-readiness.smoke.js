import { businessReadiness } from "../src/business-readiness.js";
const current=businessReadiness();
console.assert(current.foundationReady,"current ERN business foundation should be ready");
console.assert(!current.commerciallyActive,"business foundation must not imply live monetization");
console.assert(current.remaining.includes("submissionTransport")&&current.remaining.includes("affiliateInventory"));
console.assert(current.passed.includes("submissionTransportContract")&&current.passed.includes("affiliateRegistryContract"));
console.assert(businessReadiness({submissionTransport:true,affiliateInventory:true}).score===100);
console.log("ERN business readiness smoke checks passed");
