# ERN Focused Expansion Status — 2026-10-03

## Visitor / source lane

Current catalog:
- 98 source records
- 91 distinct HEALTHY searchable places
- 4 newly promoted owner-verified places: Vienna, Helsinki, Koli and Turku

Current curated-source behavior:
- Watch Earth still uses the canonical currentness/playback gates.
- Country/provider/place diversity remains soft-limited so a single provider or country cannot dominate the first featured set.
- Vienna, Helsinki, Koli and Turku received stronger editorial quality scores after owner playback review; this does not bypass currentness.
- The full research queue now contains 33 candidates: 4 promoted, 29 still requiring human playback verification.

Next high-priority human source checks:
1. Salzburg — Mirabell Gardens & Old Town
2. Innsbruck — Live Panorama
3. Dubrovnik — Pile
4. Malta — Official Live Cams
5. Tallinn — TV Tower Panorama

Additional pending families already researched:
- Prague tower cameras
- Levi and Kilpisjärvi
- additional Switzerland panoramas
- Madeira official tourism webcams
- Seoul Gwanghwamun Plaza / Cheonggyecheon

Goal:
- expand carefully toward roughly 150–200 genuinely useful searchable places
- never count multiple views of one place as fake destination growth
- never promote research candidates to CURRENT/LIVE until source-specific playback evidence exists

## Business lane

Current verified commercial inventory after New York consolidation cleanup:
- 25 verified offer records
- 19 distinct HEALTHY ERN places with at least one verified offer
- 4 active affiliate relationships: Viator, Klook, Tiqets and Welcome Pickups
- no paid ranking, automatic placement, automatic link rewriting or invented partner links

Recovered / repaired:
- New York legacy affiliate mappings now target the canonical `new-york-harbor` place.
- Duplicate legacy New York Klook/Tiqets offer records were removed so the destination can surface cleanly without duplicate commercial density.

Next exact-link opportunities already researched and queued:
- Vienna → Tiqets (P1)
- Helsinki → Viator (P1)
- Lucerne / Lake Lucerne → Viator (P1)
- Tbilisi → Viator (P1)
- Cancún → Viator (P1)
- Yellowstone → Viator (P2)
- Turku → Viator (P2)

These remain non-public until the owner generates and manually verifies the exact tracked link in the relevant partner account.

Operating principle:
Commercial options appear only after Earth discovery and never influence which camera/place ERN ranks.


## Prague exact-target isolation

The earlier Prague verification burden has been reduced. The official Prague City Tourism page now resolves to six direct camera targets recorded in `data/source-expansion-candidates.json`:
- Petřín Tower — Panomax 360 endpoint
- Old Town Hall — direct YouTube live target
- Old Town Bridge Tower — direct YouTube target
- Powder Tower — direct YouTube target
- St. Nicholas Bell Tower — direct YouTube target
- Lesser Town Bridge Tower — direct YouTube target

These remain research-only until exact-target playback is spot-checked, but the owner no longer needs to hunt through the Prague page.

## Business queue refinement

Additional high-intent opportunities prepared, still non-public and exact-link gated:
- Georgia Aquarium → Tiqets
- San Diego Zoo → Tiqets
- Vienna → Tiqets (public inventory evidence reconfirmed)
- Helsinki → Viator
- Lucerne → Viator
- Tbilisi → Viator
- Cancún → Viator
- Yellowstone → Viator

Accommodation research remains fail-closed. Hotels.com and Trip.com were added only as research candidates; owner-project availability is not assumed and no tracked links are allowed until account-level confirmation.


## Large-batch checkpoint — 02:20 UTC

Release health:
- The strict runtime-size blocker was resolved without raising the performance ceiling.
- A subsequent Pages deployment completed successfully after the fix.
- Operations and syntax checks were green for the repaired runtime.

Source lane:
- Current live/searchable baseline remains 91 healthy distinct places from 98 source records.
- Expansion research queue now has 41 candidates: 4 promoted, 37 still requiring human playback verification.
- Official Innsbruck Tourism family now contributes eight distinct research candidates beyond the earlier city panorama/Markthalle work: Patscherkofel, Mieminger Plateau, Telfs, Kühtai, Lüsens, Nordkette, Stadtturm and Swarovski Kristallwelten/Wattens.
- data/source-verification-priority.json now ranks the complete playback-verification queue so the next owner checks are compact and high-value.

Business lane:
- Commercial opportunity registry now contains 30 opportunities before the new priority matrix layer: 12 verified-link placements, 13 exact-link/account-search items, and 5 source-gated items.
- New future source-gated opportunities: Tallinn/Tiqets, Malta/Tiqets and Dubrovnik/Viator.
- data/commercial-priority-matrix.json now ranks up to 25 additional healthy ERN places for research against the four existing partners before any new affiliate network is considered.
- No commercial signal affects Earth ranking; exact tracked links and manual verification remain mandatory.


## Large-batch checkpoint — 03:20 UTC

Visitor/source lane:
- Healthy searchable baseline remains 91 distinct places from 98 current source records.
- Playback-gated research queue has expanded to 49 candidates.
- New Asia family: eight official Taiwan Tourism Administration Live Taiwan candidates spanning Taipei, New Taipei, Taichung, Hualien and Tainan. Each selected official page currently marks the camera as operating; ERN still requires human playback verification before promotion.
- New Africa family: four additional official SANParks candidates — Satara, Olifants, Punda Maria and Talamati. Existing Nossob was not duplicated.
- Featured-camera operations now have a 24-place editorial rotation audit spanning 18 countries and 21 providers; this is advisory only and does not override real-time Watch Earth/currentness.
- Geographic gap planning now explicitly suppresses raw-count chasing and prioritizes South America, broader Africa, non-Japan Asia, Oceania and the Caribbean.

Business lane:
- Explicit opportunity registry now contains 38 entries: 12 verified-link placements, 16 exact-link/account-search items and 10 source-gated items.
- Healthy destinations covered by verified offers remain 19; an additional 16 healthy places are now in an explicit commercial queue, leaving 57 healthy places for later research rather than uncontrolled expansion.
- New high-intent additions include Aruba/Viator, Kīlauea/Viator and Torres del Paine/Viator.
- New source-gated additions include Taipei/Klook, Taichung/Klook, Tainan/Klook, Hualien/Viator and Kruger/Viator.
- Existing-partner-first remains the rule. No new partner activation was performed.
- Owner work remains intentionally deferred and consolidated in data/owner-ready-expansion-batch.json.
