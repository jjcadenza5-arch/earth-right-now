import assert from "node:assert/strict";import {allowedEmbedUrl,allowedResearchEmbedUrl,embedSandbox} from "../src/embed-policy.js";
const explore="https://explore.org/livecams/player/brown-bear-salmon-cam-brooks-falls";
assert.equal(allowedEmbedUrl(explore),null);assert.equal(allowedResearchEmbedUrl(explore),explore);assert.equal(embedSandbox({embedUrl:explore}),"allow-scripts allow-same-origin allow-presentation");
assert.equal(allowedResearchEmbedUrl("https://explore.org/livecams/currently-live/brown-bear-salmon-cam-brooks-falls"),null);
assert.equal(allowedResearchEmbedUrl("http://explore.org/livecams/player/x"),null);
console.log("ERN research-only Explore embed boundary passed");
