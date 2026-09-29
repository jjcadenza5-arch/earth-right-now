# ERN Shared Handoff — 2026-09-28

This is the compact continuity point for starting a new ChatGPT conversation. It does not replace `docs/BUILD_STATE.md`, `docs/ROADMAP.md`, or source-truth data; those remain authoritative.

## Product direction
- Mission: **See before you go.**
- Original product test: help a visitor understand the real place now before deciding whether, when, or how to go.
- Any visitor-interest place may qualify. Categories are illustrative, not restrictive.
- Source quality/current usefulness and visitor/program usefulness should reinforce one another.
- Commercial fit is a small supporting research signal only. It never overrides truth, quality, Watch Earth ranking, Guide truth, or Stories ranking.
- Do not push the answer. Create the question.
- Quality over quantity.

## Current release state
- Public domain: `https://earthrightnow.app/`
- Stable beta state is established and release gates are green.
- Fullscreen transition persistence remains deliberately deferred/non-blocking.
- Participation/photo infrastructure remains public-OFF until external deployment gates are satisfied.
- Analytics remains OFF unless intentionally configured.
- Google sitemap has been submitted; indexing/canonical reconciliation remains external.

## Current catalog / Kyoto expansion
- Four exact Kyoto Tourism Association cameras are source-specifically approved and in the catalog:
  - Fushimi Inari
  - Kifune Shrine
  - Kiyomizu-zaka
  - Hanamikoji Street
- Approval is exact-target only. No blanket Kyoto/YouTube approval.
- Arashiyama Bamboo exact target failed deployed playback and remains research-only/deferred.
- Nishiki Market has a provider-published live window of 11:00–18:00 Asia/Tokyo.
  - A prior failed check occurred around 00:16 JST and is NOT counted as a target failure.
  - Retest only inside the published live window.
- Research queue is now schedule-aware so off-hours sources do not create misleading failure work.

## Visitor-interest source expansion
Current research principles are in:
- `docs/SEE_BEFORE_YOU_GO_STANDARD.md`
- `data/source-research-priorities.json`
- `data/visitor-source-expansion-candidates.json`
- Destination opportunity matrix: `data/destination-opportunity-matrix.json`

Resolved/active directions:
- Kyoto official tourism live-camera network: active and expanding source-specifically.
- London: Savoy Place skyline and Abbey Road Crossing added as EXTERNAL_LIVE / LINK_ONLY.
- Seoul: real-time crowd/traffic/transit/weather context is a separate research lane, not camera truth.
- Seoul Plaza 24 Hours is now in the catalog as official EXTERNAL_LIVE / LINK_ONLY; the data-context lane remains separate and public-OFF.
- Bangkok Sukhumvit Road, Singapore Port & Skyline, and Rome Spanish Steps are now selective EXTERNAL_LIVE / LINK_ONLY catalog windows. Do not infer embed rights from these external handoffs.
- Seasonal bloom/farm/orchard sources remain high-value research because they embody the original strawberry-picking use case.
- Tonami Tulip Park Panorama Terrace is already promoted as EXTERNAL_LIVE / LINK_ONLY from Tonami City's official live-camera page. A discovered direct municipal image URL remains research-only and must not replace the safe link-only path without separate permission/currentness approval.
- Thailand agritourism/farms are a source gap and future For Places / partner-camera outreach opportunity; never substitute static promotional media for current evidence.
- Visit Finland live-webcam guide is a new P1 research lane; Santa Claus Village has an exact official live-video page staged link-first/research-only.
- Yellowstone Old Faithful has an exact active NPS live-webcam page staged link-first/research-only.
- Yosemite official current webcams are valuable but permission-gated: the official NPS page directs third parties to a Yosemite Conservancy usage agreement before featuring webcam imagery.
- Rovaniemi / Santa Claus Village and Yellowstone / Old Faithful are now promoted as EXTERNAL_LIVE / LINK_ONLY; maintain them rather than duplicating their destination coverage.
- Paris now has an exact official Eiffel Tower live visitor-context lane (attendance/opening/summit conditions/weather), but this remains context-only. Paris still has no verified current visual window in ERN.

## Commercial state
- Booking.com application: rejected/inactive; do not claim relationship.
- Viator: active limited pilot.
- Travelpayouts ERN Project: active.
- Travelpayouts Drive automation: removed/off; manual tools only.
- First verified affiliate partners: Klook, Tiqets, Welcome Pickups.
- Destination-specific live placements currently include Auckland, New York/Statue of Liberty, Tokyo, Sydney, Honolulu/Waikiki.
- Do not expand affiliate density just because links are available. Product usefulness comes first.
- Full 26-program Travelpayouts inventory is mapped in `data/travelpayouts-program-ranking.json`.
- Strong future-fit programs include KKday, Go City, WeGoTrip, Radical Storage and selected transfer partners.
- User only needs to generate account-specific Travelpayouts links when a human login step is required.

## Real-time visitor context
- Reusable context standard: `docs/REALTIME_CONTEXT_STANDARD.md`.
- Research manifest: `data/realtime-context-sources.json`.
- Context supports two explicit acquisition modes: verified API and official-page manual refresh. Both remain separate from camera truth and source ranking.
- Paris Eiffel live visitor conditions are now a PUBLIC-OFF manual-refresh context lane with a short expiry; they are not a camera and cannot create a LIVE label.
- Current SkylineWebcams Paris/Eiffel/Pantheon candidates were checked and are OFFLINE; recheck only on a material provider-state change.
- Seoul-specific adapter details remain below.
 
