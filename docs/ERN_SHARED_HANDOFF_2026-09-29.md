# ERN Shared Handoff — 2026-09-29

Use this file as the **current compact continuity point** when starting a new ChatGPT conversation. Older handoffs and BUILD_STATE/CHANGELOG remain historical evidence; this file is the clean current-state summary.

## Product
- Name: **Earth Right Now (ERN)**
- Slogan: **See before you go.**
- Mission: help a visitor understand the real place now before deciding whether, when or how to go.
- Quality over quantity.
- Truth labels must stay precise: LIVE VIDEO, LIVE IMAGE, EXTERNAL LIVE, PARTNER, PREVIEW.
- Static/promotional media must never be presented as current.
- Guiding principle: **Do not push the answer. Create the question.**
- Commercial fit may support research priority only; it must never override truth, quality, Guide wording, Watch Earth ranking or Stories ranking.

## Public release
- Public domain: `https://earthrightnow.app/`
- Stable beta.
- Latest known green commercial/scheduled-source Pages release before this handoff: run `36522135603`, SUCCESS.
- Latest green evidence/schedule foundation release: run `36520033122`, SUCCESS through Deploy.
- Participation/Now Moment upload infrastructure remains public-OFF.
- Analytics remains OFF unless intentionally configured.
- Fullscreen transition persistence remains deliberately deferred/non-blocking.

## Catalog checkpoint
- Current catalog: **94 sources**.
- Current checkpoint after Nishiki publication: **76 current checks / 75 current+healthy / 17 current inside-ERN embeds / 3 stale / 15 expired**.
- Remaining expired debt is still concentrated in older CouchTourist embed records. Do not weaken the 24-hour embed proof window to improve counts.
- Revalidation triage:
  - EMBED -> deployed playback recheck
  - LIVE_IMAGE -> current-image verification
  - EXTERNAL -> provider-page/editorial recheck

## Human playback evidence
Accepted review packet:
- batch: `bd51ac5733059f3f`
- deployed review origin: `https://earthrightnow.app/review/inside-ern.html`

Fresh human playback was recorded for:
- Auckland Viaduct
- Bergen Ulriken
- Cijin Beach
- La Palma Aridane
- La Palma Caldera
- Ponte di Legno
- Skeikampen
- Takayama Miyagawa
- Verbier
- Volcán Tajogaite

Research candidates human-confirmed:
- Kyoto Nishiki Market
- Rovaniemi Santa Claus Village
- Taitung Jinzun

## Kyoto
Five exact Kyoto Tourism Association sources are now published source-specifically:
- Fushimi Inari
- Kifune Shrine
- Kiyomizu-zaka
- Hanamikoji Street
- Nishiki Market

Rules:
- No blanket Kyoto/YouTube permission.
- Arashiyama Bamboo remains failed/deferred.
- Nishiki official live window: **11:00–18:00 Asia/Tokyo**.
- Human playback was confirmed at 12:57 JST.
- ERN now has schedule-aware source availability/currentness.
- Nishiki is public only with schedule-aware logic; outside the published window it must not be treated as currently live.

## Rovaniemi and Jinzun
- **Rovaniemi Santa Claus Village** is now an inside-ERN LIVE_VIDEO source using the exact City of Rovaniemi YouTube player.
- **Taitung Jinzun** now uses the official East Coast National Scenic Area YouTube player instead of CouchTourist.
- Both are exact-source approvals only; preserve provider/YouTube branding and controls; no restreaming.

## Degraded / intentional gaps
- Pattaya City: DEGRADED; official CCTV dashboard reported 0 live cameras.
- Jungfrau Region: DEGRADED; all official webcams offline.
- Chidori-ga-fuchi: DEGRADED/off-season; official Sakura surface still shows April state in late September.
- Tbilisi Mtkvari: leave stale unless stronger exact live wording appears.
- Chiang Mai PAO CCTV: all four feeds previously STANDBY / WAITING FOR FEED; recheck only on material state change.
- Paris: official Eiffel visitor context exists, but no verified current Paris visual window yet.
- Yosemite: useful official webcams but permission/usage agreement gate remains.

## Real-time visitor context
- Standard: `docs/REALTIME_CONTEXT_STANDARD.md`
- Manifest: `data/realtime-context-sources.json`
- Two supported acquisition modes:
  1. verified API
  2. official-page manual refresh
- Context is never camera truth and may never create a LIVE label.
- Seoul `citydata_eng` adapter remains PUBLIC-OFF pending ERN-controlled API key, real response/timestamp validation, place mapping, privacy and attribution review.
- Paris Eiffel attendance/opening/summit/weather context remains PUBLIC-OFF/manual-refresh and nonvisual.

## Travelpayouts / commercial state
Operator screenshot on 2026-09-29 confirmed:
- Earthrightnow Travelpayouts project: **active / green**
- **26 programs available**
- payout method: **not yet configured**

Rules:
- Travelpayouts Drive automation OFF
- automatic link rewriting OFF
- automatic public placement OFF
- paid ranking OFF
- exact tracked link required before placement
- account coverage must be confirmed
- explicit affiliate disclosure required

Active verified affiliate partners:
- Viator
- Klook
- Tiqets
- Welcome Pickups

Current verified live affiliate placements include:
- Auckland
- New York / Statue of Liberty
- Tokyo
- Sydney
- Honolulu / Waikiki

Non-public commercial opportunity queue:
- Kyoto / Klook
- Rome / Tiqets
- Seoul / Klook
- Rovaniemi / Klook
- Dublin / Klook
- Chicago / Tiqets

File: `data/commercial-link-opportunities.json`

Do not ask the operator for links until an exact account-specific search/generation action is genuinely needed. Payout method setup is a separate human/account action and does not block ERN content.

