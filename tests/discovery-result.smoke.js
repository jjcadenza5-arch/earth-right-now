import { discoveryResult,discoveryStatus } from "../src/discovery-result.js";
const now=new Date().toISOString(),base={health:"HEALTHY",permission:"LINK_ONLY",playback:"EXTERNAL",truth:"EXTERNAL_LIVE",sourceUrl:"https://example.test/live",checkedAt:now,lastSuccessfulCheck:now,provider:"Official",categories:["Beaches & Water"]};
const sources=[{...base,id:"beach-a",placeId:"beach",title:"Blue Beach",country:"Testland",region:"Coast"},{...base,id:"beach-b",placeId:"beach",title:"Blue Beach second view",country:"Testland",region:"Coast"}];
const r=discoveryResult(sources,"beach",{limit:12});console.assert(r.count===1&&r.windowCount===2&&!r.empty);console.assert(discoveryStatus(r)==="1 destination · 2 current/live views");
const none=discoveryResult(sources,"elephant");console.assert(none.empty&&discoveryStatus(none).includes("No matching destination"));
const liveNone=discoveryResult([{...sources[0],checkedAt:"2020-01-01T00:00:00Z",lastSuccessfulCheck:"2020-01-01T00:00:00Z"}],"live beach");console.assert(liveNone.empty&&discoveryStatus(liveNone).includes("verified-current"));
console.log("ERN discovery result smoke checks passed");
