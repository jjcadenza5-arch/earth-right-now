## 2026-09-24 — Minimal human playback review batch
- Reduced the operator review burden to the actual inside-ERN target gap instead of showing ten equally actionable restoration cards.
- The queue now reports current ready/target/shortfall and recommends only enough restoration confirmations to close that shortfall, while still placing any expiring renewals first.
- With the current 3/5 state, the primary human batch is two restoration candidates; additional high-quality candidates stay visible as backlog rather than immediate work.
- The private review lab renders only the primary batch as loadable cards and lists remaining restoration backlog separately.
- The operator brief uses the same primary-batch contract so operations and the review page cannot disagree about how much human work is needed.
- Added regression coverage for a 3/5 -> two-restoration target and renewal-first behavior.

## 2026-09-24 — Operations history cache recovery
- Hardened availability-continuity and trend-comparison CLIs against empty/corrupt cached history left by earlier failed runs.
- Missing, blank or malformed previous-history files now recover as a clean baseline instead of aborting the current operations packet.
- Current input remains strict: malformed current availability/trend data still fails rather than being ignored.
- This allows the next valid run to overwrite the bad cache with fresh source availability and trend snapshots.
- Added regression coverage for both empty and malformed historical cache files.

## 2026-09-24 — Operations fail-closed repair
- Diagnosed a false-green Operations Check from the retained artifact rather than trusting the workflow badge.
- Fixed a literal \\n sequence in source-availability-observer.js that made the availability module fail to parse.
- Added set -euo pipefail to every shell run block in Operations Check so npm failures piped through tee now fail the step.
- Packet-integrity already returned a non-zero exit code on invalid packets; pipefail now preserves that failure instead of tee masking it.
- The retained artifact had exposed five missing/empty outputs (availability, continuity, trend snapshot, trend delta and operator brief), which should now fail visibly if they recur.
- Added regression coverage for the syntax repair and fail-closed shell boundary.

## 2026-09-24 — Immediate operations validation on relevant main changes
- Operations Check now runs not only daily/manual but also after relevant operational/source changes land on main.
- Push-trigger paths cover source and observation truth files, embed research/provider-family data, commercial staging/config, src/, scripts/, package.json and the workflow itself.
- This closes the delay where a broken operations script could remain unnoticed until the next scheduled run.
- The daily schedule remains intact, so continuous maintenance still happens even when no code changes.
- Added regression coverage for the push trigger and retained schedule/manual entry points.

## 2026-09-24 — Human review evidence target binding
- Human review evidence is now bound to the exact source/provider and embed/player URLs that were actually reviewed.
- Production proposal generation compares exported review URLs with the current source catalog or research-candidate record.
- If either target changed after the review page was built, the evidence becomes EVIDENCE_TARGET_CHANGED and cannot create a playback proof or research promotion proposal.
- This prevents fresh-but-obsolete review evidence from being replayed against a replaced camera/player endpoint.
- Existing direct-library callers remain backward-compatible unless they supply current target records; production CLI supplies them and therefore fails closed.
- Added positive and mismatch regression coverage for both public-source restoration and second-provider research.

## 2026-09-24 — Deployed-origin and freshness trust for human review evidence
- Closed a trust gap in exported operator review packets: the validator can now require the exact deployed ERN review origin and a bounded evidence age.
- Production review CLI paths require https://earthrightnow.app/review/inside-ern.html and reject evidence older than 24 hours before it can become a proposal.
- Review timestamps materially in the future are rejected with a small clock-skew allowance.
- Direct library validation remains configurable for tests/tooling, but production proposal generation now fails closed on wrong-origin, stale or future-dated evidence.
- This verifies where/when the human review was recorded; it still does not auto-confirm permission, health or catalog truth.
- Added regression and CLI coverage for trusted origin, untrusted origin, expiry and future timestamps.

## 2026-09-24 — Guarded playback-proof application plan
- Added a final read-only planning layer between reviewed human evidence and any future manual catalog/ledger edit.
- Ready playback proposals are rechecked against current source playback type, EMBED_ALLOWED permission, HEALTHY state, current playbackVerifiedAt and latest observation timestamp.
- The planner refuses non-atomic timestamps and blocks stale evidence from overwriting an equal/newer catalog marker or observation.
- A ready item carries explicit expected-current preconditions plus one paired catalog-marker/HUMAN_PLAYBACK update.
- Automatic writes, partial proof updates, stale overwrites and unrelated source-truth mutations remain forbidden.
- Added CLI and regression coverage so future human evidence can be applied deliberately without recreating ledger/catalog drift.

## 2026-09-24 — Daily operator playback review queue
- Added the proactive renewal/restoration queue to the retained daily operations packet instead of generating it only during release/review-page builds.
- The private operator brief now shows renewal-first playback work with remaining proof hours when relevant.
- Daily queue ordering remains advisory: it cannot mutate source truth, refresh playbackVerifiedAt, change health or auto-confirm playback.
- Packet integrity validates review modes and the no-mutation/no-auto-verification boundary.
- Added executable wiring/regression coverage so the operator queue cannot silently disappear from daily operations.

## 2026-09-24 — Research-only Explore player allowance
- Added a separate research-only embed allow path for exact Explore.org /livecams/player/ URLs.
- The normal public embed allowlist remains unchanged, so Explore cannot enter ERN visitor playback merely because it is researchable.
- The unlinked operator review lab now uses the research-only policy for second-provider candidates while ordinary source review continues using the stricter public embed policy.
- Explore research frames receive a conservative sandbox and still require operator-loaded deployed-origin HUMAN_PLAYBACK review.
- Added regression coverage proving ordinary Explore pages, HTTP URLs and public playback remain blocked.

## 2026-09-24 — Explore.org specific second-provider candidate
- Added Brooks Falls as a research-only Explore.org candidate using the current Explore source page plus the current Explore player URL.
- Extended technical preflight beyond YouTube so Explore candidates can independently test source-page and player-page reachability.
- Current public evidence identifies Brooks Falls as currently live, while Explore.org terms describe embedding/deep-linking when embedding is enabled.
- Technical success still leaves permissionConfirmed=false, humanPlaybackConfirmed=false and promotionAllowed=false.
- The provider-family ledger now records an actual explore.org player endpoint instead of an unresolved network family.
- Public ERN catalog and Watch Earth remain unchanged until deployed HUMAN_PLAYBACK and specific player/permission review are completed.

## 2026-09-24 — Second provider-family research lane
- Added a provider-family research ledger separate from specific embed candidates and the public source catalog.
- Explore.org is staged as RESEARCH_ONLY because its current terms describe deep-link/embed use when embedding is enabled, including the Explore-branded player; ERN still requires a specific current camera with an enabled embed path before any deployed test.
- The ledger explicitly keeps permissionConfirmed=false, humanPlaybackConfirmed=false and promotionAllowed=false until specific-camera review.
- Network-family identity remains unresolved until the actual player endpoint is identified, so this research cannot falsely satisfy provider-resilience metrics.
- Daily operations and the private operator brief now carry provider-family research alongside specific YouTube candidate preflight.
- Packet integrity enforces the no-mutation/no-auto-permission/no-auto-promotion boundary.

## 2026-09-24 — Atomic playback-proof update proposals
- Strengthened the human-review proposal layer so confirmed playback now proposes both sides of ERN's proof model together: the HUMAN_PLAYBACK observation and the matching catalog playbackVerifiedAt marker.
- Both proposed timestamps are identical and the proposal explicitly marks the pair as an atomic manual proof update.
- Missing availability, playback failures and inconclusive reviews never receive a playback marker proposal.
- Automatic writes remain disabled; source health, permission and catalog truth are still unchanged until reviewed evidence is deliberately applied.
- Added regression coverage that prevents future proposal code from updating only one side and creating ledger/catalog drift.

## 2026-09-24 — Proactive playback-proof renewal queue
- Upgraded the unlinked operator review lab so fresh inside-ERN proof can be renewed before its 24-hour LIVE HERE eligibility expires.
- DUE_12H and DUE_6H healthy EMBED_ALLOWED sources are now placed ahead of ordinary restoration candidates.
- Featured-hold sources stay excluded, and restoration remains the fallback lane after renewal priorities.
- Renewal cards are visibly labeled RENEW LIVE HERE; they still require an operator to load the deployed iframe and record human review.
- The exported evidence type remains the existing validated source-review type, so no parallel evidence schema was introduced.
- Added a reusable operator-review queue model plus regression/wiring coverage.
- Nothing renews playbackVerifiedAt automatically and no source truth, health or permission is mutated.

## 2026-09-24 — Playback evidence consistency audit
- Added a read-only audit between catalog playbackVerifiedAt markers and provider-observation HUMAN_PLAYBACK evidence.
- Detects catalog markers without matching human evidence, fresh human observations missing the catalog marker, timestamp drift, markers on non-embed sources and observations for unknown source IDs.
- Stale historical HUMAN_PLAYBACK observations remain valid history and do not force a fresh catalog marker.
- Daily operations now retains playback-evidence-consistency.json and surfaces any drift before new LIVE HERE evidence is trusted operationally.
- Packet integrity enforces the non-mutating/no-auto-verification boundary.
- Added synthetic regression coverage plus a current-catalog assertion that the existing three fresh playback markers are consistent with the observation ledger.

## 2026-09-24 — Commercial verification horizon
- Added a read-only maintenance horizon for future affiliate partners and verified travel offers.
- Partner expiry and the existing 90-day travel-offer verification window are classified as CURRENT, DUE_30D, DUE_14D, DUE_7D, EXPIRED or REVIEW_REQUIRED; intentionally disabled partners remain INACTIVE.
- Daily operations now retains commercial-verification-horizon.json and surfaces urgent maintenance in the private operator brief before evidence becomes stale.
- The horizon cannot create inventory, renew verification, activate partners/offers or affect public ranking.
- Packet integrity enforces those safety boundaries, and executable/wiring tests cover the new operations path.
- Current registries remain empty, so this adds readiness without changing the public ERN experience.

## 2026-09-24 — Daily operator-brief CLI repair
- Repaired a malformed operations CLI newline that would have caused the next daily operator-brief step to fail before rendering.
- The CLI now actually reads commercial-inventory.json, commercial-onboarding-plan.json and submission-transport-readiness.json from the workflow arguments already being passed.
- Added executable regression coverage that runs the real CLI and requires all three commercial/readiness sections plus the read-only safety boundary.
- This repair changes operations reporting only; it does not mutate source truth, health, permissions, ranking or visitor content.

## 2026-09-24 — Verified travel-offer release wiring
- Closed a deployment gap in the new Before You Go commercial runtime.
- data/travel-offers.json is now copied into the immutable public release artifact and included in the release manifest hash set.
- Changes to the verified travel-offer registry now trigger the GitHub Pages deployment workflow.
- Public-launch preflight fails if the release builder stops shipping the travel-offer registry.
- Current inventory is still empty, so visitor behavior remains unchanged; this makes future real verified offers deployable without another architecture change.
- Added regression coverage for release copy, manifest inclusion, Pages trigger and public-launch preflight.

## 2026-09-24 — Submission transport readiness contract
- Added a disabled-by-default submission transport configuration and explicit readiness model for real place/camera submissions.
- Transport can report READY only when all three prerequisites exist: a real HTTPS review endpoint, a valid HTTPS privacy notice, and an explicit retention window between 1 and 365 days.
- business:status now derives submissionTransport readiness from the real config instead of a hard-coded false value.
- The daily operations packet includes submission-transport-readiness.json and the private operator brief names exactly what is missing while delivery remains closed.
- Safety boundaries are explicit: no automatic publication, no automatic approval, no silent background submission, no credential forwarding, and no retention beyond policy.
- Packet integrity rejects any future transport output that violates those boundaries.
- The public For Places page remains unchanged and truthful: it still prepares a local draft only and does not pretend a review inbox exists.
- Added regression coverage for disabled/default state, a fully valid hypothetical transport, invalid endpoint/privacy/retention states, workflow/brief wiring and packet-integrity enforcement.

## 2026-09-24 — Private commercial onboarding planner
- Added a private editorial planner that identifies ERN places with strong current content but no current verified travel offer.
- Scoring uses ERN content readiness only: source quality, moment value, freshness and current healthy window count.
- Existing verified-offer places, featured-hold sources, unhealthy/stale sources and low-quality sources are excluded.
- Country caps keep the research queue geographically diversified instead of concentrating on one market.
- The planner explicitly does not estimate visitor demand, conversion, revenue or sponsor value, and cannot affect public ranking or allow paid priority.
- The daily operations packet now includes commercial-onboarding-plan.json and the private operator brief names the top destinations to research for real travel options.
- Packet integrity enforces the no-public-ranking, no-demand-forecast, no-revenue-forecast, no-paid-priority and no-invented-offer boundaries.
- Added regression coverage for coverage exclusion, hold exclusion, geographic diversity, operator-brief wiring and safety validation.

## 2026-09-24 — Verified travel-offer runtime readiness
- Wired the existing Before You Go Stay / Eat / Things to do actions to prefer a current verified travel offer when one exists for the selected ERN place.
- Empty inventory preserves the existing Google-search fallbacks exactly, so there is no visitor-facing commercial change today.
- Public runtime verification requires verified=true, a known place/intent, HTTPS URL without credentials, a valid verifiedAt timestamp, and verification age <=90 days.
- Offer selection is neutral: newest verification then stable ID; affiliate/sponsored status is never used to improve ranking.
- Affiliate and sponsored links receive visible disclosure plus rel="sponsored"; ordinary offers are labeled External travel link.
- A dedicated visible disclosure line appears only when a verified commercial option is actually active; the planning note also states that commercial links never affect ERN ranking.
- The public app now loads data/travel-offers.json independently and fails safely to an empty inventory if unavailable.
- Added syntax and regression coverage proving empty staging preserves current behavior and commercial links remain verified/disclosed.

## 2026-09-24 — Commercial registry foundation
- Added empty private staging registries for affiliate partners and verified travel offers; ERN does not invent partners or offers.
- Added a commercial-inventory status model with EMPTY_STAGING, STAGING_REVIEW and ACTIVE states.
- Public commercial activation is allowed only when at least one real active affiliate partner and one current verified travel offer exist.
- Existing affiliate disclosure, expiry, HTTPS/private-host, offer verification and place-reference contracts are reused rather than duplicated.
- The daily operations packet now includes commercial-inventory.json and the private operator brief reports commercial stage, active partner count, current offer count and place coverage.
- Packet integrity now enforces commercial safety boundaries: no invented partners, no unverified offers, no undisclosed affiliate links, no paid ranking, and no premature public activation.
- business:status now derives affiliate-inventory readiness from the real registries instead of a hard-coded assumption.
- Both registries remain empty, so the public ERN experience stays non-commercial until genuine reviewed inventory exists.
- Added regression coverage for empty staging, verified activation, disclosure semantics, operator-brief behavior and packet-integrity failures.

## 2026-09-24 — Daily operations packet integrity preflight
- Added a packet-level validator for the retained daily ERN operations artifact.
- Required diagnostics must exist, contain valid JSON/text, and satisfy key safety contracts before the packet is considered valid.
- Source availability rows must remain provesLive=false; availability-continuity rows must keep catalogMutationAllowed=false and automaticHealthChangeAllowed=false; second-provider preflight rows must keep permissionConfirmed=false, humanPlaybackConfirmed=false and promotionAllowed=false.
- Trend schema/direction, unsafe provider-review presence and the operator brief's read-only boundary are also checked.
- The workflow writes packet-integrity.json and fails visibly on integrity errors while the artifact upload still runs with if: always() so evidence is preserved.
- Added regression coverage for clean packets, malformed/safety-violating packets and workflow wiring.

## 2026-09-24 — Availability continuity memory
- Added per-source previous-vs-current availability comparison across daily audits.
- One PAGE_MISSING remains a notice; two consecutive PAGE_MISSING observations become a PERSISTENT_MISSING_REVIEW manual-review incident.
- Repeated 403/429 responses become REPEATED_ACCESS_LIMITATION rather than source-failure evidence.
- Repeated transient network/timeout/5xx-style observations become REPEATED_TRANSIENT_REVIEW; a later reachable page is recorded as RECOVERED_PAGE.
- The previous availability sample is retained separately in GitHub Actions cache and the continuity report is included in the daily operations packet.
- Operator brief now names continuity incidents and explicitly keeps catalog mutation / automatic health changes disabled.
- Added regression coverage for first-run behavior, persistence, recovery, access limitations, workflow cache wiring and non-mutating boundaries.

## 2026-09-24 — Current-proven inside visitor boundary
- Added a shared `currentInside` definition in the public runtime: a source is counted/treated as inside ERN only when it has an inside playback capability AND its current truth claim is valid.
- Browser Watch Earth now explicitly requires currentTruthClaim, closing the gap where a source-current but playback-unproven EMBED could enter the public set with a RECHECK DUE label.
- Adaptive set sizing, inside-first reservation, Hero pool/boost, public Play here pulse count and Living Atlas inside filter/count now use currentInside rather than configured capability alone.
- Configured but unproven embeds remain discoverable elsewhere with truthful RECHECK DUE semantics; they are not counted as current Play here windows.
- Whole-product preflight and regression tests now guard this visitor truth boundary.

## 2026-09-24 — Truthful inside-ERN release metrics
- Separated structural playback capability from current visitor truth in release/product diagnostics.
- Lean preflight now reports configuredInsideERN, freshHumanProvenEmbeds, currentImageRefreshes and currentInsideERN instead of the misleading playableInsideERN total.
- The structural beta guard still requires at least ten configured inside-ERN capabilities; ephemeral 24-hour human proof is reported but is not used as a deploy blocker.
- Whole-product status replaced its generic 21-day fresh count with source-type currentness and the same configured/proven/current-image breakdown.
- Catalog health summary now distinguishes configuredInsideERN, provenEmbeddedInsideERN, currentImageInsideERN and currentInsideERN.
- Added regression and functional coverage preventing the old undifferentiated metrics from returning.

## 2026-09-24 — Shared Hero/Viewer media-frame factory
- Repaired the Hero live-preview deployment failure without weakening the performance guard.
- Hero preview and full Viewer now share one controlled runtime iframe factory, restoring ERN's single iframe-construction pathway.
- Preview frames remain non-interactive and omit autoplay permission; full Viewer frames retain autoplay/fullscreen/picture-in-picture permissions.
- Both paths share HTTPS-cleaned catalog embed URLs and strict-origin referrer policy.
- The existing performance preflight remains unchanged at <=1 runtime iframe factory.
- Updated Hero regression coverage and added a dedicated shared-factory test.

## 2026-09-24 — Proven inside-ERN Hero live preview
- The Hero can now show a real embedded Earth window instead of the generated illustrative fallback when the selected source is an EMBED with current source truth and fresh playbackVerifiedAt evidence.
- Live Hero previews are desktop-only (>=1000px), require the document to be visible, and are disabled when the browser reports Data Saver.
- Mobile and data-saver visitors keep the lightweight source-thumbnail/illustrative fallback.
- External sources and unverified embeds are never turned into Hero iframes.
- The fallback is mounted first and remains available if the preview fails; successful preview load switches visualKind to live-preview so the Illustrative visual cue disappears.
- The Hero iframe is non-interactive, omits autoplay permission, and retains the existing Watch Earth Now path into the full viewer.
- Whole-product release preflight now guards the EMBED/current-truth/data-saver safety gate.
- Added syntax/style regression coverage for the preview boundary.