## Release safeguards
Pages release architecture:
- all JS/MJS under src/scripts/tests syntax-checked
- curated current release smoke suite guards current invariants
- dedicated preflights gate:
  - launch
  - mobile
  - accessibility
  - performance
  - rollback
  - participation
  - featured curation
  - catalog metadata
  - recency
  - source research priority
  - Guide
  - visitor-source expansion
  - realtime context
  - commercial placement
  - discoverability
  - operator review
- Historical full 809-test suite remains a maintenance/migration backlog and is not a universal release blocker.
- `app-lite.js` remains under the fixed 100 KB performance cap; no budget increase.

## ERN Guide / AI
- Deterministic Guide remains the public default.
- ChatGPT-like generative Guide direction is agreed, but public model activation remains gated by cost/privacy/deployment controls.
- “See before I go” intent is first-class.
- Guide must never change source truth or paid ranking.

## Stories / discovery
- Stories remain a strengthening layer, not a redesign.
- Curiosity-first principle remains: **Do not push the answer. Create the question.**
- Keep Beautiful/Useful/Interesting/current Earth discovery balanced.
- ERN AI should do the watching so people can watch Earth.

## Human-only gates
Only interrupt the operator for:
- deployed human playback review when a candidate is genuinely ready
- account-specific affiliate link generation / payout setup
- Seoul/API credentials
- provider approvals/credentials
- external Cloudflare/service deployment
- an irreducible product decision

## Next autonomous work
1. Continue source-health maintenance and provider diversification from CouchTourist debt.
2. Continue high-value current-source research for genuine visitor destinations, especially honest visual gaps.
3. Keep Kyoto/Nishiki schedule behavior healthy.
4. Continue Seoul context implementation without public activation.
5. Expand commercial readiness internally, but keep exact-link placement fail-closed.
6. Prepare small batches of account-specific Travelpayouts link requests only when the value is clear.
7. Continue ERN Guide, Living Atlas, Stories and organic/discoverability improvements without redesigning stable core UI.
8. Keep continuity docs current after substantial batches.

## User working style
- Work autonomously in **large batches**.
- Minimal micro-updates.
- “Continue” means permission to keep going.
- Return only for a substantial milestone or a genuinely human-only action.

## Continuity update — business readiness and new source lanes
- Created `data/business-readiness.json` as a non-public machine-readable business state.
- Travelpayouts project remains active/green with 26 available programs; payout method still requires a human account action before payouts can be received.
- Existing verified links and current ERN content are not blocked by the missing payout method.
- Commercial preflight now validates the active Travelpayouts state, keeps automatic placement/link rewriting/paid ranking OFF, and keeps the commercial opportunity queue public-OFF.
- `data/commercial-link-opportunities.json` contains six vetted non-public next-link opportunities: Kyoto/Klook, Rome/Tiqets, Seoul/Klook, Rovaniemi/Klook, Dublin/Klook and Chicago/Tiqets.
- Sydney Harbour research lane added: WebcamSydney currently presents a 24/7 Harbour/Opera House/Bridge view, but ERN keeps it research/link-first because explicit reuse/embed rights are not established.
- Tokyo year-round research lane added: Tokyo Metropolitan Government's Tokyo Port DX publicly exposes live port road/floodgate cameras. Exact visitor-useful targets still need resolution; this does not yet solve the central-Tokyo visual gap.
- `docs/CURRENT_HANDOFF.md` points to this file for any new chat.

## Latest green release
- Latest green continuity/business/source-research release: Pages run `36523426778`, SUCCESS through Deploy.
- This run includes the guarded business-readiness state, Travelpayouts active/green status handling, Sydney Harbour research lane and Tokyo Port DX official live-camera research lane.


## Continuation checkpoint — official-source diversification
- Continued autonomously from `docs/CURRENT_HANDOFF.md`.
- Catalog remains **94 sources**.
- Six former CouchTourist dependencies were moved to independent official/current **EXTERNAL_LIVE + LINK_ONLY** source paths without inferring embed/restream rights:
  - Chihshang Paradise Road → Taitung County Government Tourism / Amazing Taitung
  - Mpala Watering Hole → Mpala Research Centre / Explore.org
  - Cold Lake Marina → City of Cold Lake
  - Metung / Gippsland Lakes → Metung Hotel
  - Hale Pau Hana / Maui → The Hale Pau Hana
  - Waikīkī South Shore → Waikīkī Aquarium
- At the continuation checkpoint, using the existing recency windows: **82 current checks / 81 current+healthy / 17 current healthy embeds / 3 stale / 9 expired**.
- Remaining CouchTourist catalog records at this checkpoint: **13**, with no CouchTourist record currently marked DEGRADED.
- Old Mpala human-playback evidence was explicitly marked superseded so it cannot be mistaken as playback proof for the new official external target.
- Sydney Harbour research was tightened: WebcamSydney is a current 24/7 source, but its commercial stream/snapshot/broadcast options and copyright posture keep ERN in rights-gated/link-first research mode.
- Tokyo Port DX research was tightened: the official public PC/mobile live-camera service is independently confirmed, but exact visitor-useful public camera deep links remain unresolved.
- The source changes are on `main` and match the Pages workflow path filters. The GitHub connector available in this chat cannot enumerate push-triggered workflow runs, so **do not replace the previous known green run `36523426778` with a newer run number until deployment is independently verified**.


## Further continuation — provider debt narrowed to two expired records
- Continued the official/direct-source replacement batch beyond the first six migrations.
- Additional replacements:
  - Kijihiki Plateau → Hokuto City official live-camera page
  - Lajes do Pico Harbour → Espaço Talassa provider-direct webcam
  - Roque de los Muchachos Observatory → Gran Telescopio CANARIAS / IAC current images
  - Bloubergstrand / Table Mountain → direct TableMountainView current-image source
  - Perdido Key Beach → U.S. National Park Service active current-image webcam
  - Pleasant Beach / Little Sodus Bay → Pleasant Beach Hotel provider-direct webcam
  - Sasagawa Nagare → Murakami City municipal live-camera route
