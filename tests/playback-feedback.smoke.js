import { playbackFeedback,validPlaybackFeedback } from "../src/playback-feedback.js";
console.assert(playbackFeedback({title:"Beach"},{action:"playing"}).message.includes("Beach"));
console.assert(playbackFeedback({title:"Beach"},{action:"external",networkReason:"CONSTRAINED_EMBED"}).message.includes("Data-saving mode"));
console.assert(playbackFeedback({title:"Beach"},{action:"unavailable",networkReason:"OFFLINE"}).message.includes("offline"));
console.assert(validPlaybackFeedback(playbackFeedback(null,{action:"error"})));
console.log("ERN playback feedback smoke checks passed");
