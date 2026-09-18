# ERN Build State

## CURRENT STATE — 2026-09-18
**Phase: Clean Master foundation → experience restoration**

Completed:
- Permanent repository, continuity, principles, architecture and source truth model.
- Mature feature inventory and UX non-regression checklist.
- Shared PlaybackController: history, Previous/Next, no Hero-scroll dependency.
- Playback adapters: EMBED, IMAGE_REFRESH, EXTERNAL, PREVIEW, UNAVAILABLE.
- Structured source registry and first conservative recovered source tranche.
- Health/promotion policy: UNKNOWN/OFFLINE cannot be presented as live primary inventory.
- Selection engine foundation for curated Watch Earth and spatial/nearby discovery.
- Lightweight mature-ERN shell: Hero, Choose a Window, Explore, Moments, My Earth, Living Atlas and immersive viewer.
- Favorites localStorage persistence, keyboard navigation and fullscreen.
- Responsive horizontal camera browsing on mobile.
- Watch Earth now selects through the shared registry/selection engine.

Additional completed stages:
- Multi-window destination drawer: visitors can choose among cameras without leaving browsing context.
- Deep-linkable place routing foundation (#place=...).
- Ranked Beautiful/Interesting/Useful/Happening Now moments engine.
- Hero local-time display restored from source timezone.
- Recovered source records enriched with coordinates, timezone and rights provenance.
- Release gates committed for product, playback, truth, quality and data.
- Destination/place grouping foundation for multiple windows per place.
- Watch Earth journey controller foundation with timed sequencing and shared playback.
- Local-time/daylight utility restored as a first-class Earth signal.
- Recovered additional official South Australia coastal camera records with conservative UNKNOWN health.
- Source schema expanded for timezone, moment score and provenance.
- ERN AI intent-ranking foundation connected to shared registry.
- Living Atlas schematic spatial pins connected directly to shared playback.
- Data migration rules explicitly ban screenshots as production imagery and stale verification as current health.
- Playback non-regression smoke checks committed.

More completed stages:
- Playback capability now explicitly separates in-ERN PLAY, provider EXTERNAL and UNAVAILABLE actions.
- Hero, Choose a Window, cards and Atlas single pins now route through capability-aware source actions.
- LINK_ONLY / EXTERNAL sources open the official/provider page instead of entering a fake or empty ERN iframe.
- Accessible source-action wording now announces provider handoff where relevant.
- Viewer-state contract documented so only actual in-app playback enters the immersive viewer.
- Playback-capability, source-action-label and viewer-state regression smoke checks added.
- Choose a Window restored as a compact horizontal Earth strip instead of another stacked Explore grid.
- Window tiles connect directly to the shared player and never scroll back to Hero.
- Window strip preserves truthful source state and ranks stronger/current choices first without hiding alternatives.
- Hero action capability model added so LINK_ONLY sources can say Open current source rather than pretending embedded playback exists.
- Hero interaction contract documented: Next changes Hero selection; Hero never owns the player.
- Window-strip and Hero-action regression smoke checks added.
- Living Atlas clustering is now connected to the rendered map rather than remaining an unused foundation.
- Atlas filters for live/current-capable, daylight and checked-healthy sources are connected with reset behavior.
- Multi-source Atlas clusters open a window chooser; single pins open through the one shared player.
- Destination drawer now summarizes place-level source availability while still showing every ranked camera choice.
- Preferred destination window remains a convenience, never a claim that one view is best for every visitor.
- Atlas-renderer and destination-choice regression smoke checks added.
- My Earth now has visible durable layers for Favorite places, Favorite windows and Recently visited destinations.
- Destination drawer now supports Save place, so a destination survives individual camera replacement.
- Living Atlas model now composes existing filter and clustering foundations without altering source truth.
- Atlas state/model regression smoke checks added.
- Watch Earth is now a real curated journey session on the shared player with Previous / Next / Pause / Continue controls.
- Watch Earth sequencing stops when the viewer closes and does not introduce autoplay audio.
- Empty Watch Earth routes truthfully to Living Atlas rather than inventing a journey.
- My Earth durability expanded from exact camera IDs toward place-level favorites/history so destinations survive camera replacement.
- Destination visits now record recent-place history.
- Watch Earth session and place-memory regression smoke checks added.
- Live Right Now now uses a strict current-check inventory; unverified recovered sources are no longer used as fallback live cards.
- Honest no-live state routes visitors toward Living Atlas while sources are rechecked.
- Provider-independent map projection/viewport foundation added so a real map can replace the schematic without changing ERN data/playback.
- Offline/cache policy added: shell/preferences may persist, but cached third-party media never becomes evidence of current conditions.
- Live-inventory and map-projection regression smoke checks added.
- Dedicated Hero controller added so Hero sequencing is independent from Watch Earth/player history while still using the shared playback engine.
- Source recency model added with current/stale/expired check states.
- Prioritized revalidation queue added for UNKNOWN, video-platform, embed and high-value sources.
- Private operations-report layer added for catalog statistics and revalidation workload.
- Visitor-vs-operations separation documented so maintenance diagnostics do not clutter the Earth experience.
- Recency and revalidation regression smoke checks added.
- Mature home-experience contract committed: compact navigation, immediate Earth Hero, horizontal windows, secondary systems as focused surfaces.
- Hero now explains source trust/status instead of implying UNKNOWN sources are live.
- Restrained generated poster fallbacks added for sources lacking legitimate current imagery; old interface screenshots remain banned from production.
- Explicit Earth/home return added from focused surfaces.
- External source URL safety and attribution utilities added; non-HTTP schemes rejected and LINK_ONLY wording remains explicit.
- URL-safety regression smoke check added.
- Major Explore / Atlas / Submit destinations now use a surface manager instead of remaining a giant stacked homepage.
- Hero and Live Right Now remain the immediate home experience; mature destinations open as focused surfaces.
- Playback media lifecycle now destroys prior iframe/video/audio before every handoff, preventing hidden duplicate players/audio.
- Viewer context remembers/restores invoking focus without scrolling back to Hero.
- Player invariants documented and media-lifecycle regression smoke check added.
- Featured Earth Moments sequencer added with editorial rotation across Happening Now / Beautiful / Interesting / Useful families.
- Moment session continuity remembers the visitor's current editorial Earth window during the browser session.
- Optional telemetry hook designed privacy-first and disabled by default.
- Business camera submission validation/data-contract foundation added; partner/payment status can never bypass truth/permission/health review.
- Business submission regression smoke check added.
- Truthful source badges now expose SOURCE CHECK / LIVE state / external-source / partner / degraded information on cards and viewer.
- Playback fallback-chain policy committed: embed → truthful live image where applicable → official external source → unavailable.
- Offline/network resilience layer added without destroying saved local Earth data.
- Living Atlas clustering/filter foundation added for scaling broad catalog without hundreds of media nodes.
- Atlas clustering regression smoke check added.
- Accent-insensitive Earth search across destination, region, country, provider, category, story and aliases.
- Search connected to both Explore and Living Atlas.
- Destination window chooser now ranks healthy/embeddable/high-quality choices while preserving alternatives.
- Shareable destination deep links added with native Share/clipboard fallback.
- Safe recovered-catalog normalization/deduplication pipeline committed; imported operational health is always UNKNOWN.
- Search and catalog-import regression smoke checks added.
- Place-first destination ranking layer added above individual camera sources.
- Explore now exposes destination cards and Choose a Window while retaining source-level discovery.
- Daylight preference utility added for Earth sequencing without hiding truthful night views.
- Ambience preference restored as a local, accessible UI state.
- Destination-model regression smoke checks added.
- Performance budget committed: only active shared player loads media; broad catalog stays lightweight.
- Local-first privacy baseline documented for favorites, recent history and ambience.
- Provider-specific validation policy foundation; HTTP success is explicitly not treated as proof of live video.
- Catalog statistics utility for total/place/truth/health/permission/playback/promotion counts.
- Wander My Earth / recently-opened history restored with local persistence.
- My Earth empty/saved state improved.
- Accessibility baseline and immersive viewer focus containment added.
- Provider-policy smoke checks added.
- Source validator and runtime registry audit.
- Strict Watch Earth builder excludes UNKNOWN/OFFLINE/non-permitted records from true curated live journey.
- Safe fallback journey remains truthfully labeled while current live inventory is being revalidated.
- Recovered unrevalidated EMBED record demoted to EXTERNAL playback until embed URL is proven.
- Surprise Me restored using the shared player.
- Viewer now shows region/country/local-time context.
- Source health state transition/staleness utilities added.
- Travel Bridge data contract and Earth-first monetization rule committed.
- Deployment/release plan committed.

In progress:
- Recover larger source catalog from mature ERN lineage with provenance.
- Revalidate embeddable sources before promotion to primary live inventory.
- Replace placeholder visual surfaces with legitimate current-source imagery.
- Add destination grouping so multiple windows belong to one place.

Next:
- Expand recovered catalog in tranches.
- Add Living Atlas map layer over registry.
- Restore richer Watch Earth journey/moment sequencing.
- Add ERN AI intent routing over registry/search.
- Add automated/provider-specific health checks.
- Browser test and deploy only after live-source promotion is trustworthy.

Important:
The current GitHub master is an engineering foundation, not yet the public ERN release. Do not publish until source health and visual fidelity are validated.

Blockers:
- No repository blocker.
- Current source health must be revalidated before recovered historical records can be promoted as LIVE.
