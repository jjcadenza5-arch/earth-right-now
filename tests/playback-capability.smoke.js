import { playbackCapability } from "../src/playback-capability.js";
const now=new Date().toISOString();
console.assert(playbackCapability({health:"HEALTHY",permission:"LINK_ONLY",playback:"EXTERNAL",truth:"EXTERNAL_LIVE",sourceUrl:"https://example.test",checkedAt:now,lastSuccessfulCheck:now}).action==="EXTERNAL");
console.assert(playbackCapability({health:"HEALTHY",permission:"EMBED_ALLOWED",playback:"EMBED",truth:"LIVE_VIDEO",sourceUrl:"https://example.test",embedUrl:"https://www.youtube.com/embed/ern-test",checkedAt:now,lastSuccessfulCheck:now}).action==="PLAY");
console.assert(playbackCapability({health:"HEALTHY",permission:"EMBED_ALLOWED",playback:"EMBED",truth:"LIVE_VIDEO",sourceUrl:"https://example.test",embedUrl:"https://example.test/e",checkedAt:now,lastSuccessfulCheck:now}).action!=="PLAY","unapproved embed hosts must never become inside-ERN playback");
console.log("ERN playback capability smoke checks passed");
