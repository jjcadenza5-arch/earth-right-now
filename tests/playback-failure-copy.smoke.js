import { playbackFailureMessage } from "../src/playback-failure-copy.js";
console.assert(playbackFailureMessage({kind:"EMBED_TIMEOUT"}).includes("did not respond"));
console.assert(playbackFailureMessage({kind:"IMAGE_FAILED"}).includes("current image"));
console.assert(playbackFailureMessage({kind:"RENDER_FAILED"}).includes("could not be rendered"));
console.assert(playbackFailureMessage({kind:"OTHER"}).includes("playback problem"));
console.log("ERN playback failure copy smoke checks passed");
