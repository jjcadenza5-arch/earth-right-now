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
