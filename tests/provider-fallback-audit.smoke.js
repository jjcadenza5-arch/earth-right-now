import { auditFallbackCoverage } from "../src/provider-fallback-audit.js";
const good={id:"good",truth:"LIVE_VIDEO",permission:"EMBED_ALLOWED",health:"HEALTHY",playback:"EMBED",embedUrl:"https://couchtourist.com/embed/cam/1/",sourceUrl:"https://couchtourist.com/cams/x/",checkedAt:"2026-09-19",lastSuccessfulCheck:"2026-09-19"};
console.assert(auditFallbackCoverage([good]).length===0);
console.assert(auditFallbackCoverage([{...good,sourceUrl:"javascript:bad"}]).some(x=>x.error==="NO_EXTERNAL_FALLBACK"));
const scheduledClosed={...good,id:"scheduled",timeZone:"UTC",availabilitySchedule:{timeZone:"UTC",start:"00:00",end:"00:01",source:"test schedule"}};
console.assert(!auditFallbackCoverage([scheduledClosed]).some(x=>x.error==="EMBED_NOT_PRIMARY"));
console.log("ERN provider fallback audit smoke checks passed");
