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


## Large-batch checkpoint — 02:32 UTC

Source/featured lane:
- Current public healthy searchable baseline remains 91 distinct places; no unverified source was promoted merely to increase count.
- Private playback-verification queue is now 51 candidates.
- Added eight official Taiwan Tourism Administration Live Taiwan candidates across Taipei, New Taipei, Taichung, Hualien and Tainan; selected official pages currently mark these streams as operating.
- Added four additional official SANParks candidates (Satara, Olifants, Punda Maria, Talamati) without duplicating the already-live Nossob place.
- Added South America candidates for Mendoza Plaza Independencia (official City of Mendoza live camera) and Ushuaia Harbour/Beagle Channel (municipal-published camera, intentionally held for stricter live-vs-archive recheck).
- Featured-camera editorial audit remains 24 places spanning 18 countries and 21 providers; advisory only, currentness still wins.
- Geographic expansion priorities now explicitly favor South America, broader Africa, wider Asia, Oceania and Caribbean before adding more Europe/North America density.

Business lane:
- Explicit opportunity registry now has 12 VERIFIED_LINK_ADDED, 16 ACCOUNT_SEARCH_AND_EXACT_LINK_REQUIRED and 11 SOURCE_VERIFICATION_REQUIRED_BEFORE_EXACT_LINK entries.
- Verified offers currently cover 19 healthy ERN places.
- 16 additional healthy places are already in an explicit commercial queue; 57 healthy places remain intentionally unqueued for later evidence-led research.
- New exact-link opportunities include Aruba/Viator, Kīlauea/Viator and Torres del Paine/Viator.
- New source-gated opportunities include Taiwan/Klook, Hualien/Viator, Kruger/Viator and Ushuaia/Viator.
- Owner actions remain consolidated in data/owner-ready-expansion-batch.json and are intentionally not being requested yet.


## Large-batch checkpoint — 03:46 UTC

Visitor/source lane:
- Healthy searchable production baseline remains 91 distinct places.
- Private source research registry: 61 candidates total — 4 promoted and 57 still human-playback-gated.
- Added Mauritius Tourism Promotion Authority research for Grand Baie, Pointe d’Esny and Saint-Félix using the current official 13-webcam claim plus MTPA named-location evidence.
- Added official Visit St. Maarten-endorsed 24/7 research candidates for Maho Beach, Great Bay/Philipsburg Boardwalk and Simpson Bay without duplicating the existing Little Bay source.
- Geography-gap counts were rebuilt from the actual registry; new-country and underrepresented-region expansion remains preferred over raw count growth.
- Source verification queue now ranks the expanded backlog and keeps owner checks dormant until autonomous research ceases to be the limiting factor.

Business lane:
- Opportunity registry: 42 entries — 12 verified-link, 18 exact-link-required, 12 source-gated.
- Mauritius/Klook is source-gated behind live-camera promotion.
- Boulders Beach/Viator is queued for an exact tracked link because current Viator inventory explicitly covers the penguin colony/Cape Peninsula.
- St. Maarten/Viator is queued using the existing healthy Little Bay place; future verified Maho/Great Bay/Simpson Bay places should reuse the same island-level link rather than multiply commercial density.
- Commercial priority matrix was refreshed after these additions so queued destinations are removed from future research.


## Large-batch checkpoint — 03:55 UTC

Visitor/source lane:
- Production baseline remains 91 healthy searchable places.
- Private source research registry is now 67 candidates total: 4 promoted and 63 awaiting human playback verification.
- Mauritius Tourism Promotion Authority family added: Grand Baie, Pointe d’Esny and Saint-Félix.
- Visit St. Maarten-endorsed 24/7 family added: Maho Beach, Great Bay/Philipsburg Boardwalk and Simpson Bay.
- Official Lake Wānaka Tourism family added: town view, Lake Wānaka, Mt Aspiring and Lake Hāwea views.
- Official Rotorua NZ family added: Skyline city/lake view and Museum/Government Gardens/Lake view.
- All new sources remain fail-closed until human playback verification.