## 2026-09-24 — Local Natural Earth Atlas vector
- Replaced the Living Atlas remote Wikimedia raster dependency with a local simplified equirectangular vector generated from Natural Earth public-domain geography.
- The local asset uses a 1200×600 / 2:1 projection matching ERN's existing longitude/latitude pin math, so no pin positions or coordinate semantics changed.
- Reduced the pale overlay so coastlines/continents remain visible while preserving the existing light ERN visual language.
- Updated map attribution to Natural Earth public-domain geography · ERN simplified vector.
- Whole-product release preflight now requires the local vector rather than the retired remote filename.
- Added regression coverage preventing a return to remote map dependencies and protecting projection/asset wiring.

## 2026-09-24 — Safe review-evidence proposal layer
- Added a non-mutating proposal layer that combines validated operator human-review evidence with independent source-availability evidence and optional second-provider technical preflight.
- A restored source reaches READY_FOR_PROVIDER_OBSERVATION_PROPOSAL only when HUMAN_PLAYBACK is confirmed and a separate PAGE_REACHABLE HTTP observation is current within the evidence-separation window.
- Playback failures never become definitive removals automatically; PAGE_MISSING + human failure only produces POSSIBLE_SOURCE_REMOVAL_REVIEW.
- Research candidates with human playback + technical readiness advance only to READY_FOR_PERMISSION_AND_EDITORIAL_REVIEW; catalog promotion remains blocked.
- Added `npm run inside:review-proposals -- <review-packet.json> [availability.json] [research-preflight.json]`.
- The output explicitly keeps catalogMutationAllowed=false, automaticHealthChangeAllowed=false, automaticPermissionApprovalAllowed=false and per-item automaticWriteAllowed=false.
- Added regression coverage for ready, missing-availability, failure-review and second-provider proposal paths.

## 2026-09-24 — Local-only operator review evidence packets
- Extended the unlinked operator review lab with local-only human review controls: Playing & current, Failed / not playing, and Inconclusive.
- Review controls remain disabled until the candidate iframe has actually been loaded in the deployed review page.
- Observations are stored only in that browser's localStorage and can be copied or downloaded as a versioned ERN_OPERATOR_REVIEW_EVIDENCE JSON packet.
- Exported evidence explicitly records networkStatus=UNKNOWN_NOT_RECORDED and catalogMutationAllowed=false; the lab never fabricates HTTP status or writes to ERN.
- Added a repository-side validator and `npm run inside:review-evidence -- <packet.json>` command that checks known source/research IDs, outcomes, timestamps, duplicates, evidence kind and mutation/network boundaries.
- Validation never converts human review into health, permission approval or catalog promotion automatically.
- Added regression coverage for local capture wiring and evidence validation.

## 2026-09-24 — Unlinked operator embed review lab
- Added a generated operator-only review surface at `/review/inside-ern.html` for future human playback checking.
- The page is deliberately unlinked from ERN navigation, excluded from the sitemap, marked `noindex,nofollow,noarchive`, and disallowed for generic and OAI search crawlers.
- It is not authentication-protected, so the page states that boundary explicitly and contains only public-source candidates.
- Candidate frames load only after an operator clicks Load candidate, avoiding a page full of simultaneous third-party iframes.
- The lab includes highest-value inside-ERN restoration candidates plus second-provider research candidates, but loading a frame never writes evidence or promotes a source.
- HUMAN_PLAYBACK, permission/provider review and catalog promotion remain separate explicit steps.
- The generated review page is included and hashed in the immutable release artifact so deployed-origin testing matches the live ERN environment.
- Added regression coverage for noindex/crawler boundaries, release wiring, non-authoritative language and absence from public discovery.

## 2026-09-24 — Adaptive Watch Earth set size
- Watch Earth now treats 20 as a ceiling rather than a quota.
- Shared balance policy: when fewer than five fresh/current inside-ERN windows are available, the set uses at most 12 external windows; current inside windows can extend the total naturally, so 3 inside allows up to 15 and 5+ inside can grow back toward 20.
- Smaller truthful pools remain smaller and are never padded.
- The same adaptive rule now drives backend Watch Earth construction, product-balance diagnostics and the public browser selection path.
- Existing inside-first, quality, moment, currentness, featured-hold and playback-evidence gates remain intact.
- Added regression coverage for external-only, three-inside, five-inside, explicit-limit and public-browser behavior.

## 2026-09-24 — Second-provider technical preflight
- Added a research-only technical preflight for YouTube embed candidates using public YouTube oEmbed metadata plus direct candidate embed-page reachability.
- A candidate can advance only to TECHNICALLY_READY_FOR_DEPLOYED_TEST; the preflight explicitly keeps permissionConfirmed=false, humanPlaybackConfirmed=false and promotionAllowed=false.
- Passing technical preflight does not prove that the video is live/current, embeddable on ERN's deployed origin, legally/operationally approved, or suitable for the public catalog.
- The daily operations packet now retains embed-research-preflight.json and the private operator brief shows whether each second-provider candidate is technically ready or still preflight-pending.
- Added regression coverage for full/partial/unsupported classifications, safety fields and workflow/brief wiring.

## 2026-09-24 — Degraded source-page refresh tranche M
- Revalidated the current CouchTourist provider pages for Waikīkī Beach and Cold Lake Marina; both pages still expose the same reviewed embed iframes.
- Updated source-page currentness evidence only.
- Preserved DEGRADED health, VISITOR_PLAYBACK_REJECTED_2026-09-20 failure reasons, and absent playbackVerifiedAt markers.
- Neither source can return to Watch Earth/LIVE HERE until fresh deployed HUMAN_PLAYBACK resolves the prior visitor-playback rejection.
- Added regression coverage proving page freshness cannot clear playback failures.

## 2026-09-24 — Inside-ERN playback evidence horizon
- Added a 24-hour horizon for embedded HUMAN_PLAYBACK evidence so ERN can see which LIVE HERE proofs are current, due within 12h/6h, expired, missing or intentionally held.
- The horizon is retained in the daily operations packet as inside-playback-horizon.json and is summarized in the private operator brief.
- Expiring evidence creates a proactive renewal reminder; it does not reverify anything automatically.
- Featured-hold sources are separated from the urgent renewal lane.
- Added regression coverage for horizon states, ordering, workflow wiring and operator-brief warnings.

## 2026-09-24 — Actionable daily operator brief
- Extended the private daily operator brief with the top inside-ERN restoration candidates, current blocker lane, and second-provider research candidates.
- The brief now names specific sources/actions from the recovery and research queues rather than only stating broad goals.
- It remains read-only and inherits the same evidence rules: source currentness, human playback, permission and provider review are never bypassed.
- Added regression coverage for queue rendering and workflow input wiring.

## 2026-09-24 — Availability-aware trend + daily operator brief
- Daily trend snapshots now carry the public-source availability sample as non-scoring observational evidence.
- Availability changes can be compared day to day, but they never affect the operational trend score because provider-page reachability is not proof of live playback.
- Added a private Markdown operator brief summarizing catalog health, Watch Earth balance, inside-ERN readiness, provider resilience, release blockers, availability warnings, scored improvements/regressions and next operational focus.
- The brief is generated into the retained daily operations packet only; it is not public and cannot mutate catalog truth, health, permissions, ranking or visitor content.
- Added regression coverage proving availability remains non-scoring and the brief stays read-only/diagnostic.

## 2026-09-24 — Automated public-source availability observer
- Added a read-only daily observer for a small prioritized set of public provider/source pages.
- The plan is capped at 24 sources, no more than four requests per host, four concurrent requests, and seven-second request timeouts.
- Localhost/private-network targets are rejected before probing.
- Evidence is deliberately narrow: PAGE_REACHABLE means only that the provider page responded; it never proves that a camera is live or changes source truth automatically.
- HTTP 403/429 is ACCESS_BLOCKED/inconclusive, 404/410 is PAGE_MISSING, 5xx is TEMPORARY_ERROR, and network/timeout failures stay observational.
- The report is retained as source-availability.json in the daily operations packet.
- Added regression coverage for host caps, private-network rejection, outcome classification and workflow wiring.

## 2026-09-24 — Daily ERN operations trend layer
- Added a compact versioned operations snapshot covering catalog health/currentness, Watch Earth balance, inside-ERN readiness, provider concentration, release blockers and maintenance debt.
- Daily operations now restore the most recent prior trend snapshot when available, compare it with the current snapshot, and emit a trend delta classified as BASELINE, IMPROVING, REGRESSING, MIXED or UNCHANGED.
- The latest snapshot is retained through GitHub Actions cache while the full current/delta JSON files are included in the normal 14-day operations artifact packet.
- Trend comparison is observational only: it does not change catalog truth, source health, permissions, playback evidence, rankings or visitor content.
- First run cleanly establishes a BASELINE when no prior snapshot exists.
- Added regression coverage for snapshot shape, improvement/regression direction, CLI contracts and cache/artifact workflow wiring.

## 2026-09-24 — Embed source refresh tranche L
- Revalidated four additional CouchTourist provider pages: Roque de los Muchachos, Taitung Jinzun, Lajes do Pico and Mpala Watering Hole.
- Each page still identifies its view as live and exposes the same ERN-reviewed embed iframe already in the catalog.
- Source currentness was refreshed while playbackVerifiedAt remains intentionally absent.
- The fresh-human-playback gate therefore keeps all four out of LIVE HERE / Watch Earth until deployed playback is separately confirmed.
- Added regression coverage for the separation.

## 2026-09-24 — Embed source refresh tranche K
- Revalidated six high-value CouchTourist source pages: Ponte di Legno, Sasagawa Nagare, Metung, Cancún, Chihshang Paradise Road and St. John's Harbour.
- Each current provider page still describes the view as live and exposes the same ERN-reviewed embed iframe already in the catalog.
- Source-level checkedAt / lastSuccessfulCheck / freshness evidence were refreshed, but playbackVerifiedAt remains intentionally absent.
- Because the fresh-human-playback gate is now active, none of these six returns to LIVE HERE or Watch Earth until deployed-origin HUMAN_PLAYBACK is separately confirmed.
- Added regression coverage proving source currentness cannot bypass playback evidence.

## 2026-09-24 — Fresh human-playback gate for embedded sources
- Added a compact `playbackVerifiedAt` evidence marker for EMBED sources and seeded it only for the three deployed-origin views actually confirmed today: Bergen/Ulriken, Skeikampen and Cijin Beach.
- Backend Watch Earth and the public browser now require that marker to be within 24 hours before an embedded source can make a fresh LIVE HERE claim.
- Provider-page/source verification remains separate. Refreshing a CouchTourist page can prove the source is current, but it no longer promotes the embed to LIVE HERE without human playback evidence.
- Non-embedded current sources keep their existing source-type verification rules.
- Added shared/helper and browser regression coverage, including stale playback evidence rejection.

## 2026-09-24 — Catalog-owned featured holds
- Moved the four existing stable-beta feature holds out of a hard-coded browser ID list and into source catalog fields (`featuredHold` / `featuredHoldReason`).
- The public app, backend Watch Earth selection and inside-ERN recovery queue now share the same curation state.
- Held sources remain searchable/maintainable but are excluded from Watch Earth, Hero priority and healthy restoration-candidate ranking until the hold is explicitly removed.
- Recovery reports held sources separately instead of treating them as broken or as priority restoration work.
- Added schema declarations and regression coverage for the catalog/app/backend/recovery boundary.

## 2026-09-24 — Clean JSON operations packet output
- Switched retained operations-packet commands to silent npm execution so artifact files contain script JSON rather than npm command banners.
- This keeps the daily packet machine-readable for future comparison/automation while preserving the same fail-visible workflow behavior.

## 2026-09-24 — Retained daily operations packet
- The scheduled read-only ERN operations audit now writes each diagnostic to a separate JSON snapshot and retains the packet as a GitHub Actions artifact for 14 days.
- Packet contents include verification horizon, Watch Earth live-now status, product balance, provider worklist, inside-ERN recovery, provider resilience, embed research, and consolidated operations status.
- Upload runs with `if: always()`, so partial diagnostic evidence is retained even when a later fail-visible safety check stops the workflow.
- The packet does not mutate the catalog and is not published to visitors; it creates continuity for maintenance and avoids circular re-analysis.

## 2026-09-24 — Watch Earth product-balance diagnostic
- Added a diagnostic layer that compares strong-current inside-ERN and external windows without changing the public Top 20 yet.
- Default product targets are 20 maximum windows, at least five strong inside-ERN windows, and a soft cap of 12 external windows.
- When inside-ERN playback is below the preferred floor, operations now reports an INSIDE_SHORTFALL and a smaller recommended set size rather than assuming all 20 slots should be filled externally.
- With the current catalog shape, this gives ERN an explicit quality/product signal for the concern that Watch Earth can become mostly outbound links.
- The diagnostic is available through `npm run watch-earth:balance`, consolidated operations status, and the daily audit.
- No visitor count or ranking is changed automatically by this diagnostic.

## 2026-09-24 — Visitor currentness-policy sweep
- Removed the remaining generic 21-day and 7-day currentness shortcuts from the visitor app.
- Quick-search country suggestions now draw from feature-eligible sources using the same source-type verification windows as Watch Earth.
- ERN Guide "current" intent now uses the shared currentTruthClaim boundary rather than a generic seven-day cutoff.
- Viewer confidence now becomes stale as soon as the source-specific verification window expires, not only after 21 days.
- Added regression coverage that rejects the legacy cutoffs from app-lite.

## 2026-09-24 — Browser/backend Watch Earth quality parity
- Aligned the public Watch Earth filter with the backend experience gate.
- Top 20 candidates now require quality >=80, moment >=70 and no known visitor-playback rejection/stale-recording/broken-embed reason in addition to current health/truth checks.
- This prevents inside-ERN restoration from lowering the visitor standard merely to fill the set.
- The intended result is explicitly quality over quantity: Watch Earth may show fewer than 20 windows when the current catalog cannot support 20 strong ones.
- Added a syntax-backed regression check for the browser gate.

## 2026-09-24 — Inside-ERN restoration priority
- Split embed recovery into two operational lanes: healthy restoration candidates and blocked/degraded sources.
- Added a default target of five freshly proven inside-ERN windows and a readyShortfall metric.
- Healthy candidates are ranked by quality, moment value and freshness so ERN can restore the strongest visitor windows first instead of spending all effort on broken cameras.
- Degraded/offline/permission problems remain visible in a separate blocker list and still require explicit evidence before recovery.
- The underlying truth gate is unchanged: current source verification plus fresh HUMAN_PLAYBACK is still required for readiness.

## 2026-09-24 — Research-only second embed-provider ledger
- Added a non-public embed-research ledger for potential second-provider expansion.
- Seeded it with three current official Monterey Bay Aquarium YouTube live cams: Monterey Bay, Open Sea and Jelly Cam.
- Candidate embed URLs use YouTube privacy-enhanced mode, which ERN already allows technically.
- None of these candidates is in the visitor catalog. Promotion remains blocked until the specific video permits embedding on the deployed origin and fresh HUMAN_PLAYBACK is observed.
- The research queue is available via `npm run inside:research` and runs in the daily read-only operations audit.
- This gives ERN a concrete route away from single-provider dependency without weakening source-truth or permission standards.

## 2026-09-24 — Inside-ERN provider resilience
- Added an explicit resilience model for embedded playback providers instead of treating all inside-ERN windows as interchangeable.
- ERN now reports provider-family count, dominant-provider share, concentration state and the next resilience goal.
- The current catalog correctly flags a single-provider dependency rather than hiding it behind the total number of embeds.
- A second embed family remains only an operational goal: no YouTube or other provider is promoted until source truth, platform/owner permission semantics and HUMAN_PLAYBACK evidence are reviewed.
- The resilience status is available in operations output, via `npm run inside:providers`, and in the daily read-only audit.
- Added regression coverage for single-provider and diversified-provider states.

## 2026-09-24 — Inside-ERN recovery queue
- Added a dedicated read-only recovery model for EMBED sources so ERN can prioritize rebuilding the inside-ERN experience instead of mixing those tasks with ordinary external-link maintenance.
- A source counts as ready only when source health is HEALTHY, embed permission is EMBED_ALLOWED, source verification is current and fresh HUMAN_PLAYBACK evidence exists.
- Recovery work is ranked by permission problems, degraded/offline health, expired source verification, stale playback evidence and missing human playback.
- The queue is exposed in operations status, has its own `npm run inside:recovery` command, and runs in the daily operations audit.
- No source is automatically promoted or repaired from the queue; evidence still has to be recorded explicitly.
- Added regression coverage for priority, readiness and workflow wiring.

## 2026-09-24 — Daily read-only operations audit
- Enabled the existing ERN Operations Check to run once daily at 00:17 UTC while preserving manual workflow dispatch.
- The scheduled audit runs source verification horizon, Watch Earth live-now status, provider recovery worklist and the consolidated operations report.
- The workflow remains read-only: it does not mutate source truth, health, coordinates or permissions automatically.
- Unsafe provider-integrity conditions and rejected observation input continue to fail visibly rather than being silently repaired.
- Added regression coverage for the schedule and command set.

## 2026-09-24 — Watch Earth inside-ERN priority parity
- Aligned the backend Watch Earth builder with the visitor app's product principle: reserve up to five fresh/current inside-ERN windows before filling the rest of the journey with external views.
- The reserve still passes every existing truth, health, permission, near-now and recency gate; stale or degraded embeds are never promoted merely because they can play inside ERN.
- Country/place diversity remains enforced, and downstream provider/delivery diversity still limits concentration.
- This creates one consistent source-selection direction across operations and the public experience while the inside-ERN catalog is rebuilt.
- Added regression coverage with deliberately lower-scoring inside windows to prove product priority without bypassing eligibility.

## 2026-09-24 — Public currentness label boundary
- Extended ERN's strict verification windows beyond Watch Earth into Search, My Earth, Destinations and other shared card surfaces.
- A source whose verification window has expired remains discoverable but now reads RECHECK DUE instead of LIVE HERE / LIVE ↗ / CURRENT IMAGE.
- DEGRADED, OFFLINE and unknown-health sources now surface LIMITED SOURCE, TEMPORARILY UNAVAILABLE or SOURCE CHECK respectively.
- Current healthy sources retain their normal live/current truth label.
- This closes the mismatch where a card could say LIVE HERE while also saying it was verified several days ago.
- Added regression coverage for the shared truth-label boundary.

