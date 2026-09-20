import { bestAvailableWindows } from "../src/window-evidence.js";import { destinationRank } from "../src/destination-engine.js";
const now=new Date("2026-09-20T05:00:00Z"),base={truth:"EXTERNAL_LIVE",playback:"EXTERNAL",permission:"LINK_ONLY",sourceUrl:"https://example.com",checkedAt:"2026-09-20T04:00:00Z",lastSuccessfulCheck:"2026-09-20T04:00:00Z",quality:70,moment:70,freshness:70};
const healthy={...base,id:"healthy",health:"HEALTHY"},degraded={...base,id:"degraded",health:"DEGRADED",quality:99,moment:99,freshness:99};
console.assert(bestAvailableWindows([degraded,healthy],{now})[0].id==="healthy","healthy evidence should lead within the same truth tier");
console.assert(destinationRank({sources:[healthy]},{now})>destinationRank({sources:[degraded]},{now}),"degraded destinations should remain discoverable but rank below equivalent healthy evidence");
console.log("ERN degraded-source search demotion checks passed");
