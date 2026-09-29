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