## 2026-09-24 — Watch Earth currentness gate + fresh human playback evidence
- Aligned visitor-facing Watch Earth eligibility with ERN's backend verification windows: 24h for embedded/current-image sources, 72h for external-live/partner sources, and 168h for ordinary current pages.
- Removed the previous loose 21-day feature gate that could label an old verification as LIVE HERE.
- Recorded fresh HUMAN_PLAYBACK evidence from the deployed ERN experience for Bergen/Ulriken, Skeikampen and Cijin Beach based on fresh fullscreen playback screenshots supplied during verification.
- Refreshed those three source checks to the same observed time; they remain eligible inside ERN for the 24h embed window.
- This intentionally allows Watch Earth to shrink or rotate toward fewer sources when current verification is insufficient rather than filling slots with stale claims.
- Added regression coverage for the currentness policy and observation ledger.

## 2026-09-24 — Intentional-unpinned Atlas UI
- After static mapping completion, the "Beyond the mapped pins" surface now remains useful instead of becoming an empty container.
- Multi-location collections and moving Earth views are rendered as selectable cards with an explicit reason they do not have a single pin.
- Any future genuinely unmapped static source remains separately labeled as awaiting map evidence.
- This preserves discoverability for the ISS and multi-site collections without inventing representative coordinates.
- Added regression coverage for the post-completion Atlas state.

## 2026-09-24 — Atlas static mapping complete
- Completed the remaining six single-location Atlas references: Kijihiki Plateau, Bloubergstrand, Perdido Key/La Riva, Hale Pau Hana, Metung and Ponte di Legno/Adamello.
- Kijihiki uses Hokkaido/Hokuto public open data; Bloubergstrand uses an OpenStreetMap locality; the property/place destinations use documented public place references; Ponte di Legno is deliberately REGION_REFERENCE rather than an exact-camera claim.
- ERN now has no unresolved static single-location sources: every source is either mapped with explicit provenance or intentionally unpinned because it is dynamic/multi-site.
- Added a completeness regression gate so future catalog additions cannot silently reintroduce unproven static map gaps.
- Source truth, permission and playback semantics remain unchanged.

## 2026-09-24 — Atlas mapping tranche I
- Added conservative PLACE_REFERENCE coordinates to five previously unmapped single-location sources: Volcán Tajogaite, Sasagawa Nagare, Waikīkī Beach, Cold Lake Marina and Pleasant Beach Hotel/Lake Ontario.
- Tajogaite uses Government of the Canary Islands coordinates; Sasagawa uses its public Wikidata coordinate record; Waikīkī, Cold Lake Marina and Pleasant Beach use explicit OpenStreetMap feature coordinates.
- These are place references, not exact camera-hardware claims.
- Existing source truth, playback and permission semantics were not changed.
- Added regression coverage for all five mappings.

## 2026-09-24 — Illustrative visual truth cue
- ERN's generated scenic artwork is now explicitly marked as illustrative wherever it appears in the Hero, Watch Earth cards and compact destination/search cards.
- A source may still truthfully be LIVE HERE, LIVE VIDEO, CURRENT IMAGE or LIVE ↗; the cue describes only the decorative visual shown by ERN when no safe source thumbnail is available.
- If a remote thumbnail later fails, the UI switches to the generated fallback and marks it illustrative instead of leaving a broken-image glyph or silently implying current imagery.
- The cue is intentionally small so the approved visual design remains intact.
- Added regression coverage for hero, card and compact-card visual truth states.

## 2026-09-24 — Sticky-header section landing repair
- Added explicit scroll-margin offsets for Home, Watch Earth, Destinations, Explore, World Map and Saved/My Earth.
- Desktop, tablet and mobile offsets track ERN's existing sticky-header heights.
- Navigation jumps now land with section headings visible instead of hiding their first line underneath the header.
- No section layout, typography or navigation structure was redesigned.
- Added regression coverage for the landing offsets.

## 2026-09-24 — Public truth labels separated from playback location
- Corrected Explore/My Earth/Watch card labels so verified LIVE_IMAGE and LIVE_VIDEO sources no longer collapse to PREVIEW merely because they open at the provider.
- Provider-opened LIVE_IMAGE now reads CURRENT IMAGE ↗; provider-opened LIVE_VIDEO reads LIVE VIDEO ↗.
- Playback location still controls tone/action semantics, but source truth remains independent.
- This aligns compact cards with destination/source truth and fixes the visible Oeschinensee/Reykjavík-style mismatch from the current site screenshots.
- Added regression coverage for the truth/playback boundary.

## 2026-09-24 — Visible poster fallback + Atlas unpinned UI repair
- Removed browser broken-image glyphs from the main window cards and compact destination cards: failed remote thumbnails are now removed immediately and replaced by ERN's generated scenic poster.
- Preserved the existing generated-background style instead of introducing a redesign.
- Updated the World Map "Beyond the mapped pins" logic to treat MULTI_SITE_UNPINNED collections separately from genuinely unmapped single places.
- The note now distinguishes true coordinate debt, intentional multi-location collections, and dynamic Earth views.
- Added regression coverage for both visible behaviors.

## 2026-09-24 — Official single-site Atlas mappings
- Added PLACE_REFERENCE pins for Queenstown Airport and Georgia Aquarium using coordinates exposed by map links from each destination's official site.
- Revalidated Queenstown Airport's close-to-live webcam surface and Georgia Aquarium's current Live Cams/site-location surface.
- Coordinate provenance points back to the official contact/directions page rather than an unsourced geocode.
- Truth, permission and playback semantics remain unchanged.
- Added regression coverage for both mappings.

## 2026-09-24 — Boston Harbor Islands reference mapping
- Revalidated the National Park Service Boston Harbor Islands webcam surface: the current camera set is on Boston Light / Little Brewster Island and individual views are active with one-minute refreshes.
- Added a PLACE_REFERENCE pin using the NPS-published Little Brewster Island reference coordinates rather than guessing a generic Boston Harbor centroid.
- The pin represents the webcam island/location context, not exact camera hardware placement.
- Added regression coverage; truth, permission and playback remain unchanged.

## 2026-09-24 — Multi-site Atlas collections
- Added a first-class MULTI_SITE_COLLECTION / MULTI_SITE_UNPINNED model for sources that intentionally represent many physical locations.
- Dolomiti Superski, Florida Now, Randwick beach cams and Jungfrau Region now stay unpinned rather than receiving misleading single-point coordinates.
- These collections are removed from missing-coordinate debt while retaining provider/source provenance and explanatory notes.
- The existing DYNAMIC_ORBIT / DYNAMIC_UNPINNED rule remains separate for moving viewpoints such as the ISS.
- Added regression coverage for validation, schema and maintenance/worklist behavior.

## 2026-09-24 — Atlas coordinate provenance tranche H
- Added conservative PLACE_REFERENCE provenance to seven existing mapped provider destinations: Mpala, Lajes do Pico, Roque de los Muchachos, Cijin Beach, Cancún, Taitung Jinzun and Bergen/Ulriken.
- Existing coordinates were preserved; none is promoted to CAMERA_EXACT.
- Provenance points to the current provider/destination page that names the mapped place.
- This closes mapped legacy debt without changing visitor playback or source-truth semantics.
- Added regression coverage for all seven records.

## 2026-09-24 — Official source refresh + Atlas provenance tranche G
- Revalidated Kitzbühel/KitzSki, Flåm/Norway's Best, Cape Town earthTV, two Statue of Liberty EarthCam views and the Tbilisi Mtkvari River EarthCam page.
- Recorded source-specific currentness evidence from each provider surface rather than only advancing timestamps.
- Added conservative PLACE_REFERENCE/REGION_REFERENCE provenance without moving existing pins or claiming exact camera hardware positions.
- Truth, permission and playback semantics remain unchanged.
- Added regression coverage for all six refreshed records.

## 2026-09-23 — Dynamic Atlas exception repaired
- Reconciled the stricter coordinate-provenance rules with ERN's existing International Space Station model.
- DYNAMIC_ORBIT is now a first-class coordinate basis only when paired with DYNAMIC_UNPINNED; it must not carry static latitude/longitude.
- The ISS and future moving viewpoints no longer appear as missing-coordinate maintenance debt.
- Static PLACE_REFERENCE / REGION_REFERENCE / CAMERA_EXACT evidence rules remain strict and unchanged.
- Added regression coverage for validation, schema semantics and maintenance/worklist behavior.

## 2026-09-23 — Official source refresh + Atlas provenance tranche F
- Revalidated Auckland Viaduct Harbour, Pattaya City CCTV Streaming and Ski Arlberg against their current official provider surfaces.
- Auckland's provider still exposes an Auckland Viaduct live view; Pattaya's official portal exposes a broad public Live View camera directory; Ski Arlberg reports active live mountain webcams.
- Recorded source-specific freshness evidence and conservative PLACE_REFERENCE/REGION_REFERENCE coordinate provenance without moving existing pins.
- Truth, permission and playback remain unchanged; Pattaya stays link-only under its public-service terms and Ski Arlberg remains provider-viewed.
- Added regression coverage for all three refreshed records.

## 2026-09-23 — Official source refresh + Atlas provenance tranche E
- Revalidated seven official-provider/current-source pages: Glenelg, Brighton, Amden/Weesen, Oeschinensee, Verbier, Reykjavík and Kaikōura.
- Each record now carries source-specific freshness evidence from the current official provider surface rather than a cosmetic timestamp refresh.
- Added conservative PLACE_REFERENCE/REGION_REFERENCE coordinate provenance without moving existing pins or claiming exact camera hardware positions.
- Kaikōura remains LIVE_IMAGE because Environment Canterbury explicitly describes five-minute static-image refreshes; playback/permission semantics are unchanged.
- Added regression coverage for all seven refreshed records.

## 2026-09-23 — Atlas coordinate provenance tranche D
- Added conservative provenance to six additional mapped sources from official provider pages: Addo, Orpen, Boulders, Nossob and two Takayama views.
- Existing coordinates were preserved; none of these sources is promoted to CAMERA_EXACT.
- SANParks destination pages identify the named park/camp/beach context, while Takayama's official live-camera site identifies the Miyagawa/Kaji Bridge destination.
- Added regression coverage for all six records.

## 2026-09-23 — Atlas coordinate provenance tranche C
- Added conservative coordinate provenance to 13 current/high-value destinations without changing their existing map positions.
- EarthCam destination pins are explicitly PLACE_REFERENCE rather than CAMERA_EXACT; Kīlauea and Lake Lucerne are REGION_REFERENCE.
- Kīlauea provenance now points to the official USGS Kīlauea page, whose quick facts publish the same reference latitude/longitude already used by ERN.
- Zermatt and St. Moritz retain place-level provenance only; webcam hardware positions are not inferred.
- Added regression coverage for every source in this tranche.

## 2026-09-23 — Consolidated maintenance debt
- Operations status now carries one maintenance block combining source revalidation and Living Atlas coordinate/provenance debt.
- Atlas maintenance distinguishes unmapped sources from mapped legacy positions that still lack authoritative provenance, with current sources prioritized first.
- Provenance completion percentage is visible without changing or silently upgrading any existing coordinate.
- The operator view now exposes the next ten source-revalidation items and next ten Atlas actions in one place, reducing duplicated/circular maintenance work.

## 2026-09-23 — Product activation operator visibility
- Daily/interactive operations reporting now shows business activation and Earth Signals contribution readiness beside catalog, playback and release health.
- Business remains FOUNDATION_READY but not commercially active until real submission transport and affiliate inventory exist.
- Earth Signals remains READ_ONLY with its six real infrastructure requirements visible; architecture/tests cannot masquerade as a live contribution backend.
- Added `npm run earth-signals:status` for a direct machine-readable operator check. No public contribution path was enabled.

## 2026-09-23 — Atlas provenance integrity hardening
- Coordinate evidence is now symmetric: a provenance basis requires coordinates + an evidence URL, and an evidence URL cannot exist without a declared basis.
- Coordinate evidence URLs must use HTTPS; the JSON schema now exposes the same provenance contract already enforced at runtime.
- The Atlas operations worklist now reports provenance completion percentage, current legacy-coordinate debt and separate top-priority queues for unmapped current sources versus mapped-but-unevidenced sources.
- No existing map positions were changed and no legacy coordinate was silently upgraded to CAMERA_EXACT.

## 2026-09-23 — Daily operations failure propagation
- All seven scheduled source, Atlas, provider, Watch Earth and operations reports now preserve the underlying command's exit status while also saving JSON through tee.
- A failed provider/source report will fail the daily job instead of appearing green solely because the log was captured; reports and artifacts still publish through their always steps.
- Current Watch Earth structural audit fills 20 distinct places across four UTC dayparts, but strict-current inside-ERN playback is zero. Embedded candidates remain stale until genuinely revalidated; provider pages alone do not certify human playback.

## 2026-09-23 — Exact Pages certificate diagnosis
- Preserved the certificate-specific finding from the earlier unmerged diagnostic branch after its pipeline fix was superseded.
- Domain health now reports PAGES_CUSTOM_CERT_NOT_PROVISIONED when DNS matches GitHub Pages but the endpoint still serves the generic *.github.io certificate.
- Exact SAN matching avoids treating a wildcard for a parent domain as coverage for the apex. The release gate remains fail-closed, and no DNS or Pages setting is changed automatically.

## 2026-09-23 — Official source freshness tranche A
- Revalidated eight high-value external/current sources against their current official provider pages: Kīlauea, Yellowstone, San Diego Zoo, Georgia Aquarium, Zermatt, Chamonix, Whistler Blackcomb and Florida Now.
- Each refreshed timestamp now carries a source-specific freshness-evidence statement explaining what the official page currently confirms.
- No embed permission or HUMAN_PLAYBACK evidence was inferred from these page checks; playback location and release evidence remain unchanged.
- Sources whose current page did not clearly support their existing camera/currentness semantics were left stale rather than receiving a cosmetic timestamp refresh.

## 2026-09-23 — EarthCam source freshness tranche B
- Revalidated nine visitor-favorite EarthCam destinations against their current provider pages: New York skyline, Meads Bay, Lauderdale-by-the-Sea, Aruba, Marco Island, Dublin, Chicago, Sint Maarten and Tbilisi Freedom Square.
- Every refreshed source carries an explicit statement of the live/real-time wording currently present on the provider page.
- These checks renew external/current evidence only. They do not create embed permission and do not count as HUMAN_PLAYBACK inside ERN.
- EarthCam pages without sufficiently clear current/live evidence in this pass remain untouched.

## 2026-09-23 — Actual-clock Watch Earth operations
- Added a separate live-now Watch Earth status report that evaluates the curated journey against the actual current clock instead of the deterministic catalog-time anchor used by CI regression audits.
- Daily operations now exposes current journey count, shortfall, place/country/provider breadth, inside-ERN coverage, light mix and stale/expired catalog-source debt.
- The deterministic four-daypart audit remains unchanged for reproducible structural testing; the new report prevents that historical anchor from being mistaken for present-time freshness.
- The report is strictly observational: it does not refresh verification timestamps, change promotion eligibility, or substitute for HUMAN_PLAYBACK/release evidence.

## 2026-09-23 — Fail-closed domain diagnostics
- Fixed a shell-pipeline bug where `npm run domain:health | tee ...` could hide the diagnostic command's non-zero exit code.
- Both the Pages origin-verification workflow and the scheduled domain-health workflow now enable `pipefail`, so a TLS/DNS/HTTPS failure remains a real workflow failure even while its JSON report is captured.
- This closes a misleading state where the diagnostic step appeared successful while the certificate still did not cover earthrightnow.app.
- Added regression coverage requiring the scheduled domain checks to preserve exit status through logging pipes.

## 2026-09-23 — Atlas pin precision disclosure
- Living Atlas pin titles and accessible labels now disclose coordinate precision when evidence is available.
- PLACE_REFERENCE and REGION_REFERENCE pins explicitly say they are reference points and may not be the exact camera position; CAMERA_EXACT remains distinguishable.
- Legacy pins retain neutral “Map position” wording rather than receiving invented precision.
- Added regression coverage so future Atlas rendering cannot silently erase the provenance distinction.

## 2026-09-23 — Evidence-backed Living Atlas coordinates
- Added explicit coordinate provenance semantics so ERN can distinguish an exact camera position from a verified place/region reference point.
- Coordinate provenance is optional for legacy pins but validated whenever supplied; a provenance basis must carry an HTTPS source and valid lat/lon.
- The Atlas worklist now separates unmapped sources from legacy mapped pins that still need provenance, preventing old coordinates from being silently treated as equally evidenced.
- Added authoritative place-reference coordinates for Grand Canyon, Yellowstone (Old Faithful), Mount Rainier (Paradise) and Glacier (Apgar) from U.S. National Park Service sources.
- These pins are deliberately labeled PLACE_REFERENCE rather than CAMERA_EXACT; ERN gains useful spatial discovery without pretending the webcam hardware sits at the reference point.

## 2026-09-23 — Candidate-bound release verification console
- Added an unlinked, no-index release verification page to the immutable deployment artifact.
- The console reads the exact release manifest candidate SHA, exposes the deployed origin and browser environment, lays out all six real-world release gates, and shows the minimum inside-ERN provider representatives still needing HUMAN_PLAYBACK evidence.
- The console can build candidate-bound recording commands from an operator-written observation note, but it cannot write the evidence ledger or mark a gate passed automatically.
- Provider playback remains fail-closed: only an actual HUMAN_PLAYBACK observation counts; iframe/HTTP reachability is never upgraded into visible-media evidence.
- Added regression coverage and included the console itself in the release artifact hash manifest.

## 2026-09-23 — Full ERN Guide multilingual interaction
- Extended seven-language behavior beyond static interface text and one-off runtime sentences into the main Earth Guide response layer.
- Welcome, empty-state, result summaries, current-evidence caveats, My Earth preference notes, weather caution, place follow-ups, price/quietness boundaries and starter suggestion labels now follow the selected language.
- Translated follow-up labels map back to canonical ERN actions before execution, preventing localized “Surprise”, “nearby”, “stay” or live-now prompts from degrading into unrelated free-text searches.
- Directly typed multilingual Guide actions now understand surprise, different-place, general live-now, nearby, stay, cheaper and quieter requests across the six non-English interface languages.
- Suggestion chips keep canonical queries behind localized labels, preserving the existing intent/action engine while presenting the visitor’s chosen language.
- English remains the default API behavior for existing modules/tests; source truth, currentness, permission and ranking rules are unchanged.
- Added full multilingual interaction regression coverage across Thai, German, French, Spanish, Japanese and Chinese.

## 2026-09-23 — Actionable GitHub Pages DNS diagnostics
- Expanded the domain-health check from a generic DNS/TLS failure into an explicit GitHub Pages assessment.
- The report now compares apex A/AAAA records with the documented Pages targets, checks the www CNAME target, inspects CAA for Let's Encrypt compatibility, preserves TLS/HTTPS tests, and emits a concrete next action.
- DNS repair guidance is diagnostic only: the checker does not mutate DNS or weaken origin certification.
- Updated the deployment plan to reflect the current Pages workflow, exact-commit verification, candidate-specific human evidence and rollback model.
- Added regression coverage for correct, conflicting IPv4/IPv6, CAA-blocked and www-CNAME scenarios.

