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
