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
  "seo-indexing-audit.smoke.js",
  "ai-search-readiness.smoke.js",
  "search-alias-metadata.smoke.js",
  "place-search-aliases.smoke.js",
  "search-reference-discovery.smoke.js",
  "research-review-queue.smoke.js",
  "embed-research-preflight.smoke.js",
  "provider-family-research.smoke.js",
  "provider-diversification.smoke.js",
  "provider-observation-research-gap.smoke.js",
  "provider-concentration.smoke.js",
  "project-phase-status.smoke.js",
  "autonomous-work-status.smoke.js",
  "whole-product-external-status.smoke.js",
  "watch-diversity.smoke.js",
  "watch-earth-five-live-video.smoke.js",
  "watch-earth-premium-curation.smoke.js",
  "screenshot-first-impression.smoke.js",
  "atlas-zoom-and-playback-report.smoke.js",
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
  "reference-handoff-ux.smoke.js",
  "reference-handoff-audit.smoke.js",
  "viewer-confidence.smoke.js",
  "offline-currentness.smoke.js",
  "participation-public-surfaces.smoke.js",
  "submission-worker.smoke.js",
  "earth-signal-worker.smoke.js",
  "earth-signal-service.smoke.js",
  "bounded-json-body.smoke.js",
  "participation-storage-bounds.smoke.js",
  "participation-infrastructure-status.smoke.js",
  "phase4-earth-signals-pilot-workflow.smoke.js",
  "phase4-earth-signals-observation.smoke.js",
  "phase5-readiness.smoke.js",
  "phase7-operating-status.smoke.js",
  "phase7-launch-qa.smoke.js",
  "phase7-exit-review.smoke.js",
  "editorial-collections.smoke.js",
  "editorial-collections-home.smoke.js",
  "editorial-collections-l10n.smoke.js",
  "phase8-operating-status.smoke.js",
  "phase8-current-collection-policy.smoke.js",
  "phase8-exit-review.smoke.js",
  "phase9-operating-status.smoke.js",
  "phase9-localized-discovery-registry.smoke.js",
  "phase9-localized-discovery-output.smoke.js",
  "phase9-exit-review.smoke.js",
  "phase10-operating-status.smoke.js",
  "phase10-production-audit.smoke.js",
  "phase10-business-architecture-audit.smoke.js",
  "phase10-public-link-audit.smoke.js",
  "phase10-launch-review.smoke.js",
  "soft-launch-stage1-status.smoke.js",
  "analytics-worker.smoke.js",
  "analytics-runtime.smoke.js",
  "analytics-operations-reporting.smoke.js",
  "analytics-adapter.smoke.js",
  "analytics-default-off.smoke.js",
  "telemetry-privacy.smoke.js",
  "now-moment-media-worker.smoke.js",
  "now-moment-photo-public-ui-off.smoke.js",
  "now-moment-photo-service.smoke.js",
  "now-moment-photo-foundation.smoke.js",
  "guide-ai-routing.smoke.js",
  "guide-planning-boundary.smoke.js",
  "guide-place-intent.smoke.js",
  "guide-ai-deployment-readiness.smoke.js",
  "destination-page-builder.smoke.js",
  "destination-deeplink-analytics.smoke.js",
  "public-trust-discovery.smoke.js",
  "navigation-controls.smoke.js",
  "return-visitor-reentry.smoke.js",
  "first-impression-visuals.smoke.js",
  "distribution-readiness.smoke.js",
  "local-directory-status.smoke.js",
  "travel-offer-expiry.smoke.js",
  "affiliate-platform-project-status.smoke.js",
  "travel-bridge.smoke.js",
  "travel-planning-client.smoke.js",
  "viator-taxonomy-operator.smoke.js",
  "viator-public-client.smoke.js",
  "viator-destination-match.smoke.js",
  "viator-auckland-pilot.smoke.js",
  "viator-api-foundation.smoke.js",
  "viator-product-validation-boundary.smoke.js",
  "release-artifact-assets.smoke.js",
  "operator-console-network-safety.smoke.js",
  "operations-operator-brief.smoke.js",
  "operations-brief-wiring.smoke.js",
  "operations-packet-integrity.smoke.js",
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