Business lane:
- Commercial registry now contains 44 opportunities: 12 verified-link, 18 exact-link-required and 14 source-gated.
- Added Mauritius/Klook, Wānaka/Klook and Rotorua/Viator source-gated paths.
- Added St. Maarten/Viator exact-link research using the existing healthy Little Bay source and future reuse for any verified island cameras.
- Boulders Beach/Viator remains queued for a tightly scoped exact tracked link.
- Existing-partner-first remains the operating rule.


## Quasi-live searchable expansion milestone — 106

Owner policy now explicitly permits trustworthy quasi-live material for Search/Explore when continuous live video is unavailable. Accepted material includes official frequently refreshed webcam stills, current monitoring images and recent provider-published images with reliable timestamps.

Production-searchable growth:
- Previous healthy/searchable baseline: 91 distinct places
- First quasi-live batch: +9 places
- Second quasi-live batch: +6 places
- New healthy/searchable baseline: **106 distinct places**

The 15 quasi-live additions are held out of Watch Earth by default through `featuredHold` + `watchHold`. They remain clearly labeled `LIVE_IMAGE` / current monitoring rather than live video.

New searchable places include:
- Casey, Davis, Mawson and Macquarie Island
- Poás, Turrialba, Irazú and Rincón de la Vieja
- Cotopaxi and El Reventador
- San Cristóbal, Telica, Momotombo, Masaya and Concepción/Ometepe

Business side:
- Poás, Rincón de la Vieja, Cotopaxi and Nicaragua volcano-family opportunities can now move from source-gated research to exact tracked-link research.
- Irazú and Turrialba Viator opportunities were added as account-search/exact-link candidates.
- No automatic placement, invented URL, paid ranking or public activation occurred.

Candidate-state reconciliation:
```json
{
  "PROMOTED_TO_SOURCE_REGISTRY": 4,
  "HUMAN_PLAYBACK_REQUIRED": 93,
  "PROMOTED_TO_SEARCHABLE_QUASI_LIVE": 15
}
```


## Quasi-live searchable tranche — 05:15 UTC

- ERN now has **161 healthy/searchable distinct places**.
- Search/Explore may include clearly labeled quasi-live LIVE_IMAGE sources from trustworthy current/refreshed provider pages.
- Watch Earth remains stricter; quasi-live pages are not promoted as continuous live video.
- Newly added searchable destinations: Salzburg, Tallinn TV Tower, Lake Bled, Poiana Brașov, Grand Baie, Pointe d’Esny, Rotorua, Wānaka, Ala-Archa, Issyk-Kul and Shymbulak.
- Business-source gates were advanced only where the corresponding ERN place is now searchable.
- Current commercial queue state: {"VERIFIED_LINK_ADDED":16,"ACCOUNT_SEARCH_AND_EXACT_LINK_REQUIRED":63,"SOURCE_VERIFICATION_REQUIRED_BEFORE_EXACT_LINK":27,"SOURCE_GAP_MUST_BE_SOLVED_FIRST":1}.
- Stretch target remains ~200 useful searchable places; current gap to 200 is 39.


## Second quasi-live tranche — 05:30 UTC

- Healthy/searchable distinct places: **172**
- Source records: **179**
- Remaining to 200-place stretch target: **28**
- Newly searchable: Kilpisjärvi, Rochers-de-Naye/Montreux, Innsbruck city, Nordkette, Patscherkofel, Kühtai, Maho Beach, Great Bay/Philipsburg, Satara, Olifants and Mendoza.
- Newly advanced commercial research: Mendoza, St. Maarten, Innsbruck/Tyrol, Montreux, Kilpisjärvi and Kruger.
- Truth and commercial safeguards unchanged.


## Third quasi-live tranche — Croatia / Greece / Georgia / Nepal

- Healthy/searchable distinct places: **178**
- Source records: **186**
- Remaining to 200 stretch target: **22**
- Newly searchable: Dubrovnik, Mykonos, Santorini, Gudauri, Kobi and Khumbu Glacier.
- Newly actionable exact-link research: Dubrovnik/Viator, Mykonos/Viator, Santorini/Viator, Gudauri/Klook and Everest/Viator.
- Quasi-live remains Search/Explore only unless stricter live playback verification is later completed.