- Current catalog checkpoint: **94 total / 89 current checks / 88 current+healthy / 17 current healthy embeds / 3 stale / 2 expired**.
- Remaining CouchTourist records: **6 total**, none marked DEGRADED.
- The only expired records left at this checkpoint are:
  - `cancun-live-aqua-beach`
  - `st-johns-harbour`
- These two remain intentionally unresolved because current research found live third-party mirrors but not yet a sufficiently strong source-specific official/direct replacement. Do not lower the source standard just to make the expired count zero.
- Previous known green Pages run remains `36523426778` until a newer push-triggered deployment can be independently verified.


## Continuation checkpoint — zero expired debt + Guide/Stories/discovery strengthening
- Remaining expired CouchTourist debt was closed without lowering standards:
  - Cancún source moved from the older Live Aqua/CouchTourist record to **NIZUC Resort & Spa's official live-cam page** as `EXTERNAL_LIVE + LINK_ONLY`.
  - St. John's Harbour moved to the current **CBC News Newfoundland and Labrador harbour/Narrows webcam** as `EXTERNAL_LIVE + LINK_ONLY`.
- Current catalog remains **94 total / 91 current checks / 90 current+healthy / 17 current healthy embeds / 3 stale / 0 expired**.
- Remaining CouchTourist records: **4**, all non-degraded at this checkpoint. Provider diversification is now opportunistic rather than debt-driven.
- The three stale records remain intentional:
  - Pattaya City: official portal now exposes a 600-camera inventory/Live View surface, a material improvement from the earlier zero-live state, but individual playback remains unverified so health stays DEGRADED and no successful check is claimed.
  - Chidori-ga-fuchi: official Sakura surface was rechecked and still displays April 2026 state in late September; remains DEGRADED/off-season.
  - Tbilisi Mtkvari: current provider page remains reachable, but stronger explicit live wording has not been established; preserve the stale state.
- ERN Stories now has a deterministic editorial-balance seed: when current evidence exists, the deck reserves room for **Useful Earth, Interesting Earth and Beautiful Earth** before filling the remaining cards by current visual score. Curiosity-first questions and truth gates remain unchanged.
- `tests/ern-stories.smoke.js` now guards that balance and is included in the current release smoke suite.
- ERN Guide now uses a dedicated `guideEligible` gate that requires both general feature eligibility and `currentTruthClaim`; this prevents scheduled/closed or playback-stale sources from appearing in Guide results merely because their provider check is still in horizon.
- Guide preflight and `docs/ERN_GUIDE_VISION.md` now guard/document the same schedule + playback-currentness invariant.
- Organic discoverability hardening:
  - release destination-page builder now preserves `stories.html` and `press.html` in generated `sitemap.xml`;
  - discoverability preflight now requires both public files and sitemap entries;
  - checked-in sitemap was aligned with `/places/`, Stories and Press.
- `src/app-lite.js` remains below the fixed 100 KB cap after the Guide hardening (about 91.6 KB in the repository fetch used for this checkpoint).
- Previous independently known green Pages run remains `36523426778`. The connected GitHub action interface available in this chat still does not expose push-triggered Pages-run enumeration, so do not claim a newer green run number without separate verification.


## Continuation checkpoint — public-AI gating + context/currentness consistency
- Catalog checkpoint remains **94 total / 91 current checks / 90 current+healthy / 17 current healthy embeds / 3 stale / 0 expired** at the end of this batch.
- Generative ERN Guide infrastructure and public activation are now explicitly separated:
  - production Worker/deployment evidence may exist;
  - `GUIDE_AI_CAPABILITIES` remains the public activation authority;
  - `src/guide-ai-client.js` now fails closed and makes no generative request while explicit public capabilities are OFF;
  - `scripts/guide-ai-status.mjs` now reports using explicit public capabilities instead of inferring activation from deployment readiness.
- Whole-product preflight now guards the public-AI fail-closed boundary.
- Current release smoke now includes Guide AI routing and deployment-readiness safety tests in addition to ERN Stories.
- Seoul real-time context adapter was hardened while remaining PUBLIC-OFF:
  - caller/client timestamps can no longer substitute for a missing provider timestamp;
  - material future timestamps are rejected with a bounded clock-skew rule;
  - manifest/status checks now require provider-supplied timestamps and explicitly forbid client-created freshness.
- No Seoul API key was requested and no public Seoul context was activated; real-response validation and approved place mapping still require the existing human/API gate.
- Current-discovery consistency audit:
  - ERN Guide, Now strip, Local Earth/current discovery, beyond-map current cards, Nearby, More Like This, recommendations and the active Hero action now require both recent verification and `currentTruthClaim`;
  - this means schedule-closed or playback-stale sources cannot leak into surfaces that promise a current/now experience;
  - Living Atlas intentionally retains its broader recheck/degraded pins with explicit recheck labeling.
- `src/app-lite.js` remains safely below the 100 KB budget at about **91.5 KB** after these changes.
- Previous independently known green Pages run remains `36523426778`; do not claim a newer green deployment until a push-triggered run is independently verified.


## Continuation checkpoint — destination-page truth + Atlas/business strengthening
- Catalog checkpoint remains **94 total / 91 current checks / 90 current+healthy / 17 current healthy embeds / 3 stale / 0 expired**.
- Public crawlable destination pages now distinguish three different source states instead of collapsing them:
  1. **Current verified views**
  2. **Outside published live hours**
  3. **Sources awaiting recheck or recovery**
