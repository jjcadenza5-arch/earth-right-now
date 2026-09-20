import { bestWindow } from "../src/place-model.js";import { buildAtlas } from "../src/atlas-model.js";
const now=new Date("2026-09-20T05:00:00Z"),base={truth:"EXTERNAL_LIVE",playback:"EXTERNAL",permission:"LINK_ONLY",sourceUrl:"https://example.com",checkedAt:"2026-09-20T04:00:00Z",lastSuccessfulCheck:"2026-09-20T04:00:00Z",quality:70,moment:70,freshness:70,lat:1,lon:1};
const healthy={...base,id:"h",health:"HEALTHY"},degraded={...base,id:"d",health:"DEGRADED",quality:99,moment:99,freshness:99};
console.assert(bestWindow({sources:[degraded,healthy]},{now}).id==="healthy","healthy window should represent a place before degraded evidence");
console.assert(buildAtlas([degraded,healthy],{},{now}).filtered[0].id==="h","World Map ordering should lead with healthy evidence");
console.log("ERN consistent quality ordering checks passed");