## 2026-09-23 — Candidate-specific release operator packet
- Added one human-release packet bound to the exact candidate SHA instead of scattering browser, mobile, provider, accessibility, performance and rollback work across separate reports.
- The packet carries the deployed ERN origin, previous commit, six evidence checks, candidate-bound recording commands and the exact representative inside-ERN provider windows still needing HUMAN_PLAYBACK proof.
- CI now retains the packet as a short-lived artifact after all automated gates pass; this makes the next manual step obvious without pretending CI performed it.
- Provider playback remains fail-closed: HTTP reachability, iframe loading and provider metadata do not count as visible media playback.
- Added regression coverage for packet semantics and CI wiring.

## 2026-09-23 — Pages custom-domain failure isolation
- GitHub Pages artifact deployment was succeeding while the post-deploy custom-domain check failed with a TLS hostname mismatch for earthrightnow.app.
- The Pages workflow now runs ERN's DNS/TLS health diagnostic before origin certification and publishes the exact domain state to the workflow summary.
- A DNS/TLS failure remains fail-closed, but it is now identified as a custom-domain infrastructure blocker rather than being conflated with a broken static artifact or application regression.
- Exact-commit verification still runs only after the custom domain passes DNS/TLS/HTTPS health; no release gate is weakened.
- Current external evidence still requires the domain/DNS owner to correct or allow GitHub Pages HTTPS provisioning before origin certification can pass.

## 2026-09-23 — ERN Guide runtime localization
- Closed the gap between ERN’s seven-language interface and dynamic Guide responses.
- Place-window, nearby-place, stay, surprise, live-now and no-current-view responses now follow the visitor’s selected language.
- Runtime copy remains presentation-only and cannot alter source truth, health, permission, currentness or playback behavior.
- Added smoke coverage for all seven supported languages and English fallback behavior.

## 2026-09-23 — Provider playback evidence closure
- Added a provider-family playback evidence status model for ERN's inside-ERN EMBED_ALLOWED inventory.
- Representative evidence deliberately requires HUMAN_PLAYBACK; HTTP success, provider-page metadata and media-endpoint reachability remain useful diagnostics but cannot certify visible browser playback.
- Every degraded inside-ERN source remains a mandatory representative, while healthy sources are sampled by provider family to reduce duplicate manual work without weakening the evidence boundary.
- Added `npm run provider:playback-status` to expose provider families ready, representative checks completed, exact missing source IDs and copy-ready recording commands.
- Daily operations now carries the same evidence debt so source-health work and release work cannot drift apart.
- This stage does not fabricate any provider evidence and does not mark release providerPlayback as passed; it only makes the remaining human verification debt explicit and auditable.

## 2026-09-23 — Official external recovery tranche
- Seven historical destinations were re-evaluated against current official provider surfaces rather than promoted from legacy status.
- Randwick/Coogee, Boston Harbor Islands, Diano Marina, Farm Tomita, Waikiki Beach and Sottomarina/Chioggia return as healthy LINK_ONLY external evidence.
- Jungfrau returns deliberately DEGRADED because the current official webcam surface reports its listed camera connections offline; recovery does not erase negative evidence.
- The active catalog reaches 69 sources (65 HEALTHY / 4 DEGRADED / 0 UNKNOWN), while the historical recovery ledger falls to three unresolved candidates.
- No external source in this tranche gains embed permission or inside-ERN playback merely because an official live/current page exists.

## 2026-09-20 — Watch Earth visitor-quality milestone
- Three visitor-observed poor experiences (unavailable embed, visibly non-live feed, and weak destination presentation) are quarantined from the curated Watch Earth journey while remaining auditable in the catalog.
- Watch Earth now requires a strong visitor-experience floor in addition to truthful/current playback; technically available is no longer sufficient for the curated 20.
- Degraded sources remain lower-tier destination/Atlas evidence and are labeled “limited source” rather than being presented as current.
- The journey balances daylight, golden-hour and worthwhile night-city moments when the truthful catalog supports them, while continuity prevents needless reshuffling during freshness updates.
- Runtime playback quality can now adapt during a visit: one transient failure is tolerated, while repeated failures temporarily remove that window from subsequent Watch Earth refreshes.
- Search Earth understands natural travel intent such as beaches, wildlife, mountains, city lights and local solar-time requests without weakening current/live evidence rules.
- The cinematic homepage direction is preserved, including the Earth-first hero, Choose a Window transition, integrated Search Earth and truthful generated scenery when no real thumbnail is available.

## 2026-09-20 — Search Earth local-history hygiene
- Browser-local recent searches now fail closed on malformed storage, normalize repeated whitespace, cap stored query length and keep case-insensitive deduplication.
- Search suggestions no longer repeat a recent query when the same query is already one of ERN’s curated default prompts.
- Distinct recent destination searches remain available, preserving lightweight personalization without overwhelming fresh discovery choices.

## 2026-09-20 — Destination action language
- Destination cards now say “Choose a view” / “Open view” rather than assuming every available destination asset is a live window.
- This keeps the destination-first interaction compatible with live video, refreshed images, external current sources and clearly labeled reference images.
- Regression tests were aligned with the new visitor-facing evidence language while internal PREVIEW remains the conservative catalog truth type.

## 2026-09-20 — Destination evidence language
- The internal PREVIEW truth type is now presented to visitors as “REFERENCE IMAGE” in the destination evidence hierarchy, with an explicit “not live” explanation.
- Destination choice summaries now separate verified-current views, available views whose current check is unconfirmed, and reference images instead of mixing those evidence levels together.
- Playback location (“inside ERN” versus “at source”) remains a separate choice dimension from currentness, so convenience never masquerades as freshness.

## 2026-09-20 — Search evidence guidance
- Earth Guide now states the verified-current view count explicitly even when the visitor asked specifically for live/now, rather than relying only on the word “current” in the destination count.
- Generic place searches continue to distinguish verified-current views, available-but-unconfirmed views and reference images as separate evidence levels.
- An empty live/now search now suggests removing the live qualifier to see truthful available/reference destination evidence instead of making the destination feel absent from ERN.

## 2026-09-20 — Watch Earth visitor recovery
- Runtime playback failures remain quarantined automatically so Watch Earth does not repeatedly hammer a broken provider during normal rotation.
- If a journey has lost windows, the viewer now reveals a quiet “Retry unavailable views” control; it stays hidden when the journey is healthy.
- Explicit retry clears both the current session quarantine and the short-lived browser runtime-failure memory, then retries from the current journey position.
- The journey counter discloses reduced availability after failures instead of silently pretending every starting window remains usable.

## 2026-09-20 — App render-clock + submission-state truth
- Hero truth labels now use the same captured moment as hero actions, preventing a freshness boundary from producing contradictory labels and controls.
- Living Atlas map clusters and destination results now share one captured moment per render, keeping the map/list view coherent at recency boundaries.
- Preparing a business-camera submission now explicitly says it was prepared locally and has not been sent or published while transport remains disconnected.

## 2026-09-20 — Visible-window regression hardening
- Hero beauty and personalized Live Right Now fixtures now use distinct media identities, matching ERN’s production deduplication rules instead of accidentally collapsing different test destinations onto one URL.
- The tests also carry explicit current timestamps and distinct place geometry, so they isolate the intended ranking behavior cleanly.
- This protects the invariant that ERN ranks distinct visible windows, not duplicate representations of the same media source.

## 2026-09-20 — Search suggestion balance + fixture hardening
- Search Earth keeps a direct destination prompt visible alongside intent prompts, reinforcing ERN as a place-search experience rather than only a themed camera browser.
- Currentness-sensitive hero and personalization regression fixtures now use exact timestamps aligned to their test moments so they validate product behavior instead of accidentally testing stale evidence.
- My Earth taste remains a gentle ranking influence after the broader Watch Earth journey expansion; it does not override truth/currentness eligibility.

## 2026-09-20 — Watch Earth sparse-embed resilience
- Watch Earth still prefers current views that can play inside ERN, but it no longer collapses when the verified embed pool is too small.
- When needed, the journey is supplemented with truthful current external-live views, preserving their external playback semantics rather than pretending they play inside ERN.
- This gives the global journey a better chance of reaching its intended breadth while keeping truth/currentness ahead of quantity.

## 2026-09-20 — Hero night-city beauty
- Hero rotation now uses the same beauty model as Watch Earth after truth/currentness and playback capability are satisfied.
- A genuinely current night city/skyline can therefore outrank a dark non-city scene instead of night being treated as automatically inferior.
- This supports ERN’s “beautiful somewhere on Earth right now” idea while preserving currentness and source truth as higher-priority gates.

## 2026-09-20 — Nearby destination evidence boundary
- Nearby exploration now excludes source-backed destinations when none of their evidence is discoverable, preventing invalid media records from leaking into the travel path.
- Pure coordinate-only place models remain supported for geometry and tests; discoverability gating applies when a place actually carries source evidence.
- Nearby rendering remains destination-first and does not request or depend on the visitor’s precise location.

## 2026-09-20 — Earth Light diversity + single-moment rendering
- Earth Light lanes now prefer distinct places and cap country concentration when truthful current alternatives exist, then relax only as needed to fill the lane.
- Night remains a positive city/skyline lane rather than being treated as inferior to daylight.
- Each Earth Light render now captures one clock moment and passes it through both lane selection and visible view labels, preventing boundary-time disagreement.

## 2026-09-20 — Business submission activation boundary
- The camera form now says “Prepare for review” while submission transport is not connected; it explicitly says preparation does not send or publish a camera.
- The six-check review gate is visible in the visitor-facing explanation without implying automatic acceptance.
- Business readiness now exposes FOUNDATION_INCOMPLETE, FOUNDATION_READY and ACTIVE stages; ACTIVE requires both real submission transport and real affiliate inventory.

## 2026-09-20 — Watch Earth manual recovery path
- A failed Watch Earth source remains quarantined during automatic rotation so ERN does not repeatedly reopen a broken provider.
- The session now supports an explicit retry that clears only session quarantine and permits a fresh attempt when the visitor chooses to try again.
- Runtime-health storage also has an explicit reset path for deliberate recovery; neither reset changes catalog truth, permissions or verification timestamps.

## 2026-09-20 — My Earth recent-view truth
- My Earth now snapshots currentness for recent views as well as saved favorites using the same captured moment.
- Recent windows that become undiscoverable are retained as memory state and counted as unavailable rather than silently disappearing or being shown as playable.
- The current-status note can now distinguish saved and recent views that are genuinely verified current right now.

## 2026-09-20 — Living Atlas discoverability boundary
- The Living Atlas map and its destination list now share ERN’s canonical discoverability gate before grouping, ranking or mapping evidence.
- Invalid/undiscoverable source records therefore cannot leak onto the map merely because they contain coordinates.
- Legal reference-image evidence remains eligible for destination discovery, while current-only Atlas filters remain strict.

## 2026-09-20 — Explicit reference-image search intent
- Earth intent now recognizes explicit requests for photos/images/reference views.
- ERN AI can rank legal PREVIEW evidence for that explicit intent while live/current queries remain strict and exclude PREVIEW records.
- Earth Guide can describe reference-image intent without ever upgrading it to live/current evidence.

## 2026-09-20 — Destination-first source cards + Guide evidence
- Generic source cards now use “View place” for destination navigation instead of a generic “Windows” action; window-specific surfaces still keep ERN’s Choose a Window metaphor where it is accurate.
- Earth Guide replies for ordinary destination searches now explain verified-current views, additional available-but-unconfirmed views, and reference-image fallbacks as separate evidence levels.
- This reinforces ERN’s search-engine model: ask for a place first, then see the best truthful evidence ERN currently has for it.

## 2026-09-20 — Search evidence + destination-first travel bridge
- Search Earth now distinguishes verified-current/live views from available live-like sources whose current check is not confirmed, instead of counting every non-reference source as current.
- Reference images remain separately counted and clearly labeled.
- The travel bridge now starts from “Around this place / Thinking about going?” rather than “Around this window,” so travel discovery still makes sense when a destination is represented by refreshed or reference evidence instead of live video.

## 2026-09-20 — Destination evidence wording
- Destination cards, place answers and place-health copy now say “current/live view” rather than the ambiguous “current window.”
- This keeps “window” as ERN’s friendly choice metaphor while making the factual status explicit wherever currentness is being claimed.
- Destination choice accounting now also tracks verified-current live-like choices separately from reference images.

## 2026-09-20 — Watch Earth runtime quarantine
- A window that fails to open during a Watch Earth journey is now quarantined for that session instead of being retried on every rotation.
- The session continues through remaining verified-current windows and reports its remaining available count; a fresh session can try the provider again later.
- Hero current-before-dedupe regression coverage now uses the catalog’s real 72-hour external-live verification window.

## 2026-09-20 — Watch Earth beauty audit + hero truth ordering
- Watch Earth representative-time diagnostics now expose daylight, golden-hour, night-city and unknown-light composition without imposing fake quotas when the truthful catalog cannot support them.
- Hero rotation now filters verified-current candidates before visible-window/place deduplication, preventing an older duplicate from hiding a current view of the same place.
- Truth/currentness remains the gate; beauty and diversity only rank candidates after that gate.

## 2026-09-20 — Business camera privacy + non-bypass
- Public catalog drafts now have regression protection ensuring submitter contact and business identity metadata do not leak into source records.
- Submission transport now serializes an explicit allowlist instead of arbitrary record state, reducing accidental disclosure of future internal fields.
- Paid/partner review can consume the same six-check source-review contract as ordinary business submissions; commercial status still cannot bypass truth, permission, quality, playback or currentness review.

## 2026-09-20 — My Earth UI + business review contract
- My Earth now renders saved-view currentness from one snapshot and shows a separate current-status note without hiding saved memories when media is unavailable.
- Business camera review now has one shared six-check contract used by both the operator checklist and approval gate, preventing those two truth boundaries from drifting apart.
- Business readiness now explicitly requires the manual source-review gate; commercial activation still remains separate from foundation readiness.

## 2026-09-20 — My Earth destination-first memory
- Saved places now open with “View place” rather than implying every saved destination always has a live window.
- My Earth keeps saved/recent memories even when media is unavailable, while separately classifying saved views that are verified current using ERN’s canonical currentness rules.
- This preserves personalization without allowing preference or memory to overstate source truth.

## 2026-09-20 — Search + hero interaction coherence
- Search Earth and Earth Guide now capture one moment per query, including runtime-health filtering for “somewhere different,” so a source cannot change freshness status halfway through one result set.
- Hero rotation now evaluates source selection and action availability from the same moment; initial Earth Moments rendering also shares the startup clock.
- Direct destination suggestions remain visible alongside right-now discovery without weakening reference-image truth labels.

## 2026-09-20 — Search Earth evidence clarity
- Search result status now distinguishes current/live views from reference images instead of using the generic word “windows” for mixed evidence.
- Search suggestions retain ERN’s moment discovery while adding a direct destination-search example, reinforcing the two-part product model: Watch Earth for what is beautiful now; Search Earth for where you want to go.
- Regression coverage preserves reference-only truth and keeps suggestion chips actionable.

## 2026-09-20 — ERN boot-time coherence
- Initial place grouping, destination ranking, primary promotion, Earth Moments, runtime-health filtering, Watch Earth curation and hero selection now share one captured startup moment.
- Runtime source-health accepts either Date or numeric clocks and dynamic Watch Earth evaluates its quarantine state at the same moment as source currentness.
- This removes edge cases where a source could cross a freshness boundary between initial surfaces during one page load.

## 2026-09-20 — Watch Earth truth + runtime resilience
- Representative-time audit now verifies every selected item is Watch Earth eligible at the audited moment, source IDs are unique, and PREVIEW/reference images never enter the live/current journey.
- Watch Earth session now skips a source that fails at runtime and continues to the next current candidate instead of immediately ending the journey.
- This strengthens the central promise: beautiful moments around Earth without weakening truth when a provider fails unexpectedly.

## 2026-09-20 — Place-to-travel bridge coherence
- Place views and travel offers now share one captured render moment, so expiring verification cannot produce contradictory counts and cards within the same render.
- Nearby destination UI now delegates selection and distance ordering to the canonical nearby-destination engine rather than duplicating that logic.
- Regression checks protect both boundaries while keeping travel options secondary to ERN’s Earth view.

## 2026-09-20 — Earth Guide fallback truth
- Earth Guide now explains ERN’s destination-search hierarchy in visitor language: current views when available, clearly labeled reference views when they are not.
- Generic searches disclose reference-image fallback when present; live/now searches remain strict and never use a reference image as a live substitute.
- This keeps the search-engine experience broad without weakening ERN’s live/current truth boundary.

## 2026-09-20 — Simple homepage product model
- Homepage now states the core ERN idea directly: Watch Earth for beautiful moments happening now, or search any place before you go.
- “Find Your Earth” is now “Search Earth,” with the truthful evidence hierarchy explained in one line: live/current first, clearly labeled reference image when needed.
- Explore/Atlas language is neutral where currentness is not guaranteed, keeping “live/current” reserved for surfaces that actually verify it.

## 2026-09-20 — End-to-end search fallback contract
- Generic destination search is now regression-protected to retain a legal reference-image fallback when no live/current view exists.
- Adding “live” or “now” to the same destination request must exclude that reference image rather than mislabel it as current.
- Search status explicitly counts reference images separately from live/current windows, preserving ERN’s simple rule: show the best truthful evidence available for the visitor’s actual request.

## 2026-09-20 — Destination-first fallback language
- Generated destination pages now use neutral “available views” language instead of assuming every place has a current camera.
- Any future reference-image record on a static destination page is explicitly rendered as “REFERENCE IMAGE · NOT LIVE,” with matching disclosure text.
- Empty states now speak in terms of places/views where live status is not guaranteed, while live-specific surfaces remain explicit about verification.

## 2026-09-20 — Search personalization boundary
- ERN AI destination grouping now chooses its preferred view using the same moment as the query itself.
- Explicit destination intent remains stronger than My Earth taste: personalization may gently reorder relevant choices, but cannot redirect a direct place request to an unrelated favorite.
- This preserves the core ERN model: visitor asks for a place first; personalization helps within that intent rather than replacing it.

## 2026-09-20 — Place-level fallback truth
- Place health now evaluates currentness at the active ERN moment and distinguishes photo-only destinations with “Reference image available” rather than “No current window.”
- Curated journeys now propagate that same moment through currentness and playback scoring.
- This keeps the hierarchy intact at destination level: verified live/current first, honest reference image when that is all ERN has, never a prerecorded/reference asset presented as live.

## 2026-09-20 — Watch Earth single-clock closure
- Watch Earth eligibility, health, recency, playback ranking and diagnostics now use the same explicit moment as solar beauty scoring.
- Earth Moments sequence/captions now propagate that moment as well, so an expired source cannot retain an “Earth Happening Now” identity through a separate clock path.
- Regression coverage protects the Watch Earth + Earth Moments boundary as one coherent “right now” system.

## 2026-09-20 — Earth Moments clock alignment
- Earth Moments and “Earth Happening Now” eligibility now use the same explicit currentness moment as Watch Earth, search, Hero and destination discovery.
- ERN intent ranking now passes that moment into source scoring for ordinary, current-only and themed queries.
- Regression coverage confirms stale high-quality sources cannot outrank verified-current evidence merely through a hidden wall-clock path.

