import { analyticsConfig,analyticsReady } from "../src/analytics-config.js";
console.assert(analyticsConfig.enabled===false,"analytics must remain opt-in before public measurement is approved");
console.assert(analyticsConfig.provider==="NONE");
console.assert(analyticsReady()===false);
console.log("ERN analytics default-off smoke checks passed");
