import assert from "node:assert/strict";
import { allowedEmbedUrl,embedSandbox } from "../src/embed-policy.js";

assert.ok(allowedEmbedUrl("https://couchtourist.com/embed/cam/604/"));
assert.ok(allowedEmbedUrl("https://www.youtube.com/embed/example"));
assert.ok(allowedEmbedUrl("https://webcam-lapalma.de/embed/aridane/"));
assert.equal(embedSandbox({embedUrl:"https://webcam-lapalma.de/embed/aridane/"}),"allow-scripts allow-same-origin allow-presentation");
assert.equal(allowedEmbedUrl("http://couchtourist.com/embed/cam/604/"),null);
assert.equal(allowedEmbedUrl("https://evil.example/embed"),null);
assert.equal(allowedEmbedUrl("javascript:alert(1)"),null);
assert.equal(allowedEmbedUrl("https://user:pass@couchtourist.com/embed/cam/604/"),null);

console.log("ERN embed policy smoke checks passed");