## 2026-09-20 — Source-surface truth
- Discovery source cards, source badges, operational notes and network-aware source actions now share the active ERN moment instead of independently consulting wall-clock currentness.
- Reference-image fallbacks are explicitly labeled “REFERENCE · NOT LIVE” / “Reference image — not live” across source-facing metadata.
- Truth detail no longer uses the ambiguous generic “Preview” wording for a non-live fallback.

## 2026-09-20 — Living Atlas truth alignment
- Place grouping and preferred-view selection now use the same active moment as search and destination cards.
- Living Atlas ranking, current/inside filters and cluster destination ordering now share that moment, preventing stale views from appearing current on the map.
- Atlas cluster language now says “views” rather than “windows” where reference-image fallbacks may coexist with live sources.

## 2026-09-20 — Destination evidence hierarchy
- Destination cards now choose their headline evidence from the best truthful current view rather than blindly trusting a preferred/poster source.
- Choose-a-view summaries can include an honest reference image alongside live/refreshed/provider windows instead of hiding the fallback or calling it live.
- Window labels, actions and strip ranking now accept the same active moment, so expired sources stop saying “current” consistently across the destination experience.

## 2026-09-20 — Search-time coherence
- Plain destination search, current/live intent filtering, evidence tiers, destination grouping and ERN AI destination tie-breaks now propagate one explicit moment through the full result pipeline.
- A query such as “Chiang Mai live now” can no longer accept a stale match in one layer while another layer labels it current.
- Destination cards can receive the same discovery moment, keeping visible current-window counts aligned with the search that produced them.

## 2026-09-20 — Destination-time coherence
- Surprise Me now prefers verified-current views at the same explicit moment used by the rest of ERN, while retaining honest discoverable fallbacks when nothing is current.
- Choose a Window, source scoring, destination summaries and destination ranking now share moment-aware currentness end to end.
- A stale but high-quality camera can no longer outrank a verified-current destination window simply because one ranking layer silently used a different clock.

## 2026-09-20 — Verification-clock hardening
- ERN recency now accepts both numeric timestamps and Date objects, allowing Watch Earth, Hero, Live Right Now and tests to share an explicit moment safely.
- Source health/promotion policy now accepts the same moment context, closing a hidden wall-clock path that could disagree with playback and discovery eligibility.
- Hero/live inventory pass that moment through the policy layer; deterministic regression coverage protects the boundary.

## 2026-09-20 — Hero + journey moment coherence
- Hero eligibility, live inventory, hero rotation and Live Right Now fallback now use explicit moment-aware currentness rather than silently falling back to the machine clock.
- Watch Earth journey controls now surface the destination’s local light context (for example Daylight now, Night lights, sunrise/sunset windows) beside the journey counter.
- Find Your Earth preserves core exploration prompts while reserving room for current golden-light discovery and limiting recent-search crowd-out.

## 2026-09-20 — Fresh discovery balance
- Find Your Earth now reserves suggestion space for fresh exploration instead of allowing recent searches to consume the entire suggestion row.
- Current city-light and golden-light discovery remain available alongside core beach/scenic/wildlife/mountain intents.
- Live Right Now fallback selection now shares the same supplied moment clock as Watch Earth, preventing recency decisions from drifting between layers.

## 2026-09-20 — Single-moment truth + mixed-view discovery
- Watch Earth, immersive eligibility, Watch Earth sessions, Earth light lanes and light-aware search now evaluate currentness against the same supplied moment rather than accidentally mixing the requested time with the machine wall clock.
- This protects the core “beautiful somewhere on Earth right now” behavior from stale/current inconsistencies.
- Destination/search coverage now distinguishes live-like windows from reference-image fallbacks and uses neutral “views” wording for mixed catalogs.
- Search status can explicitly report reference images without calling them windows or live media.

## 2026-09-20 — Personal Earth + light-aware discovery
- My Earth now has a visitor-facing explanation of its bounded local personalization: broad taste signals can gently shape discovery while live truth/currentness remain first.
- Find Your Earth understands light-moment requests such as night city lights, daylight, sunrise, sunset and golden hour, using destination solar geometry rather than pretending every camera is in the same moment.
- A live night-city suggestion makes the “beautiful somewhere on Earth right now” idea directly discoverable.
- Static destination pages now say “See [place] before you go” and “Available views,” so future reference-photo fallbacks cannot inherit false “right now/current windows” language.

## 2026-09-20 — Search-engine fallback semantics
- ERN destination discovery can now retain an explicitly marked PREVIEW/reference image when no live or refreshed view is available.
- Preview references remain non-current and are never promoted into Watch Earth or described as live.
- Their action says “View reference image,” and verified-current live/refreshed evidence continues to rank above them.
- This establishes the intended search hierarchy: quality live window → refreshed/current image → honest reference image when necessary.


## 2026-09-20 — Living Earth ranking hardening
- Missing coordinates now remain solar-unknown instead of being accidentally interpreted as 0°,0°.
- Watch Earth relaxes country concentration before place diversity when filling its journey, keeping more distinct destinations on screen.
- Night-time promotion is focused on city/street/harbour/skyline-style contexts rather than generic culture or dark nature.
- Generated destination pages now carry ERN visual identity, social metadata and a stronger “See before you go” route back into the live app.
- CI and the previous GitHub Pages deployment were green before this batch; new regression checks cover the ranking changes.


## 2026-09-20 — Watch Earth + personal discovery integration
- Watch Earth now ranks verified-current windows by the moment happening on Earth, with daylight/golden-hour preference and strong night-city allowance after truth gates.
- The dynamic Watch Earth journey feeds the same time-aware pool into Live Right Now, while My Earth taste remains a bounded influence so discovery is preserved.
- Natural travel phrasing such as “I want to see Chiang Mai before I go” is normalized for destination search without weakening current/live intent.
- Regression coverage protects currentness, unique media/place variety, personalization boundaries, and travel-language search.

# ERN Build State

