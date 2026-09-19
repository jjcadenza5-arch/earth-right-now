import { releaseReadiness } from "../src/release-readiness.js";
const now=new Date().toISOString(),row={id:"x",placeId:"x",title:"X",truth:"LIVE_VIDEO",permission:"EMBED_ALLOWED",health:"HEALTHY",playback:"EMBED",sourceUrl:"https://example.com",embedUrl:"https://www.youtube.com/embed/x",checkedAt:now,lastSuccessfulCheck:now};
let r=releaseReadiness([row]);
console.assert(!r.ready&&r.blockers.includes("browser")&&r.catalog.ready);
r=releaseReadiness([row],{browserTested:true,mobileTested:true,providerPlaybackTested:true,accessibilityTested:true,performanceTested:true,rollbackReady:true});
console.assert(!r.ready&&r.blockers.includes("browser"),"legacy boolean test flags must not satisfy auditable release evidence");
console.log("ERN release readiness smoke checks passed");
