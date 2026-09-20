import { placeHealth } from "../src/place-health.js";import { curate } from "../src/curation.js";
const now=new Date("2026-03-20T12:00:00Z"),base={title:"City",country:"X",truth:"EXTERNAL_LIVE",permission:"LINK_ONLY",health:"HEALTHY",playback:"EXTERNAL",sourceUrl:"https://example.com",quality:80,freshness:80,moment:80},fresh={...base,id:"fresh",checkedAt:now.toISOString(),lastSuccessfulCheck:now.toISOString()},old={...base,id:"old",quality:99,checkedAt:"2026-01-01T00:00:00Z",lastSuccessfulCheck:"2026-01-01T00:00:00Z"},preview={...base,id:"photo",truth:"PREVIEW",playback:"PREVIEW",permission:"UNKNOWN",health:"UNKNOWN"};
console.assert(placeHealth([fresh,old],{now}).currentCount===1,"place health must count current sources at supplied moment");
console.assert(placeHealth([preview],{now}).label==="Reference image available","photo-only place must be described honestly");
console.assert(curate([old,fresh],{requireCurrent:true,now})[0]?.id==="fresh","current curation must reject expired high-quality source");
console.log("ERN place-health/curation truth checks passed");