## CURRENT STATE — 2026-09-19
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
- The core English/Thai label audit now checks raw dictionary presence, so English fallback cannot mask a missing Thai translation. Visitor fallback remains intact while release auditing becomes stricter.\n- My Earth import hygiene now distinguishes retired catalog references, duplicates and local-limit truncation; visitor feedback reports the real cleanup categories instead of calling every removed item an old catalog reference.\n- Destination choice summaries now count only discoverable/actionable windows using the actual playback capability contract, so unavailable/preview records cannot inflate “inside ERN / at source” promises.\n- Destination action semantics are centralized and expose destination plus real choice mix to assistive technology while keeping concise visual labels.\n- Private continuity now has a safe opt-in resume contract: only fresh session records that still resolve to current catalog IDs may be offered, and retired references fail closed. Automatic playback/reopening remains prohibited and is not wired into production.\n- My Earth has a bounded recent-continuity model for future resume surfaces without expanding local history indefinitely.\n- Connection-aware source labels now mirror the enforced network action policy (normal Watch live vs Offline vs data-saving provider fallback) without changing source truth/currentness.\n- ERN-owned long-session clocks and network observers are registered for page-exit cleanup, reducing stale background work across repeated visits/navigation.\n- Live Right Now now balances verified-current windows across destinations and countries (one per destination, up to two per country by default), while multiple views remain available inside Choose a Window.\n- A reusable source-variety health model can detect concentration across places, countries, providers and inside/external playback without conflating diversity with truth or health.\n- The Hero now behaves as a gentle living Earth surface: it can rotate through verified-current views about every 30 seconds, while pausing for hidden tabs, reduced-motion preference, active playback and open destination/Atlas drawers.\n- Catalog maintenance now audits editorial metadata completeness separately from structural source validity, protecting quality-over-quantity as the source network expands.\n- Release state now has a concise evidence-blocker summary model; CI success remains explicitly separate from real-world publication evidence and cannot promote the app by itself.\n- Watch Earth now exposes the curated journey breadth (windows, places and countries) in the viewer, making the journey understandable without changing its one-player behavior.\n- Business-camera submission now explicitly states its current local-only boundary: preparation does not transmit or publish anything until a real reviewed submission service is connected.\n- Implemented keyboard shortcuts are now discoverable through a quiet footer help surface rather than remaining hidden power-user behavior.\n- Core English/Thai navigation labels now have an automated completeness audit; this protects the existing bilingual layer without claiming full-site translation.\n- Destination cards summarize whether their windows play inside ERN, open at the official source or are previews before visitors enter Choose a Window.\n- Runtime playback recovery is now visitor-visible: embed timeout/failure, repeated current-image failure and render failure explain that ERN switched to a safer fallback rather than silently changing mode.\n- My Earth import hygiene can reconcile portable data against the current catalog, preserving valid local history while skipping retired/unknown place and window IDs with a visitor-visible count.\n- My Earth now detects blocked/unavailable browser-local persistence and warns visitors rather than silently implying favorites or recents were durably saved.\n- A bounded 24-hour session-resume model exists for future continuity, but automatic restore remains intentionally disabled pending real-browser validation.\n- Verified travel options use explicit Sponsored / Affiliate link / External travel link disclosure that remains separate from camera/source truth.\n- Visitor source activation now reports accessible, non-blocking feedback for inside playback, provider navigation, offline unavailability and data-saving fallback.\n- Source maintenance now has a deterministic priority queue based on verification age, health risk, direct-live importance and source value; release recheck IDs follow that priority order.\n- Explore search and ERN AI now share truthful destination-level result feedback with counts, accessible status updates and strict verified-current empty states for live/now intent.\n- Connection awareness now governs visitor source activation: offline mode cannot start inside media, while constrained/data-saving embedded playback prefers a safe official provider link instead of automatically starting the heavy embed.\n- A quiet visitor-facing privacy disclosure now exposes ERN’s local-first My Earth behavior, telemetry boundaries and third-party provider boundary without interrupting the camera-first experience.\n- My Earth portability controls are fully wired end-to-end: local export, validated merge import, in-memory reload and stable visitor status messaging.\n- Replacing a destination inside the already-open Choose a Window drawer preserves one dialog lifecycle, refocuses safely after DOM replacement and retains the original opener for Escape/close.\n- Long-lived sessions now use a visibility-aware freshness clock so currentness-sensitive surfaces and viewer verification age cannot remain frozen indefinitely after source checks age out.\n- Visitor-facing verification freshness now extends into the immersive viewer, so the exact window being watched carries its latest ERN check age alongside truth/status badges.
- Verification age copy switches from hours to days after 48 hours, reducing false precision while preserving recheck/expired warnings.
- Hero remote imagery now uses an explicit eager/high-priority image lifecycle with generated fallback on load failure; discovery imagery remains lazy.
- ERN AI has guided intent suggestions that feed the existing ranking pipeline and suppress current/live suggestions when no verified-current inventory exists.
- Destination-relative Nearby on Earth cards now show approximate catalog-to-catalog distance without requesting visitor geolocation.
- Destination and exact-window share links are canonicalized and strip transient query/tracking state.
- Travel-partner offers now carry expiring verification; missing, unverified or expired commercial options fail closed and are not rendered.
- My Earth renders only currently actionable saved/recent windows while retaining unavailable memories locally rather than presenting dead playback actions.
- Slow/data-saving connection copy is conservative and no longer claims automatic heavy-media suppression before that policy is actually enforced.
- Remote discovery poster failures recover to generated ERN artwork without changing source truth, health or playback status.
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
- Watch Earth lifecycle pass: journey autoplay now uses one sequential timeout instead of interval ticks, suspends while the tab is hidden, and resumes without skipping ahead.
- Closing the immersive viewer or manually choosing Previous/Next now pauses Watch Earth first, preventing the journey timer from changing the visitor's chosen window afterward.
- Watch Earth stops cleanly when a source cannot be opened rather than racing through subsequent sources or advancing its index falsely.
- Visibility listener is now registered in the shared lifecycle registry and removed during teardown, avoiding duplicate listeners in future app remount/test scenarios.
- Added Watch Earth lifecycle regression contract and documented the calm guided-journey invariants.
- CI returned green after the destination preferred-window/syntax repair: the full dependency-free smoke suite is passing again on main. Diagnostic artifact retention remains in place for future regressions.
- CI follow-up fixed a real destination-model construction bug: preferred-window selection had been evaluated against the pre-normalized place object during object creation. The grouped place is now constructed first, then its current-first preferred window is derived from the completed source list.
- Preferred-window regression now fails diagnostically rather than through silent console assertions, protecting destination preview wiring from future model-ordering regressions.
- Destination visual wiring corrected end-to-end: grouped place models now explicitly expose their current-first preferred window, so destination cards can actually inherit the intended safe poster rather than relying on an absent property.
- Live Right Now now shares the lightweight poster system while retaining its strict-current inventory gate; visual richness cannot admit stale/non-current sources.
- Added preferred-destination regression coverage to protect current-first selection as the catalog and multi-window destinations expand.
- Visual restoration continued into destination discovery: place cards now inherit a safe preferred-window poster when legitimate imagery exists, with the same generated fallback semantics used elsewhere.
- Added actual lightweight visual geometry for source cards, destination cards and Choose a Window tiles; these remain decorative poster surfaces and never instantiate additional iframe/video/image-refresh players.
- Mobile visual sizing and destination/window card proportions were refined while preserving horizontal browsing and one-player playback.
- Visual-surface foundation advanced: Hero, source cards and Choose a Window can now share one safe poster presentation model instead of inventing separate imagery behavior.
- Legitimate HTTP(S) thumbnail imagery is used when explicitly supplied; missing/unsafe imagery falls back to restrained category-generated Earth surfaces and is marked as generated rather than masquerading as current camera media.
- Choose a Window tiles and source cards now have lightweight visual mounts without loading additional live players, preserving the one-player/performance rule; disabled source actions remain inert.
- Operations truth-plane integration completed: the private operations report now carries a deterministic catalog snapshot plus optional health-automation coverage audit alongside catalog/release gates and the revalidation queue.
- Health batches with unknown IDs or omitted catalog sources are visibly incomplete in operations output; absence of a batch remains neutral so reporting and checking can run independently.
- Added operations health-audit integration regression coverage and documentation without exposing maintenance diagnostics in the visitor UI.
- Health automation coverage hardened: checker batches now surface unknown observation IDs and unobserved catalog sources instead of silently accepting typoed/stale/partial inventories; safe health patches remain narrow and cannot mutate truth/rights/playback fields.
- Added health-observation coverage documentation and regression coverage; partial batches can produce proposals but cannot masquerade as a complete catalog check.
- Journey-continuity pass: Watch Earth now uses sequential timeout scheduling rather than an always-running interval, suspends advancement while the tab is hidden, and resumes with the same configured pace.
- Watch Earth stores its current index/source in session memory and resumes the visitor's journey position instead of always restarting at the first camera.
- Hero rotation now explicitly keeps strict-current inventory ahead of stale inventory and only then prefers legal inside-ERN playback; daylight remains presentation preference rather than a truth override.
- Surprise Me retains current-first / inside-ERN preference and now bounds injected randomness so edge values cannot create invalid selection indexes.
- Added journey continuity documentation and regression contracts for hidden-tab Watch Earth behavior, Hero currentness and Surprise boundaries.
- Runtime playback recovery is now connected end-to-end rather than only modeled: media adapter → generation-safe player session → PlaybackController → legal fallback → same immersive viewer.
- Allowed iframe playback now has bounded load/error signaling; repeated refreshed-image failures also signal the session. Stale callbacks from destroyed media generations cannot alter the current player.
- App-level player session routes a failure only when both source ID and playback mode still match, preventing a late provider event from knocking a newer source into fallback.
- Provider fallback/unavailable states were visually integrated into the immersive viewer so recovery feels continuous rather than like a separate error page.
- Explicit limitation retained: iframe load is not proof that a provider's internal live video is actually playing; real provider playback remains a release-evidence requirement.
- Provider-failure recovery pass: external fallback language is now strict-current aware and no longer says a stale/recheck-due provider window has verified current status.
- Added conservative runtime provider-failure classification and deterministic legal fallback selection; client playback failure is kept separate from catalog health/truth mutation.
- One-player controller now supports runtime fallback transitions without spawning a second player, adding duplicate history entries or forcing navigation back to Hero: EMBED → EXTERNAL → UNAVAILABLE (and equivalent image fallback).
- Viewer state exposes runtime fallback context so ERN can explain an embed/provider failure without falsely declaring the source offline.
- Added regression contracts for external wording, provider failure classification, fallback ordering and one-player runtime recovery.
- Catalog observability stage: added a snapshot model that separately reports total network size, destination count, health, strict-current inventory, all legal inside-ERN playback, strict-current inside-ERN playback, external-only inventory and truth/permission distributions.
- Inside-ERN expansion guard hardened: provider policy now has an explicit permission-escalation boundary, so public agencies, generic video platforms and unknown providers cannot become EMBED_ALLOWED merely because an iframe technically works.
- CouchTourist is recorded as a reviewed embed provider, but each individual source must still explicitly carry EMBED_ALLOWED; current public catalog contains four such inside-ERN sources.
- Added permission-led expansion documentation and regression checks for provider escalation and inside-player inventory. EarthCam-style quality remains a UX target, never a shortcut around rights.
- Source revalidation batch completed for the final three UNKNOWN public records using current official provider pages: Pattaya City Live, Glenelg Beach and Brighton Beach are now HEALTHY with 2026-09-19 checks.
- Pattaya remains strictly LINK_ONLY/EXTERNAL because current city terms permit general viewing but prohibit commercial use and republication without written authorization; ERN will not embed/restream the imagery.
- South Australia Marine Safety currently lists Glenelg and Brighton in its live coastal webcam network; ERN conservatively retains LINK_ONLY/EXTERNAL rather than inferring embed permission.
- Public catalog is now 27 HEALTHY / 0 UNKNOWN at this check date. Recency expiration and publication evidence remain independent gates; this is not a permanent health guarantee.
- Large release-control pass: catalog readiness now delegates strict currentness to the same shared currentSource gate used by visitor-facing surfaces, eliminating a separate HEALTHY+recency interpretation.
- Publication readiness no longer accepts legacy true/false claims as evidence. Browser/mobile/provider/accessibility/performance/rollback checks require dated notes and expire after 14 days, so old tests cannot certify current provider behavior.
- Operations report now exposes catalog readiness and publication readiness separately, including the evidence state that blocks release.
- Catalog health summary now distinguishes all inside-ERN-capable sources from strict-current inside-ERN inventory.
- Revalidation queue now surfaces multiple reasons and prioritizes UNKNOWN permission as an explicit rights/trust task; operations output includes permission alongside playback.
- Added release-evidence and strict-current catalog regression checks plus an auditable release-evidence contract.
- Large mature-UI fidelity pass: restored canonical Hero primary action sequence (Watch live → Watch Earth → My Earth → Explore → Next live), while retaining Surprise me as visually secondary discovery delight rather than interrupting the recovered 4:23 PM journey.
- Immersive viewer layout refined toward the recovered later prototype behavior: media remains dominant, black letterboxing handles provider aspect ratios, story/place context is secondary, controls stay reachable, and mobile remains one-player rather than spawning local duplicate players.
- Choose a Window / Live Right Now activation hardened so disabled/unavailable entries cannot invoke source actions through programmatic click handlers.
- Source badges now require strict currentness before saying REFRESHED VIEW, closing another present-tense wording edge case.
- Added visual/action hierarchy and immersive-viewer contracts plus regression coverage.
- Quality pipeline stage: added a dependency-free Node smoke-test runner plus GitHub Actions CI on main pushes and pull requests, converting the accumulated smoke files from documentation-only artifacts into an executable regression suite.
- CI remains distinct from release readiness: browser/mobile/provider-playback/accessibility/performance/rollback evidence still requires real-world validation and cannot be auto-certified by smoke tests.
- Health automation foundation advanced to a report-only proposal pipeline. HTTP reachability alone cannot promote HEALTHY; provider/current-media confirmation is required, and the reporter never mutates truth, permission, rights basis or playback mode.
- Added regression coverage for health proposals and explicit CI/health-pipeline operating contracts.
- Catalog identity follow-up: public source/place IDs are now validated as normalized lowercase stable identifiers because they are durable keys for favorites, recents, share hashes, deep links and player history.
- Duplicate source IDs are now protected case-insensitively in the catalog guard, closing a subtle collision path that URL deduplication alone cannot cover.
- Added stable-identifier documentation and regression coverage; display titles remain multilingual and independent from machine IDs.
- Large curation-consistency pass: Choose a Window now ranks strict-current sources before inside-ERN playback and shared source score, preventing high-quality stale windows from occupying the first choice.
- Hero primary action copy now delegates to unified playback capability instead of maintaining separate live/current wording logic.
- Earth Happening Now now delegates currentness to the shared currentSource gate; editorial moment ranking prefers current eligible sources before moment/quality scoring.
- General curation now centralizes discoverable/current eligibility instead of duplicating partial health/recency checks, reducing semantic drift across Hero, Watch Earth, Moments and discovery surfaces.
- Added curation-invariant documentation and regression smoke checks for window ordering and Happening Now currentness.
- Large truth-language pass: sourceStatus and trust copy now require strict currentness before present-tense LIVE/CURRENT claims; HEALTHY-but-stale records receive RECHECK DUE instead of a live badge.
- Destination cards distinguish actionable/available sources from genuinely current windows, so broad Atlas availability cannot masquerade as current conditions.
- Viewer accessibility announcements now state whether current verification is confirmed; stale external sources announce neutral provider opening rather than current/live language.
- Media attribution no longer says Live view unconditionally: provider credit is independent from currentness and uses Current source only through the strict gate.
- External-navigation browser boundary hardened while preserving safe HTTP(S), noopener/noreferrer and cleanup behavior.
- Added a shared truth-language matrix and regression checks covering stale trust/status, destination semantics and attribution currentness.
- Large discovery-surface pass: Living Atlas default ordering now prefers strict-current sources, then legal inside-ERN playback, then shared source quality, while retaining its broader actionable-network role.
- Ordinary Explore search now interprets live/current/now/today as truth filters; current-intent searches cannot return stale matches merely because destination text matches.
- Atlas renderer hardened for missing mounts/empty clusters and explicit button semantics; Atlas remains actionable without becoming a second Watch Earth.
- Interaction stability pass: viewer keyboard navigation stays viewer-scoped, Escape no longer fires viewer close while no viewer is open, shortcut listener is removable/browser-safe, and surface management remains scroll-free.
- Added discovery-surface and interaction-stability contracts plus regression smoke checks for current-intent search and Atlas ordering.
- Large playback/lifecycle pass: playback capability and external-player copy now use currentness-aware language; stale/rechecking sources cannot inherit present-tense live wording from historical truth type.
- Watch Earth now rechecks strict current-source eligibility again at the session boundary, protecting the automatic journey even if an upstream selector regresses.
- Viewer open/close lifecycle is idempotent while teardown remains centralized through player-session/media-lifecycle, reinforcing one-player architecture and avoiding duplicate media after repeated interactions.
- My Earth now explicitly separates visitor memory from source truth: saved windows remain visible when a provider later becomes unavailable, but their actions/status immediately reflect current capability instead of preserving an outdated live claim.
- Favorite source controls now expose aria-pressed state; recent/favorite local IDs remain safely resolved against the current catalog.
- Large mature-experience pass: restored the canonical Hero hierarchy so the Earth destination/location is the dominant headline and “Welcome to Earth — see what is happening now.” is the supporting editorial line; the discarded generic Fresh slogan-led Hero is no longer the visual structure.
- Unified destination currentness with the strict source gate: HEALTHY alone no longer makes a place “current”; known permission, CURRENT_CHECK and actionable playback are required.
- Destination ranking now prefers genuinely current places before broad quality scoring, while Living Atlas can still retain broader actionable destinations.
- Unified visitor action/eyebrow wording with currentness: stale/rechecking sources cannot say LIVE WINDOW, CURRENT AT SOURCE, Watch live or Open current source solely from historical truth type.
- Added destination-currentness and visitor-wording regression coverage plus refreshed the canonical Hero visual-fidelity contract.
- Added a private operations-report layer combining catalog health, release blockers and a deterministic revalidation queue without exposing maintenance diagnostics in the visitor UI.
- Revalidation scheduling now carries explicit UNKNOWN / DEGRADED / RECHECK_DUE reasons and prioritizes deep-validation/embed/inside-ERN candidates without granting promotion.
- Strengthened production readiness toward auditable dated evidence for browser, mobile, provider playback, accessibility, performance and rollback checks; catalog readiness remains separate from publication readiness.
- Completed catalog identity hardening after the interrupted helper pass: recovery now deduplicates normalized public/recovery IDs plus source/official/embed URLs and records explicit duplicate reasons.
- Public catalog guard rejects duplicate canonical sourceUrl records, preventing one camera from masquerading as multiple independent windows and distorting counts/ranking/favorites/journey diversity.
- Added/updated catalog identity regression smoke checks and documentation; uniqueness remains independent from truth, health and permission verification.
- Hardened destination preferred-window selection: stale/unavailable sources can no longer win merely from high quality/moment metadata; strict currentness and actionable playback now precede source score.
- Preferred place windows now favor current verified sources, then inside-ERN PLAY capability, then shared source scoring.
- Hardened Living Atlas discovery so OFFLINE/UNAVAILABLE records are not exposed as actionable results; the Atlas Live/current filter also requires known permission.
- Closed a Watch Earth currentness gap: the app-level diverse curation path now requires CURRENT_CHECK, so a HEALTHY-but-stale source cannot enter the curated journey before the strict fallback is considered.
- Country diversity and quality/moment scoring now operate only after Watch Earth truth/currentness eligibility; diversity can never override source verification.
- Hardened Live Right Now inventory to require actionable playback in addition to live truth, HEALTHY status, known permission and CURRENT_CHECK.
- Hardened ERN AI relevance: quality/source score can no longer make an unrelated camera appear for an unmatched query; unmatched intent returns no result instead of plausible-looking noise.
- Current/live wording still gates through strict current-source eligibility before semantic ranking, so ERN AI cannot upgrade stale/unknown source truth.
- Added alias-aware normalized matching and intent-token scoring while preserving empty-query discovery behavior.
- Fixed the same relevance leak in ordinary Earth search: a positive base source score no longer causes every discoverable source to match arbitrary text.
- Hardened the future business-camera submission boundary: intake remains PENDING_REVIEW and can never auto-publish or auto-upgrade a source.
- Submission URLs are restricted to public HTTP(S) syntax with credentials/localhost/loopback rejected; text fields are normalized and bounded; optional contact is validated.
- The submitter rights checkbox is explicitly treated as an assertion, not ERN verification. Truth, health, permission, playback, attribution and provenance still require independent review.
- Documented that any future server-side fetcher must repeat validation and add SSRF/private-network protections; browser validation is not a server security boundary.
- Hardened durable destination routing: malformed, empty, overlong, compound, or unknown `#place=` hashes fail closed and cannot open arbitrary state.
- Hardened sharing: missing IDs/browser APIs fail safely; native-share cancellation stays quiet; clipboard fallback is conditional; share copy does not imply every place is currently live.
- Routing/share helpers now tolerate non-browser test contexts without depending on global `location`/`navigator` at module evaluation.
- Added conservative source-health transition logic for future automated checks: HTTP success alone cannot mark a source HEALTHY; current media must also be confirmed.
- Failed/inconclusive checks preserve the last known successful-media timestamp instead of falsely refreshing source recency.
- Definitive provider/media failure can mark OFFLINE; ambiguous media verification becomes DEGRADED/UNKNOWN.
- Health automation is explicitly forbidden from changing source truth or permission rights.
- Added a separate production release-readiness model so a green catalog can never be mistaken for permission to publish.
- Production readiness now requires explicit evidence for desktop browser, mobile, real provider playback/iframe behavior, accessibility, performance, and rollback readiness in addition to the machine catalog gate.
- Integration checks default to false and cannot become green through static inspection alone.
- Revalidated four recovered UNKNOWN sources against current official pages on 2026-09-19: Auckland Viaduct Harbour, Kīlauea Summit, Nossob/Kgalagadi, and Kaikōura Coast.
- Promoted current health without promoting unproven rights: all remain EXTERNAL/LINK_ONLY unless current embed/display permission is documented.
- Corrected Kaikōura truth to LIVE_IMAGE because its official operator describes static images updating every five minutes.
- Historical Auckland iframe permission remains untrusted until explicitly revalidated.
- Continued mature-Hero visual fidelity: centralized safe poster selection/style, rejected unsafe thumbnail schemes before CSS use, preserved generated category fallbacks, and explicitly prevented imagery from affecting source truth/eligibility.
- Strengthened the camera-first Hero hierarchy and keyboard focus visibility without reintroducing the discarded generic Fresh stacked-page redesign.
- Documented the canonical target as the mature 4:23 PM experience + later immersive viewer behavior + Fresh truth architecture underneath; prototype/browser screenshots are forbidden as production imagery.
- Static integration audit remains zero missing mounts and zero forced scroll calls.
- Hardened the catalog/cache boundary: runtime source-registry fetches now use the centralized `catalogRequestPolicy()` with `cache: no-store` and same-origin credentials instead of duplicating fetch policy.
- Explicitly deferred service-worker installation: ERN source truth must not be hidden behind a stale application cache; any future service worker must keep `/data/sources.json` network-first/no-store and third-party media provider-controlled.
- Added an injectable fetch reference to catalog loading for deterministic policy tests without changing production behavior.
- Offline/browser connectivity remains separate from provider health; cached data may never silently upgrade source truth.
- Static integration audit remains zero missing mounts and zero forced scroll calls.
- Hardened immersive-viewer accessibility without changing the mature visual baseline: viewer is now a modal dialog, focusable for empty-control fallback, and exposes source/state context to assistive technology.
- Previous/Next synchronize native disabled state with `aria-disabled`; favorite synchronizes accessible name and `aria-pressed`; Full screen and Share have explicit accessible names.
- Existing keyboard model verified: Escape uses the canonical Close path, Arrow Left/Right are viewer-scoped, shortcuts do not hijack editable fields, and reduced-motion CSS already disables transitions/animations.
- Static integration audit remains zero missing mounts and zero forced scroll calls.
- Added player-session generations: every source handoff invalidates the previous generation before the new adapter mounts, preventing late callbacks from an old source from affecting the current viewer.
- Refreshed-image playback is generation-aware as well as visibility-aware; superseded refresh callbacks become no-ops and cleanup remains centralized.
- Hardened canonical playback capability so EXTERNAL/LINK_ONLY and IMAGE_REFRESH are actionable only with safe HTTP(S) URLs; EMBED remains restricted to reviewed allowlisted providers.
- Cards, Hero, Atlas eligibility and playback therefore share the same safe action boundary rather than discovering URL failure only after a click.
- Static integration audit remains zero missing mounts and zero forced scroll calls.
- Hardened the runtime catalog guard before further source recovery: source/official/embed/thumbnail URLs must be absolute HTTP(S), embeds must be HTTPS, timestamps parse correctly, timezones validate, and categories/aliases are string arrays.
- Aligned the JSON source schema with stronger date-time, non-empty identity and unique string-array constraints.
- Malformed recovered/submitted source data now fails closed before it can reach playback, Atlas local-time logic or discovery ranking.
- Static integration audit remains zero missing mounts and zero forced scroll calls.
- Hardened refreshed-image playback lifecycle: background tabs no longer keep fetching frames, returning visible requests one fresh frame, refresh cadence has a safety floor, and cleanup removes both timer and visibility listener.
- Kept local image-load behavior separate from catalog health: a client playback problem does not silently mark a provider globally offline.
- Language preference setter now safely tolerates non-document/test contexts without changing browser behavior.
- Network-resilience utility was inspected and is already environment-injected/testable; no noisy offline banner was added to the canonical mature visual baseline.
- Static integration audit remains zero missing mounts and zero forced scroll calls.
- Hardened client network-state handling for non-window/test contexts and clean listener teardown; browser offline status remains a client-connectivity signal and never mutates source health/truth.
- Corrected offline copy so ERN no longer promises saved Earth content without an actual service-worker/offline cache implementation.
- Clarified cache boundary: source catalog is no-store/network truth, third-party media remains provider-controlled, and no service worker is introduced casually.
- Added non-empty accessibility fallbacks for embedded-frame titles and refreshed-image alt text.
- Removed the dead storage-helper import from language handling.
- Static integration audit remains zero missing mounts and zero forced scroll calls.
- Replaced raw recent-window localStorage access in the playback callback with safe, versioned recent-window storage; legacy valid history migrates opportunistically.
- Storage-denied/privacy modes and malformed legacy recent history can no longer crash playback when a viewer opens.
- Keyboard shortcuts now respect Cmd/Ctrl/Alt browser/OS combinations and already-prevented events; `/` focuses Earth search with preventScroll.
- Left/Right remain viewer-scoped and editable controls remain protected from navigation shortcuts.
- Static integration audit remains zero missing mounts and zero forced scroll calls.
- Refined source verification recency by source class: inside-ERN embeds and live images 24h, external live/partner sources 72h, broader external pages 168h.
- Explicitly separated `recently verified source` from `media frame proven live`; ERN does not claim cross-origin frame-level liveness it cannot observe.
- PRIMARY catalog promotion now requires CURRENT_CHECK in addition to HEALTHY, known permission and quality; stale high-quality sources remain broader-Atlas material until reverified.
- Recency evaluation accepts an explicit audit time for deterministic tests and tooling.
- Static integration audit remains zero missing mounts and zero forced scroll calls.
- Repaired Daylight discovery: the Atlas no longer relies on an unreliable private `_daylight` field; it computes a source-local approximate daylight state from its IANA timezone at filter time.
- Hero daylight preference and Atlas Daylight-only filtering now share one model; invalid/missing timezones are `Daylight unknown` rather than silently included.
- Daylight wording is explicitly approximate (`Likely daylight` / `Likely night`) because local clock alone is not sunrise/sunset and does not account for latitude, season, terrain or weather.
- Local-time parsing now uses `Intl.DateTimeFormat.formatToParts` with h23 hour cycle rather than splitting locale-formatted strings, avoiding locale/midnight parsing errors.
- Static integration audit remains zero missing mounts and zero forced scroll calls.
- Centralized immersive-viewer teardown into one lifecycle used by both the Close button and programmatic player closes: journey pause, adapter/session cleanup, media destruction, hide, viewer-state reset and focus restoration now happen together.
- Removed the old split cleanup path where programmatic `player.close()` could leave viewer DOM/media state behind.
- Preserved the original viewer opener across Previous/Next, Watch Earth and other in-viewer player handoffs; viewer controls cannot overwrite the return-focus target.
- Viewer lifecycle has a close re-entry guard and retains preventScroll focus restoration.
- Static integration audit remains zero missing mounts and zero forced scroll calls.
- Closed the Hero fallback regression: app startup now selects only from the strict Hero-eligible pool and never falls through to PRIMARY/raw catalog sources just to fill the Hero.
- Added an honest Hero rechecking state for an empty verified-current pool; Watch live / Next live disable while Explore and My Earth remain usable.
- Hero live controls now inherit canonical Hero eligibility, so a HEALTHY-but-stale source cannot enable Hero playback controls.
- Next Hero is a no-op when the verified-current pool is empty rather than cycling into broader catalog data.
- Static integration audit remains zero missing mounts and zero forced scroll calls.
- Integrated durable destination deep links with browser Back/Forward: opening a place pushes `#place=<id>`, closing returns to the clean URL, and popstate silently reconciles the drawer without creating history loops.
- Initial malformed/unknown place hashes fail closed through the existing safe route model; Back/Forward navigation does not record fake recent-place visits.
- Hardened immersive-viewer focus trapping for hidden/disabled controls and unexpected focus positions; focus remains non-scrolling.
- Reduced-motion detection now degrades safely on browsers without `matchMedia`.
- Static integration audit remains zero missing mounts and zero forced scroll calls.
- Unified fallback-chain policy with canonical playback capability, embed-host allowlisting and safe HTTP navigation; fallback can no longer reintroduce an OFFLINE source, unapproved embed host or unsafe URL.
- Preserved the honest fallback terminal state: UNAVAILABLE; no false claim of automatic cross-origin iframe failure detection.
- Hardened media teardown: video/audio nested source URLs are cleared, iframes blanked, images detached, then the shared mount is emptied before handoff.
- Hardened Ambience preference against storage-denied/privacy browser modes without introducing autoplay/audio behavior.
- Static integration audit remains zero missing mounts and zero forced scroll calls.
- Hardened My Earth/local state against malformed JSON, storage-denied privacy modes and invalid ID collections through shared safe-storage helpers.
- Favorites, favorite places and recents now normalize/bound persisted IDs and fail gracefully instead of allowing localStorage exceptions to break the app.
- Session state uses the same safe storage boundary; language preference also degrades to English safely when localStorage is unavailable.
- Repaired place sharing semantics: a durable place link no longer promises `current Earth windows` forever; currentness is evaluated when the recipient opens ERN.
- Static integration audit remains zero missing mounts and zero forced scroll calls.
- Tightened Watch Earth into a genuinely current journey: HEALTHY + permission-known + CURRENT_CHECK + actionable live/current truth are now required, with no stale/UNKNOWN fallback masquerading as Earth-now content.
- Curation now supports explicit currentness and canonical playback eligibility, with a modest legal inside-ERN playback preference.
- Repaired editorial semantics: `Earth Happening Now` now has a currentness gate, while Beautiful / Interesting / Useful Earth remain broader editorial families with truthful badges.
- Moment captions cannot inherit `HAPPENING NOW` from a stale historical category tag.
- Static integration audit remains zero missing mounts and zero forced scroll calls.
- Unified Search, Surprise Me and ERN AI-style discovery around canonical source eligibility instead of letting each surface interpret catalog rows independently.
- Search now excludes OFFLINE/unactionable sources and ranks empty/general results by ERN source score rather than raw catalog order.
- `currentSource` now requires HEALTHY + known permission + CURRENT_CHECK; Surprise Me prefers that current pool and legal inside-ERN playback when available.
- ERN AI natural-language requests containing live/current/now/today are truth-gated to current verified sources; semantic matching cannot upgrade an UNKNOWN/stale source into a live answer.
- Static integration audit remains zero missing mounts and zero forced scroll calls.
- Repaired immersive viewer Previous/Next state: buttons now reflect the real playback-history cursor instead of both appearing available whenever history had more than one item.
- Removed viewer Next's unrelated fallback into the global ranked catalog; reaching the end of history now means end of history rather than silently jumping to a different browsing model.
- Scoped left/right keyboard shortcuts to the immersive viewer only; normal page browsing no longer has arrow keys globally hijacked by the player.
- Editable fields are protected from ERN shortcuts; outside the viewer, R and / retain Surprise/Search behavior.
- Static integration audit remains zero missing mounts and zero forced scroll calls.
- Repaired destination window counts so places advertise actionable windows, not raw historical camera rows; one working + one offline camera no longer becomes a false `2 windows · choose your view` claim.
- Destination actions now become Open window / Choose a window / Unavailable according to actual actionable choices, and inside-ERN playback gets a modest destination-ranking preference.
- Hardened Choose a Window controller so unavailable rows cannot remain selectable or become its default selection.
- Hardened durable place deep links: malformed encoding fails closed and unknown place IDs cannot invent destinations; share identity remains placeId rather than camera ID.
- Static integration audit remains zero missing mounts and zero forced scroll calls.
- Repaired a real Living Atlas contract bug: clusterSources returned `items` while the renderer consumed `cluster.sources`, which could silently erase valid clusters/pins. Model and renderer now share `{id,sources,lat,lon,count}`.
- Atlas now explicitly separates mapped and unmapped sources; missing coordinates do not create fake pins and do not remove sources from searchable results.
- Tightened Atlas `Live/current capable` so it requires HEALTHY + CURRENT_CHECK + actionable playback, not merely a live-looking truth enum.
- Expanded the Atlas map from a small schematic strip into a substantial responsive discovery surface while keeping it lightweight/static.
- Static integration audit remains zero missing mounts and zero forced scroll calls.
- Recovered mature-ERN tranche 04 into quarantine: Coogee & Randwick Beaches, Chidori-ga-fuchi Sakura, Diano Marina, and Sottomarina–Chioggia.
- This tranche deliberately broadens recovery toward coast/water and seasonal travel decisions instead of continuing to overfill mountain webcams.
- Historical GREEN/link/verified labels were treated as evidence only: all tranche-04 records remain UNKNOWN until current revalidation and none leaked into the public catalog.
- Added recovery-priority scoring that favors explicit legal inside-ERN playback, underrepresented high-value categories, and geographic breadth.
- Public catalog remains 27 while quarantine expands safely; static app integration remains zero missing mounts.
- Hardened historical catalog recovery: missing URLs now remain quarantined/null instead of becoming fake about:blank sources.
- Added canonical recovery-to-public promotion that strips recovery-only fields and normalizes recovered IDs before public catalog insertion.
- Unified catalog release recency with the same source-recency policy used by visitor-facing live inventory.
- Aligned JSON schema with runtime validation: nullable coordinates, coordinate ranges, HTTP(S) URL patterns, HTTPS embed requirement, and core permission/truth/playback invariants.
- Static current-catalog audit after schema alignment: zero duplicate, URL, embed, link-only, image-truth or coordinate issues; app integration remains zero missing mounts.
- Unified PlaybackController with the canonical playback-capability policy, eliminating a parallel mode resolver that could have bypassed the new embed-provider allowlist.
- Unified current-window language: Live Right Now cards and Choose a Window now label each source by actual delivery (LIVE WINDOW, CURRENT IMAGE, CURRENT AT SOURCE, PARTNER LIVE) rather than stamping every source generically live.
- Hardened Watch Earth session construction so unavailable sources are excluded under the same canonical capability policy used by Hero, Atlas, cards and player history.
- Added explicit Watch Earth destroy lifecycle for timer/source cleanup and future catalog reload safety.
- Static integration audit remains zero missing mounts, zero forced scroll calls, and no generic per-card LIVE RIGHT NOW stamp.
- Tightened Hero truth: the primary Earth Right Now window must now be HEALTHY, CURRENT_CHECK, genuinely current/live, permitted and actionable; UNKNOWN/stale sources can no longer become the Hero.
- Hero candidate ordering now prefers inside-ERN playable windows before external handoffs, while retaining daylight-aware rotation.
- Added safe legitimate Hero poster support from catalog thumbnailUrl only; browser screenshots/fabricated live imagery remain prohibited and generated category atmosphere remains the fallback.
- Hero Watch action now follows playback capability: Watch live, View current image, or Open current source.
- Static Hero/navigation integration audit remains zero missing mounts and zero forced scroll calls.
- Repaired My Earth routing: Hero My Earth now opens the durable My Earth surface (favorite places, favorite windows, recently visited places) instead of the redundant legacy source-history surface.
- Retired the legacy history surface from surface-manager, markup and focused-surface CSS.
- Removed old navigation scroll-position save/restore utilities, closing another path for the original forced-Hero-scroll regression to return.
- My Earth is focusable and focused-surface CSS now shows it correctly instead of globally hiding it whenever any surface is active.
- Static navigation audit: zero missing app mounts, no history surface/CSS route, and no forced scroll calls in app/navigation state.
- Hardened inside-ERN playback with an explicit HTTPS embed-provider allowlist; arbitrary catalog iframe URLs can no longer become player embeds without a provider-policy code change.
- Added provider-specific iframe sandboxing for CouchTourist and YouTube-family embeds.
- Added player-session cleanup lifecycle and wired it into the shared immersive viewer so refreshed-image timers and future adapter cleanup cannot accumulate across source handoffs.
- Viewer Source link now passes through ERN URL safety and receives noopener/noreferrer external attributes instead of trusting raw catalog URLs.
- Static embed-policy/catalog audit reports no duplicate/permission/HTTPS/host issues across current EMBED records; app integration remains zero missing mounts.
- Returned recovery focus to the catalog's biggest structural weakness: high-quality inside-ERN playback rather than adding more external-only destinations.
- Revalidated and promoted Lajes do Pico Harbour and Roque de los Muchachos Observatory as HEALTHY EMBED_ALLOWED CouchTourist windows, using current provider embed/attribution controls and recovered mature-ERN embed routes.
- Public catalog grows to 27 sources and inside-ERN EMBED windows from 2 to 4.
- Embedded/current-image playback now carries quiet persistent provider attribution linking back to the source; ERN never presents third-party media as anonymous ERN-owned imagery.
- Static post-promotion audit reports no duplicate/embed/link invariant issues; app integration remains zero missing mounts.
- Completed tranche-02 batch B: Georgia Aquarium, Whistler Blackcomb and Florida Now promoted after current official-source verification.
- Farm Tomita, Waikiki/Hilton and Boston Harbor Islands remain quarantined because current evidence was not strong enough; ambiguous recovery records are not converted into live claims.
- Public catalog now contains 25 sources, 18 HEALTHY and 7 UNKNOWN; static invariant audit reports no duplicate/source/playback issues.
- Added catalog coverage/balance analysis so recovery can optimize country/category/truth/playback diversity instead of raw camera count.
- Coverage model explicitly flags the current need for more inside-ERN playable sources, reinforcing the next recovery priority: high-quality EMBED_ALLOWED/PARTNER cameras and underrepresented categories.
- App integration audit remains zero missing mounts.
- Tranche-02 current verification promoted seven official destinations: Grand Canyon, Yellowstone, Mount Rainier, Glacier, San Diego Zoo, Zermatt–Matterhorn and Chamonix–Mont-Blanc.
- National-park refreshed cameras are represented as LIVE_IMAGE where appropriate rather than being mislabeled continuous live video; Yellowstone retains EXTERNAL_LIVE because its official page includes the Old Faithful livestream.
- San Diego Zoo promotion explicitly excludes its pre-recorded Red Panda item from live semantics.
- Added truth-detail semantics and a REFRESHED VIEW badge so visitors can distinguish continuous video, current images and official-provider live pages.
- Public catalog now contains 22 sources; static post-promotion audit reports no duplicate/source/playback invariant issues.
- App integration audit remains zero missing mounts.
- Completed tranche-03 revalidation for Kitzbühel/KitzSki and Ski Arlberg using current official livecam surfaces; both promoted as HEALTHY LINK_ONLY external destinations with no inferred embed permission.
- Public catalog now contains 15 sources; post-promotion static invariant audit reports no duplicate/source/playback issues.
- Added catalog health summary and a structural catalog release-gate foundation so future deployment/recovery can measure usable/current coverage instead of catalog size alone.
- App integration audit remains zero missing mounts.
- Recovery tranche 03 restored St. Moritz, Verbier, Jungfrau Region, Dolomiti Superski, Queenstown Airport & Alps, Kitzbühel and Ski Arlberg from mature ERN lineage.
- Recovery normalization now preserves historical LINK_ONLY restrictions while still resetting health and historical embed permission; conservative rights knowledge is no longer discarded.
- Current official-source revalidation promoted St. Moritz, Verbier, Dolomiti Superski and Queenstown Airport & Alps as HEALTHY external official views; public catalog grows from 9 to 13 sources.
- Jungfrau official webcam page was current but reported its listed camera connections offline during verification, so it remains quarantined as DEGRADED rather than being promoted.
- Kitzbühel and Ski Arlberg remain UNKNOWN pending successful current verification; no status was invented.
- Static public-catalog invariant audit after promotion reports no duplicate/source/playback issues; app integration remains zero missing mounts.
- Unified general discovery eligibility across window ranking, journey selection, nearby discovery and ERN AI; OFFLINE/unactionable records are no longer recommended by one surface while disabled by another.
- Catalog guard now rejects duplicate source IDs instead of allowing silent Map overwrite as recovery scale grows.
- Added stricter truth/playback invariants for EXTERNAL_LIVE and PREVIEW plus finite coordinate validation.
- General source ranking now incorporates health, playback capability and check recency alongside quality/freshness/moment, preventing unchecked historical records from outranking equally strong current sources.
- Strict Live Right Now remains independently narrower than general discovery.
- App integration audit remains zero missing mounts and zero forced-scroll calls.
- Catalog guard is now in the actual registry loading path; malformed records are quarantined before runtime discovery/playback rather than merely audited afterward.
- Source validation strengthened for URL schemes, embed permission, LINK_ONLY/EXTERNAL consistency, IMAGE_REFRESH truth, coordinates and scoring ranges.
- URL validation made deterministic in both browser and non-browser test environments.
- Catalog guard is wired and ready; final runtime validation is performed by the browser loader. Integration audit remains zero missing app mounts.
- External-live navigation hardened through one temporary-anchor helper with HTTP/HTTPS validation and noopener/noreferrer behavior.
- Playback adapters now validate embed/image/provider URLs and no longer use innerHTML for status panels.
- Invalid media URLs fall to truthful unavailable behavior instead of creating broken media mounts.
- Focused Explore/Atlas/History/Moments/Submit surfaces now hide home-only layers rather than producing a giant stacked page.
- Atlas single pins now share centered coordinate positioning with clusters; mobile verified-live cards gain horizontal snap browsing.
- Integration audit remains zero missing app mounts and zero forced-scroll calls.
- Watch Earth journey repaired to use the canonical capability-aware source action, so EXTERNAL sources no longer get forced into ERN immersive playback.
- Watch Earth session state API corrected; Pause/Continue now reads state().playing instead of a nonexistent property.
- Viewer Previous/Next now follows the curated Watch Earth sequence while the journey owns the viewer.
- Removed remaining forced scroll-to-top navigation; focused surfaces receive focus without throwing visitors back to Hero/top.
- Added no-forced-scroll and Watch Earth state regression checks; app-to-markup audit remains at zero missing mounts.
- Repository-wide integration inspection found and repaired missing DOM mounts that had made newer modules appear complete while remaining disconnected.
- Restored Hero trust line, strict Live Right Now mount/empty state, My Earth favorite/recent place mounts, Atlas controls, destination favorite control, Earth/home return control and Watch Earth journey bar.
- Opening a destination now records the place in durable recent-place memory so My Earth Recent Places actually works.
- Hero now applies truthful trust copy, capability-aware action labels/disabled state and non-fake generated poster class.
- Atlas coordinate rendering corrected to a direct 100×100 percentage projection and invalid-coordinate sources are skipped safely.
- Static app-to-markup audit now reports zero missing #id mounts used by app.js.
- Live Right Now is now a separate strict visitor surface backed only by liveInventory policy; UNKNOWN recovery sources can no longer populate it.
- Honest Live Right Now empty state routes visitors to the broader Living Atlas rather than fabricating a populated live row.
- Verified-current Live Right Now cards use safe DOM rendering and the canonical capability-aware action path.
- Hero source policy now prefers verified current sources whenever available, while retaining truthful SOURCE CHECK fallback behavior when necessary.
- Live Right Now and Hero eligibility regression smoke checks added.
- Recovered a second catalog tranche from ERN v0.10: 13 official destination/current-view candidates across parks, wildlife, farms, mountains and beaches.
- Historical 2026-09-13 verification is retained only as provenance; tranche 02 is reset to UNKNOWN and remains outside the public catalog until current revalidation.
- Recovery deduplication now normalizes source/official URLs before candidate acceptance, preventing duplicate legacy rows from contaminating the clean catalog.
- Recovery prioritization/reporting added: historical embed candidates are checked first, then official link-only destinations in batches.
- Large-catalog restoration now explicitly follows recover-fast / promote-slow operations.
- Began real legacy catalog recovery from mature ERN v16.05 instead of inventing replacement camera records.
- Recovery tranche 01 preserves six historical live/embed candidates in a quarantine dataset with historical embed evidence separated from current truth.
- Current web revalidation confirmed explicit CouchTourist embed availability for Mpala Watering Hole and Kijihiki Plateau; both were promoted to the public registry as HEALTHY / EMBED_ALLOWED / EMBED.
- Current Webcam La Palma evidence confirms active HD live streams but does not justify automatic embed permission for the recovered path, so Tajogaite remains held/external pending exact permission validation.
- Mount Vesuvius, Lajes do Pico Harbour and Roque Observatory remain held for revalidation.
- Recovery promotion gate and regression smoke check added.
- Source cards and destination cards migrated from catalog HTML interpolation to text-safe DOM construction.
- Choose a Window tiles and My Earth place cards also migrated to text-safe DOM construction.
- Safe-rendering regression checks include markup-shaped catalog strings to ensure they remain text, not executable elements.
- Catalog guard added to separate malformed records from valid OFFLINE/UNKNOWN operational states before future large-catalog migration.
- Moments and Surprise Me now use the same capability-aware source action as Hero, Windows, cards and Atlas.
- Keyboard shortcuts now invoke canonical viewer controls, preventing hidden player state when Escape closes playback.
- Surprise Me can choose legitimate external current sources without incorrectly sending them into ERN iframe playback.
- Safe DOM construction utility and catalog-content rendering policy added; legacy interpolated card templates are explicitly tracked for migration before release.
- Action-consistency regression smoke check added.
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


