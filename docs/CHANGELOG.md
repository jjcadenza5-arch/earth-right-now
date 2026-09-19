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


## 2026-09-19 — Business-camera review boundary
- Hardened submitted camera URLs against localhost, loopback, link-local and private-network targets in addition to non-http(s) and credential-bearing URLs.
- Added an explicit PENDING_REVIEW → APPROVED/REJECTED human review gate. A visitor submission can never become publishable merely because the form validated.
- Added conservative catalog drafting for approved submissions: new drafts begin as PREVIEW / UNKNOWN permission / UNKNOWN health rather than being auto-labeled live, healthy or embeddable.
- Rights confirmation remains necessary but is not treated as proof of embed/republication permission; provider/source verification remains a separate catalog step.
- Added regression coverage for private-network rejection, review decisions, rights preservation and no-auto-promotion behavior.
- Full CI is green.


## 2026-09-19 — Destination-first search and ERN AI
- Explore search now returns destinations rather than duplicate camera/source cards. Multiple matching windows remain available behind Choose a Window.
- ERN AI intent results now preserve its source-level relevance ranking internally but present the visitor with destination context first.
- A query such as a beach/location intent can therefore identify one place once even when several cameras match, reducing visual repetition without discarding view choice.
- Playback-specific surfaces remain window-first; this change is intentionally limited to discovery surfaces.
- Added regression coverage for duplicate-window collapse and intent-ranked destination results.
- Full CI is green.


## 2026-09-19 — Private My Earth portability
- Added a versioned, privacy-preserving My Earth export format containing only ERN place/window IDs and ordering for favorites/recents; no account, profile, precise location or camera media is exported.
- My Earth now exposes an Export My Earth action that downloads the visitor's local state as JSON without requiring a server account.
- Added strict import-validation/merge primitives for future restore or cross-device support: unknown versions fail closed, malformed IDs are discarded, duplicates are removed, and imported state is designed to merge rather than silently erase local favorites.
- Import UI is intentionally not exposed yet; restore behavior can be added after browser validation of the export path.
- Added regression coverage for versioning, sanitization, deduplication and non-destructive merge semantics.
- Full CI is green.


## 2026-09-19 — Privacy-minimized telemetry boundary
- Added a strict telemetry allowlist and data minimization layer. Unknown event types fail closed and only a narrow set of non-sensitive fields can leave the event boundary.
- Telemetry remains off by default unless an ERN telemetry handler is deliberately configured.
- Search telemetry records only query length, never search text. Precise coordinates, contact details, business-submission fields and My Earth favorites/recents are explicitly outside the telemetry contract.
- Added a visitor-readable privacy summary model for a later About/Privacy surface, including the separate privacy responsibility of third-party camera providers.
- Corrected the immersive viewer Share accessible name to “Share this window,” matching the new exact-window share behavior.
- Added regression coverage for unknown events, search-text exclusion and coordinate exclusion.
- Full CI is green.


## 2026-09-19 — Accessible destination and Atlas drawers
- Destination Choose a Window and Living Atlas cluster drawers now have labelled modal-dialog semantics.
- Added reusable drawer lifecycle handling for initial focus, Tab containment, Shift+Tab wrapping, Escape-to-close and opener focus restoration.
- Discovery drawer lifecycle remains separate from the immersive player's media lifecycle, preserving ERN's one-player architecture.
- Added regression coverage for opening, Escape closing, focus restoration and optional restoration suppression.
- Full CI is green; deployed keyboard testing is still required before accessibility evidence can be marked passed.


## 2026-09-19 — Shared-link routing hardening
- Exact-window deep links now restore on initial page load even when a valid shared URL contains only a window ID and no destination component.
- Window+destination links now verify that the requested source actually belongs to the requested destination before opening it. A mismatched/tampered pair falls back to the valid destination rather than presenting the wrong camera in that place context.
- History-driven drawer closure can suppress opener focus restoration, avoiding stale focus jumps during browser Back/Forward navigation while normal user-initiated closes still restore focus.
- Added regression coverage for window-only startup links and mismatched window/place hashes.
- Full CI is green.


## 2026-09-19 — Slow-network and data-saving awareness
- ERN now distinguishes normal, offline and constrained connections using browser online state plus supported Save-Data/effective-connection signals.
- Visitors on a very slow or data-saving connection receive a truthful lightweight notice instead of ERN treating every online connection as equivalent.
- Added a conservative playback-network policy primitive for future provider loading: heavy embedded video can be withheld on constrained connections while ordinary external provider navigation remains available.
- The current player behavior is not silently changed yet; the policy is staged separately so real-device validation can determine the least surprising UX before it gates playback.
- Added regression coverage for offline, 2G/slow-2G, Save-Data and normal connections.
- Full CI is green.


## 2026-09-19 — Lazy discovery imagery
- Legitimate remote thumbnails on discovery cards/windows now render as real image elements with async decoding and lazy loading rather than CSS background images that browsers may fetch eagerly.
- Discovery imagery receives low fetch priority by default; the loading policy retains an explicit high-priority path for future true Hero image elements.
- Generated category posters remain CSS-only and require no network request.
- Live Right Now and Choose a Window carry surface/index hints so image loading can remain intentional as those strips grow.
- This does not create extra live media players and preserves the one-player invariant.
- Added regression coverage for lazy/async/priority attributes and generated-poster no-image behavior.
- Full CI is green.


## 2026-09-19 — My Earth local restore
- Completed the second half of private My Earth portability: visitors can now import an ERN JSON export into another browser/device.
- Restore is merge-first rather than destructive: existing local favorite places/windows are retained while imported IDs are added; imported recent order is preserved within bounded history limits.
- Import remains entirely local with no account, cloud profile or server upload.
- Files are version-validated, JSON-validated and capped at 128 KB before restore; unsupported/malformed exports fail closed with a user-visible status message.
- Added bounded storage writers for recent places/windows so restore uses the same safe localStorage layer as ordinary ERN activity.
- Added regression coverage for merge-not-erase behavior, recent restore, malformed JSON and oversized files.
- Full CI is green.


## 2026-09-19 — Verified travel-offer rendering boundary
- Advanced the destination travel bridge from placeholder intent buttons to a real verified-offer rendering model without adding fabricated partners.
- Only offers that pass the existing verified-offer gate can appear; unverified records remain invisible even if they contain valid-looking provider URLs.
- Verified offers render provider identity, a safe external link and explicit Sponsored / Affiliate / Travel option disclosure.
- Destination intent buttons can show counts only from verified offers, preserving truthful zero-state messaging until actual integrations are connected.
- Added inventory/selectors for verified offers by destination and intent so future Booking/Agoda/ticket/transport adapters can feed one consistent boundary.
- No real commercial partner data has been added and no affiliate relationship is implied.
- Added regression coverage for hidden unverified offers, disclosure, counts and destination filtering.
- Full CI is green.
