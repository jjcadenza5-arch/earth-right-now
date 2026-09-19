import { sourceChoiceSummary } from "../src/source-choice-summary.js";
const place={sources:[{truth:"LIVE_VIDEO",playback:"EMBED"},{truth:"EXTERNAL_LIVE",playback:"EXTERNAL"},{truth:"PREVIEW",playback:"PREVIEW"}]};const x=sourceChoiceSummary(place);console.assert(x.includes("1 inside ERN")&&x.includes("1 at source")&&x.includes("1 preview"));console.assert(sourceChoiceSummary({sources:[]})==="No available windows");
console.log("ERN source choice summary smoke checks passed");
