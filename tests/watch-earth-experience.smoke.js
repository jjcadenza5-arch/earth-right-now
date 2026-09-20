import { watchEarthExperienceEligible,watchEarthExperienceScore } from "../src/watch-earth-experience.js";
const good={health:"HEALTHY",quality:90,moment:88,freshness:95};
console.assert(watchEarthExperienceEligible(good),"strong healthy source should qualify");
console.assert(!watchEarthExperienceEligible({...good,quality:65}),"technically live but low-quality source should not enter the 20");
console.assert(!watchEarthExperienceEligible({...good,moment:40}),"weak current moment should not enter the 20");
console.assert(!watchEarthExperienceEligible({...good,failureReason:"VISITOR_PLAYBACK_REJECTED_2026-09-20"}),"visitor rejection must override metadata");
console.assert(watchEarthExperienceScore(good)>watchEarthExperienceScore({...good,quality:82,moment:72}),"stronger experiences should rank higher");
console.log("ERN Watch Earth visitor-experience floor checks passed");