### 2026-09-19 — CI truth restoration and release operations
- Restored a genuinely executable GitHub Actions smoke pipeline after escaped newline text had been embedded into the shell command.
- GitHub job logs are now directly inspectable and smoke diagnostics are retained as an artifact and run-summary tail.
- Fixed the discovery/playback currentness recursion so source discoverability is evaluated from primitive policy/URL viability rather than recursively re-entering playback capability.
- Release inventory now correctly classifies current external sources using the EXTERNAL playback action.
- Browser-dependent dependency-free smoke tests now use explicit local test browser primitives instead of assuming Node provides document/localStorage.
- Legacy Hero, playback and Watch Earth fixtures were aligned with current source-recency and provider-allowlist policy rather than weakening production rules.
- Full dependency-free smoke suite returned GREEN on main at commit 4cd86dd0cc6d75330551f7e06d6b6a5cd34acb64.
- Added a report-only release status command. It deliberately leaves publication BLOCKED when real browser/mobile/provider/accessibility/performance/rollback evidence is absent; CI success alone cannot certify publication.

Current release posture:
- Engineering smoke baseline: GREEN.
- Publication: still gated by fresh real-world evidence and current source verification.
- No release gate has been bypassed or weakened.


### 2026-09-19 — Catalog fully current
- All 27 catalog records are now current under ERN's recency policy.
- Current inside-ERN playback inventory increased from 2 to 4 after the two CouchTourist embed records were refreshed.
- Source recheck queue is now 0.
- Catalog release gate: READY (27 valid, 0 rejected, no catalog blockers).
- Engineering CI remains GREEN.
- Publication remains deliberately BLOCKED only by the six real-world evidence dimensions: browser, mobile, provider playback, accessibility, performance, and rollback.


### 2026-09-19 — Accessibility drawer lifecycle hardening
- Destination and Living Atlas cluster drawers now expose dialog semantics with labelled modal regions.
- Added reusable focus containment, Escape-to-close behavior and opener focus restoration for non-viewer drawers.
- The immersive viewer retains its existing dedicated lifecycle; destination/Atlas drawers now follow the same accessibility direction without merging playback state into discovery state.
- Engineering CI remains GREEN.
- This is accessibility preflight only; the real-world accessibility evidence gate remains pending until keyboard/focus behavior is verified in a deployed browser.


### 2026-09-19 — Visitor-controlled private continuity
- Wired the existing bounded session-resume model into My Earth as an explicit visitor-controlled offer.
- Resume state is recorded only after visitor-activated playable/external windows or an intentionally opened place.
- Resume offers are freshness-checked and reconciled against current place/source IDs before they appear; retired or expired references fail closed.
- Dismissal clears the offer, and ERN never auto-plays a window or auto-opens a destination from continuity state.
- Added UI regression coverage for the privacy and catalog-validity contract.
- Pull-request CI passed before merge; stable main was updated only after the green check.


### 2026-09-19 — Release candidate and business activation preflight
- Catalog expanded to 30 current healthy source records across 16 countries and 20 providers.
- Current inside-ERN playback inventory increased to 7; 23 additional current sources remain official-provider/external experiences.
- Added three explicitly embeddable, currently checked live-video windows: Cijin Beach (Taiwan), Manhattan Skyline (United States), and Cancún Caribbean Beach (Mexico).
- Catalog release gate remains READY: 30 valid, 0 rejected, 0 source rechecks pending.
- Beta planning indicator is 71%. This is not publication certification; browser, mobile, provider playback, accessibility, performance and rollback evidence remain required.
- Business activation indicator is 71%. The Travel Bridge, disclosures, offer verification, submission validation and source-first partner review workflow are built. Submission transport and real affiliate inventory remain intentionally unconnected.
- Partner/commercial status cannot bypass truth, permission or health review.
- Added a machine-readable release-candidate report combining catalog breadth, formal release blockers and business posture.
- CI now reports release, beta, business and candidate posture and runs successfully on Node 22 with current checkout/setup-node actions.
- Publication remains blocked until ERN is deployed to a real candidate origin and the six dated real-world evidence checks are performed.


