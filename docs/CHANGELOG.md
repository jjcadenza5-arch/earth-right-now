# Changelog

## 2026-09-18 — Recovery foundation
- Established permanent ERN repository.
- Locked mature ERN as product specification; Fresh is an engineering rebuild, not a redesign.
- Added continuity/restart protocol.
- Formalized source truth and health separation.
- Formalized one-player architecture and play-where-clicked rule.

## 2026-09-18 — Clean-master stabilization and mature experience restoration
- Replaced stacked-page navigation with focused ERN experience surfaces while keeping Hero + Live Right Now as home.
- Hardened single-player media lifecycle and viewer return context.
- Added truthful Hero trust copy, strict Live Right Now inventory, source recency and prioritized revalidation.
- Added provider-independent Atlas projection foundation and safe external-link rules.
- Restored Watch Earth as a pausable curated journey on the shared player.
- Added durable place-level memory foundations for My Earth.
- Fixed a critical initialization regression where Watch Earth was constructed before the shared player.
- Removed duplicate keyboard handling and forced-scroll Hero actions.
- Consolidated source favorites onto the versioned favorites module.

### Mature interaction restoration
- Connected Living Atlas clustering/filtering and cluster window chooser.
- Restored My Earth place/window/recent layers.
- Restored Choose a Window as a horizontal strip with local immersive playback.
- Added capability-aware Hero action model for embedded vs external current sources.


## 2026-09-19 — CI truth restoration and release-control hardening
- Repaired GitHub Actions smoke execution and made failure output observable through job logs, summaries and retained diagnostics.
- Removed a discovery/playback recursion exposed by stricter currentness checks.
- Corrected external-current publication inventory classification.
- Added dependency-free browser primitives for DOM/storage smoke tests instead of pretending Node has browser globals.
- Updated stale test fixtures to obey current provider allowlists, source currentness and Watch Earth eligibility.
- Restored the complete 163-test smoke suite to green on main.
- Added `npm run release:status` as a report-only publication-candidate check; real-world release evidence remains mandatory.


## 2026-09-19 — Living Atlas destination-first discovery
- Living Atlas search/results now group multiple camera windows under their destination instead of presenting duplicate source cards as separate places.
- Atlas map pins remain source-aware, while the accompanying browse surface opens the existing destination drawer and Choose a Window journey.
- Atlas Current and inside-ERN filters now use the same strict currentness and playback policy as the rest of ERN rather than approximate health/permission checks.
- Added regression coverage for destination grouping, search deduplication, strict-current filtering and current inside-ERN playback.
- Full CI remains green after the Atlas integration.


## 2026-09-19 — My Earth continuity and catalog release cleanup
- My Earth now restores recently watched windows in addition to favorite places, favorite windows and recently visited destinations.
- Recent-window rendering is fail-safe: remembered offline/unavailable windows remain memory data but are not presented as actionable playback.
- Release diagnostics now expose the exact catalog gate and malformed-record reasons instead of reducing catalog failure to a generic blocker.
- Found and resolved the remaining catalog-integrity blocker: Brighton Beach and Glenelg Beach were distinct official Marine Safety SA cameras but both pointed to the same network landing page. Each now uses its distinct official camera page.
- The catalog gate is now clean: 27 valid records, 0 rejected records.
- Revalidated the Mpala Watering Hole CouchTourist page, embed URL and required attribution against the current provider page.
- CI remains green. Publication remains intentionally blocked only by remaining source recheck(s) and the real-world browser/mobile/provider/accessibility/performance/rollback evidence gate.


## 2026-09-19 — Real-world validation kit and accessibility preflight
- Codified the six publication evidence dimensions into a concrete real-world validation plan with steps and explicit pass conditions.
- Added `npm run release:checklist` to generate a human/browser validation checklist without converting automation into false real-world evidence.
- Strengthened accessible names for ERN AI search, Explore search, Atlas search and business-camera submission fields.
- Added prominent keyboard focus-visible styling, disabled-control affordance and a higher-contrast preference response.
- Added smoke coverage for the release validation plan and accessibility surface.
- CI remains green; these engineering/accessibility preflight improvements do not self-certify the pending real-world accessibility evidence gate.


## 2026-09-19 — Runtime media invariant and rollback preflight
- Promoted ERN's one-player architecture from a design assumption to an explicit runtime invariant.
- After a viewer playback transition, ERN now checks the document for multiple active iframe/video/audio elements. A violation fails closed through the existing runtime playback failure path instead of allowing duplicate media to continue.
- Added isolated regression coverage for zero, one and multiple active-media states.
- Added a fail-closed rollback record model tying a candidate commit to a previous known-good commit, a concrete procedure, verification state and timestamp.
- Rollback structure alone does not satisfy publication evidence; the real procedure still has to be verified for the eventual hosting environment.
- CI remains green.


## 2026-09-19 — Performance budget and assistive status feedback
- Added an explicit runtime performance budget anchored to ERN's one-player rule, with reusable snapshots and fail-closed budget results.
- Added regression coverage showing one active media element is acceptable while simultaneous media is a performance/runtime blocker.
- Network connectivity messages and camera-submission status are now polite atomic live regions so important asynchronous feedback is exposed to assistive technology.
- Added a reusable deduplicating live-region announcer for future dynamic ERN surfaces.
- CI remains green. The performance and accessibility publication gates still require real deployed/browser validation; these changes prepare measurable checks rather than self-certifying them.


## 2026-09-19 — Deep-link navigation resilience
- Centralized destination hash synchronization so shared `#place=...` links, browser Back/Forward, and direct hash changes all use the same fail-safe path.
- History-driven destination restores no longer create duplicate history entries or falsely record a new recent visit.
- Clearing or navigating away from a place hash closes the destination drawer without mutating browser history again.
- Added regression coverage for valid, missing, opening and closing deep-link states.
- CI remains green.


## 2026-09-19 — Exact-window sharing
- Viewer Share now targets the exact selected ERN window rather than collapsing every share to its destination.
- Added safe `#window=...&place=...` deep links while retaining destination-only `#place=...` links.
- Opening a shared window restores the destination context and then routes the exact source through ERN's normal source-action/playback policy, so external-only and unavailable states keep their truthful behavior.
- Malformed/unknown shared window IDs fail closed rather than inventing a source.
- Added regression coverage for encoding, parsing, generated URLs and exact-window navigation restoration.
- CI remains green.


## 2026-09-19 — Destination-first Atlas clusters
- Living Atlas cluster drawers now group nearby map windows by destination instead of repeating one card per camera.
- A destination with several cameras appears once and retains all of its views behind Choose a Window.
- Cluster summaries distinguish destination count from underlying window count, preserving the breadth of the live network without visual duplication.
- Ranking favors destinations with strict-current and inside-ERN options while retaining truthful source availability.
- Added regression coverage for multi-window destinations inside map clusters.
- CI remains green.


## 2026-09-19 — Destination travel bridge foundation
- Added a lightweight Plan From Here surface to destination drawers for stays, food, transport and tickets/activities.
- The bridge preserves ERN's camera truth model: travel planning is visually and semantically separate from source status/playback.
- No unverified provider, affiliate or sponsored offer is shown. Until verified integrations exist, visitor intent receives an explicit not-connected-yet message rather than a fabricated recommendation.
- The existing verified-only travel-offer model remains the gate for future partner/affiliate links and disclosures.
- Added regression coverage for destination context, intent routing and hidden incomplete contexts.
- CI initially caught a fake-DOM test activation mismatch; the test was corrected without weakening product behavior and the subsequent full CI run is green.
