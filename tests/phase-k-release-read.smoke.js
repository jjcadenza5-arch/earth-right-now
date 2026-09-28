import fs from "node:fs";
const build=fs.readFileSync("scripts/build-release-snapshot.mjs","utf8");
const preflight=fs.readFileSync("scripts/participation-preflight.mjs","utf8");
const page=fs.readFileSync("now-moments.html","utf8");
const js=fs.readFileSync("src/now-moments-page.js","utf8");

for(const required of [
 "src/participation-public-config.js","src/earth-signal-client.js","src/earth-signals.js","src/now-moments-page.js",
 "src/submission-client.js","src/business-submission.js","src/submission-review-contract.js","src/for-places-page.js",
 "data/earth-signal-deployment.json","data/submission-transport.json"
])console.assert(build.includes(required),`release build must copy/hash ${required}`);
console.assert(preflight.includes("manifest-gated participation"),"participation preflight must understand activation-aware architecture");
console.assert(page.includes('id="signalPulseSection" hidden'),"recent signals panel must remain hidden by default");
console.assert(js.includes("client.list(selected.placeId)"),"Now Moments read-side must use canonical place list API");
console.assert(js.includes("not independently verified"),"visitor reports must remain explicitly unverified");
console.assert(!js.includes("setInterval("),"Now Moments must not poll participation endpoints automatically");
console.log("Phase K release/read-side participation boundary smoke: ok");