- Scheduled-closed sources no longer receive false “no in-horizon verification” wording.
- Destination pages now require fresh inside-ERN playback proof before an EMBED source can be treated/labeled as current. If source verification is fresh but playback proof has aged out, the page uses **PLAYBACK RECHECK DUE** rather than a live label.
- Shared `src/current-window-label.js` was hardened the same way, so a stale playback proof cannot produce `LIVE WINDOW` / `Watch live` elsewhere.
- Living Atlas grouped-pin selection now prefers a genuinely current/available source over a merely recently verified or schedule-closed sibling at the same place. Broader degraded/recheck Atlas visibility remains intentionally preserved.
- Crawlable destination pages can now surface existing **verified, current affiliate planning links** and **reviewed non-paid local places**:
  - affiliate offers require both `currentTravelOffer` and an active affiliate partner;
  - affiliate links carry `rel="sponsored noopener noreferrer"` and explicit “Affiliate link” disclosure;
  - copy explicitly states affiliate availability never affects ERN source ranking;
  - reviewed local places explicitly state they are not paid placements;
  - stale-only destination pages are forced non-commercial;
  - reviewed local places are limited to pages with a current source or a recently verified source outside published live hours.
- Commercial placement preflight and built-output discoverability preflight now guard those destination-page boundaries.
- Added `tests/destination-page-builder.smoke.js` and included it in the current release smoke suite.
- Destination opportunity matrix was refreshed:
  - Kyoto now reflects all five published source-specific cameras including schedule-aware Nishiki Market.
  - New York row was narrowed to **New York City / Statue of Liberty** so unrelated New York State source coverage is not conflated.
  - Honolulu/Waikīkī now reflects both direct current official paths.
  - Cancún/Punta NIZUC and St. John's were added as maintained direct/provider current destinations.
- `src/app-lite.js` remains safely below the fixed 100 KB cap at about **91.5 KB**.
- Previous independently known green Pages run remains `36523426778`; do not claim a newer green deployment until a push-triggered run is independently verified.


## Continuation checkpoint — Local Earth freshness + release artifact/discovery hardening
- Local Earth review state now has a bounded **90-day verification horizon**:
  - `src/local-directory-status.js` exports `currentLocalDirectoryEntry` and marks old reviews `REVIEW_EXPIRED`;
  - public app `approvedLocalPlaces()` now hides expired/future/paid/affiliate directory entries;
  - crawlable destination pages require the same current local-place review before showing a reviewed local place;
  - public local cards now show a readable review date rather than the full raw timestamp.
- Current Local Earth pilot check: **10 total / 10 current-valid / all mapped to known ERN place IDs / all unpaid / all non-affiliate**.
- `scripts/local-directory-status.mjs` is now a real release gate and exits non-zero unless the ten-place pilot is complete and valid.
- Added `tests/local-directory-status.smoke.js` and included it in the current release smoke suite.
- Pages workflow now explicitly runs **Local Earth directory integrity** and triggers on Local Earth status/runtime dependencies.
- Release-artifact plumbing was corrected for the public Guide module chain:
  - `guide-ai-client.js`
  - `guide-ai-routing.js`
  - `guide-ai-capabilities.js`
  - `guide-ai-activation.js`
  are now copied into `dist/src/` and included in the release manifest.
- Added `tests/release-artifact-assets.smoke.js`; release smoke now prevents a public index reference from shipping without the Guide module chain.
- Pages path filters were expanded so isolated changes to Guide/currentness/local/commercial build dependencies trigger a deployment build.
- Explore/Search now filters catalog matches through `guideEligible`, so stale, degraded, schedule-closed or playback-stale sources are no longer counted/presented as “current windows” on the current-discovery surface.
- ERN Stories now has explicit crawlable `CollectionPage` + `BreadcrumbList` structured data and richer Twitter/social metadata. Discoverability preflight guards those fields.
- Living Atlas Local filter now avoids false coordinate precision:
  - reviewed local places remain searchable;
  - the Local map filter disables itself when there are no exact verified local-place coordinates;
  - the map note explicitly explains that reviewed local places are not pinned until exact coordinates are verified.
- Public About copy now explains that reviewed local-place entries expire from reviewed status until rechecked.
- Chiang Mai official source gap was rechecked on 2026-09-29:
  - Chiang Mai PAO Smart City portal remains active;
  - all four public CCTV feeds still report **STANDBY / WAITING FOR FEED**;
  - ERN correctly keeps Chiang Mai as an honest visual gap and does not create a LIVE source.
- Destination opportunity matrix and provider observations now record that Chiang Mai recheck and keep the future For Places outreach lane for farms, resorts, markets and attractions.
- `src/app-lite.js` remains below the fixed 100 KB cap at about **92.5 KB** after this batch.
- Previous independently known green Pages run remains `36523426778`; do not claim a newer green deployment until a push-triggered run is independently verified.


## Continuation checkpoint — full-artifact release integrity + Story/search/index truth
- Catalog checkpoint remains **94 total / 91 current checks / 90 current+healthy / 17 current healthy embeds / 3 stale / 0 expired / 0 unknown**.
- Release artifact integrity was strengthened substantially:
  - `scripts/build-release-snapshot.mjs` no longer relies on a hand-maintained hash list;
  - release manifest now enumerates and hashes **every file actually shipped in `dist`**, excluding only `release-manifest.json` itself;
  - this now covers the real public runtime, generated destination pages, headers/redirects, public data, scripts, assets and all other shipped files.
- Added a post-build **Public module integrity** gate:
  - `scripts/public-module-integrity.mjs` walks shipped HTML script references and recursively checks relative ES-module imports inside `dist`;
  - Pages now runs this after `release:build` and before public discoverability preflight;
  - future “works in repo, missing module after deployment” failures should fail the release instead of reaching visitors.
