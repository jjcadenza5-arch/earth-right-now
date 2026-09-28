import fs from "node:fs";
const manifest=JSON.parse(fs.readFileSync("data/earth-signal-deployment.json","utf8"));
const config=fs.readFileSync("src/participation-public-config.js","utf8");
const now=fs.readFileSync("now-moments.html","utf8");
const nowJs=fs.readFileSync("src/now-moments-page.js","utf8");
const places=fs.readFileSync("for-places.html","utf8");
const placesJs=fs.readFileSync("src/for-places-page.js","utf8");

console.assert(manifest.publicActivationAllowed===false,"Earth Signals public activation must default false");
console.assert(config.includes('earthSignals?.status==="DEPLOYED"')&&config.includes("publicActivationAllowed===true"),"Public config must require deployed + explicit Earth Signal activation");
console.assert(config.includes("submissions?.enabled===true"),"Public config must require explicit submission transport enablement");
console.assert(now.includes('datalist id="signalPlaces"')&&nowJs.includes("canonicalPlaces"),"Now Moments must use canonical ERN places");
console.assert(nowJs.includes("EARTH_SIGNAL_TYPES")&&nowJs.includes("local preview"),"Now Moments structured signal boundary missing");
console.assert(places.includes('id="cameraConsentWrap" hidden')&&placesJs.includes("consent?.checked!==true"),"Submission surface must require explicit send consent");
console.assert(placesJs.includes("submissionRecord")&&placesJs.includes("createSubmissionClient"),"For Places must use canonical validation/client plumbing");
console.assert(!now.includes("ERN_SIGNAL_REVIEW_TOKEN")&&!places.includes("ERN_SUBMISSION_REVIEW_TOKEN"),"Public pages must never contain review secrets");
console.log("Phase K public participation surfaces remain activation-aware and fail-closed");