## 2026-09-19 — Release handoff hardening
- Preview artifacts are now reproducible static release snapshots with SHA-256 fingerprints and rollback identity.
- Static-host portability controls and a host contract are included without selecting or exposing a public host.
- Explicit shared #place/#window routes take precedence over private resume state.
- CI now rejects unsafe embedded-provider catalog entries and requires legal external fallback chains for every inside-ERN embed.
- Real-world evidence has an exact candidate identity contract (Git commit + manifest + HTTPS origin), preventing evidence from silently carrying across builds.
- GitHub-built release manifests now stamp the candidate commit SHA directly.
- Business activation has provider-neutral submission/affiliate adapter contracts and a source-first review workflow, while real transmission and affiliate inventory remain disabled.
- Publication remains fail-closed pending the six real-world checks; no CI result has been converted into browser/provider evidence.


## Beautiful-now curation — 2026-09-19
- Added a stronger New York Harbor destination set using provider-hosted EarthCam live views from Jersey City and the Statue of Liberty; all remain LINK_ONLY / EXTERNAL.
- Added Hida-Takayama as a multi-window destination with a provider-hosted live stream plus refreshed current images.
- Withheld the existing CouchTourist Manhattan skyline embed from HEALTHY promotion after beta feedback that it appeared unusually still; provider still labels it live, but ERN now requires a motion/currentness recheck before promoting it again.
- This stage strengthens the future time-aware “beautiful right now” direction without weakening source truth or permission rules.


## Solar-aware “Beautiful Right Now” foundation — 2026-09-19
- Added a dependency-free solar-position model using each source's coordinates and the current UTC time.
- ERN can now identify approximate sunrise, sunset, morning light, evening light, daylight and night without a weather/API dependency.
- Hero rotation and Live Right Now ranking now reward high-quality sources when their location is in a visually interesting light window, while preserving currentness, health, playback and diversity gates.
- Solar state is a curation signal only: it does not claim clear weather or guarantee a visible sunrise/sunset.
- This creates the foundation for future Sunrise Right Now / Sunset Right Now experiences without profiling visitors or weakening camera truth.


## Scenic world expansion — 2026-09-19
- Expanded the verified public catalog from 34 to 44 sources with a deliberately small high-quality set: Anguilla, Aruba, Lauderdale-by-the-Sea, Marco Island, Dublin, Chicago, Sint Maarten, Tbilisi (two views), and the ISS Earth view.
- All new EarthCam sources remain EXTERNAL_LIVE / LINK_ONLY; no embed rights are inferred.
- Added more strong beach, skyline, culture, street-life, harbor and space moments for the solar-aware Beautiful Right Now engine.
- The ISS source intentionally has no fixed coordinates/time zone because it moves; solar-location ranking therefore does not invent a terrestrial location for it.
- Yosemite was reviewed but not added in this tranche because its operator explicitly requires agreement to a Webcam Usage Agreement before featuring its webcams. Permission review comes before catalog promotion.


## Official tourism scenic expansion — 2026-09-19
- Expanded the public catalog from 44 to 49 sources using official destination/operator pages rather than webcam aggregators: Flåm/Aurland, Verbier, Amden/Weesen/Walensee, Oeschinensee and Lake Lucerne.
- Diversifies ERN toward high-trust travel-intent sources that naturally connect current views with destination planning.
- Where the provider describes “live images” without proving moving video, ERN conservatively uses LIVE_IMAGE rather than LIVE_VIDEO.
- All remain LINK_ONLY unless explicit embedding permission is established.


## Around This Window travel-intent expansion — 2026-09-19
- Evolved the existing Travel Bridge into a quieter “Around This Window” layer that appears after a visitor opens a destination.
- Expanded intent coverage from stay/eat/transport/tickets to six visitor needs: places to stay, food nearby, getting there & around, things to do, culture & places, and useful nearby services.
- Preserved fail-closed commercial behavior: empty categories do not invent businesses or links; verified offers remain the only offers eligible for display.
- The camera/Earth experience remains primary. Travel intent is visitor-triggered rather than an advertising wall.


## Privacy-first local taste foundation — 2026-09-19
- Added a deterministic local preference model that can learn from Favorite Windows, Favorite Places, Recent Windows and Recent Places already stored in the visitor's browser.
- Preference signals are behavioral/contextual: place, country and Earth categories. ERN does not infer age, generation, gender or other demographic identity.
- Favorites carry more weight than recency; similar categories/places/countries can be ranked higher without sending a profile to a server.
- This module is deliberately a ranking foundation only. It does not override truth, permission, health or freshness eligibility and is not yet used to silently reorder every public surface.


## My Live Right Now — 2026-09-19
- Connected the privacy-first local taste model to the Live Right Now surface.
- Two visitors can now gradually receive different ordering based on their own Favorite Windows, Favorite Places, Recent Windows and Recent Places, while ERN still starts from the same verified-current/diverse candidate pool.
- Personalization reorders discovery; it does not remove truth/health/currentness/permission gates and it does not collapse the feed to only familiar categories.
- With no local history, behavior remains the neutral global curation.


## ERN AI + My Earth taste — 2026-09-19
- ERN AI now combines explicit visitor language with the browser-local taste model.
- The visitor's words remain primary; learned taste is a bounded secondary ranking signal. A beach preference cannot turn a snow request into a beach result.
- The same broad request can therefore feel different for different visitors: “beautiful right now” can lean toward mountains for one person and beaches for another, while remaining inside the matching verified/discoverable pool.
- No demographic identity, account or server-side profile is required.


## ERN Earth Guide — 2026-09-19
- ERN AI now has a lightweight conversational Earth Guide layer instead of behaving only like a search box.
- The guide summarizes what it found, suggests where to start and offers contextual follow-up journeys such as current views, peaceful/beautiful alternatives or somewhere completely different.
- Guide language remains grounded in the actual discovery result. Empty current searches explicitly say no verified-current match rather than inventing one.
- My Earth taste can be acknowledged when it contributed to ranking, while explicit visitor intent remains primary.
- This is an on-device deterministic guide foundation, not a claim that a remote generative-AI service is connected.


## Earth Light Right Now — 2026-09-19
- Added a visible solar-aware discovery surface that follows sunrise, sunset, low morning/evening light, nighttime cities and daylight around Earth.
- The engine only uses verified-current sources and ranks each light lane by Beautiful Right Now scoring.
- Language is intentionally conservative: “Near sunrise locally” / “Near sunset locally” describe solar geometry only. ERN explicitly does not claim clear weather or that a sunrise/sunset is visible in the camera.
- This turns the earlier hidden solar-ranking foundation into a visitor-facing living-Earth experience without compromising source truth.


## AI/search discovery foundation — 2026-09-19
- Added public robots.txt with explicit OAI-SearchBot access plus general crawl access, following current OpenAI publisher guidance.
- Added sitemap.xml for the canonical public beta root. Hash-based UI states are intentionally not listed as fake crawlable pages.
- Added canonical URL, crawlable description, Open Graph identity and JSON-LD WebSite metadata to the public shell.
- Structured metadata describes ERN itself; it does not claim ownership of third-party camera feeds or invent live status.
- This improves machine readability/discovery eligibility but does not guarantee inclusion or ranking in ChatGPT, Google or other search systems.


## Privacy-first visitor analytics readiness — 2026-09-19
- Added a fail-closed analytics adapter and explicit configuration boundary. Analytics remains OFF in the public beta until a real provider/site token is deliberately configured.
- Prepared Cloudflare Web Analytics as the first supported aggregate provider because its current documentation describes it as free/privacy-first and says it does not collect or use visitors' personal data.
- No token, account or analytics relationship is invented in the repository. Enabling real counts requires one external setup step to obtain the site token.
- Existing ERN product telemetry remains separate and default-off; My Earth favorites/recents and search text remain outside telemetry.
- Search Console remains an external ownership/verification step; the repository already exposes robots.txt, sitemap.xml and canonical metadata for it.


## Crawlable destination pages — 2026-09-19
- Added deterministic static destination-page generation from the canonical source registry. Current catalog produces 44 real place URLs from 48 sources.
- Each destination page has a unique title/description, canonical URL, crawlable place/current-window text, truthful source-type/provider labels, JSON-LD TouristDestination identity, and a route back into ERN's interactive place experience.
- Sitemap is generated from the same catalog, so it contains the homepage plus every real destination instead of fabricated SEO pages.
- GitHub Pages release build now includes robots.txt, sitemap.xml and generated /places/ pages.
- Destination pages do not claim that weather is visible, do not upgrade source truth, and do not claim ownership of provider streams.


## Earth Guide actions — 2026-09-19
- Earth Guide follow-ups now have explicit action semantics instead of pretending every conversational phrase is a catalog search.
- “Surprise me” opens a real catalog window through the shared playback/source-action path.
- “Show me somewhere completely different” deliberately shifts away from the current place/country/region when possible.
- Generic “Show me what is live right now” now returns the verified-current pool instead of failing because words like “show” are not catalog metadata.
- Explicit place/landscape queries still use ERN AI ranking with My Earth taste as a bounded preference; action handling never bypasses source truth/currentness for current requests.


## Watch Earth visible-playback synchronization fix — 2026-09-20
- Fixed a real immersive-viewer bug reported from public use: the Watch Earth counter could advance through LINK_ONLY / EXTERNAL sources while the popup still displayed the previous embedded live stream, creating apparent repeated video at different positions such as 2/20 and 12/20.
- Root cause: the journey admitted external-provider sources as valid sequence entries even though source-action correctly opens those outside ERN and therefore cannot replace the popup media.
- Immersive Watch Earth now contains only verified-current sources with playbackCapability.action === PLAY. External live sources remain discoverable elsewhere with truthful provider links; they no longer advance an in-ERN playback counter without changing the visible media.
- Session-level guard also requires a PLAY result before advancing the sequence, preventing future counter/media drift.


## Bounded My Earth personalization — 2026-09-20
- Corrected Live Right Now's personalized-state flag: a new visitor with zero local taste signals is now explicitly neutral rather than being marked personalized merely because live items exist.
- Personalization is now a bounded bonus layered over ERN's verified-current / beautiful-now base order instead of a wholesale taste-score sort.
- The final slots deliberately preserve discovery from the neutral Earth ranking, reducing filter-bubble behavior while still letting favorites/recent behavior gently shape the visitor's ERN.
- Truth, permission, health, freshness and the balanced live candidate pool remain upstream gates; taste cannot promote an ineligible source.


## Watch Earth journey variety hardening — 2026-09-20
- Added a second non-repetition boundary after immersive playback eligibility: a Watch Earth journey cannot contain the same underlying media URL twice and cannot repeat the same destination in one rotation.
- The candidate pool is widened before deduplication so ERN can still fill up to 20 genuinely different playable destinations when inventory permits.
- This complements the earlier counter/media synchronization fix: sequence positions now represent distinct visible media and distinct places, not merely distinct source records.


## Cross-surface visible-window variety — 2026-09-20
- Generalized the Watch Earth non-repetition lesson into a shared visible-window variety guard.
- Hero rotation now avoids repeating the same underlying media and rotates one representative window per place, so automatic/Next Live movement feels geographically meaningful.
- Choose a Window removes duplicate media while still allowing genuinely different camera angles from the same destination.
- Surprise Me now draws from distinct visible media and distinct places before random selection.
- Place drawers remain intentionally exempt: multiple genuinely different views of one destination are a core ERN feature.


## Runtime playback resilience — 2026-09-20
- Added browser-local short-lived playback failure memory. When an embedded/current-image source actually fails for a visitor, ERN remembers that source locally for up to six hours instead of repeatedly putting it back into the immersive Watch Earth journey on reload.
- The runtime failure memory stores only source ID, timestamp and failure kind; it is local browser state, not analytics or user profiling.
- Watch Earth is built from the catalog minus recent local runtime failures. Catalog truth is not rewritten from one visitor's transient failure.
- A source that remains successfully open clears its local failure mark, allowing recovery without permanent quarantine.


## Machine-readable destination truth refinement — 2026-09-20
- Crawlable destination pages now expose coordinates when known, time zone in visible text, provider navigation, and each source's latest available ERN verification timestamp.
- Structured data uses conservative schema.org Place rather than claiming every catalog record is a TouristDestination (important for orbit, wildlife, city-view and institutional windows).
- Freshness wording explicitly says a source check confirms ERN verification at that time and does not promise weather, visibility or uninterrupted provider availability.
- Removed the homepage SearchAction structured-data claim because the public app does not implement the advertised ?q= search URL contract. ERN will not publish machine-readable capabilities it does not actually support.


## Official ERN identity — 2026-09-20
- Adopted the approved Earth-through-a-window visual identity as ERN's official brand direction.
- Added a lightweight vector Earth-window mark to the production site, with Earth Right Now + “See before you go.” in the persistent header.
- Added the mark as the site's favicon candidate for browser/search presentation and as the Organization logo in structured metadata.
- Kept the brand compact on mobile so it does not compete with the live-Earth experience.


## Earth Guide current-difference grounding — 2026-09-20
- “Something/completely different” now selects from verified-current, discoverable sources that have not recently failed in the visitor's browser, before using a broader healthy fallback.
- The current place is never returned by the different-place fallback.
- Removed a duplicate runtime-health import in the app module while touching this path.


## Normalized media identity — 2026-09-20
- Variety controls now compare the actual playable media identity rather than raw URL strings or thumbnails.
- YouTube watch, embed, live, Shorts and youtu.be forms for the same video ID collapse to one window, preventing URL-format variants from masquerading as different cameras.
- URL fragments and a small conservative set of known cache-buster parameters are ignored for identity.
- Thumbnail URLs no longer drive deduplication, so two genuinely distinct live streams that happen to share promotional artwork are not incorrectly collapsed.


## Brand asset deployment repair — 2026-09-20
- Fixed the reason the ERN mark did not display on the public Pages beta: the release snapshot copied index/src/data/places but omitted the new assets directory, so the deployed header and favicon pointed at a file that was not in the artifact.
- Release builds now copy assets/ into dist/assets/ and a smoke guard prevents this regression.


## Watch Earth 20-window acceleration — 2026-09-20
- Expanded the embeddable, healthy CouchTourist live-video inventory by 14 scenic windows, bringing the verified embeddable CouchTourist pool to at least 20 distinct places.
- New coverage deliberately spans Asia, Africa, Europe, Australia/Oceania and North America across many time zones so Watch Earth has alternatives when one part of Earth is dark or visually poor.
- Watch Earth now orders its qualified journey with likely-daylight windows first while retaining night windows as valid choices; runtime failure memory and one-place/media variety remain active.
- Added an inventory guard requiring >=20 healthy embeddable windows, >=20 places and broad timezone diversity.


## Beautiful Watch Earth — 2026-09-20
- Watch Earth now ranks its qualified global live pool by what should be visually compelling at the destination's local moment, not by the visitor's timezone.
- Sunrise/sunset and golden-hour windows receive priority; ordinary daylight remains strong.
- Night is no longer treated as universally undesirable: city/harbour/skyline/landmark/culture windows can receive a night-light boost, while ordinary dark scenic cameras are strongly demoted.
- Visitors in different countries at the exact same instant can therefore begin from the same globally beautiful-now ranking, while their local favorites/recent behavior can still make their wider ERN experience differ. Search remains unrestricted by this presentation ranking.


## Cinematic visual fidelity stage — 2026-09-20
- Began translating the approved mockup's visual language onto the existing mature ERN architecture rather than replacing the product.
- Header now foregrounds the Earth-window identity and Watch Earth; Atlas is presented to visitors as World Map while preserving the same underlying surface.
- Hero messaging now leads with “A more connected world.” and the permanent “See before you go.” proposition while retaining dynamic truthful source title/status/trust metadata.
- Watch Earth presentation is reframed as “Beautiful Earth, happening now,” matching the new global moment-aware selection engine.
- Cards, spacing, hero scale, navigation and live section received a cinematic fidelity layer without weakening source truth, playback, accessibility or personalization systems.


## Watch Earth visual moment storytelling — 2026-09-20
- Window cards now expose the destination-local Earth moment directly: Sunrise now, Morning light, Daylight now, Golden hour, Sunset now, Night lights, or Night now.
- Night-light labeling is restricted to city/harbour/skyline/landmark/urban/culture windows; an ordinary dark landscape is not marketed as desirable night lights.
- This makes the global rotation philosophy legible to visitors: ERN is following the moving light and worthwhile night scenes around Earth, not merely presenting a static camera directory.
- Existing source truth/currentness/freshness copy remains visible alongside the moment label.


## Dynamic Watch Earth journey — 2026-09-20
- Consolidated Watch Earth's truth/currentness, runtime-health, diversity, media-identity and beautiful-now ranking into one reusable journey builder.
- Added four-times-of-day regression coverage to ensure the global journey stays broad while its ordering changes as daylight/golden-hour/night-light conditions move around Earth.
- This prepares Watch Earth for a larger source pool without scattering selection rules through the app shell.


## Brand and live-window fidelity — 2026-09-20
- Replaced the earlier flat placeholder-like ERN mark with a substantially more dimensional Earth-through-window SVG: metallic frame, dark space, curved ocean Earth, atmosphere, land and horizon sunlight. This is an implementation refinement toward the already approved identity, not a new logo direction.
- No trademark symbol is included.
- Watch Earth / Live Right Now cards now use the same photographic visual hierarchy as Choose a Window, including destination-local moment badges and source truth/freshness beneath the image.
- The underlying source poster fallback remains intact when a provider has no safe thumbnail.


## Find Your Earth / private search memory — 2026-09-20
- Clarified ERN's two complementary modes: Watch Earth is the shared curated beautiful-now experience; Find Your Earth is visitor-directed discovery before travel or for curiosity.
- Recent Earth searches are now remembered locally in the visitor's browser, bounded to eight entries, and surfaced as quick “Again:” suggestions.
- Search memory does not require an account, name, age, email or server-side profile and is not allowed to override explicit search intent or source truth/currentness.
- This extends My Earth from favorites/recent places/windows into lightweight search continuity while preserving the shared global Watch Earth moment.


## Best available window search hierarchy — 2026-09-20
- Formalized the ERN search-engine principle: when a visitor asks for a place, rank the strongest truthful visual evidence available rather than returning an undifferentiated camera list.
- Evidence tiers now distinguish LIVE VIDEO, LIVE IMAGE, EXTERNAL LIVE, CURRENT SOURCE and PREVIEW. Preview/reference material is explicitly non-live and remains fallback rather than being promoted as current.
- Destination search applies the hierarchy before grouping results by place, while existing intent matching and destination ranking remain intact.
- Visual live cards expose the evidence tier alongside local-moment and freshness information.


## Place-answer search layer — 2026-09-20
- Destination results now answer the visitor's core question immediately: what is the best truthful visual window ERN has for this place?
- Result cards surface the evidence tier (LIVE VIDEO, LIVE IMAGE, EXTERNAL LIVE, CURRENT SOURCE or PREVIEW), current-check count, and whether multiple views can be chosen before asking the visitor to open the destination.
- This shifts Find Your Earth from a generic result directory toward an ERN-style visual search engine while preserving source truth and choice.