- Public Guide/playback dependency chain remains explicitly shipped:
  - Guide client/routing/capabilities/activation modules
  - new shared `src/playback-proof.js`.
- Inside-ERN playback-proof truth is now shared and stricter:
  - `src/playback-proof.js` rejects missing, stale and materially future playback evidence;
  - `current-window-label.js`, ERN Stories and crawlable destination pages use the shared playback-proof rule;
  - ERN Stories now excludes an EMBED source whose playback proof is older than the 24-hour Story/current-window horizon.
- Source-recency policy also now rejects materially future provider-verification timestamps instead of treating them as age zero.
- The public `app-lite.js` runtime was aligned with the same five-minute clock-skew tolerance for source verification and embed playback proof.
- Search/Explore remains current-only through `guideEligible`; this batch preserved that invariant.
- Crawlable destination indexing now follows evidence:
  - pages with a current verified source remain `index,follow`;
  - pages with a recently verified source currently outside published live hours remain indexable;
  - **stale/reference-only pages become `noindex,follow` and are excluded from the sitemap**;
  - discoverability preflight now enforces sitemap/index consistency.
- Current stale-only reference pages are the existing intentional debt: Pattaya, Tbilisi Mtkvari and Chidori-ga-fuchi. Their pages can remain reachable as honest references without being advertised to search engines as current destinations.
- Destination build logging now reports indexable vs reference-only destination-page counts.
- Shared ERN Story deep links remain canonical; if a previously shared Story is no longer current/eligible, the Stories page now explicitly says so and shows current questions instead of silently substituting another window.
- `share-links.smoke.js` is now included in the current release smoke suite.
- ERN Stories smoke now has a fresh-vs-stale EMBED playback-proof regression case.
- `src/app-lite.js` remains safely below the fixed 100 KB cap at about **92.6 KB**.
- Previous independently known green Pages run remains `36523426778`; do not claim a newer green deployment until a push-triggered run is independently verified.


## Continuation checkpoint — deep-link/offline hardening
- Catalog remains **94 / 91 current / 90 current+healthy / 17 current healthy embeds / 3 stale / 0 expired / 0 unknown**.
- Fixed a release omission: `src/fullscreen-continuity.js` is now copied into the Pages artifact and its changes trigger deployment.
- Current viewer shares keep `#view=`; non-current/reference views now share the canonical place page instead.
- Shared `#view=` and `#place=` links now fail closed when currentness expires, falling back to current alternatives rather than reopening stale “now” content.
- Destination-page primary CTAs are current-state aware; non-current pages route to current ERN search instead of a dead viewer action.
- Added release smoke coverage for deep-link currentness and offline currentness.
- Service worker/offline behavior is explicitly guarded: only the offline shell is cached; current navigation/data/place content is never cached for replay.
- `/places/` now prioritizes current/schedule-verified destinations, structured ItemList excludes reference-only rows, and “Explore more” excludes stale reference-only pages.
- Full-artifact hashing and recursive post-build public-module integrity remain active.
- `app-lite.js` is about **93.7 KB**, still under the fixed 100 KB cap.
- Previous independently known green Pages run remains `36523426778`.


## Continuation checkpoint — candidate evidence + operator-console safety
- Catalog remains **94 total / 91 current / 90 current+healthy / 17 current healthy embeds / 3 stale / 0 expired / 0 unknown**.
- Fixed a maintenance bug: source recency summary now classifies `STALE_CHECK` correctly; the three stale sources no longer fall into a generic outside bucket.
- Recency summary age reporting now uses the shared source-recency clock policy and includes each item's exact recency state.
- Release verification console now shows candidate SHA, manifest generation time, artifact file count, and whether all six evidence records are bound to that exact candidate.
- Provider representative status on the operator console now requires fresh playback proof, not merely any historical HUMAN_PLAYBACK observation.
- Release candidate/status logic now becomes commit-bound when a candidate SHA is supplied; a new candidate cannot inherit READY status from human evidence recorded for an older commit.
- Added release smoke coverage for candidate evidence binding, release-candidate binding and recency-summary state naming.
- Removed production Guide AI and travel-provider API action buttons/network calls from the static public release-verification page. Quota-bearing external tests remain a secured/human-only workflow.
- Added an operator-console network-safety smoke test and explicit robots disallow for `/release-verification.html`.
- Public operator console remains `noindex,nofollow,noarchive`; discoverability preflight now guards the robots exclusion.
- Public release artifact keeps only the lean candidate-evidence helper required by the console; unused Viator helper is no longer shipped.
- `app-lite.js` remains about **93.7 KB**, under the fixed 100 KB cap.
- Previous independently known green Pages run remains `36523426778`; do not claim a newer green deployment without independent verification.


## Continuation checkpoint — explicit stale-maintenance lanes
- Catalog remains **94 total / 91 current / 90 current+healthy / 17 current healthy embeds / 3 stale / 0 expired / 0 unknown**.
- The three stale records are now machine-classified by maintenance need instead of one generic stale bucket:
  - `pattaya-city-live` → **PLAYBACK_EVIDENCE_DEBT** / HIGH
  - `chidori-sakura` → **SEASONAL_OFF_SEASON** / low until season or material provider change
  - `tbilisi-mtkvari-river` → **EDITORIAL_CURRENTNESS_DEBT** / routine
