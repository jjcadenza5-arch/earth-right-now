import { buildWatchEarth,watchEarthEligible,watchEarthSnapshot } from "../src/watch-earth.js";import { buildMomentSequence,momentCaption } from "../src/moment-sequencer.js";
const now=new Date("2026-03-20T12:00:00Z"),base={title:"City",placeId:"p",country:"X",region:"Y",truth:"EXTERNAL_LIVE",permission:"LINK_ONLY",health:"HEALTHY",playback:"EXTERNAL",sourceUrl:"https://example.com",quality:80,moment:80,categories:["Earth Happening Now","Cities & Streets"]},fresh={...base,id:"fresh",checkedAt:now.toISOString(),lastSuccessfulCheck:now.toISOString()},old={...base,id:"old",placeId:"q",quality:99,checkedAt:"2026-01-01T00:00:00Z",lastSuccessfulCheck:"2026-01-01T00:00:00Z"};
console.assert(watchEarthEligible(fresh,{now})&&!watchEarthEligible(old,{now}),"Watch Earth eligibility must use supplied moment");
console.assert(buildWatchEarth([old,fresh],{now})[0]?.id==="fresh"&&watchEarthSnapshot([old,fresh],{now}).count===1,"Watch Earth build and diagnostics must share the same moment");
console.assert(buildMomentSequence([old,fresh],{now})[0]?.id==="fresh","Earth Moments sequence must use supplied moment");
console.assert(momentCaption(old,{now}).eyebrow!=="EARTH HAPPENING NOW","stale source must not keep Happening Now caption");
console.log("ERN Watch Earth/Moments single-clock checks passed");
