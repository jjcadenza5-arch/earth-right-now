import {analyticsConfig,analyticsReady} from "../src/analytics-config.js";
console.assert(analyticsConfig.enabled===true,"owner-approved soft-launch analytics should be enabled");
console.assert(analyticsConfig.provider==="ERN_FIRST_PARTY");
console.assert(analyticsConfig.privacyMode==="AGGREGATE_ONLY");
console.assert(analyticsReady()===true);
console.log("ERN approved privacy analytics configuration passed");