- Added `src/stale-maintenance-class.js`; source revalidation triage now exposes `maintenanceClass` and routes Pattaya to **PLAYBACK_EVIDENCE_REVIEW**, Chidori to **SEASONAL_DEFERRED**, and Tbilisi to routine editorial recheck.
- Added release smoke for stale maintenance routing.
- `data/source-research-priorities.json` now has a `currentStaleDebt` section with exact ids, class, priority and action.
- Source research priority status now cross-checks declared stale debt against actual catalog `STALE_CHECK` ids and total; it will fail if the research file and catalog drift apart.
- Fresh 2026-09-29 provider checks were recorded without refreshing `lastSuccessfulCheck`:
  - Pattaya official portal reports 600 total cameras while public Live View/Camera List show 0 cameras; remain DEGRADED.
  - Visit Chiyoda still exposes April 2026 Sakura state in late September; remain DEGRADED/off-season.
  - EarthCam Mtkvari River page remains active for the exact Tbilisi view, but stronger explicit live/current proof was not re-established; remain HEALTHY but stale.
- Only `checkedAt`/freshness evidence was refreshed for those three; currentness was not promoted by mere page reachability.
- Destination opportunity matrix now carries the same explicit maintenance class for Pattaya, Tokyo/Chidori and Tbilisi.
- `app-lite.js` remains about **93.7 KB**, below the 100 KB cap.
- Previous independently known green Pages run remains `36523426778`.


## Continuation checkpoint — Seoul non-credential readiness + Atlas recheck fail-closed
- Catalog remains **94 total / 91 current / 90 current+healthy / 17 current healthy embeds / 3 stale / 0 expired / 0 unknown**.
- Seoul real-time context remains fully **PUBLIC-OFF**.
- Added `data/seoul-context-place-mappings.json` with one conservative internal candidate: `seoul-plaza` → `Gwanghwamun·Deoksugung`.
- Mapping is validation-only: `mayPublishContext=false`, `realResponseValidated=false`, and global registry activation is also false.
- Added `src/seoul-context-mapping.js`; public mapping now requires both registry-wide activation and an individually `APPROVED_VALIDATED` mapping.
- Added `validateSeoulMappedResponse` so a future keyed `citydata_eng` response can validate provider area identity without making the mapping public.
- Seoul manifest now defines attribution, bounded cache, fail-closed failure behavior, and privacy/data-minimization rules:
  - no visitor personal data or profiling,
  - no raw network identifiers,
  - no movement-history archive,
  - current aggregate snapshot only,
  - no CCTV media ingestion,
  - no stale-on-error or stale-while-revalidate currentness.
- Added Seoul mapping integrity gate to Pages and release smoke; internal context registries are explicitly prevented from shipping in the public artifact while context is OFF.
- Seoul state is now `NON_CREDENTIAL_ARCHITECTURE_COMPLETE_KEY_AND_REAL_RESPONSE_VALIDATION_REQUIRED_PUBLIC_OFF`.
- Remaining Seoul human/provider gates are explicit: API key, real response validation, provider area/code confirmation, provider rate-limit confirmation, explicit mapping approval, and explicit public activation decision.
- Manual official-page context records now reject materially future observation timestamps.
- Living Atlas recheck behavior is stricter:
  - non-current EMBED/IMAGE_REFRESH sources no longer mount media in the viewer;
  - they render a reference visual plus provider-source access instead;
  - recheck pins/alternates do not create stale deep links or record personalization interest;
  - alternate labels use `publicTruth`, not generic media-type labels;
  - recheck viewer copy says **Reference only** instead of “Look now/current window.”
- Added Atlas recheck currentness regression coverage and whole-product guards.
- `src/app-lite.js` is about **94.1 KB**, still under the fixed 100 KB cap.
- Previous independently known green Pages run remains `36523426778`; do not claim a newer green deployment until independently verified.


## Continuation checkpoint — Guide planning + travel-offer expiry alignment
- Catalog remains **94 total / 91 current / 90 current+healthy / 17 current healthy embeds / 3 stale / 0 expired / 0 unknown**.
- Deterministic ERN Guide now supports **planning-after-view**:
  - Earth windows are selected/ranked first using the existing editorial/currentness logic;
  - only after that match does Guide derive up to three current verified travel-planning links from the matched place;
  - affiliate/sponsored availability is never read by `guideScore` and cannot affect which Earth window ranks first;
  - planning links retain explicit provider/disclosure text and open externally.
- Reference-only/stale viewer states remain non-commercial: affiliate/verified offers are suppressed unless the source is current; neutral external search/map utilities remain available.
- Travel-offer expiry is now enforced across all surfaces:
  - shared `travel-offer-verification.js` rejects explicit expired/invalid `expiresAt`;
  - lightweight browser gate mirrors the same rule;
  - normalized `travelOffer()` preserves validated `expiresAt` instead of dropping it.
- Added release smoke for explicit offer expiry, travel-bridge expiry normalization and Guide planning/commercial neutrality.
- Whole-product preflight now guards:
  - planning links remain post-ranking;
  - commercial state never enters Guide scoring;
  - stale/reference viewer states stay non-commercial;
  - browser offer gate enforces explicit expiry.
- Pages now triggers when `src/travel-bridge.js` changes.
- Guide mountain wording was adjusted in all seven supported languages so it asks only what the camera/window visibly shows rather than implying ERN has current weather data while real-time context remains public-OFF.
- Existing localized planning copy was verified present in all seven languages and already states that travel links are current-only and do not affect ERN ranking.
- `src/app-lite.js` is about **94.9 KB**, still under the fixed 100 KB cap.
- Previous independently known green Pages run remains `36523426778`; do not claim a newer green deployment until independently verified.


