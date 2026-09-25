# ERN Provider Research Handoff — 2026-09-25

## Status

The current healthy/current EXTERNAL_LIVE, LIVE_VIDEO and LIVE_IMAGE provider-discovery queue has been fully researched. There are no unresearched current external provider families remaining in the catalog as of this handoff.

This does **not** mean every external source may be embedded. Most families remain deliberately LINK_ONLY because public viewing availability is not permission to reuse, frame or restream content.

## Safe integration lanes

ERN now models four provider-family outcomes:

1. `PROVIDER_BRANDED_PLAYER_ONLY` — a provider/platform permits its branded player path, but the exact target still requires source-level permission evidence and deployed HUMAN_PLAYBACK review.
2. `PROVIDER_GENERATED_WIDGET_ONLY` — only official provider-generated code may be used. Ordinary provider pages must not be framed by inference.
3. `PROVIDER_AUTHORIZED_CURRENT_IMAGE` — the provider explicitly allows current-image/photo reuse under documented conditions. Exact image target and deployed rendering review are still required.
4. `LINK_ONLY_UNLESS_LICENSED` — ERN links to the official source and does not embed/reuse it without a stronger documented permission path.

All lanes remain fail-closed: family research never mutates catalog truth, confirms playback, or promotes a source automatically.

## Exact-target preparation registry

`data/provider-generated-targets.json` is now the source of truth for provider-generated/authorized targets that have family-level permission evidence but are not ready for catalog promotion.

Current preparation targets:

### KitzSki
- Family: `kitzski-partner-webcam-widget`
- Source: `kitzbuhel`
- Kind: `PROVIDER_GENERATED_WIDGET`
- Current state: `EXACT_PROVIDER_CODE_REQUIRED`
- Only code produced by the official KitzSki partner widget generator is acceptable.
- Do not frame ordinary KitzSki, Feratel or Panomax pages.

### SkylineWebcams — Torres del Paine
- Family: `skylinewebcams-photogram-widget`
- Source: `torres-del-paine-rio-serrano`
- Kind: `PROVIDER_GENERATED_CURRENT_IMAGE`
- Truth if later approved: `LIVE_IMAGE`
- Current state: `EXACT_PROVIDER_CODE_REQUIRED`
- Skyline permits third-party use of its official photogram embed that refreshes about every five minutes; this must never be described as live video.

### Icelandic Meteorological Office — Reykjavík
- Family: `icelandic-met-office-current-images`
- Source: `reykjavik-metoffice`
- Kind: `PROVIDER_AUTHORIZED_CURRENT_IMAGE`
- Truth if later approved: `LIVE_IMAGE`
- Current state: `EXACT_PROVIDER_CODE_REQUIRED`
- IMO terms explicitly allow photographs/data for private and commercial use unless otherwise stated, with IMO attribution and download date.
- The public Reykjavík webcam page does not currently expose a stable direct image URL through ERN's available retrieval path; do not guess one.

## Exact-target lifecycle

`src/provider-generated-targets.js` enforces:

- `EXACT_PROVIDER_CODE_REQUIRED`
- `DEPLOYED_REVIEW_REQUIRED`
- `REVIEW_APPROVED_NOT_PROMOTED`
- `REVIEW_FAILED`

Even an approved deployed rendering remains **not promoted** until a separate editorial/catalog decision occurs.

Safety invariants:
- `catalogMutationAllowed: false`
- `automaticGenerationAllowed: false`
- `automaticPromotionAllowed: false`
- `permissionInferred: false`
- `playbackInferred: false`

Daily Operations retains `provider-generated-targets.json`, validates these boundaries, and shows target preparation in the operator brief.

## Provider research completed in this batch

The following current external provider families were researched and remain conservative LINK_ONLY under current evidence unless noted above:

- Chamonix-Mont-Blanc Valley Tourist Office
- Georgia Aquarium
- South Australia Marine Safety / DIT
- Dolomiti Superski
- earthTV
- Norway's Best
- Pattaya City CCTV
- San Diego Zoo Wildlife Alliance
- Randwick City Council beach cams
- Comune di Diano Marina
- Hilton Waikiki Beach Resort & Spa
- Queenstown Airport
- Ski Arlberg
- St. Moritz Tourismus
- VISIT FLORIDA
- Whistler Blackcomb / Vail Resorts
- Zermatt Tourism
- Visit Chioggia / Comune di Chioggia
- Chiyoda City Tourism Association / Sakura Festival
- Amden Weesen Tourismus
- Environment Canterbury
- Farm Tomita
- Lake Lucerne Navigation Company
- Oeschinensee

The Icelandic Meteorological Office is the exception: it has an explicit authorized current-image reuse path and is staged for exact-target discovery.

## What not to do

- Do not reopen already-classified families merely because their public pages are reachable.
- Do not infer embed rights from an iframe visible on the provider's own page.
- Do not infer permission from Feratel/Panomax/YouTube/platform technology alone.
- Do not restream provider video.
- Do not promote KitzSki/Skyline/IMO until exact target + deployed rendering/playback review succeeds.
- Do not relabel Skyline's five-minute photogram as LIVE VIDEO.
- Do not weaken provider-family or packet-integrity guards to make a candidate pass.

## Next autonomous work

1. Continue exact-target extraction for KitzSki, Skyline and IMO using only official provider-generated/authorized targets.
2. If an exact target is obtained, stage it in `data/provider-generated-targets.json` and move only to `DEPLOYED_REVIEW_REQUIRED`.
3. Continue normal inside-ERN playback evidence maintenance/restoration without treating HTTP reachability as proof.
4. Keep generative ERN Guide, Earth Signals, submissions and commercial activation behind their existing deployment/user-decision gates.