## Seoul real-time context
- Research manifest: `data/realtime-context-sources.json`.
- Adapter contract: `docs/SEOUL_REALTIME_CONTEXT_ADAPTER_CONTRACT.md`.
- Official English API contract is verified as Seoul dataset OA-22714 / service `citydata_eng`; one area per request; an API key is required beyond the sample Gwanghwamun/Deoksugung scope.
- Context may later supplement Guide/place pages with current crowd, traffic, transit, weather and events.
- Context must never create a LIVE camera label, alter camera truth, hide camera truth when stale, or affect Watch Earth editorial ranking.
- Public activation remains OFF pending an ERN-controlled API key, actual response/timestamp validation, place mapping, attribution, privacy and fail-closed Guide integration.
- Fail-closed normalization code now exists in `src/realtime-context-adapter.js`: unmapped, untimestamped and stale context is rejected; context cannot create camera truth or LIVE labels.

## Human-only work
Only ask the user when genuinely required:
- deployed human playback review,
- logged-in provider/affiliate actions,
- external Cloudflare/service deployment,
- provider approvals/credentials,
- explicit product decision where evidence cannot decide.

User preference: work autonomously in large batches and return only for genuine human action or a substantial milestone.

## Next work
1. Continue visitor-interest source research using the See Before You Go standard.
2. Retest Nishiki Market only during 11:00–18:00 JST.
3. Continue Seoul context adapter research while keeping public activation OFF.
4. Maintain London/Kyoto/source health and release gates.
5. Explore strong current/live sources in places visitors genuinely care about, not random geographic coverage.
6. Keep commercial/business readiness progressing without degrading ERN's visual/trust quality.

## Latest progress after handoff creation
- Second Kyoto review batch applied:
  - Hanamikoji Street approved and in catalog.
  - Arashiyama Bamboo failed deployed playback and remains deferred/research-only.
  - Nishiki Market failure occurred outside its provider-published 11:00–18:00 JST live window and is NOT counted as a target failure. Retest only in-window.
- Research review queue is schedule-aware and suppresses off-hours playback work.
- Tonami Tulip Park — Panorama Terrace added as official EXTERNAL_LIVE / LINK_ONLY, a direct seasonal See Before You Go use case.
- Public About page now includes the concise strawberry-picking origin of ERN and why current views matter.
- For Places copy now explicitly invites any visitor-interest place where today's flowers, crowds, weather, visibility, animals, beach conditions, activity or atmosphere can help someone decide whether, when or how to go.
- Seoul Real-time City Data remains a separate PUBLIC-OFF context-data research lane, never camera truth.
- Current catalog count at this handoff revision: 93 sources. Always read current `data/sources.json` rather than relying on a frozen count.
- Latest recency state as of 2026-09-29 morning: 70 current+healthy, 5 stale, 17 expired under ERN's existing horizons. This is maintenance debt, not permission to relax truth windows.
- Eight high-value external/current sources were freshly revalidated first: Coogee/Randwick, Waikiki, Kīlauea, Yellowstone, San Diego Zoo, Chamonix, Whistler Blackcomb and New York skyline.
- A second six-source recheck batch refreshed Diano Marina, Sottomarina/Chioggia, Torres del Paine, and SANParks Boulders/Addo/Orpen.
- Generated destination pages now visibly separate current verified views from provider sources awaiting recheck, including recency-aware SEO/directory copy.
- A destination-opportunity matrix now steers visual-gap research. Current unresolved high/meaningful gaps include Chiang Mai and Paris; already-covered destinations should be maintained selectively rather than padded with duplicates.
- Chiang Mai PAO CCTV was rechecked after the destination-matrix pass and still reports STANDBY / WAITING FOR FEED on all four official cameras. Keep the gap honest until feed state materially changes.
- Catalog metadata completeness is now a Pages release gate. The current 93-source catalog has complete provider/country/region/truth-support/check-history/story/attribution metadata under truth-aware rules.
- Freshness evidence is now required by the catalog metadata gate; older records were completed only from their existing successful-check timestamps, without upgrading source truth.
- Context expiry smoke checks now run in Pages CI so stale manual context cannot remain current.
- Pages deploy now runs the full ERN smoke suite before release and logs an advisory source-recency maintenance summary on every deploy.
- Revalidation triage now routes stale/expired work by evidence need: EMBED → deployed playback recheck; LIVE_IMAGE → current-image recheck; EXTERNAL → editorial/provider-page recheck.
- Pattaya City is now DEGRADED because its official CCTV dashboard reports 0 live cameras; Jungfrau remains DEGRADED because all ten official webcams are offline.
- Chidori-ga-fuchi is now DEGRADED/off-season because the official Sakura surface still shows April 9 state in late September; Tokyo is therefore a current visual gap outside sakura season.
- The first three Kyoto approved embeds now carry `playbackVerifiedAt` markers matching their existing exact human-review timestamps and reviewed embed URLs; no new approval was inferred.
- Continue autonomously. Only ask the operator for deployed human playback when a candidate is genuinely ready and inside any provider-published live window.