## Continuation checkpoint — trust discovery + distribution gate + runtime headroom
- Catalog remains **94 total / 91 current / 90 current+healthy / 17 current healthy embeds / 3 stale / 0 expired / 0 unknown**.
- Public trust/discovery surfaces were normalized:
  - `about.html` → AboutPage + BreadcrumbList + visible breadcrumb
  - `privacy.html` → WebPage + BreadcrumbList + visible breadcrumb
  - `for-places.html` → WebPage + BreadcrumbList + visible breadcrumb
  - `press.html` → AboutPage + BreadcrumbList + visible breadcrumb + fuller Twitter/share metadata
- Discoverability preflight now requires all four trust pages, canonical URLs, structured page type, breadcrumb schema and visible breadcrumb.
- `distribution-readiness.mjs` now treats structured site identity as part of AI/search readiness instead of checking only robots/sitemap/OAI crawler allowance.
- Distribution readiness is now fail-closed for website sharing, AI/search structure and safety invariants, while unconnected social channels remain optional/human-gated.
- Pages now runs:
  - **Public brand identity integrity**
  - **Organic distribution readiness**
  before public discoverability preflight.
- Public brand facts are cross-checked against homepage/Press identity, canonical domain, social-account claim state and commercial-ranking independence.
- No social account is claimed or auto-created; all current distribution channels remain NOT_CONNECTED and automatic posting stays disabled.
- To restore runtime headroom, low-frequency travel-planning selection/disclosure/link helpers were extracted from `app-lite.js` into `src/travel-planning-client.js`.
- The helper loads before `app-lite.js`, is copied into the release artifact, triggers Pages on change, and has dedicated smoke coverage.
- Existing Guide/commercial guards were updated to protect the extracted API rather than old inline function names.
- `app-lite.js` dropped from about **94.9 KB to 93.5 KB**, restoring about **6.5 KB** of headroom under the fixed 100 KB cap without changing the stable UI.
- Release smoke now includes public trust discovery, distribution readiness and travel-planning client coverage.
- Previous independently known green Pages run remains `36523426778`; do not claim a newer green deployment until independently verified.


## Continuation checkpoint — verified green release + release-gate repairs
- Independently verified GitHub Pages run **36554768805** completed successfully through **Deploy** for commit `b9158ee7db9bbe04e1a125814c51c14293ca7363`.
- This replaces the earlier “last known green run 36523426778” limitation.
- Release blockers found and repaired during this continuation:
  - fixed literal `\n` syntax corruption in `src/stories-page.js`;
  - fixed malformed regex syntax in `scripts/public-launch-preflight.mjs`;
  - aligned Guide AI routing smoke with the intentional 4-token no-match cost threshold;
  - aligned destination-page smoke with the shared `embedPlaybackProofCurrent` helper;
  - moved generated Places validation back to the post-build discoverability layer instead of the pre-build launch preflight;
  - separated persistent/problem-specific stale research debt from ordinary age-based recency maintenance.
- The successful run passed syntax, release smoke, launch, mobile, accessibility, performance, rollback, participation, curation, catalog, Local Earth, recency, research priority, Guide, visitor expansion, real-time context, Seoul mapping, commercial placement, build, module integrity, public brand, distribution, discoverability, operator review, artifact upload and Deploy.
- Startup performance now has a second budget: total homepage JavaScript is capped at **160 KB** in addition to the fixed **100 KB app-lite.js** ceiling.
- Latest measured homepage JS set is about **144.5 KB** total; `app-lite.js` remains about **93.5 KB**.
- Homepage public copy no longer says “Real conditions”; it now stays grounded in real places/current windows while public telemetry context is OFF.
- Deployed operator review batch **bcb7950ef0dc7e4e** contains renewal entries for Fushimi Inari, Kifune Shrine, Kiyomizu-zaka and Hanamikoji Street.
- Those renewals are optional for preserving all four Kyoto inside-ERN windows; ERN remains operational if they temporarily age out, so no operator interruption is required yet.


## Latest continuity checkpoint — green deploy + zero aggregator + media boundary
- Current local-time checkpoint: **2026-09-29 20:23 Asia/Bangkok**.
- Latest independently verified green GitHub Pages run: **36574522296**, completed successfully through Deploy after the Now Moment media boundary hardening.
- Current catalog: **94 total / 91 current / 90 current+healthy / 13 current healthy embeds / 3 stale / 0 expired / 0 unknown**.
- The only stale records remain the explicit persistent debts:
  - `pattaya-city-live`
  - `tbilisi-mtkvari-river`
  - `chidori-sakura`
- Active CouchTourist dependency is now **zero**. The final four aggregator records were conservatively migrated to official/direct external-live pages; historical playback observations remain historical and do not apply to the replacement targets.
- Provider/source-domain concentration is now an operational resilience metric only; current largest provider/domain share remains below the 20% advisory threshold and cannot enter visitor ranking.
- Watch Earth diversity behavior is protected: current inside-ERN priority first, then soft place/country/provider diversity; commercial state cannot enter Watch Earth ranking.
- Stories now also prefers geographic diversity as a soft fill rule after truth/currentness and Beautiful/Useful/Interesting balance.
- Deterministic Guide place+intent handling preserves geographic constraints; planning links remain post-ranking and commercially neutral.
- Now Moment still-photo infrastructure remains **NOT_DEPLOYED / PUBLIC-OFF / VIDEO-OFF**.
- Prepared photo safeguards include 45-minute TTL, still images only, bounded encoded dimensions/size, metadata rejection, canonical place validation, server-side rate limits, moderation-first publication, abuse reporting, retry-safe expiry cleanup, private/no-store media delivery, no raw network identifier storage and no automatic publication.
- New media integrity boundary:
  - visitor-supplied `placeLabel` is no longer trusted;
  - public labels are rehydrated from the trusted ERN catalog using canonical `placeId`;
  - the upload API/Worker no longer accepts the `x-ern-place-label` header at all.
