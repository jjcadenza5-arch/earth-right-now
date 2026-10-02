import fs from "node:fs";
const cfg=await import("../src/analytics-config.js");
console.assert(cfg.analyticsReady()===true,"approved first-party analytics should be configured");
console.assert(cfg.analyticsConfig.provider==="ERN_FIRST_PARTY");
console.assert(cfg.analyticsConfig.privacyMode==="AGGREGATE_ONLY");
const runtime=fs.readFileSync("src/analytics-runtime.js","utf8");
for(const s of ["navigator.doNotTrack","globalPrivacyControl","credentials:\"omit\"","ERN_TELEMETRY","ERN_EVENT","page_view","referrerHost","deviceClass"])console.assert(runtime.includes(s),s+" missing");
console.assert(!runtime.includes("document.cookie"),"analytics must not use cookies");
console.log("ERN first-party analytics runtime privacy guard passed");
