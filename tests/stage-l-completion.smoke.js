import fs from "node:fs";
const worker=fs.readFileSync("media-worker/src/index.js","utf8");
const state=fs.readFileSync("media-worker/src/media-state.js","utf8");
const privacy=fs.readFileSync("privacy.html","utf8");
const deploy=fs.readFileSync(".github/workflows/deploy-now-moment-media.yml","utf8");
const verify=fs.readFileSync("scripts/now-moment-media-deployment-verify.mjs","utf8");
const operator=fs.readFileSync("scripts/now-moment-media-operator.mjs","utf8");

console.assert(state.includes('b.op==="list-review"'),"Private photo moderation queue state missing");
console.assert(worker.includes('url.pathname==="/internal/now-moments/photos"'),"Private moderation queue endpoint missing");
console.assert(worker.includes("/media")&&worker.includes("cache-control\":\"private, no-store"),"Private moderator media preview must be no-store");
console.assert(privacy.includes("Future temporary Now Moment photos")&&privacy.includes("expire after 45 minutes"),"Photo-specific public privacy wording missing");
console.assert(deploy.includes("workflow_dispatch:")&&!deploy.includes("\n  push:"),"Media deploy must remain manual-only");
console.assert(deploy.includes("ERN_MEDIA_RATE_HMAC_KEY")&&deploy.includes("ERN_MEDIA_REVIEW_TOKEN"),"Media runtime secret installation missing");
console.assert(deploy.includes("r2 bucket")&&deploy.includes("ERN_NOW_MOMENT_PHOTO_ENABLED"),"Private R2/fail-closed deployment boundary missing");
console.assert(verify.includes("photoPublicOff")&&verify.includes("storageBounded")&&verify.includes("ttl45"),"Live media deployment verifier incomplete");
console.assert(operator.includes("ERN_MEDIA_OPERATOR_TOKEN")&&!operator.includes("token=process.argv"),"Media operator token must remain environment-only");
console.log("Stage L local completion guards: privacy, moderation queue, private preview, deployment and verification prepared");