- The release-smoke/operations-packet drift encountered during media hardening has been repaired; current Pages is green again.
- Public AI, Seoul context, visitor uploads, external social/account actions and other credentialed gates remain OFF until their explicit human/provider gates are intentionally opened.


## Latest phase checkpoint — Stage R external-gate readiness
- Canonical repository phase is now machine-derived as **`STAGE_R_EXTERNAL_GATE_TRIGGER_REGISTER`** — “External-gate readiness and evidence-driven activation.”
- This supersedes informal “Phase 3/4” language. ERN is beyond core build/stable-beta hardening; remaining major activation work is evidence-gated external/human/provider work plus ongoing source/product quality maintenance.
- First independently verified green Stage R Pages run: **36583259848**.
- Stage R output at that run:
  - `coreStableBeta=true`
  - **9 external gates open**
  - **0 eligible for evidence review yet**
  - next action: `HOLD_BLOCKED_LANES_AND_WORK_ELSEWHERE`
- Next timed provider review:
  - `viator-api-activation`
  - earliest review: **2026-09-29T15:21:00Z / 22:21 Asia/Bangkok**
  - before that time: **DO_NOT_RETEST_OR_ROTATE_KEY**
- Untimed gates remain evidence-driven only: Travelpayouts matching, Earth Signals deployment, submission transport, Now Moment media deployment, Guide AI public activation, Seoul validation/activation, official social channels and aggregate analytics.
- Added `scripts/project-phase-status.mjs` and package command `npm run project:phase`; Pages now release-gates this canonical status.
- External gate register now exposes `nextTimedReview` and `untimedWaiting`; operator brief surfaces both to prevent repeated blocked work.
- `whole-product-status` now distinguishes:
  - backend deployed vs public activation,
  - Earth Signals/submission/media deployment vs public state,
  - reviewed Local Earth inventory,
  - current verified affiliate partners/offers,
  - connected distribution channels,
  - analytics active/off.
  It no longer collapses “deployed but gated” into generic false.
- Safety remains unchanged: no automatic external action, credential rotation, public activation, partner claim or invented trigger evidence.


## Latest autonomous checkpoint — Stage R hold
- Independently verified GitHub Pages run **36584429951** completed successfully for commit `3c9115f9b917779561a57803336c6f59a65410f2`.
- Canonical project phase remains **`STAGE_R_EXTERNAL_GATE_TRIGGER_REGISTER`**.
- New canonical autonomous-work status is **`AUTONOMOUS_HOLD_EXTERNAL_WAIT`**.
- Machine-reported local blockers: **none**.
- External gates eligible now at the successful run: **none**.
- Next timed review:
  - `viator-api-activation`
  - **2026-09-29T15:21:00Z / 22:21 Asia/Bangkok**
  - before trigger: **DO_NOT_RETEST_OR_ROTATE_KEY**
- A one-time ChatGPT task is scheduled for 22:21 Bangkok to perform exactly one conservative Viator activation diagnostic. It must not rotate/re-enter credentials, must not infer success from time passing, and must keep public activation OFF unless real evidence passes.
- Untimed waiting lanes remain: Travelpayouts broader matching, Earth Signals controlled deployment, submission transport, Now Moment media deployment, generative Guide public activation, Seoul context validation/activation, official social-channel connection and aggregate analytics.
- Current source state at the hold checkpoint: **91 current / 90 current+healthy / 13 current healthy embeds**; persistent stale debt remains exactly Pattaya, Tbilisi Mtkvari and Chidori-ga-fuchi.
- Active CouchTourist dependency remains **zero**.
- Whole-product status now distinguishes deployed backend vs public activation and verified inventory vs current public placement.
- `scripts/project-phase-status.mjs` is the canonical phase source.
- `scripts/autonomous-work-status.mjs` is the canonical “keep working vs hold” source.
- Operator brief now surfaces the next timed external review and untimed waits to prevent blocked-lane loops.
- Safety: do not invent work to avoid a hold; do not reopen completed lanes without a material trigger; no automatic external action or public activation.


## Stage R continuation — Viator auth cleared, product validation prepared
- The scheduled one-time Viator activation diagnostic has already completed; do **not** repeat it.
- Sandbox authentication is confirmed active and the exact Auckland taxonomy mapping is verified:
  - ERN place: `auckland-viaduct-harbour`
  - Viator destinationId: `391`
  - destination: Auckland, New Zealand
- Canonical Viator gate has advanced from activation/auth to **`viator-api-product-validation`**.
- Current Viator truth remains:
  - `taxonomyVerified=true`
  - `productSearchVerified=false`
  - `affiliateAttributionVerified=false`
  - `publicActivationAllowed=false`
- Local Stage R preparation for the next gate is complete:
  - added a dedicated `/api/viator/product-validation` path;
  - the path is **disabled by default** via `ERN_VIATOR_PRODUCT_VALIDATION_ENABLED=false`;
  - it requires a separate Worker secret token (`ERN_VIATOR_VALIDATION_TOKEN`);
  - affiliate PID comparison is supplied only through Worker secret `VIATOR_AFFILIATE_PID`;
  - it accepts only approved explicit ERN→Viator destination mappings;
  - it caps the validation sample to three products;
  - it reports product-search and affiliate-attribution evidence without exposing secret values;
  - public `/api/viator/products` remains OFF.
- Added release-smoke protection in `tests/viator-product-validation-boundary.smoke.js`; the test ensures validation/public switches remain OFF by default and no affiliate PID/token is hard-coded.
- The remaining step is a genuine Cloudflare/external gate: configure the two Worker secrets, intentionally deploy/enable the validation-only path, run one controlled Auckland validation, record the evidence, then disable/remove the temporary validation capability. Do not infer success without the returned product and attribution evidence.
- No public Viator product activation is authorized by this checkpoint.
