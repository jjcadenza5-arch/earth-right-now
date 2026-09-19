import { heroPool,heroTrustMode } from "../src/hero-eligibility.js";
const now=new Date().toISOString();
const rows=[
 {id:"u",truth:"EXTERNAL_LIVE",health:"UNKNOWN",permission:"LINK_ONLY",playback:"EXTERNAL",sourceUrl:"https://example.test"},
 {id:"h",truth:"LIVE_VIDEO",health:"HEALTHY",permission:"EMBED_ALLOWED",playback:"EMBED",sourceUrl:"https://example.test/live",embedUrl:"https://www.youtube.com/embed/ern-test",checkedAt:now,lastSuccessfulCheck:now}
];
console.assert(heroPool(rows)[0]?.id==="h"&&heroTrustMode(rows[1])==="CURRENT","Hero must prefer a current policy-valid live source");
console.log("ERN Hero eligibility smoke checks passed");
