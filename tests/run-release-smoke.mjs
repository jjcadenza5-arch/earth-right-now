import {spawnSync} from "node:child_process";
import {existsSync} from "node:fs";
import {fileURLToPath} from "node:url";

const releaseTests=[
  "embed-policy.smoke.js",
  "realtime-context.smoke.js",
  "seoul-context-mapping.smoke.js",
  "context-public-off.smoke.js",
  "manual-context-record.smoke.js",
  "recency-provider-debt.smoke.js",
  "catalog-metadata-audit.smoke.js",
  "research-review-queue.smoke.js",
  "embed-research-preflight.smoke.js",
  "provider-family-research.smoke.js",
  "provider-diversification.smoke.js",
  "provider-concentration.smoke.js",
  "watch-diversity.smoke.js",
  "operator-review-queue.smoke.js",
  "review-evidence-proposals-safety.smoke.js",
  "playback-proof-application-plan.smoke.js",
  "inside-ern-recovery.smoke.js",
  "current-window-label.smoke.js",
  "source-recency-policy.smoke.js",
  "source-recency-summary.smoke.js",
  "source-recency-debt-split.smoke.js",
  "stale-maintenance-class.smoke.js",
  "source-research-stale-debt.smoke.js",
  "discovery-eligibility.smoke.js",
  "playback-currentness.smoke.js",
  "catalog-release-recency.smoke.js",
  "source-availability-continuity.smoke.js",
  "url-safety.smoke.js",
  "catalog-release-gate.smoke.js",
  "ern-stories.smoke.js",
  "share-links.smoke.js",
  "deep-link-currentness.smoke.js",
  "atlas-recheck-currentness.smoke.js",
  "viewer-confidence.smoke.js",
  "offline-currentness.smoke.js",
  "guide-ai-routing.smoke.js",
  "guide-planning-boundary.smoke.js",
  "guide-place-intent.smoke.js",
  "guide-ai-deployment-readiness.smoke.js",
  "destination-page-builder.smoke.js",
  "public-trust-discovery.smoke.js",
  "distribution-readiness.smoke.js",
  "local-directory-status.smoke.js",
  "travel-offer-expiry.smoke.js",
  "travel-bridge.smoke.js",
  "travel-planning-client.smoke.js",
  "release-artifact-assets.smoke.js",
  "operator-console-network-safety.smoke.js",
  "release-candidate.smoke.js",
  "candidate-evidence-binding.smoke.js"
];

let failed=0;
for(const name of releaseTests){
  const url=new URL(name,import.meta.url);
  const path=fileURLToPath(url);
  if(!existsSync(path)){
    failed++;
    console.error("MISSING RELEASE TEST:",name);
    continue;
  }
  const r=spawnSync(process.execPath,[path],{encoding:"utf8"});
  if(r.stdout)process.stdout.write(r.stdout);
  if(r.stderr)process.stderr.write(r.stderr);
  const assertionFailure=/Assertion failed(?::|\b)/.test(r.stderr||"");
  if(r.status!==0||assertionFailure){
    failed++;
    console.error(`FAILED RELEASE TEST: ${name} (${assertionFailure?"console assertion":`exit ${r.status}`})`);
  }
}
if(failed){
  console.error(`\n${failed} of ${releaseTests.length} current release smoke tests failed`);
  process.exit(1);
}
console.log(`\nAll ${releaseTests.length} current ERN release smoke tests passed`);
console.log("Historical npm test remains available for maintenance and migration cleanup; release smoke intentionally covers current truth, recency, permission, playback-proof, context, operator-review and release-gate invariants.");
