import { bestMoment,happeningNowEligible,rankMoments } from "../src/moments-engine.js";import { rankForIntent } from "../src/ern-ai.js";
const now=new Date("2026-03-20T12:00:00Z"),base={title:"City",country:"X",region:"Y",truth:"EXTERNAL_LIVE",permission:"LINK_ONLY",health:"HEALTHY",playback:"EXTERNAL",sourceUrl:"https://example.com",quality:80,moment:80,categories:["Earth Happening Now","Cities & Streets"]},fresh={...base,id:"fresh",checkedAt:now.toISOString(),lastSuccessfulCheck:now.toISOString()},old={...base,id:"old",quality:99,checkedAt:"2026-01-01T00:00:00Z",lastSuccessfulCheck:"2026-01-01T00:00:00Z"};
console.assert(happeningNowEligible(fresh,{now})&&!happeningNowEligible(old,{now}),"Happening Now must honor supplied moment");
console.assert(bestMoment([old,fresh],"Earth Happening Now",{now})?.id==="fresh","Earth Happening Now must not promote stale evidence");
console.assert(rankMoments([old,fresh],{now})[0].id==="fresh","moment ranking should prefer verified current evidence");
console.assert(rankForIntent([old,fresh],"show me what is live right now",{now})[0]?.id==="fresh","ERN intent ranking should share the same current moment");
console.log("ERN Moments/intent clock checks passed");
