import { businessReadiness } from "../src/business-readiness.js";
const r=businessReadiness();
console.log(`ERN business readiness: ${r.score}%`);
console.log(`Foundation ready: ${r.foundationReady?"yes":"no"}`);
console.log(`Commercially active: ${r.commerciallyActive?"yes":"no"}`);
console.log(`Ready: ${r.passed.join(", ")||"none"}`);
console.log(`Remaining: ${r.remaining.join(", ")||"none"}`);
