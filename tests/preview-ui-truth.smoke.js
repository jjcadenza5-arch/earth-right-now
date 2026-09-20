import { currentWindowEyebrow,currentWindowAction } from "../src/current-window-label.js";
import { watchEarthMomentLabel,watchEarthReason } from "../src/watch-earth-moment-copy.js";
const p={title:"Place reference",truth:"PREVIEW",permission:"UNKNOWN",health:"UNKNOWN",playback:"PREVIEW",sourceUrl:"https://example.com/photo.jpg",lat:0,lon:0};
console.assert(currentWindowEyebrow(p)==="REFERENCE IMAGE","preview tile must say reference image");
console.assert(currentWindowAction(p)==="View reference image","preview action must not say live/source generically");
console.assert(watchEarthMomentLabel(p)==="Reference image","preview must not inherit daylight/night live-moment language");
console.assert(watchEarthReason(p).includes("not current"),"preview explanation must explicitly say not current");
console.log("ERN preview UI truth-language checks passed");
