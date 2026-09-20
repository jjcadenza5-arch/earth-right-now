import { rankWindows } from "../src/window-choice.js";import { destinationSummary,destinationRank } from "../src/destination-engine.js";
const now=new Date("2026-03-20T12:00:00Z"),base={truth:"EXTERNAL_LIVE",permission:"LINK_ONLY",health:"HEALTHY",playback:"EXTERNAL",sourceUrl:"https://example.com",quality:80,freshness:80,moment:80};
const fresh={...base,id:"fresh",checkedAt:now.toISOString(),lastSuccessfulCheck:now.toISOString()},old={...base,id:"old",quality:99,checkedAt:"2026-01-01T00:00:00Z",lastSuccessfulCheck:"2026-01-01T00:00:00Z"};
console.assert(rankWindows([old,fresh],{now})[0].id==="fresh","Choose a Window must rank verified-current evidence ahead of stale quality");
const place={id:"p",sources:[old,fresh]};console.assert(destinationSummary(place,{now}).current===1,"destination summary must count current windows at supplied moment");console.assert(Number.isFinite(destinationRank(place,{now})),"destination ranking should remain available");
console.log("ERN destination moment-ranking checks passed");
