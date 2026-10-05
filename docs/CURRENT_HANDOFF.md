# Current ERN handoff

Use `docs/ERN_SOFT_LAUNCH_STAGE1_HANDOFF_2026-10-02.md` as the canonical Soft Launch continuity point and `docs/AFFILIATE_COVERAGE_EXPANSION_2026-10-02.md` as the current commercial coverage audit.

Current operating state:
- **ERN Soft Launch / Operating Stage 1**
- **OPERATE · VERIFY · MAINTAIN · FOCUSED EXPANSION AUTHORIZED**
- AI Search Discovery Readiness is complete and production-validated.
- Minimal first-party aggregate analytics and search-gap logging are active.
- Affiliate Coverage Expansion Batch A is complete: Kyoto/Klook, Seoul/Klook, Rome/Tiqets and Rovaniemi/Klook exact destination links are human-verified and recorded.
- Commercial ranking remains independent of commission/payout.
- Existing public feature gates remain unchanged.

Preserve completed Phases 6–10, current GitHub `main`, deployed production work, affiliate/SEO/analytics work, and all existing feature gates.

Commercial payout state:
- Travelpayouts payout method was configured and email-confirmed by the owner on 2026-10-02.
- Viator payout setup was confirmed completed by the owner on 2026-10-02.
- No current payout-setup blocker remains for the active ERN affiliate relationships.

Next commercial work should be demand-led from real analytics rather than offer-count expansion. Accommodation/stay remains the largest partner-category gap, but no new account or terms should be accepted without explicit owner approval.

Older dated handoffs remain historical context only.


Production incident — 2026-10-02:
- Owner browser testing exposed Watch Earth at 0 current windows and widespread RECHECK DUE states.
- Root cause: public currentness horizons were too short for real operation (24h embeds / 72h external-live) while Operations only reported rechecks and did not mutate source evidence.
- Repaired policy: embed 168h, external-live 168h, live-image 72h, general external page 336h; embed playback proof aligned to 168h.
- Watch Earth release audit now includes the actual current clock, not only historical anchor timestamps, preventing silent deploys with zero current windows.
- A stale commercial preflight that still required Travelpayouts payout readiness to be false was also corrected after owner payout setup.
- Current-clock Operations validation after repair reported 11 Watch Earth windows, 11 places, 6 countries and 6 providers.
- Pages run 37025041354 completed SUCCESS and deployed the repair.


First-impression / discovery breadth tranche — 2026-10-02:
- Watch Earth no longer artificially caps external-current views at 12 when inside-ERN embeds are below the preferred count; it can now fill the truthful 20-window target while still preferring inside playback.
- Explore now surfaces 30 places on the initial no-query view instead of 12 and reports the broader discoverable/current place count.
- Actual-clock Watch Earth release audit now fails if production falls below 8 current windows.
- A separate ERN Live Health Watch is active and will only alert on severe current-window collapse or broken core live/search/map functionality.
- Performance ceiling remained enforced; the broader-discovery change was trimmed to stay under the app-size budget.
- Pages deployment for the broadened discovery build completed successfully.

Affiliate Expansion Batch B:
- Prepared across all four approved relationships.
- Klook: Bangkok, Singapore.
- Tiqets: Chicago, London.
- Viator: Dublin, Cape Town.
- Welcome Pickups: Bangkok, Rome.
- Exact tracked links are still owner-side evidence; no fabricated or automatic partner links are allowed.
- See `docs/AFFILIATE_EXPANSION_BATCH_B_2026-10-02.md`.


Focused expansion authorization — 2026-10-03:
- Owner explicitly asked ERN to continue on two parallel lanes: (1) featured cameras + more healthy searchable places, and (2) business-side expansion.
- Current healthy searchable destination baseline after Vienna/Helsinki/Koli/Turku promotion: 91 distinct places from 98 source records.
- Content goal: grow carefully toward roughly 150–200 genuinely useful searchable destinations; candidates remain research-only until source-specific live/playback verification.
- Current next source-verification pool includes Prague tower cameras, additional Finland/Switzerland candidates, Salzburg, and official Madeira Tourism webcams.
- Business expansion should still prefer the four already-active relationships before opening new partner accounts.
- New York legacy affiliate place IDs were repaired to the canonical new-york-harbor place so existing verified Klook/Tiqets links can become useful again without new owner setup.
- New commercial opportunities queued without public activation: Vienna/Tiqets, Helsinki/Viator, Turku/Viator.
- No paid ranking, automatic placement, automatic link rewriting, or unverified affiliate link publication is permitted.


Large focused expansion batch — 2026-10-03:
- Visitor lane remains at 91 healthy searchable places while the private research queue expands toward 150–200 genuinely useful destinations.
- Prague exact camera targets are isolated; Salzburg, Innsbruck, Dubrovnik, Malta and Tallinn are reduced to one-click owner verification paths.
- Official Innsbruck Tourism family expanded in research with distinct Patscherkofel, Mieminger Plateau, Telfs, Kühtai, Lüsens, Nordkette, Stadtturm and Swarovski Kristallwelten/Wattens candidates. None are public/current until human playback verification.
- Business opportunity queue expanded with Zermatt/Viator, San Diego Zoo/Viator and Whistler/Viator research in addition to Vienna, Helsinki, Lucerne, Tbilisi, Cancún, Yellowstone, Georgia Aquarium and San Diego Zoo/Tiqets.
- Prague/Tiqets and Salzburg/Tiqets are explicitly gated behind successful source promotion first.
- Accommodation partner research remains fail-closed for Hotels.com and Trip.com until ERN-owner Travelpayouts availability is checked.
- A consolidated machine-readable operating plan now lives at data/focused-expansion-plan.json.
- All existing public gates and commercial-neutral ranking safeguards remain unchanged.


Large-batch expansion checkpoint — 2026-10-03 02:20 UTC:
- Performance/release issue resolved without weakening the strict size budget; Pages subsequently achieved a successful deployment with syntax/Operations safeguards intact.
- Healthy searchable baseline remains 91 distinct places; source research queue expanded to 41 total candidates (4 promoted, 37 playback-gated).
- Innsbruck official source family expanded with eight distinct city/mountain/village/attraction candidates; no candidate was promoted automatically.
- Source verification is now prioritized in data/source-verification-priority.json.
- Business opportunity registry expanded with Tallinn/Tiqets, Malta/Tiqets, Dubrovnik/Viator, Zermatt/Viator, San Diego/Viator and Whistler/Viator research paths.
- Commercial expansion is now additionally prioritized across uncovered healthy places in data/commercial-priority-matrix.json.
- Existing four partners remain the preferred expansion path; accommodation candidates remain research-only; all public ranking/commercial safeguards remain unchanged.


Large-batch expansion checkpoint — 2026-10-03 03:20 UTC:
- Current healthy/searchable baseline remains 91 places; private playback-gated expansion queue is now 49 candidates.
- Added official Taiwan Tourism Administration Live Taiwan research family (8 distinct places) and additional SANParks research family (Satara, Olifants, Punda Maria, Talamati) without auto-promoting any source.
- Added data/featured-camera-rotation.json: 24-place editorial audit spanning 18 countries and 21 providers, advisory only and commercial-neutral.
- Added/updated geographic gap planning so Europe/North America growth is controlled while South America, broader Africa, wider Asia, Oceania and Caribbean are prioritized.
- Commercial opportunity registry now has 12 verified-link, 16 exact-link-required and 10 source-gated opportunities.
- Added Aruba, Kīlauea and Torres del Paine Viator opportunities plus Taiwan/Klook, Hualien/Viator and Kruger/Viator source-gated paths.
- Healthy places with verified offers remain 19; 16 additional healthy places now have an explicit commercial queue, reducing the unqueued healthy-commercial gap to 57.
- Owner actions remain batched and dormant until truly needed; no automatic placement, rewriting, paid ranking or unverified promotion.


Large-batch expansion checkpoint — 2026-10-03 02:32 UTC:
- Public healthy/searchable baseline remains 91; private playback-gated source queue expanded to 51 candidates without weakening truth/currentness rules.
- Added official Taiwan Tourism Administration family (8), additional SANParks family (4), Mendoza municipal live-camera candidate, and conservative Ushuaia municipal harbour candidate.
- Featured editorial audit remains geographically broad: 24 places / 18 countries / 21 providers, advisory and commercial-neutral.
- Geography-gap plan now suppresses Europe/North America overexpansion and prioritizes underrepresented South America, broader Africa, wider Asia, Oceania and Caribbean.
- Commercial opportunity states: 12 verified-link, 16 exact-link-required, 11 source-gated.
- Verified offers cover 19 healthy places; 16 more healthy places have explicit commercial queues; 57 remain deliberately unqueued pending stronger evidence.
- Added Aruba, Kīlauea and Torres del Paine Viator exact-link opportunities; added Taiwan/Klook, Hualien/Viator, Kruger/Viator and Ushuaia/Viator source-gated paths.
- Owner work remains bundled in one dormant packet; no new affiliate program activation, automatic placement, rewriting, paid ranking or unverified source promotion occurred.


Large-batch expansion checkpoint — 2026-10-03 03:46 UTC:
- Public healthy/searchable baseline remains deliberately unchanged at 91 distinct places; no research-only camera was promoted automatically.
- Private source research registry now contains 61 candidates: 4 promoted, 57 human-playback-gated.
- New underrepresented-region families: Mauritius Tourism Promotion Authority (Grand Baie, Pointe d’Esny, Saint-Félix) and official Visit St. Maarten-endorsed cameras (Maho Beach, Great Bay/Philipsburg Boardwalk, Simpson Bay).
- Geography-gap accounting was rebuilt from the real candidate registry so South America, Africa, Asia and Caribbean backlog counts no longer disappear from planning.
- Commercial registry now contains 42 opportunities: 12 verified-link, 18 exact-link-required, 12 source-gated.
- New business paths: Mauritius/Klook after camera verification, Boulders Beach/Viator exact-link research, and St. Maarten/Viator exact-link research using the already-healthy Little Bay place.
- Source verification priority, commercial priority matrix, focused expansion plan and dormant owner packet were all refreshed together to avoid duplicate future research.
- Existing four affiliate relationships remain the preferred path; new partner activation, paid ranking, automatic placement/rewriting and unverified source promotion remain prohibited.


Large-batch expansion checkpoint — 2026-10-03 03:55 UTC:
- Healthy/searchable production baseline remains 91; no research-only source was promoted automatically.
- Private source research registry now contains 67 candidates: 4 promoted and 63 human-playback-gated.
- Added new underrepresented-region families from official tourism sources: Mauritius (Grand Baie, Pointe d’Esny, Saint-Félix), St. Maarten (Maho Beach, Great Bay/Philipsburg Boardwalk, Simpson Bay), Wānaka (4 views) and Rotorua (2 views).
- Commercial opportunity registry now contains 44 entries: 12 verified-link, 18 exact-link-required and 14 source-gated.
- New business paths include Mauritius/Klook, St. Maarten/Viator, Wānaka/Klook and Rotorua/Viator; all source-gated where appropriate.
- Boulders Beach/Viator is queued as an exact-link opportunity from an already-healthy ERN place.
- Geography gaps, verification priority, commercial matrix, focused plan and dormant owner batch were refreshed after each expansion family.
- Public ranking remains commercial-neutral; no automatic placement, rewriting, new partner activation or unverified source promotion occurred.


Pamir Mountains gap — 2026-10-03:
- ERN currently has no Pamir Mountains / Tajikistan live camera in the active source registry or research candidates.
- Public-web research found official Tajikistan/Pamir destination material and current commercial Pamir Highway inventory, but no trustworthy source-specific always-current live camera suitable for promotion.
- Pamir is now tracked as a P1 source gap in data/source-gap-watchlist.json, targeting Khorog, Murghab, Karakul Lake, Wakhan Valley and the Pamir Highway.
- A future Viator Pamir opportunity is recorded, but it is explicitly blocked until ERN first obtains and verifies a genuine Pamir current/live source.


Central Asia expansion lane — 2026-10-03:
- Pamir/Tajikistan remains a P1 unresolved live-source gap; no trustworthy scenic live camera was found yet for Khorog, Murghab, Karakul Lake, Wakhan Valley or the Pamir Highway.
- Adjacent high-value live-camera research was added for Shymbulak Mountain Resort (Kazakhstan), Karakol Ski Base, Ala-Archa Natural Park and Osh/Sulaiman-Too (Kyrgyzstan).
- Shymbulak and Karakol have official resort camera pages; KG Camera explicitly publishes live/no-archive cameras for Ala-Archa and Osh with a short delay.
- These adjacent cameras improve Central Asia representation but do not count as solving the Pamir gap.
- Viator/Shymbulak and Viator/Karakol future opportunities are source-gated; Pamir/Viator remains blocked until a genuine Pamir live source exists.


Central Asia large-batch checkpoint — 2026-10-03 03:35 UTC:
- Pamir/Tajikistan remains an explicitly unresolved P1 source gap. Fresh English/Russian web research still found no trustworthy scenic current camera for Murghab, Khorog, Karakul Lake, Wakhan Valley or the Pamir Highway; Windfinder currently reports no nearby Murghab webcams.
- No prerecorded Pamir travel video, weather iframe or generic directory was promoted as LIVE.
- Kyrgyzstan adjacent coverage was deepened with direct, source-specific KG Camera targets for Karakol Ski Base, Ala-Archa Natural Park, Osh/Sulaiman-Too, Naryn central square, Too-Ashu Pass north entrance, Suusamyr Valley, Balykchy, Issyk-Kul/KarVen Four Seasons and Bishkek/Ala-Too Square.
- KG Camera states its feeds are unarchived surveillance with about a 20-second delay; every candidate still requires owner playback confirmation before ERN promotion.
- Viator source-gated opportunities were added for Ala-Archa/Bishkek and Issyk-Kul, based on current Viator inventory. Commercial links remain blocked until the corresponding camera/source is promoted.
- Central Asia adjacent cameras improve regional breadth but do not count as solving the Pamir/Tajikistan gap.
- Focused expansion counts and source-verification priorities were reconciled after the batch.


Mountain expansion checkpoint — 2026-10-03 02:45 UTC:
- Pamir research was broadened across Tajik core, Wakhan/Murghab/Karakul, Kyrgyz Alay/Osh/Batken and eastern approaches. No trustworthy core-Pamir live camera was confirmed; ERN preserves this as an explicit research gap instead of substituting prerecorded travel video.
- Added playback-gated Central Asia gateway candidates: Osh Sulaiman-Too, Batken panorama and Ala-Archa National Park.
- Added playback-gated mountain candidates outside the Pamir where live evidence is stronger: Gudauri, Kobi, Shymbulak, Everest/Hotel Everest View and Khumbu Glacier scientific camera.
- New source-gated business paths prepared: Klook Pamir Highway, Klook Ala-Archa, Klook Gudauri, Klook Shymbulak and Viator Everest/Khumbu.
- Source verification priorities and the focused expansion plan were refreshed so owner checks remain small, one-click where possible, and commercially useful only after truth verification.


Pamir / Kyrgyz approach research — 2026-10-03:
- Core Pamir remains intentionally unresolved: no trustworthy live feed found for Murghab, Karakul Lake, Wakhan, Ak-Baital or comparable core Tajik Pamir locations.
- ERN will not substitute prerecorded travel videos, GNSS monitoring stations or static tourism media for live Earth truth.
- Added research-only Kyrgyz mountain/approach candidates from kg.camera: Osh/Sulayman-Too, Batken, Razzakov, Suusamyr Valley, Ala-Archa and Karakol Ski Base.
- These broaden Central Asia coverage without falsely labeling them as Pamir proper.


Central Europe / Aegean expansion batch — 2026-10-03:
- Added research-only live candidates for Lake Bled (Slovenia), Mykonos New Port (Greece), Santorini caldera/Imerovigli (Greece), and Poiana Brașov (Romania).
- Bled and Mykonos use official tourism/municipal live pages; Poiana Brașov uses destination tourism webcam pages; Santorini uses a strong long-running provider live stream and remains link-only unless rights are explicitly established.
- Added source-gated Viator business opportunities for Bled, Mykonos, Santorini and Brașov; none can activate before the corresponding live source is human-confirmed and promoted.
- Pamir core remains intentionally unresolved; six Kyrgyz approach/mountain candidates are research-only and do not masquerade as Pamir proper.
- Source verification priority and focused expansion plan were refreshed after this batch.


Scenic-place commercial expansion — 2026-10-03:
- Added exact-link research paths for Flåm/Aurlandsfjord, Addo Elephant National Park, Chamonix/Mont Blanc, Bergen and Pico Island using the already-active Viator relationship.
- Each remains account-search / exact-link gated; no URL is invented and no public placement occurs until owner-generated tracked-link verification.
- Commercial priority matrix was refreshed so newly queued places stop appearing as generic uncovered research.


Istanbul / Bali world-gap batch — 2026-10-03:
- Added official Istanbul Metropolitan Municipality touristic-camera candidates for Sultanahmet and a Bosphorus-side view family.
- Added official Denpasar City ATCS real-time CCTV as a Bali urban live-source candidate; only a visually useful camera should be promoted.
- Added source-gated Klook + Viator business paths for Istanbul and Klook/Viator paths for Bali/Denpasar, with duplicate commercial density explicitly discouraged.
- Source verification priority and focused expansion plan refreshed.


World-gap large batch — 2026-10-03 04:20 UTC:
- Production healthy/searchable baseline remains intentionally 91; no research-only source was auto-promoted.
- Source research registry expanded with official Australian Antarctic Program webcams for Casey, Davis, Mawson and Macquarie Island. AAD states station images refresh every few minutes, so any future ERN promotion must use LIVE_IMAGE/current-image semantics rather than continuous-video claims.
- Added official Panama Canal Authority camera family for Miraflores, Gatún, Pedro Miguel, Cocolí and Agua Clara Locks. ACP explicitly presents these as real-time canal web cameras.
- Added one source-gated Panama Canal/Viator commercial path to serve the whole verified lock family rather than multiplying duplicate affiliate placements.
- Pamir/Tajikistan remains unresolved by design; adjacent Central Asia cameras do not count as a Pamir solution.
- Source-verification priorities were rebuilt using human-check ease, country novelty and business unlock value without allowing commercial value to change truth state.
- Commercial priority matrix was cleaned so places already covered by verified offers or explicit opportunity paths are no longer re-researched.
- Added data/geographic-expansion-plan.json to control future regional density: underrepresented Antarctica, Central America, South America, Africa, Oceania and Caribbean are prioritized while Europe/North America expansion is deliberately restrained.
- Owner-ready batch and focused expansion plan were refreshed from the canonical registries; owner work remains dormant until autonomous research is no longer the bottleneck.


KenyaLIVE / polar / canal checkpoint — 2026-10-03:
- Public healthy/searchable production baseline remains 91; no research-only source was auto-promoted.
- Research registry now contains 101 candidates: 4 promoted and 97 human-playback-gated.
- Added official Australian Antarctic Program current-image research for Casey, Davis, Mawson and Macquarie Island. AAD explicitly states station webcams refresh as still images every few minutes, so future ERN truth must be LIVE_IMAGE/current-image, not continuous-video.
- Added official Panama Canal Authority real-time camera research for Miraflores, Gatún, Pedro Miguel, Cocolí and Agua Clara Locks; one shared future Viator canal path is source-gated behind actual camera promotion.
- Added KWS KenyaLIVE / Nairobi National Park as a P1 official-government research candidate after Kenya Wildlife Service announced daily real-time wildlife broadcasts launched at Nairobi National Park on 22 September 2026. A Nairobi/Viator business path is source-gated behind park-specific live verification.
- Pamir/Tajikistan remains deliberately unresolved; ERN still refuses prerecorded or generic-camera substitutes.
- Source-verification priority, focused plan and dormant owner batch were refreshed together; autonomous research remains the active workstream.
- Commercial states now reconcile to: 12 verified-link, 23 exact-link-required, 33 source-gated, 0 live-source-gap-blocked.


Americas official-camera expansion checkpoint — 2026-10-03 03:50 UTC:
- Public healthy/searchable baseline remains intentionally 91; no research-only source was auto-promoted.
- Private source research registry now contains 112 candidates: 4 promoted and 108 human-playback-gated.
- Added official Costa Rica OVSICORI current-image candidates for Poás, Turrialba, Irazú and Rincón de la Vieja. OVSICORI documents automatic 5-second refresh on these camera pages, so future ERN promotion must use LIVE_IMAGE/current-image truth rather than imply continuous video.
- Added official Nicaragua INETER real-time volcano-image family for San Cristóbal, Telica, Momotombo, Masaya and Concepción. INETER states these public webcam images update every 30 seconds or 1 minute.
- Added official Ecuador IG-EPN visual-monitoring candidates for Cotopaxi and El Reventador; multiple camera angles are treated as one destination each to avoid fake place inflation.
- Commercial opportunity registry now contains 74 entries: 12 verified-link, 24 exact-link-required, 37 source-gated and 1 source-gap-blocked.
- New business paths: Poás/Klook, Rincón de la Vieja/Viator, Cotopaxi/Viator, Nicaragua volcano family/Viator, plus Marco Island/Viator from an already-healthy ERN place.
- Source verification priority, commercial matrix, geographic plan and focused expansion plan were rebuilt from the canonical registries after the batch.
- Pamir/Tajikistan remains deliberately unresolved; adjacent or unrelated mountain cameras do not count as solving that gap.


Healthy-place business expansion checkpoint — 2026-10-03 04:00 UTC:
- Business growth is no longer waiting only on future camera verification.
- Added explicit Klook exact-link queues for already-healthy Takayama, Taitung and Toyama/Tonami ERN places after confirming current Klook destination inventory.
- Commercial registry now contains 77 opportunities: 12 verified-link, 27 exact-link-required, 37 source-gated and 1 source-gap-blocked.
- Commercial priority matrix and focused plan were rebuilt so these places are not repeatedly rediscovered as uncovered opportunities.
- Existing-partner-first rule remains active; exact tracked-link generation is still owner/account-side and no URL is invented.


Commercial canonical-ID cleanup — 2026-10-03 04:10 UTC:
- Normalized older commercial opportunity records from source/camera IDs to canonical ERN place IDs wherever the active source registry provided an unambiguous mapping.
- This repaired false 'uncovered' status for verified/commercially queued places including Kyoto, Rome, Seoul, Rovaniemi and Chicago.
- Commercial priority matrix was rebuilt from canonical place IDs so future business research focuses on genuinely uncovered healthy places instead of rediscovering already-covered destinations.
- Future research-only candidate IDs remain untouched because they do not yet have canonical active-source place IDs.
- Current top genuinely-uncovered healthy-place queue begins with: koli-lake-pielinen, meads-bay-anguilla, oeschinensee, amden-walensee, new-york-harbor, lauderdale-by-the-sea, maui-hale-pau-hana, st-johns-harbour, orpen-kruger, kijihiki-plateau, waikiki-south-shore, metung-gippsland-lakes.


Verified-offer registry reconciliation — 2026-10-03 04:20 UTC:
- Commercial opportunity registry was reconciled against data/travel-offers.json so already-verified offer places no longer appear falsely uncovered.
- Synced verified coverage for Auckland Viaduct Harbour, New York Harbor, Coogee/Randwick (Sydney) and Waikiki Beach from existing verified tracked offers.
- Verified-link opportunity count is now 16; exact-link queue 27; source-gated 37; source-gap-blocked 1.
- Commercial matrix was rebuilt after synchronization, leaving only genuinely uncovered healthy places for future research.


Quasi-live searchable policy — 2026-10-03:
- Owner explicitly approved frequently refreshed webcams, updated cameras and recent provider-published pictures as valid ERN Search/Explore sources when live video is unavailable.
- Truth remains explicit: these are LIVE_IMAGE/current-monitoring or recent-image sources, never mislabeled LIVE VIDEO.
- Watch Earth remains stricter. Quasi-live additions default to featuredHold/watchHold unless separately reviewed for the featured experience.
- First autonomous quasi-live promotion batch added 9 distinct searchable places: Casey, Davis, Mawson, Macquarie Island, Poás, Turrialba, Irazú, Rincón de la Vieja and Cotopaxi.
- Healthy/searchable baseline therefore moves from 91 to 100 distinct places.
- Related business gates cleared for Poás, Rincón de la Vieja and Cotopaxi; Irazú and Turrialba Viator research was added. Exact tracked links remain owner/account-side and manually verified.
- Pamir remains deferred; no weak substitute is required now that quasi-live is an accepted future search lane.


Second quasi-live searchable batch — 2026-10-03:
- Promoted five official INETER volcano places in Nicaragua: San Cristóbal, Telica, Momotombo, Masaya and Concepción/Ometepe.
- INETER explicitly says public volcano-camera images arrive in real time every 30 seconds or 1 minute; ERN therefore labels them LIVE_IMAGE/current imagery, not live video.
- Promoted El Reventador visual monitoring from Instituto Geofísico EPN as a searchable quasi-live source.
- All six new places default to featuredHold + watchHold, keeping Watch Earth stricter than Search/Explore.
- Healthy/searchable baseline increases to 106 distinct places.
- Nicaragua/Viator commercial path moved from source-gated to exact-link research; no tracked URL is invented or activated automatically.


Central America quasi-live expansion — 2026-10-03:
- Owner explicitly approved quasi-live searchable content: refreshed webcams/current images/recent provider-published pictures are acceptable when clearly labeled; Watch Earth remains stricter and continuous-live/current.
- Added eight official-government LIVE_IMAGE searchable places without pretending they are continuous video:
  - Nicaragua / INETER: San Cristóbal, Telica, Momotombo, Masaya, Concepción/Ometepe and Cerro Negro.
  - Guatemala / INSIVUMEH: Volcán de Fuego and Santiaguito.
- INETER documents real-time/current volcano images at 30-second/1-minute network cadence, with several detail pages around five-minute refresh; INSIVUMEH states its volcano platform updates every minute.
- These sources are LINK_ONLY and searchable; they do not enter Watch Earth as live video.
- New business paths from the already-active Viator relationship: Fuego/Antigua, Cerro Negro/León and Masaya/Nicaragua. Exact tracked-link verification remains mandatory.
- Quasi-live discovery may unlock commercial planning, but commercial value cannot affect source truth, ranking or currentness.
- Healthy/searchable distinct-place baseline after this batch: 112.


Quasi-live scale-up checkpoint — 2026-10-03 04:42 UTC:
- Searchable/healthy distinct-place baseline has grown to 118; 32 more places remain to the 150-place minimum target.
- Healthy LIVE_IMAGE/quasi-live source records now total 44; Watch Earth continues to exclude quasi-live-only sources from continuous-live claims.
- Latest additions include six official GeoNet / Earth Sciences New Zealand current-image destinations: Ruapehu, Ngauruhoe, Tongariro, Taranaki Maunga, Rangitāhua/Raoul Island and Whakaari.
- Central America quasi-live additions remain eight official-government volcano places across Nicaragua and Guatemala.
- Source candidate states now reconcile to {"PROMOTED_TO_SOURCE_REGISTRY":18,"HUMAN_PLAYBACK_REQUIRED":93,"PROMOTED_TO_SEARCHABLE_QUASI_LIVE":13}.
- Commercial opportunity states now reconcile to {"VERIFIED_LINK_ADDED":16,"ACCOUNT_SEARCH_AND_EXACT_LINK_REQUIRED":37,"SOURCE_VERIFICATION_REQUIRED_BEFORE_EXACT_LINK":33,"SOURCE_GAP_MUST_BE_SOLVED_FIRST":1}.
- Klook/Tongariro is queued as a single destination-level commercial bridge across Tongariro/Ngauruhoe/Ruapehu, exact-link gated.
- Validation metadata was tightened: normalized aliases are deduplicated and all newly important quasi-live sources carry explicit representative-place coordinates with non-camera-position disclosure.


Quasi-live searchable expansion checkpoint — 2026-10-03 05:15 UTC:
- Healthy/searchable ERN coverage is now 161 distinct places from 168 source records.
- Source truth mix is now {"LIVE_VIDEO":13,"EXTERNAL_LIVE":70,"LIVE_IMAGE":85}.
- User-approved policy is active: trustworthy refreshed/current provider imagery may be searchable as clearly labeled LIVE_IMAGE / quasi-live; Watch Earth remains live/current only.
- Newly promoted searchable places include Salzburg, Tallinn TV Tower, Lake Bled, Poiana Brașov, Grand Baie, Pointe d’Esny, Rotorua, Wānaka, Ala-Archa, Issyk-Kul and Shymbulak.
- Multi-view families are grouped under one real destination where appropriate to avoid artificial place-count inflation.
- Research registry now has 156 candidates with states {"PROMOTED_TO_SOURCE_REGISTRY":53,"HUMAN_PLAYBACK_REQUIRED":73,"PROMOTED_TO_SEARCHABLE_QUASI_LIVE":24,"SUPERSEDED_BY_QUASI_LIVE_PROMOTION":6}.
- Commercial registry now has 107 opportunities with states {"VERIFIED_LINK_ADDED":16,"ACCOUNT_SEARCH_AND_EXACT_LINK_REQUIRED":63,"SOURCE_VERIFICATION_REQUIRED_BEFORE_EXACT_LINK":27,"SOURCE_GAP_MUST_BE_SOLVED_FIRST":1}.
- Source gates were advanced to exact-link research where the corresponding place is now legitimately searchable; no exact URL was invented and no public affiliate placement was activated.
- Pamir remains deferred as an unresolved source gap; no weak substitute is being used.


Second quasi-live expansion checkpoint — 2026-10-03 05:30 UTC:
- Healthy/searchable ERN coverage is now 172 distinct places from 179 source records; 28 remain to the 200-place stretch target.
- Added searchable quasi-live places: Kilpisjärvi/Saana, Montreux/Rochers-de-Naye, Innsbruck city, Nordkette, Patscherkofel, Kühtai, Maho Beach, Great Bay/Philipsburg, Satara, Olifants and Mendoza Plaza Independencia.
- Multi-view Innsbruck city research was grouped into one real city place instead of inflated duplicate place identities.
- Current truth mix: {"LIVE_VIDEO":13,"EXTERNAL_LIVE":70,"LIVE_IMAGE":96}.
- Candidate states: {"PROMOTED_TO_SOURCE_REGISTRY":53,"HUMAN_PLAYBACK_REQUIRED":61,"PROMOTED_TO_SEARCHABLE_QUASI_LIVE":35,"SUPERSEDED_BY_QUASI_LIVE_PROMOTION":7}.
- Commercial opportunity states: {"VERIFIED_LINK_ADDED":16,"ACCOUNT_SEARCH_AND_EXACT_LINK_REQUIRED":71,"SOURCE_VERIFICATION_REQUIRED_BEFORE_EXACT_LINK":27,"SOURCE_GAP_MUST_BE_SOLVED_FIRST":1}.
- New exact-link research paths include Mendoza, St. Maarten, Innsbruck/Tyrol, Montreux, Kilpisjärvi and Kruger camp coverage using existing partners.
- Watch Earth remains strict live/current; quasi-live additions are Search/Explore content only unless separately verified for live playback.


Third quasi-live expansion checkpoint — 2026-10-03:
- Healthy/searchable ERN coverage is now 178 distinct places from 186 source records.
- Added geography-balanced searchable destinations in Croatia, Greece, Georgia and Nepal: Dubrovnik, Mykonos, Santorini, Gudauri, Kobi and Khumbu Glacier.
- Dubrovnik Pile/Gruž are grouped under one Dubrovnik place to avoid duplicate-place inflation.
- Current truth mix: {"LIVE_VIDEO":13,"EXTERNAL_LIVE":70,"LIVE_IMAGE":103}.
- Candidate states: {"PROMOTED_TO_SOURCE_REGISTRY":53,"HUMAN_PLAYBACK_REQUIRED":54,"PROMOTED_TO_SEARCHABLE_QUASI_LIVE":42,"SUPERSEDED_BY_QUASI_LIVE_PROMOTION":7}.
- Commercial states: {"VERIFIED_LINK_ADDED":16,"ACCOUNT_SEARCH_AND_EXACT_LINK_REQUIRED":76,"SOURCE_VERIFICATION_REQUIRED_BEFORE_EXACT_LINK":22,"SOURCE_GAP_MUST_BE_SOLVED_FIRST":1}.
- Dubrovnik, Mykonos, Santorini, Gudauri and Everest/Khumbu business paths advanced from source-gated research to exact-link/account-search state.
- Remaining gap to 200 useful searchable places: 22.


Philippines / volcano quasi-live checkpoint — 2026-10-03 06:07 UTC:
- Healthy searchable production baseline is now 181 distinct places from 189 source records; only 19 remain to the ~200 stretch target.
- Added official DOST-PHIVOLCS one-minute current-image places for Mayon, Bulusan and Kanlaon under LIVE_IMAGE/Search-Explore semantics.
- Mauna Loa was already present as a healthy current-image place; its official USGS/HVO provenance is now reflected in the expansion/business lane without creating a duplicate place.
- Featured-camera editorial audit refreshed to 28 places / 19 countries / 24 providers; current/live ranking remains commercial-neutral and quasi-live does not become Watch Earth video.
- Commercial registry now contains 120 opportunities: 16 verified-link, 81 exact-link-required, 22 source-gated and 1 source-gap-blocked.
- New exact-link research paths: Mayon/Klook, Mauna Loa/Viator, Meads Bay/Viator, Grand Canyon/Viator and Chishang-Taitung/Klook.
- Pamir remains deferred as an unresolved source gap; no weak substitute will be forced into ERN.


200 searchable places milestone — 2026-10-03:
- ERN reached **200 healthy distinct searchable places** from 208 source records without weakening truth/currentness rules.
- Search/Explore now combines true live/external-live with clearly labeled quasi-live LIVE_IMAGE places; Watch Earth remains stricter and excludes quasi-live from continuous-live treatment.
- Final stretch additions included official Taiwan Tourism Administration operating images, five Panama Canal Authority real-time lock locations, PHIVOLCS Mayon/Bulusan/Kanlaon one-minute monitoring views, and a final Innsbruck/St. Maarten quasi-live tranche.
- data/sources.json was compacted under the strict 300 KB production ceiling by removing redundant null fields only; no place or truth evidence was deleted.
- Source alias audit issue for Erliao was fixed by replacing the intent-colliding alias “Erliao Sunrise” with place-specific aliases.
- Important-source coordinate/location metadata was completed for expanded sources rather than weakening the production audit.
- Post-target source work is now quality-led: improve true-live coverage, freshness and geographic balance rather than growing raw place count for its own sake.
- Featured editorial audit now spans 30 places / 22 countries / 27 providers, with 19 true live/external-live and 11 quasi-live selections. It remains advisory and commercial-neutral.
- Commercial opportunity registry remains downstream from discovery; existing Innsbruck/Tyrol and St. Maarten Viator paths were extended to new places instead of creating duplicate affiliate density.
- No new affiliate program, paid ranking, automatic placement, rewriting, public Guide or Now Moments gate was activated.


Post-200 searchable-place checkpoint — 2026-10-03 09:10 UTC:
- Production source registry now contains 208 source records representing 200 healthy distinct searchable places across 50 countries and 111 providers.
- Searchable-place stretch target of 200 is reached and production-deployed. Expansion strategy shifts from raw count growth to geography, freshness and source-quality upgrades.
- Truth mix: 13 LIVE_VIDEO, 70 EXTERNAL_LIVE, 125 LIVE_IMAGE. All LIVE_IMAGE records carry currentness timestamps and use the LIVE_IMAGE truth field as the canonical quasi-live/current-image label; Watch Earth remains ineligible for quasi-live sources.
- Featured-camera editorial rotation currently resolves entirely to healthy sources and remains commercial-neutral.
- Commercial opportunity registry now contains 121 opportunities: 16 verified-link, 93 exact-link/account-search, 11 source-gated and 1 unresolved source-gap item.
- Newly queued healthy-place business paths include Kenting/Klook, Green Island/Klook, St. John's/Viator, Maui/Kihei/Viator, Orpen-Kruger/Viator, Hveravellir/Viator and a regionalized Arequipa/Colca/volcano Viator path.
- Stale source-gated duplicate opportunities were removed for Salzburg, Tallinn, Wānaka, Rotorua and Bled; their canonical healthy-place exact-link records remain.
- Brașov/Poiana Brașov was upgraded from source-gated to exact-link-ready research because a healthy LIVE_IMAGE place now exists.
- data/owner-action-queue.json now bundles future human camera checks and exact tracked-link actions; owner interruption remains dormant until autonomous work is actually exhausted.
- Existing-partner-first, no paid ranking, no automatic placement/rewriting and no unverified live promotion rules remain unchanged.


Business expansion checkpoint — 2026-10-03 09:20 UTC:
- Searchable-place stretch target remains achieved at 200 healthy distinct places across 50 countries and 111 providers.
- Business registry now holds 121 explicit opportunities: 16 verified-link, 93 exact-link/account-search, 11 source-gated and 1 source-gap-blocked.
- Added exact-link research paths for Kenting/Klook, Green Island/Klook, St. John's/Viator, Maui-Kihei/Viator, Orpen-Kruger/Viator and Hveravellir/Viator.
- Arequipa/Colca volcano coverage was consolidated into one regional Viator path spanning Misti, Sabancaya, Coropuna and Chachani instead of multiplying duplicate affiliate placements.
- Removed stale future-gate duplicates for Salzburg, Tallinn, Wānaka, Rotorua and Bled where canonical healthy-place exact-link records already exist.
- Poiana Brașov is now exact-link-ready rather than source-gated because its healthy LIVE_IMAGE record is already in production.
- A dormant owner-action queue bundles future camera checks and exact tracked-link generation; no owner interruption is needed yet.
- Quasi-live truth is represented by LIVE_IMAGE rather than repeated category tags to preserve ERN's strict production-size ceiling.


200-place / Trip.com decision checkpoint — 2026-10-03:
- ERN has achieved the original focused-expansion target: 200 healthy searchable places from 208 source records.
- Searchable truth mix currently includes LIVE_VIDEO, EXTERNAL_LIVE and LIVE_IMAGE/quasi-live sources; Watch Earth remains stricter than Search/Explore.
- Content strategy now shifts from raw count growth to freshness, geographic quality, featured-camera strength and replacement of weak sources.
- Commercial registry has expanded substantially while preserving exact-link and no-paid-ranking safeguards.
- Accommodation/stay is now the largest commercial-category gap.
- Trip.com is now worth an owner status check inside Travelpayouts My Programs; do not assume availability from the public catalog and do not open a separate direct account yet.
- One bundled owner-commercial packet now contains the Trip.com status check plus the next eight high-value exact-link actions using existing partners.


202-place freshness / Trip.com checkpoint — 2026-10-03 09:52 UTC:
- ERN now has 202 healthy searchable places from 210 source records.
- Growth was truth-preserving: stale Takayama Miyagawa current-image source was degraded after its latest visible images were found dated 2026-09-21, while official Istanbul Sultanahmet and Denpasar municipal real-time sources were promoted.
- Thirteen official live/current-image sources were freshly revalidated from current provider evidence, including SANParks Nossob, South Australia beach cameras, Grand Canyon, Mount Rainier, GTC Roque de los Muchachos, Oeschinensee, Amden/Walensee, Lake Lucerne, Perdido Key, Farm Tomita, Reykjavik Met Office and Blouberg/Table Mountain.
- Istanbul and Bali/Denpasar commercial source gates were cleared; their Klook/Viator opportunities now require only account search + exact tracked-link verification.
- Accommodation remains the largest commercial-category gap.
- Trip.com is now strategically worth checking in the owner's Travelpayouts My Programs because ERN has reached 200+ healthy places. Do not open a separate direct Trip.com account yet.
- data/owner-commercial-action-packet.json bundles the Trip.com status check with the next eight exact-link actions across existing partners.
- data/source-maintenance-priority.json protects the 200+ baseline by prioritizing rechecks/replacements rather than extending freshness artificially.


Travelpayouts locked-program inventory — 2026-10-03:
- Owner screenshots confirm many strategically useful programs are visible inside the ERN Travelpayouts account even though they are not currently active/unlocked for ERN.
- Visible future inventory includes Trip.com, Booking.com, Agoda, Expedia, GetYourGuide, Tripadvisor Experiences, DiscoverCars, Traveloka, Omio, 12GO, Hotels.com, Hostelworld, Vrbo, Ticketmaster, Vio.com, Rakuten Travel (INTL), VisitorsCoverage and Insubuy.
- This changes the strategy from "find new networks" to "build traffic with current active partners, then unlock the best existing Travelpayouts programs as eligibility improves."
- Priority order is now stored in data/travelpayouts-unlock-priority.json. Core focus: stays first, then activity breadth, then transport, then niche lodging/tickets/services.
- Catalog visibility must never be treated as an active partnership. Booking.com keeps its prior caution/inactive state until explicitly rechecked.


Travelpayouts unlocked-program checkpoint — 2026-10-03:
- Owner screenshots confirm many programs now expose Generate links inside the Earthrightnow Travelpayouts project.
- Newly recorded as account-side link-generation available: Yesim, Kiwitaxi, Localrent.com, Kiwi.com, GigSky, Airalo, GetTransfer.com, Drimsim, GetRentacar.com, AirHelp, Go City, EKTA, Economybookings.com, BikesBooking.com, QEEQ, WeGoTrip, AutoEurope (EU,UK), Radical Storage, Aviasales, intui.travel, Compensair, Saily and KKday.
- ERN still does not auto-publish them. Exact tracked links, visitor utility review and disclosure remain mandatory.
- Priority for the next non-destination-specific business layer: Airalo, Radical Storage, Go City, Kiwitaxi and Aviasales; Saily is a secondary connectivity option.
- Locked/not-yet-available programs such as Booking.com, Trip.com, Agoda, Expedia, GetYourGuide, Tripadvisor Experiences, DiscoverCars, Traveloka, Omio, 12GO, Hotels.com, Hostelworld, Vrbo and similar remain traffic/eligibility dependent and should not block current monetization work.
- data/travelpayouts-unlocked-programs.json is the canonical priority registry for this new availability.


Traffic-led monetization / runtime compaction checkpoint — 2026-10-03:
- Owner Travelpayouts screenshots establish two commercial pools: account-side link generation available now vs visible-but-not-yet-unlocked programs.
- Strategy is now traffic-led: use currently available programs and active partners to build utility/click/conversion evidence; recheck locked stays/activity/transport programs only after meaningful traction or an account-state change.
- Removed the redundant repeated Trip.com owner-status check. Trip.com, Hotels.com, Agoda, Expedia and similar catalog programs remain future unlock targets rather than blockers.
- Added data/travelpayouts-traffic-unlock-plan.json and data/commercial-utility-opportunities.json.
- Next utility layer prepared, still exact-link/owner-verification gated: Airalo, Radical Storage, Go City, Kiwitaxi and Aviasales.
- Source registry exceeded the strict release-size budget as source evidence accumulated. Verbose freshness/rights/coordinate provenance was moved into data/source-evidence.json, preserving truth and audit evidence while shrinking the runtime catalog; duplicate officialUrl fields matching sourceUrl were also removed.
- Maintenance queue was rebuilt from actual current timestamps instead of stale checkpoint data.
- Kaikōura Coast was revalidated from the official Environment Canterbury webcam page; provider still documents South Bay and five-minute current-image updates. Freshness debt is cleared.
- Searchable baseline remains 202 healthy distinct places; post-200 work prioritizes source quality/freshness and business utility rather than raw count inflation.


Travelpayouts three-state model / traction checkpoint — 2026-10-03:
- Affiliate platform model now distinguishes three states: RESEARCH_CANDIDATE, LINK_GENERATION_AVAILABLE, and ACTIVE_OPERATOR_CONFIRMED.
- LINK_GENERATION_AVAILABLE is intentionally fail-closed for public placement: exact tracked link generation, owner/open verification and disclosure are still required.
- Connectivity is now a recognized utility intent for eSIM programs.
- data/business-growth-signals.json defines when ERN should revisit traffic-gated programs using aggregate search/place/travel-option behavior and partner-confirmed conversions; no unlock threshold is invented.
- Locked-program strategy remains traffic-led; account-visible catalog entries are not treated as partnerships.
- Current priority utility programs remain Airalo, Radical Storage, Go City, Kiwitaxi and Aviasales.


Validated 202-place / traffic-led commercial checkpoint — 2026-10-03 10:54 UTC:
- Full Pages release and Operations checks both passed after source-catalog compaction and affiliate-state modeling.
- Current searchable baseline: 202 healthy distinct places from 210 source records across 52 countries and 113 providers.
- Runtime source catalog keeps the provenance fields required by release contracts: rightsBasis and freshnessEvidence. Bulk coordinate/editorial provenance remains in data/source-evidence.json. Runtime catalog remains under the strict performance budget.
- Source maintenance queue has zero overdue sources after official Kaikōura revalidation.
- Affiliate platform model now cleanly separates RESEARCH_CANDIDATE, LINK_GENERATION_AVAILABLE, and ACTIVE_OPERATOR_CONFIRMED.
- Travelpayouts inventory snapshot: 23 account-side link-tool programs, 19 traffic-gated/research programs, 2 fully active platform-registry records. This is separate from the four established destination affiliate partner relationships used by ERN.
- Traffic-led unlock strategy is canonical. Locked programs such as Trip.com / Hotels.com / Agoda / Expedia are future targets, not current owner tasks.
- Priority account-side utility layer remains Airalo, Radical Storage, Go City, Kiwitaxi and Aviasales, all exact-link/manual-verification gated and post-discovery only.
- Post-200 content strategy is quality-led: protect freshness, upgrade quasi-live destinations to stronger live sources when possible, and add places mainly for geographic/provider diversity or real visitor utility.
- All ranking independence, no-auto-placement, no-auto-rewrite and public-feature gates remain unchanged.


Traffic-led business + Andorra expansion checkpoint — 2026-10-03 11:30 UTC:
- ERN now has 205 healthy distinct searchable places from 213 source records across 53 countries.
- Added three official Visit Andorra real-time/quasi-live searchable destinations: Grandvalira, Pal Arinsal and Naturland. These are labeled LIVE_IMAGE/Search-Explore content and do not weaken Watch Earth live-video rules.
- Added one Klook/Andorra commercial research path spanning the three Andorra places; exact tracked-link generation remains owner/account-side and manually verified.
- Owner Travelpayouts screenshots confirm 18 strategically relevant programs are visible but not currently activated/unlocked for ERN.
- Created data/traffic-unlock-roadmap.json to separate four active partners from future traffic-gated programs.
- Future unlock priority is led by Trip.com, Hotels.com, Booking.com, Agoda, Expedia and GetYourGuide; no repeated account checking is required until material traffic/conversion growth or an explicit Travelpayouts status change.
- Business readiness and focused expansion plan now use a traffic-led unlock rule rather than treating every visible Travelpayouts program as immediately actionable.
- Post-200 searchable expansion is now quality/geography-led, with a soft 200–250 range rather than raw-count growth.


Traffic-gated business + island expansion checkpoint — 2026-10-03 11:38 UTC:
- Healthy/Searchable ERN baseline is now **212 distinct places** from 220 source records.
- Added official quasi-live/current-image discovery for La Réunion (Boucan Canot, Trou d’Eau, Roches Noires, Piton de la Fournaise) and the Azores (São Miguel, Terceira, Santa Maria). Watch Earth remains stricter than Search/Explore.
- Owner Travelpayouts screenshots confirm many desirable programs are visible but not yet practically unlocked for ERN. These include Trip.com, Booking.com, Agoda, Expedia, GetYourGuide, Tripadvisor Experiences, DiscoverCars, Traveloka, Omio, 12GO, Hotels.com, Hostelworld, Vrbo, Ticketmaster, Vio.com, Rakuten Travel and others.
- Business strategy is now traffic-led: use active Viator/Klook/Tiqets/Welcome Pickups first; use currently link-generation-capable utilities selectively; recheck locked programs only after meaningful traffic/conversion growth or explicit platform status change.
- New business research paths added for La Réunion/Viator and São Miguel/Viator; exact tracked links remain owner/account-side and manually verified.
- data/available-program-expansion-plan.json prioritizes Airalo, Kiwitaxi, Go City, Radical Storage and Aviasales as the most useful currently available utility layer.
- Commercial opportunity states reconcile to {"VERIFIED_LINK_ADDED":16,"ACCOUNT_SEARCH_AND_EXACT_LINK_REQUIRED":101,"SOURCE_VERIFICATION_REQUIRED_BEFORE_EXACT_LINK":7,"SOURCE_GAP_MUST_BE_SOLVED_FIRST":1} across 125 opportunities.
- No affiliate program, utility, commission or traffic target affects source truth or ranking.


217-place expansion checkpoint — 2026-10-03 12:00 UTC:
- ERN now has **217 healthy distinct searchable places** from 225 source records.
- Truth mix: 13 LIVE_VIDEO, 72 EXTERNAL_LIVE, 140 LIVE_IMAGE. Search/Explore may use the clearly labeled current-image layer; Watch Earth remains stricter.
- Runtime data/sources.json is now minified, while verbose provenance/long notes remain in data/source-evidence.json. This preserves the strict 300 KB source-catalog performance ceiling and creates durable headroom toward the 250-place stretch target.
- Official Madeira Tourism coverage expanded from four to nine distinct searchable places: Funchal, Porto Moniz, Calheta, Machico, Ribeira Brava, São Vicente, Santana, Santa Cruz and Porto Santo.
- The existing viator-madeira opportunity now covers all nine Madeira places with one future island-level tracked link, avoiding duplicate commercial density.
- La Réunion and Azores quasi-live additions remain retained from the prior batch.
- Locked Travelpayouts programs remain traffic-led future targets; currently usable partners/utilities are the near-term business lane.


Large continuation checkpoint — 2026-10-03 12:15 UTC:
- Production is green after the source-catalog scaling work and Madeira clock correction.
- ERN remains at **217 healthy distinct searchable places** from 225 source records; runtime source catalog is minified and verbose provenance is retained in data/source-evidence.json.
- Madeira official coverage is now nine searchable places and passed Operations + Pages after timestamp correction.
- Commercial opportunity registry now has 126 entries with states {"VERIFIED_LINK_ADDED":16,"ACCOUNT_SEARCH_AND_EXACT_LINK_REQUIRED":101,"SOURCE_VERIFICATION_REQUIRED_BEFORE_EXACT_LINK":8,"SOURCE_GAP_MUST_BE_SOLVED_FIRST":1}.
- 27 direct Viator candidate tracked URLs are prepared privately using the owner-confirmed pid/mcid/medium pattern; all remain owner-verification-required and non-public.
- First future Viator verification batch is intentionally limited to strong destination matches; gateway/broader-city candidates stay lower priority.
- Okaukuejo Waterhole / Etosha National Park was added as a P1 HUMAN_PLAYBACK_REQUIRED source candidate from official Namibia Wildlife Resorts evidence. Future Etosha/Viator coverage is blocked until that source is confirmed.
- Pamir core remains deferred rather than filled with weak substitutes.
- Traffic-gated Travelpayouts stay programs remain future unlock targets; active partners and currently available utilities remain the near-term business path.


Traffic-unlock / Arctic-island expansion checkpoint — 2026-10-03:
- Healthy/searchable catalog advanced from 217 to 223 places.
- New quasi-live/current-image searchable places: Nuuk (ArctiComm), Vágar Airport, plus Landsverk current-image views for Mykines, Klaksvík, Gjáarskarð and Hvalba.
- Faroe/Svalbard live research added for Tvøroyri Port, Longyearbyen/UNIS and the Faroe Islands Live village-camera family; these remain human-playback gated.
- Business paths added for Nuuk/Viator and Faroe Islands/Viator; Longyearbyen/Viator and Shetland/Viator remain source-gated.
- Owner Travelpayouts screenshots reconciled: 18 useful programs are visible but not unlocked/activated; 23 other programs expose owner-side link-generation availability.
- New traffic-led unlock plan lives at data/traffic-growth-priorities.json and data/traffic-unlock-roadmap.json.
- New currently-usable utility expansion queue lives at data/utility-link-opportunities.json.
- A single dormant owner-action batch now lives at data/owner-action-packet.json so exact-link work can be done in one worthwhile session later.
- Trip.com / Hotels.com / Booking.com / Agoda / Expedia remain WAIT-for-traffic/status-change targets; ERN should not repeatedly recheck them.
- No automatic placement, rewriting, paid ranking, fabricated traffic, or unverified source promotion occurred.


Arctic / Faroe / Namibia continuation checkpoint — 2026-10-03:
- Healthy searchable catalog now stands at 225 distinct places.
- Added clearly labeled quasi-live/current-image places for Nuuk, Vágar Airport, Mykines, Klaksvík, Gjáarskarð, Hvalba, Swakopmund and Windhoek.
- Faroe live research now includes Tvøroyri Port and an exact-place extraction lane from Faroe Islands Live; Longyearbyen/UNIS and Shetland remain playback-gated.
- Viator business paths added for Nuuk, Faroe Islands, Swakopmund and Windhoek; Longyearbyen and Shetland remain source-gated.
- Travelpayouts strategy is now split cleanly: 23 programs expose owner-side link-generation capability, while 18 useful programs are owner-visible but not unlocked/activated.
- Trip.com, Hotels.com, Booking.com, Agoda and Expedia remain traffic-led future targets rather than current blockers.
- data/utility-link-opportunities.json prioritizes Airalo, Go City, Kiwitaxi, Radical Storage, Aviasales and KKday for later bundled exact-link generation.
- data/owner-action-packet.json keeps all owner-only playback/link tasks dormant until they are worth doing in one batch.


250 searchable-place milestone — 2026-10-03:
- ERN reached 250 healthy distinct searchable places.
- The final stretch used only clearly labeled quasi-live/current-image additions backed by official/provider camera evidence; Watch Earth live/current rules were not relaxed.
- New milestone additions include Prague tower views, Levi, multiple Switzerland Tourism panoramas, Seoul live plazas, Kyrgyz current-camera locations, Saint-Félix Mauritius and Lake Hāwea/Wānaka.
- data/sources.json remains under the production catalog-size ceiling after the batch.
- Content expansion now shifts from raw count growth to quality-led gap filling, source replacement and stronger regional balance.
- Owner Travelpayouts screenshots were recorded as account evidence: Trip.com, Booking.com, Agoda, Expedia, Hotels.com, GetYourGuide, Tripadvisor Experiences, DiscoverCars, Traveloka, Omio, 12GO, Hostelworld, Vrbo, Ticketmaster, Vio.com, Rakuten Travel, VisitorsCoverage and Insubuy are visible in the program catalog but treated as traffic-gated/not-yet-unlocked until platform or owner confirmation changes.
- Business priority remains: active partners first, grow qualified traffic, batch exact-link generation, then revisit high-value stay/activity programs when unlock signals occur.


Post-250 reconciliation — 2026-10-03:
- ERN catalog now contains 258 source records representing 250 healthy distinct searchable places.
- Truth mix includes 13 LIVE_VIDEO, 72 EXTERNAL_LIVE and 171 LIVE_IMAGE records; quasi-live/current-image is intentionally used for Search/Explore but not treated as Watch Earth continuous live video.
- Source expansion registry now has 178 researched candidates: 55 promoted to source registry, 102 promoted as searchable quasi-live, 7 superseded by better quasi-live promotion and only 14 still requiring human playback verification.
- Business registry contains 132 opportunities: 16 verified-link placements, 108 exact-link/account-search items, 6 source-gated and 2 source-gap blocked.
- Newly promoted source work legitimately unlocked Prague/Tiqets, Karakol/Viator and Issyk-Kul/Viator into the exact-link stage.
- Pamir remains blocked: Osh is a useful gateway but does not count as a Pamir-core source.
- Travelpayouts screenshots are preserved as account evidence that many strategic programs are visible but traffic-gated/not yet unlocked. Recheck is event-driven, not calendar-based.
- Post-250 content work is now maintenance, regional balance and stronger-source replacement rather than raw-count expansion.
- Next business mode is traffic growth plus batched exact-link conversion; owner actions are bundled in data/exact-link-generation-worksheet.json.


256-place / 196-commercial-path checkpoint — 2026-10-03:
- ERN now has 256 healthy distinct searchable places from 264 source records.
- Added three official Istanbul municipal camera places for Search/Explore: Taksim Square, Maiden’s Tower and Anadolu Hisarı/Bosphorus; all are conservatively labeled LIVE_IMAGE and do not weaken Watch Earth.
- Added official current-camera discovery for Tvøroyri Port, Lerwick Town Hall and Shetland Cliff Cam; also LIVE_IMAGE/Search-Explore only.
- Runtime source catalog was compacted again: remaining coordinate notes moved to data/source-evidence.json, duplicate officialUrl fields and null placeholders removed, mandatory attribution/coordinate basis preserved.
- Commercial opportunity registry expanded to 150 entries. 196 of 256 healthy places now have at least one researched commercial path; 60 remain intentionally uncovered.
- Newly covered high-value places include St. Moritz, Verbier, Dolomiti Superski, Queenstown, Kitzbühel, Ski Arlberg, Glacier National Park, Kaikōura, Cijin/Kaohsiung, Lauderdale-by-the-Sea, Oeschinensee, Waikiki, Boston Harbor, Reykjavík, La Palma, Farm Tomita and Koli.
- Existing Cape Town/Viator path was extended to Blouberg/Table Mountain rather than creating duplicate commercial density.
- Business-place matrix now prepares broader Kiwitaxi, Radical Storage, KKday, Localrent, QEEQ and WeGoTrip coverage across healthy ERN places, all owner/exact-link gated.
- Trip.com / Hotels.com / Booking.com / Agoda / Expedia and similar stay programs remain traffic-led future unlocks; no repeated owner recheck is required.


231-commercial-path checkpoint — 2026-10-03:
- Searchable catalog remains 256 healthy distinct places and is production-green.
- Runtime source catalog now stores concise rights/freshness audit markers while full provenance is preserved in data/source-evidence.json, creating durable headroom under the strict 300 KB source budget.
- Commercial opportunity registry now contains 171 researched opportunities: 16 verified-link opportunities, 148 exact-link/account-search paths, 5 source-gated paths and 2 unresolved source-gap paths.
- 231 of 256 healthy places now have at least one useful commercial research path; the remaining 25 are intentionally editorial-first/deferred in data/commercial-editorial-only.json rather than being force-monetized.
- Seoul Gwanghwamun and Cheonggyecheon were consolidated under the already-verified Seoul/Klook city path. Tvøroyri was consolidated under the Faroe Islands path, and Lerwick/Shetland place IDs were corrected under the existing Shetland path.
- Go City research paths added for New York, London and Chicago; other new research paths include Adelaide coast, Taranaki, Kyrgyz highlands, Hakodate/Kijihiki, Gippsland Lakes, Ponte di Legno, Skeikampen, Diano Marina, Chioggia/Sottomarina, Perdido Key and Kgalagadi.
- Trip.com, Hotels.com, Booking.com, Agoda, Expedia and other traffic-gated programs remain future unlocks, not current owner tasks.


275-place soft-stretch checkpoint — 2026-10-03 13:55 UTC:
- ERN now has 275 healthy distinct searchable places. The soft stretch target is reached; stop raw-count growth and shift to quality/freshness/live-upgrade work.
- Latest quality-led additions created first-class coverage in Belgium, Netherlands, Germany and Denmark, plus Cannes and Plitvice Lakes.
- Distinct-place discipline preserved: Brussels Grand-Place vs Place de Brouckère, Heidelberg Old Town vs Königstuhl, and Zandvoort beach vs circuit are separate real visitor places rather than duplicate camera inflation.
- New active-partner research paths added for Brussels/Tiqets and Heidelberg, Nuremberg, Cannes, Plitvice, Aalborg, Dresden and Garmisch/Farchant via Viator. Exact tracked links remain owner/account-side and manually verified before activation.
- Unlocked-program matrix now includes appropriate Brussels/Heidelberg/Nuremberg/Dresden/Cannes/Zandvoort research coverage without asserting inventory.
- Remaining low-intent/nature/special-event places are explicitly editorial-only rather than being forced into weak monetization.
- Locked Travelpayouts programs remain traffic-led future targets. Trip.com/Hotels.com/Booking.com/Agoda/Expedia/GetYourGuide are not blockers and should only be revisited after traction or an explicit account-state change.
- Pamir remains deferred; quasi-live/current-image sources remain acceptable for Search/Explore when clearly labeled and evidenced.


275-place commercial reconciliation — 2026-10-03 13:58 UTC:
- All 275 healthy searchable places are now intentionally classified: 242 have a commercial research/path record and 33 are explicitly editorial-first; zero healthy places remain unclassified.
- Commercial registry contains 179 opportunities: 16 verified-link, 156 account-search/exact-link, 5 source-verification-gated and 2 source-gap-blocked.
- Editorial-first places are mostly remote science/monitoring, low-intent nature, generic aggregate discovery or special-event views where monetization would be artificial.
- This is not a claim that 242 places have live affiliate links; most remain exact-link/manual-verification research only.


Post-275 quality/traffic checkpoint — 2026-10-03 14:05 UTC:
- Raw searchable-place expansion is complete at the 275 soft stretch. New work mode is quality maintenance, stronger live upgrades, qualified traffic growth and batched commercial-link conversion.
- data/traffic-growth-priorities.json now uses the 275-place baseline: 242 places have a commercial research/path classification, 33 are intentionally editorial-first, zero are unclassified, and 20 distinct places currently have verified offer records.
- data/exact-link-generation-worksheet.json is refreshed for the 275-place catalog and now includes Brussels, Plitvice, Cannes, Heidelberg, Nuremberg, Dresden/Radebeul, Garmisch/Farchant and Aalborg research rows.
- data/owner-action-packet.json is refreshed but remains dormant. Its source batch now contains only the 10 genuinely unresolved human-playback candidates rather than already-promoted sources.
- The preferred next exact-link batch is a compact 16-item high-intent set across Tiqets, Viator and Klook; owner action is still deferred until a deliberate batch session is worthwhile.
- data/featured-quality-priorities.json now separates a diverse true-live featured pool from a quasi-live upgrade watchlist. It is advisory only and cannot change source truth or ranking from commercial value.
- Locked Travelpayouts programs remain event/traffic-led future targets; do not repeatedly recheck Trip.com, Hotels.com, Booking.com, Agoda, Expedia or GetYourGuide without a meaningful status/traction change.


Scale-target reconciliation — 2026-10-03 evening:
- Current production source registry is now 283 source records / 275 healthy distinct searchable places. This supersedes the earlier 91-place expansion baseline.
- Searchable-place scale goal (150–200) has been exceeded. ERN should now maintain 250+ healthy places and prioritize freshness, source quality, geographic/provider balance, and upgrading strong LIVE_IMAGE/quasi-live places to true live where worthwhile.
- Quasi-live remains acceptable for Search/Explore when clearly labeled (LIVE_IMAGE/current-image semantics); it is not automatically eligible for Watch Earth.
- Owner Travelpayouts screenshots confirmed many desirable programs are visible but not yet unlocked for ERN at current traffic levels.
- Added data/travelpayouts-traffic-unlock-watchlist.json. P1 future unlocks include Trip.com, Hotels.com, Booking.com, Agoda, Expedia and GetYourGuide.
- Trip.com should be added later when Travelpayouts unlocks it; ERN should not wait for it or repeatedly recheck it now.
- Business work now splits into: existing verified offers, currently owner-account-link-generation-capable programs, exact-link conversion for existing partners, and traffic-gated future programs.
- No locked program is treated as active; no automatic placement/rewrite/ranking changes were introduced.


Quality-first / traffic-unlock checkpoint — 2026-10-03 14:40 UTC:
- ERN now has 275 healthy distinct searchable places across 63 countries from 283 source records; raw scale target is exceeded.
- Search/Explore truth mix is 13 LIVE_VIDEO, 69 EXTERNAL_LIVE and 197 LIVE_IMAGE/current-image source records among healthy sources. Watch Earth remains stricter than Search/Explore.
- Geographic plan reconciled to the actual 63-country catalog. Pamir/Tajikistan is now explicitly DEFERRED_OWNER_APPROVED; revisit later if better live/quasi-live sources appear, but it no longer consumes active expansion cycles.
- Aruba quality-gap research added Palm Beach and Eagle Beach from the official Aruba Tourism Authority live-webcam index. Multiple resort cameras are grouped by real beach/place rather than counted as fake destinations.
- Aruba-wide Viator opportunity added using existing healthy Druif Beach plus future Palm/Eagle Beach coverage; one island-level tracked link is preferred over duplicate per-camera offers.
- Commercial registry contains 180 opportunities: 16 VERIFIED_LINK_ADDED, 157 ACCOUNT_SEARCH_AND_EXACT_LINK_REQUIRED, 5 SOURCE_VERIFICATION_REQUIRED_BEFORE_EXACT_LINK, 2 SOURCE_GAP_MUST_BE_SOLVED_FIRST.
- Existing travel-offer registry currently has 25 verified records covering 19 healthy ERN places.
- data/commercial-conversion-shortlist.json now reduces the actionable healthy-place backlog to a 15-destination owner batch. No invented links; only exact owner-generated/verified tracked links may activate.
- Trip.com remains P1 future business coverage but WAIT_FOR_TRAFFIC_UNLOCK. Same principle applies to Hotels.com, Booking.com, Agoda, Expedia, GetYourGuide and other owner-visible but traffic-gated Travelpayouts programs.
- Current business priority: use active Viator/Klook/Tiqets/Welcome Pickups, grow qualified organic traffic, batch exact-link conversion, and recheck locked programs only on a real unlock/traffic/conversion signal.


Cook Islands + traffic-unlock checkpoint — 2026-10-03 15:35 UTC:
- Healthy/searchable production baseline is now 287 distinct places across 64 countries/territories.
- Added four official Cook Islands Airports quasi-live/searchable LIVE_IMAGE places: Aitutaki Lagoon, Tamanu Beach, Avaavaroa Beach and Rarotonga International Airport.
- These current-image sources are Search/Explore eligible but are not Watch Earth live-video candidates.
- Source verification, geographic expansion and focused-expansion metrics were reconciled to the real current registry after earlier stale 200/275-place planning snapshots.
- Owner Travelpayouts screenshots confirm a broad future program set is visible but many desired programs remain locked/not active because ERN traffic is still low.
- Trip.com is now the first preferred future unlock because it can cover stays plus transport/activities across many ERN destinations; Hotels.com/Booking.com/Agoda/Expedia follow in the stay lane.
- GetYourGuide, Tripadvisor Experiences, Omio, 12GO, DiscoverCars and other visible programs remain future traffic-led unlocks.
- Do not repeatedly ask the owner to recheck locked programs. Recheck only on Travelpayouts status change, material qualified traffic growth, or first meaningful affiliate conversions.
- Current active-partner work remains Viator, Klook, Tiqets and Welcome Pickups; exact tracked links remain manual/verified and ranking-neutral.


Island quality checkpoint — 2026-10-03 16:05 UTC:
- Production/searchable baseline is now 290 healthy distinct places across 67 countries/territories.
- Added three true-live island destinations from direct provider live pages: Kuredu Island (Maldives), Paynes Bay (Barbados), and Santa Maria Bay on Sal (Cape Verde).
- Cook Islands current-image batch remains Search/Explore quasi-live; these three new island additions are true EXTERNAL_LIVE sources and may participate in Watch Earth subject to normal currentness gates.
- Runtime sources.json remains minified and comfortably below the strict 300 KB source budget after the earlier provenance-sidecar architecture fix.
- Active-partner business paths added for Maldives/Viator, Barbados Paynes Bay/Viator, and Cape Verde Sal/Viator; exact tracked links remain owner-generated and manually verified.
- Commercial registry now has 16 verified-link opportunities, 165 exact-link/account-search opportunities, 5 source-gated opportunities, and 2 source-gap-blocked opportunities.
- Trip.com remains ERN's first preferred future Travelpayouts unlock once traffic/account state permits; no repeated owner recheck is needed before then.


300-searchable-place milestone — 2026-10-03 16:30 UTC:
- Production/searchable catalog reached 300 healthy distinct places from 308 source records across 67 countries/territories.
- Truth mix after the milestone batch: 13 LIVE_VIDEO, 72 EXTERNAL_LIVE and 219 LIVE_IMAGE/current-image source records among healthy sources.
- Final milestone additions: Baisha Bay, Laomei Green Reef, Yinghanling/Guanyinshan, Taipingshan, Fenqihu, Daxi Old Street, Dongyanshan, Taiping Suspension Bridge, Whanganui Coast and Te Awanga Coast.
- All ten are clearly labeled LIVE_IMAGE / quasi-live Search-Explore sources with featuredHold/watchHold; Watch Earth live-video semantics were not relaxed.
- Commercial classification is now complete across all 300 healthy places: 265 have at least one researched commercial path and 35 are explicitly editorial-first; zero healthy places are unclassified.
- New business paths: Taipingshan/Klook, Alishan-region/Klook, Taoyuan Daxi-Dongyanshan/KKday and Hawke's Bay/Viator. Existing Taiwan North Coast/Klook path was extended to Baisha Bay, Laomei Green Reef and Yinghanling instead of creating duplicate commercial density.
- Trip.com remains the P1 future Travelpayouts unlock, but owner screenshots show it visible-not-unlocked. Do not repeatedly recheck; wait for material traffic/conversion growth or an explicit platform status change.
- ERN mode now shifts from raw scale growth to quality-first searchable expansion, stronger true-live upgrades, freshness/provider diversity and conversion of the best existing commercial research into verified exact links.


302-place Aruba quality checkpoint — 2026-10-03 16:50 UTC:
- Healthy searchable catalog now contains 302 distinct places from 310 source records across 67 countries/territories.
- Added Palm Beach and Eagle Beach from the official Aruba Tourism Authority live-webcam family under conservative LIVE_IMAGE/Search-Explore semantics; Watch Earth remains held pending separate live-playback review.
- Existing Aruba/Viator business path now spans Druif Beach, Palm Beach and Eagle Beach rather than creating duplicate per-beach affiliate density.
- Commercial classification remains complete: 267 healthy places have a researched commercial path, 35 are explicitly editorial-first, zero are unclassified.
- Near-term business strategy remains: active Viator/Klook/Tiqets/Welcome Pickups + currently owner-link-capable Travelpayouts utilities; Trip.com remains the preferred future unlock but should not be rechecked until traffic/conversion or platform status materially changes.


308-place quality/business checkpoint — 2026-10-03 16:35 UTC:
- Production registry now contains 316 source records / 308 healthy distinct searchable places across 69 countries/territories.
- Quality-first additions: official City of Kraków Main Market Square, Wawel/Vistula and Zakrzówek current-camera places; UNIS Longyearbyen/Adventfjorden; Hawke's Bay Regional Council Wairoa River; Horizons Regional Council Foxton Beach.
- All six are conservatively exposed as LIVE_IMAGE/Search-Explore quasi-live sources with Watch Earth held separately; no live-video semantics were weakened.
- Poland and Svalbard improve geographic breadth. Kraków is grouped under one future Tiqets city-level business path; Longyearbyen gains a Viator research path. Wairoa and Foxton remain intentionally editorial-first.
- Commercial classification is complete for all 308 healthy places: 271 have a researched commercial path and 37 are explicitly editorial-first; zero remain unclassified.
- Commercial opportunity registry now contains 194 records: 16 verified-link, 171 exact-link/account-search, 5 source-gated and 2 source-gap records.
- Runtime sources.json was re-minified after expansion, restoring headroom while keeping verbose provenance in data/source-evidence.json.
- Travelpayouts strategy remains traffic-led: use current active/link-generation-capable programs now; Trip.com remains the preferred future stay unlock but is not an owner task until traffic/account state changes.


Travelpayouts access-tier checkpoint — 2026-10-03:
- Owner screenshots and current account mapping confirm ERN should distinguish three states: usable/link-generation available now, selective utility programs, and traffic-gated programs visible but not active.
- Major stay/travel brands currently traffic-gated include Trip.com, Hotels.com, Expedia, Agoda, Booking.com, Vio.com, Hostelworld, Vrbo and Rakuten Travel; do not force activation or open duplicate direct accounts merely because the catalog card is visible.
- Trip.com decision: WAIT. It remains strategically attractive because it could fill the stay/transport gap, but recheck only after meaningful traffic growth or a Travelpayouts status change.
- Current link-generation-available pool is broader than the original four and includes Go City, KKday, Kiwi.com, Kiwitaxi, Localrent, QEEQ, Economybookings, Radical Storage and several eSIM/travel-utility programs.
- ERN will expand selectively, not by activating every accessible program. data/affiliate-access-strategy.json is canonical for this policy.
- New immediate business queue uses Go City for New York, London, Chicago and Sydney city-pass coverage; exact tracked links remain owner/account-side and manually verified.
- Searchable-place research added two new-country lanes: Slovakia (Jasná/Chopok) and Bulgaria (Bansko, Borovets), using official resort camera families and grouped by real destination.
- Post-200 source growth is now quality-led via data/post200-quality-priority.json: new countries, true-live upgrades, geographic balance, and one-place-country depth before raw count.
- Owner-action queue remains dormant; no owner interruption is required yet.


Bulgaria / Serbia quasi-live checkpoint — 2026-10-03:
- Promoted three official resort-camera destinations into searchable production under the owner-approved quasi-live policy: Bansko, Borovets and Kopaonik.
- Truth is LIVE_IMAGE/searchable-current imagery, not continuous LIVE VIDEO; all three remain featuredHold/watchHold by default.
- Multiple resort camera angles are grouped under one real destination each to avoid artificial place-count inflation.
- Healthy searchable baseline moves from 308 to 311 distinct places; country coverage grows from 69 to 71 with Bulgaria and Serbia added.
- Bansko and Borovets Viator paths moved from source-gated to exact-link/account-search state; Kopaonik/Viator research was added with a fail-closed rule if no clean Kopaonik destination link exists.
- Jasná/Slovakia remains research-only because the official page advertises live streams but actual playback still needs human confirmation.


Selective utility-stack checkpoint — 2026-10-03:
- ERN will not activate every Travelpayouts program simply because link generation is available.
- A small utility stack is now canonical in data/business-utility-stack.json:
  - connectivity: Yesim primary candidate (observed 18% / 90-day cookie), with Saily/Airalo only as alternatives;
  - transfers: Welcome Pickups first, Kiwitaxi only where Welcome Pickups lacks useful coverage;
  - car rental: Localrent primary selective candidate, with QEEQ/Economybookings/AutoEurope as alternatives;
  - city passes: Go City for major-city attraction bundles;
  - secondary activities: KKday only where existing Klook/Viator/Tiqets coverage is weak;
  - luggage storage: Radical Storage only for relevant major-city contexts.
- Reward/cookie observations are owner-account snapshots, not revenue forecasts.
- Exact tracked links remain manual/verified before public use; owner-action queue remains dormant.


Post-200 Europe / traffic-unlock checkpoint — 2026-10-03:
- New official-source research added for Hungary/Kékestető and Bratislava/Slovakia. Both remain human-playback gated and are not counted as production searchable yet.
- Bratislava/Viator commercial planning is source-gated behind a working official city camera.
- ERN now has a dedicated data/traffic-unlock-evidence-plan.json. It deliberately does not invent private Travelpayouts traffic thresholds.
- Priority gated programs for later recheck: Trip.com, Hotels.com, Expedia, Agoda, GetYourGuide and DiscoverCars.
- Current action is to grow real visitor traffic and utility using accessible programs rather than repeatedly probing locked catalog cards.


313-place checkpoint — 2026-10-04:
- Canonical healthy searchable catalog is now 313 distinct places from 321 source records.
- Healthy truth mix: 13 LIVE_VIDEO, 72 EXTERNAL_LIVE, 232 LIVE_IMAGE.
- New searchable quasi-live places: Jasná / Chopok (Slovakia) and Kékestető / Mátra Mountains (Hungary). Both are Search/Explore only and held out of Watch Earth pending direct playback review.
- Source catalog was re-compacted to stay below the strict 300 KB production source-file limit; normalized duplicate aliases were removed.
- Research registry now has 224 candidates: 58 promoted to source registry, 148 promoted to searchable quasi-live, 8 superseded, 10 still human-playback-gated.
- Commercial classification is complete at this checkpoint: 275 healthy places have an explicit commercial path, 38 are intentionally editorial-only, 0 are unclassified.
- Commercial opportunity registry now has 203 opportunities: 16 verified-link, 178 exact-link/account-search, 7 source-gated, 2 source-gap-blocked.
- Bansko and Borovets received Viator research paths; Jasná received a cautious Viator/Slovakia mountain path; Kékestető remains intentionally editorial-first.
- Travelpayouts traffic-gated programs remain event-driven future unlocks. New readiness file: data/travelpayouts-unlock-readiness.json.
- Trip.com remains the first future unlock target once Travelpayouts account state or real traffic/conversion evidence materially changes.


314-place Latvia / Darmstadt checkpoint — 2026-10-04:
- Production source registry now targets 314 healthy distinct searchable places across 74 countries/territories after adding Valmiera Old Town as Latvia's first ERN place.
- Valmiera is based on Latvia's official tourism page explicitly directing visitors to watch city life on the webcam. It is conservatively labeled LIVE_IMAGE, LINK_ONLY, featuredHold/watchHold: Search/Explore yes, Watch Earth no.
- Canonical quasi-live policy is now explicit in data/source-expansion-policy.json. Regularly refreshed/current webcam stills are acceptable for Search/Explore; one-off recent photos are not mislabeled LIVE and remain research-only unless ERN adds a separate RECENT_IMAGE visitor truth label.
- Pamir remains deferred by owner choice; it should not consume active cycles until better live/quasi-live evidence appears.
- Darmstadt / Mathildenhöhe moved from editorial-only to a real WeGoTrip research path because WeGoTrip currently exposes a Darmstadt self-guided audio-tour product including Mathildenhöhe.
- Commercial registry is now 204 opportunities: 16 verified-link, 179 exact-link/account-search, 7 source-verification-gated, 2 source-gap-blocked.
- All 314 healthy places remain intentionally classified: 276 have commercial research paths and 38 are editorial-first; zero are unclassified.
- Travelpayouts traffic-gated strategy is unchanged: Trip.com remains the preferred future unlock, but no gated program should be rechecked until material traffic/conversion or an explicit platform status change.


316-place Montenegro / Bosnia checkpoint — 2026-10-04:
- ERN now targets 316 healthy distinct searchable places across 76 countries/territories.
- New-country quality additions: Kolašin 1600 in Montenegro from the official Ski Resorts of Montenegro Live Cameras surface, and Jahorina Olympic Mountain in Bosnia and Herzegovina from the official Olympic Center Jahorina LIVE CAM surface.
- Both are intentionally LIVE_IMAGE + LINK_ONLY + featuredHold/watchHold until continuous playback is separately human-verified. Search/Explore gains breadth; Watch Earth truth does not loosen.
- Commercial registry now has 206 opportunities with states {"VERIFIED_LINK_ADDED":16,"ACCOUNT_SEARCH_AND_EXACT_LINK_REQUIRED":181,"SOURCE_VERIFICATION_REQUIRED_BEFORE_EXACT_LINK":7,"SOURCE_GAP_MUST_BE_SOLVED_FIRST":2}.
- Kolašin and Jahorina each gain a Viator research path backed by current public product inventory; exact tracked links remain owner/account-side and manually verified before public activation.
- Commercial classification remains complete at 316 places: 278 commercial-path places + 38 editorial-first places; zero unclassified.
- Trip.com remains ERN's P1 future Travelpayouts unlock. The larger destination catalog strengthens the eventual value of accommodation coverage, but does not justify repeated unlock checks before traffic/conversion/account signals.
- Pamir remains deferred; quasi-live/current-image policy is canonical in data/source-expansion-policy.json.


Green 316-place baseline — 2026-10-04:
- Canonical production registry: 324 source records, 320 healthy source records, 316 healthy distinct searchable places across 76 countries/territories.
- Source runtime catalog is 295036 characters, still inside the strict production budget; verbose provenance remains in data/source-evidence.json.
- Source expansion states: 58 PROMOTED_TO_SOURCE_REGISTRY, 151 PROMOTED_TO_SEARCHABLE_QUASI_LIVE, 8 SUPERSEDED_BY_QUASI_LIVE_PROMOTION, 10 HUMAN_PLAYBACK_REQUIRED.
- Commercial registry: 206 opportunities = 16 VERIFIED_LINK_ADDED, 181 ACCOUNT_SEARCH_AND_EXACT_LINK_REQUIRED, 7 SOURCE_VERIFICATION_REQUIRED_BEFORE_EXACT_LINK, 2 SOURCE_GAP_MUST_BE_SOLVED_FIRST.
- Commercial classification remains complete: 278 healthy places have a commercial research path and 38 are intentionally editorial-first.
- Kolašin duplicate normalized alias was repaired and all new batch timestamps were normalized to real UTC after release guards correctly rejected the earlier local-time-as-Z values.
- Latest Operations packet is green and latest Pages release job completed the full release suite, static build and Deploy step successfully.
- Current mode remains quality-first searchable expansion + stronger true-live upgrades + batched commercial conversion; raw-count growth is no longer the primary goal.
- Travelpayouts traffic-gated programs remain event-driven future unlocks. Trip.com stays P1 future unlock, not a current owner task.


316-place quality-led expansion checkpoint — 2026-10-04:
- ERN now has 324 source records and 316 healthy distinct searchable places across 76 country/territory labels; the original 150–200 searchable-place milestone is surpassed.
- Next visitor goal is quality-led 350–400, not count inflation. New additions should improve geographic breadth, source quality, or visitor utility.
- Quasi-live/current-image sources remain valid for Search/Explore when freshness is reliable and clearly labeled; Watch Earth stays stricter.
- Travelpayouts owner evidence is now formalized in data/travelpayouts-unlock-roadmap.json: Trip.com, Hotels.com, Agoda, Expedia, GetYourGuide and Booking.com are strategic future unlocks, not current activation targets.
- Programs already available for owner link generation remain the preferred near-term path; exact-link work is ranked in data/business-activation-priority.json.
- Commercial matrix was reconciled against all current healthy places and no longer uses the stale 313-place baseline.
- Uruguay AntelTV camera family added as research-only because Antel officially confirms cameras around Uruguay, but external playback/access must be verified before promotion.
- Pamir remains deferred by owner approval; revisit later if better live or trustworthy quasi-live sources appear.


Global utility business layer — 2026-10-04:
- Prepared a separate post-discovery utility layer using programs already available for owner link generation; it is not public yet.
- Tier-1 future tests: Yesim (eSIM), Kiwitaxi (transfers), Kiwi.com (flights) and Radical Storage (luggage).
- Tier-2 alternatives include Airalo/Saily, Localrent/Economybookings and GetTransfer; ERN should show one primary provider per intent rather than stacking equivalent affiliate choices.
- Go City remains destination-specific and already queued for New York, London, Chicago, Sydney, Rome and Dublin; KKday remains targeted where it adds distinctive Asia inventory.
- Trip.com/Hotels.com/Agoda/Expedia/GetYourGuide/Booking.com remain future traffic-unlock targets, not current owner tasks.
- No utility offer may influence Earth discovery ranking or appear before a visitor has chosen a place/trip-planning action.


Prepared Viator link batch — 2026-10-04:
- Public destination/inventory pages have now been isolated for Faroe Islands/Tórshavn, Innsbruck, Madeira, Cook Islands/Rarotonga and Istanbul.
- Standard partner-parameter candidate URLs were prepared privately for these destinations using ERN's established Viator partner ID, but remain PREPARED_NOT_OWNER_VERIFIED and cannot become public offers until owner redirect/tracking confirmation.
- Panama Canal, Arequipa/Colca and Kruger public inventory was also confirmed; clean destination-level tracked links are still preferred over product-specific links.
- This reduces future owner work to opening/confirming a compact prepared batch rather than searching destinations manually.


Planning reconciliation — 316 places / 76 countries:
- Source-verification arithmetic corrected: 34 places remain to the 350 quality target and 84 to the 400 stretch target.
- Remaining genuinely human-playback-gated queue is 13, not the earlier stale count of 10.
- Geographic plan rebuilt from the active healthy place registry, including newer country coverage such as Bosnia and Herzegovina, Bulgaria, Hungary, Latvia, Montenegro, Poland, Serbia, Slovakia and Svalbard.
- New explicit P1 quality gaps: Middle East/North Africa scenic current/quasi-live sources and broader South Pacific island coverage.
- Virtual tours, prerecorded tourism films, weather/radar loops and untimestamped marketing images remain disallowed as substitutes for current Earth views.


Visual Trust & Premium UI Refinement — 2026-10-04:
- Completed a focused premium/trust presentation pass without redesigning ERN or changing discovery/source truth logic.
- Hero now has stronger visual depth, clearer typography hierarchy, more premium CTA treatment and a more refined current-window status card.
- Navigation, category controls, discovery proof cards, Watch Earth cards, Search/Explore results, Atlas, participation cards and supporting surfaces received tighter spacing, radius, shadow and interaction consistency.
- ERN Stories doorway contrast was corrected so the heading remains clearly readable on the light editorial background.
- Loading/empty states were softened and made intentional rather than broken-looking.
- Hero catalog-load failure now fails truthfully: it no longer leaves a green CURRENT indicator visible; it shows a neutral RETRY state and directs visitors to still-available Explore/Destination surfaces.
- Mobile/reduced-motion/focus-visible safeguards were preserved.
- Full JavaScript syntax, Operations and GitHub Pages release checks all passed after the refinement.
- No source ranking, commercial ranking, search, Atlas data, live-current semantics, public Guide gate or Now Moments gate was changed.


Middle East / South Pacific gap batch — 2026-10-04:
- Reconciled actual `main` before continuing: ERN is already at 316 healthy searchable places, well beyond the older 91-place handoff snapshot; later valid work was preserved.
- Added five research-only, human-playback-gated camera candidates: Petra Treasury, Petra Visitor Center, Muscat Aida Beach, Plantation Island Resort (Fiji) and Lomani Island Resort (Fiji).
- Petra's two cameras and Fiji's two Malolo Lailai resort cameras are explicitly subject to duplicate-place consolidation; multiple views must not inflate distinct-place counts.
- Current provider evidence showed Marrakech/Koutoubia and Tahanaout cameras offline; they were not promoted or queued as current.
- Added source-gated commercial paths using existing partners only: Petra/Viator, Muscat/Viator and Fiji/Klook. Exact tracked links remain owner-generated and manually verified before any public placement.
- Source research registry now has 235 candidates with 18 remaining human-playback-gated; commercial opportunity registry now has 213 entries (16 verified-link, 184 exact-link-required, 11 source-gated, 2 source-gap-blocked).
- Public Guide and Now Moments gates remain OFF; no runtime performance ceiling or ranking/currentness safeguard was changed.


Owner playback promotion — 2026-10-04:
- Owner confirmed all four requested checks good: Petra Visitor Center, Muscat Aida Beach, Plantation Island Resort and Lomani Island Resort.
- Promoted all four as HEALTHY EXTERNAL_LIVE / LINK_ONLY sources. The two Fiji feeds share canonical place `fiji-malolo-lailai`, so they count as one searchable destination.
- Healthy searchable coverage is now 319 distinct places across 79 countries.
- Petra/Viator, Muscat/Viator and Fiji/Klook moved from source-gated to exact-link-required; no public affiliate placement occurred.
- Runtime source catalog is 299,076 characters, still below the strict 300 KB ceiling but now near capacity. Do not raise the ceiling; next scaling work should use supplemental/lazy Search-only catalog architecture or selective swaps.
- Public Guide and Now Moments remain OFF; ranking remains commercial-neutral.


Supplemental Search architecture — 2026-10-04:
- Owner manually opened and confirmed the Petra/Viator, Muscat/Viator and Fiji/Klook tracked links; all three are now VERIFIED_LINK_ADDED and the owner batch is closed.
- Core runtime remains 319 healthy searchable places across 79 countries; data/sources.json remains below the strict 300 KB ceiling.
- Added data/search-supplemental.json with 20 distinct, already-qualified Search-only places. The combined searchable universe is now 339 places.
- Supplemental data is fetched only after a non-empty visitor search. It is not part of startup first paint.
- Every supplemental row is HEALTHY + LINK_ONLY with featuredHold=true and watchHold=true, so it cannot enter Watch Earth, hero/featured ranking or Atlas through this path.
- Added scripts/search-supplemental-status.mjs and a Pages workflow gate to reject duplicate core IDs/places, unsafe URLs, non-healthy rows, missing holds, non-link-only rows or an oversized supplemental batch.
- Static release build now copies the supplemental file; Pages path triggers include it.
- This architecture expands Search capacity without weakening the app-lite, startup JS, lean-core or sources.json performance ceilings.
- Public Guide and Now Moments remain OFF; commercial ranking remains neutral.


First Impression / Homepage Refinement — 2026-10-04:
- Owner approved the Mount Fuji homepage direction and requested a premium first-impression pass before further catalog expansion.
- Homepage information hierarchy is now Hero → Watch Earth Now → one Explore-by-feeling/place section → supporting discovery. The duplicate early “What kind of Earth do you want to see?” collection block was removed.
- The previous discovery-breadth stats block was moved below Search so it supports depth rather than competing with the first screen.
- Hero is now a fixed Mount Fuji editorial/brand anchor using a public-domain/CC0 Wikimedia image. It is explicitly labeled editorial/FEATURED and does not pretend the Mount Fuji image itself is a live/current ERN source.
- Hero primary action now scrolls directly to Watch Earth; secondary action moves to Explore by Feeling & Place. The public Guide remains gated and is not promoted as a hero action.
- Watch Earth now sits directly under the hero. Category controls remain available but are compact/contextual inside Watch Earth rather than occupying a separate heavy navigation band.
- Featured-set scoring now gives a modest visual-quality boost to verified sources with real thumbnail imagery. Commercial value does not affect this ranking.
- Source-backed card images receive stronger crops and subtle zoom; fallback illustration scenes now vary by destination ID so no-image cards are less repetitive while remaining clearly illustrative.
- ERN brand mark was simplified from a glossy placeholder style to a flatter, cleaner window/earth mark; brand spacing and navigation weight were reduced.
- Typography, spacing, shadows, card radii and section density were reduced toward the approved lighter premium mockup direction.
- Existing truth/currentness, provider-diversity, commercial-neutrality, Watch Earth eligibility, SEO/AI-search, crawlability, Guide/Now Moments gates and the strict performance ceilings were not relaxed.
- Current changed-file sizes remain under individual preflight limits: index ~25 KB (<45 KB), app-lite ~94 KB (<100 KB), styles-lite ~83 KB (<100 KB), and sources.json remains below 300 KB.
- This is now a substantial owner visual-review point; continue from owner screenshots/approval rather than layering further visual change blindly.

First-Impression refinement continuation — 2026-10-04:
- The approved editorial hero is now static by design; obsolete dynamic hero rotation/live-preview hooks were removed and the whole-product guard was updated to enforce the static editorial contract.
- The approved Mount Fuji mockup-derived hero asset is stored locally at assets/ern-fuji-mockup-hero.jpg and is the homepage hero source.
- Main desktop/mobile navigation controls now retain native hash-link fallbacks in addition to JS enhancement. Release smoke covers those visible navigation contracts.
- Search suggestion chips are wired; visible homepage controls were audited for missing handlers/targets.
- Card visual policy is now layered: real source thumbnail when available; truthful category/destination-specific illustrative fallback otherwise; generic fallback only as last resort.
- Illustrative card art is explicitly labeled ILLUSTRATIVE so artwork cannot be mistaken for a current camera frame.
- Lightweight fallback families now include snow/glacier, volcano, island/lagoon, wildlife, city/town, water/coast/lake, mountain and general Earth, with small deterministic composition variants.
- Watch Earth first-row selection preserves place/country/provider diversity and gives a modest non-commercial preference to valid source thumbnails.
- Broken destination thumbnails fail to scenic illustrative artwork instead of browser broken-image UI.
- Mobile Explore-by-feeling cards use compact two-column presentation and the mobile navigation dock remains small/centered.
- Performance remains a hard gate. Obsolete hero runtime code was removed and compact source metadata retained to create meaningful core-budget headroom.
- Release smoke now includes navigation-controls.smoke.js and first-impression-visuals.smoke.js.
- Latest corrected Pages deployment after static-hero guard reconciliation completed successfully.



First-impression close-out / release reliability — 2026-10-04:
- Closed the recurring stale-browser problem at the release layer: production snapshots now rewrite homepage CSS and app-lite URLs with the current build SHA, so every deployed build receives unique asset URLs without manual query-string maintenance.
- ERN Operations now records Atlas/reference reachability attention without aborting the rest of the daily packet; the first corrected Operations run completed successfully.
- The homepage hero no longer depends on a remote Wikimedia image URL. It uses the local crisp Mount Fuji SVG editorial artwork, preserving FEATURED/editorial truth rather than implying a live Fuji feed.
- Hero Watch Earth Now remains an immediate viewing action when an eligible current window exists; top/mobile Watch navigation remains the browse-section action.
- Mobile bottom navigation is standardized as one compact four-action row (Watch / Explore / Map / Saved) instead of the older large 2x2 overlay.
- Supplemental Search remains deduplicated at 20 Search-only places, for 339 combined searchable places (319 core + 20 supplemental); duplicate-place checks remain a hard release gate.
- Supplemental Search destinations are included in crawlable destination-page generation and sitemap/discovery output without entering startup payload, Watch Earth, hero ranking or Atlas.
- Repaired Dresden Old Town and Radebeul weathercam links to the current official Dresden Elbland weathercam endpoint after the old endpoint returned 410.
- All source-truth, commercial-neutrality, public Guide/Now Moments gates and strict performance ceilings remain unchanged.


New-chat continuation checkpoint — 2026-10-04 22:11 ICT:
- Canonical repo remains jjcadenza5-arch/earth-right-now on main. Current production head: 43f36526a8f2b319d662834d7dfa05dc2a053699.
- Latest GitHub Pages deployment for that exact head completed successfully at 2026-10-04T14:48:06Z. Earlier failed deploys in the same hour were superseded by this successful release.
- Owner screenshots from roughly 19:47–19:50 ICT still showed two visible defects in the then-served build: a visibly pixelated Mount Fuji hero and an oversized 2x2 mobile dock. Subsequent current-main fixes replaced the hero dependency with the local crisp assets/ern-fuji-hero.svg editorial artwork and standardized the mobile dock as one compact four-action row. Owner has not yet supplied a screenshot after the final 21:48 ICT successful deployment, so do not reopen these items unless the current production view still reproduces them.
- Hero truth contract: Mount Fuji is editorial/FEATURED, not a claimed live Fuji feed. Do not label the hero LIVE/CURRENT.
- Hero CTA contract: the large Watch Earth Now action opens an eligible current ERN window immediately when one exists; header/mobile Watch remains the browse/jump-to-Watch-section action.
- Card truth contract: use a real source thumbnail when valid; otherwise use a deterministic scenic fallback marked ILLUSTRATIVE. Never turn illustrative art into a fake camera frame.
- Core inventory remains 319 healthy searchable places across 79 countries/territories plus 20 lazy Search-only supplemental places = 339 combined searchable destinations. The core sources.json 300 KB ceiling remains hard and must not be raised.
- Public Guide and public Now Moments remain OFF. Affiliate/commercial value must never affect Earth ranking.
- First-impression work should now be treated as CLOSED unless there is a reproducible functional or responsive defect. Do not keep polishing the same homepage by preference alone.
- Next productive phase should resume AI Search Discovery Readiness / destination understanding: strengthen crawlable destination metadata, aliases/local-language search equivalence, structured public facts, related-destination links, and retrieval quality without bloating first load. The latest successful release already includes the repaired search-alias smoke test and shared multilingual search-intent work.
- Working style remains large autonomous batches. Do not return for micro-decisions. Come back only for a real owner playback check, exact affiliate-account action, legal/payment decision, or a substantial review point.


---

## 2026-10-04 — AI Search Discovery Readiness: destination-understanding checkpoint

### Reconciliation
- Reconciled current `main` against this handoff before implementation.
- Preserved all later valid work. Homepage / first-impression polishing remains CLOSED unless a reproducible defect is found.
- No public generative Guide activation, Now Moments activation, paid-ranking change, source-truth relaxation or core source-budget increase was introduced.

### Completed in this tranche
- Added `data/place-search-aliases.json` as a lazy, non-ranking multilingual/local-name retrieval layer.
  - 26 curated destination/place records.
  - 109 curated aliases after folded-form deduplication.
  - Includes local-script and common-name examples across Thai, Japanese, Korean, Chinese, Arabic, Turkish, Greek, Slovenian and common European transliterations.
- Visitor search loads the alias sidecar only after a visitor starts searching.
  - Startup catalog payload remains unchanged.
  - `src/app-lite.js` release size: **99,815 bytes**, below the hard 100 KB gate.
- Crawlable destination pages now merge curated aliases into:
  - visible “Also known as” text,
  - JSON-LD `alternateName`,
  - existing destination search/filter text.
- Strengthened structured destination facts with:
  - ERN source provider,
  - playback mode,
  - latest reliable ERN check timestamp when available,
  - machine-readable related-destination links.
- Search metadata audit now covers the combined core + lazy supplemental searchable universe and tests multilingual/local-script queries.
- Public `llms.txt` now explicitly describes ERN destination understanding, local-language aliases, related destinations, verification facts and the rule that retrieval metadata never changes source truth or commercial ranking.
- Added/strengthened release gates for:
  - multilingual alias integrity,
  - multilingual search retrieval,
  - crawlable alias visibility,
  - structured destination context,
  - AI-search orientation.
- Workflow now reruns Pages validation when the search-metadata audit contract changes.

### Current searchable baseline
- Core place IDs reported by release: **322**
- Lazy Search-only supplemental places: **20**
- Combined searchable places: **342**
- Supplemental places remain Search-only and cannot enter Watch Earth / hero / Atlas merely because they are searchable.

### Release validation
- Production Pages release head: `d4e81d2658f82e39edb4be284487fbde6136955b`
- Final Pages run: **SUCCESS**
- Release smoke: PASS
- Performance preflight: PASS
- SEO indexing readiness: PASS
- AI-search discovery readiness: PASS
- Multilingual place-alias integrity: PASS
- Search metadata retrieval integrity: PASS
- Public feature gates remain fail-closed as before.

### Genuine next owner gate
The next meaningful search-discovery step is external ownership/indexing setup and cannot be completed safely from code alone:
1. Verify/select `https://earthrightnow.app/` in Google Search Console using the owner Google account and existing site-verification path (or exact DNS token supplied by Google).
2. Submit `https://earthrightnow.app/sitemap.xml`.
3. Inspect the homepage, `/places/`, `/discover/`, and representative destination URLs.
4. After Google is verified, connect/import into Bing Webmaster Tools where available and submit/confirm the sitemap.

Do not invent verification tokens or alter DNS without the exact owner-provider value. Search-engine verification must not change ERN source truth, ranking, privacy or gated-feature state.

### Next autonomous lane after owner verification
Use real indexing/crawl feedback to prioritize:
- destination-query alias gaps,
- index coverage issues,
- crawlable destination metadata gaps,
- search-result quality improvements,
- local-language retrieval expansion,
while preserving the startup/performance ceiling and existing product gates.


### Owner update — Google Search Console verification already complete
- Owner confirmed Google Search Console ownership verification for `https://earthrightnow.app/` was already completed before this checkpoint.
- Do not ask the owner to repeat property verification.
- Next owner-side evidence to collect is sitemap/indexing state: sitemap submission/acceptance and URL Inspection results for the homepage, `/places/`, `/discover/`, and a representative destination page.


### Owner update — Google indexing setup complete
- Owner confirmed Google Search Console ownership verification was already complete.
- Owner also confirmed sitemap submission and URL Inspection checks were already completed.
- Treat the Google owner-side indexing setup as DONE. Do not ask the owner to repeat verification, sitemap submission, or the initial URL Inspection pass.
- Continue with autonomous ERN work; only request owner input for genuinely new external actions or when real index/crawl feedback requires a decision.


### First-impression regression repair — 2026-10-04
- Reconciled against the immediately preceding ERN chat: broad first-impression/homepage work is CLOSED and remains frozen.
- The 12-vs-20 Watch Earth discrepancy was a real regression, not a reason to reopen design work.
- Root cause: runtime narrowed the entire Watch Earth pool to proven inside-ERN items whenever at least six existed, undoing the earlier approved behavior that fills up to 20 truthful current windows while still preferring inside playback.
- Repair: removed that narrowing. Proven inside-ERN windows remain preferred for the hero/open-now action and reserved early in the Watch Earth set; external/current windows may again fill the truthful 20-window target.
- Added a regression guard so release smoke fails if the full current set is collapsed back to proven-only inventory.
- Cache-busted the public app runtime so browsers receive the repaired behavior.
- Do not resume general homepage polishing. Only fix reproducible defects; continue toward completion/operations.


### Owner visual approval + continuation — 2026-10-05
- Owner approved the current photographic Mount Fuji hero as visually good. Treat the hero as ACCEPTED for now.
- Do not reopen hero replacement unless there is a reproducible defect. A future optional enhancement may rotate a small curated set of editorial hero photographs on a slow cadence (day/week), screensaver-like, while preserving editorial/FEATURED truth and the existing layout.
- Continued first-impression work only where it improves evidence/credibility rather than redesigning: Watch Earth now preferentially reserves up to four current inside-ERN sources with valid real thumbnails before filling the rest of the first row, while keeping provider/country/place diversity and truth gates.
- Expanded lazy multilingual/local-name retrieval coverage for 17 additional destinations, including Salzburg, Innsbruck, Dubrovnik, Tallinn, Mendoza, Wānaka, Rotorua, Issyk-Kul, Khumbu/Everest, Poiana Brașov, Mayon/Bulusan/Kanlaon, Mauna Loa, Tvøroyri, Longyearbyen and Lerwick.
- Expanded search-metadata audit samples to cover the new local-language/transliteration cases.
- Public generative Guide and public Now Moments remain OFF; ranking remains commercial-neutral; startup/core payload ceilings remain hard.
- Continue autonomously into remaining completion/operations work rather than repeated homepage polishing.


### Lightweight brand / Atlas refinement + autonomous continuation — 2026-10-05
- Preserved the accepted photographic Mount Fuji hero; do not reopen it by preference alone.
- Added a lightweight globe-based ERN brand mark at `assets/ern-mark-globe.svg` and switched the homepage plus core public brand pages to it. The mark keeps the existing rounded-window identity but uses a recognizable globe/Earth treatment that stays legible at small header sizes.
- Refined the Living Atlas using the existing local Natural Earth public-domain vector only: more Earth-like ocean/land presentation, softer atmospheric depth and subtle inset relief, with no new runtime map library or network dependency.
- Pin semantics, coordinate provenance, map filtering, source truth and performance boundaries are unchanged.
- First-impression refinement remains bounded: no layout redesign, no accepted-hero changes, no feature-gate changes.
- Continued retrieval/discovery work from the previous tranche; public Guide and Now Moments remain OFF and ranking remains commercial-neutral.
- Future optional idea only: a slow curated editorial hero rotation (daily/weekly), screensaver-like. Do not activate unless it can preserve the accepted layout, editorial truth and performance without introducing fragility.


### Release-budget repair after visual refinements — 2026-10-05
- Continued autonomously after the globe-mark / Atlas refinement.
- A Pages release gate caught a real performance regression: `app-lite.js` was 100,163 bytes (>100 KB) and lean core was 576,069 bytes (>575 KB).
- The budgets were NOT raised.
- Compacted the new Watch Earth real-thumbnail preference logic without changing behavior.
- Compacted the Atlas refinement CSS without changing its visual intent.
- JavaScript syntax validation is green; Pages / Operations validation is running on the repaired build.
- Phase 10 workplan remains COMPLETE. Do not invent a new phase merely to avoid an appropriate autonomous hold after all local release/operations blockers are green.


### Large provider-discovery batch — 2026-10-05
- Continued autonomously in larger batches without reopening the accepted homepage/hero.
- Resolved release/operations cleanup first: playback evidence consistency is clean, folded duplicate aliases were removed, whole-product guards now validate behavior instead of comment/variable-name text, and Operations packet integrity is green.
- Provider-family research expanded substantially from the existing catalog, always fail-closed and commercial-neutral. Newly reviewed families include:
  - Switzerland Tourism — LINK_ONLY; public/commercial reuse requires prior written consent.
  - GeoNet / Earth Sciences New Zealand — documented CC BY 3.0 NZ current-image path with attribution; exact image integration still requires a single-source staging/review step.
  - IGP/CENVUL Peru — LINK_ONLY pending camera-specific reuse rights.
  - INETER Nicaragua — LINK_ONLY; public viewing does not establish reuse permission.
  - Prague City Tourism — LINK_ONLY pending webcam-specific reuse permission.
  - Panama Canal Authority — LINK_ONLY; commercial/image cross-site reuse requires explicit authorization.
  - Australian Antarctic Program — LINK_ONLY pending station-webcam image licensing.
  - Taiwan government camera families — conservative agency-specific permission boundary.
  - Istanbul Metropolitan Municipality — LINK_ONLY pending explicit municipal camera reuse permission.
  - IG-EPN Ecuador — LINK_ONLY; reviewed data terms do not support ERN republication.
  - Landsverk — LINK_ONLY pending explicit camera reuse terms.
  - Hong Kong Observatory — LINK_ONLY for ERN unless prior written commercial authorization is obtained.
  - Île de la Réunion Tourisme — LINK_ONLY; image/site reuse requires written authorization.
  - Visit Azores and VisitDenmark — LINK_ONLY pending camera-specific commercial/player permission.
  - OVSICORI-UNA and City of Kraków — LINK_ONLY pending specific camera reuse basis.
  - DOST-PHIVOLCS — LINK_ONLY; redistribution/commercial constraints require camera-specific permission.
  - North Coast & Guanyinshan National Scenic Area — broad open-information reuse exists with source attribution, but exact camera ownership must be checked before any current-image promotion.
  - Cook Islands Airports Authority, Mauritius Now, Visit St. Maarten / ShowMe Caribbean — LINK_ONLY pending explicit originating-provider permission.
  - Beach View Barbados — LINK_ONLY; site terms are personal/non-commercial and webcam operation is third-party.
  - Vienna Tourist Board — LINK_ONLY; all rights reserved / express consent boundary.
  - Plantation Island, Lomani Island, Kuredu Island, Odjo d'Água, Denpasar ATCS — public live views retained LINK_ONLY because no explicit third-party commercial embed/reuse grant was confirmed.
  - Visit Finland family — curated third-party views remain LINK_ONLY unless the originating provider grants embed/reuse rights.
- This research does NOT alter visitor ranking, source health, source truth or commercial placement.
- The accepted hero remains frozen. Globe logo and Natural Earth Atlas refinement remain preserved.
- Remaining local autonomous lanes are still provider discovery, one immediate Takayama current-image human-media review, and inside-ERN playback renewal debt. The latter two require real human playback/media confirmation and must not be auto-renewed from reachability alone.


### Watch Earth product principle + readability refinement — 2026-10-05
- Owner clarified the enduring ERN product split:
  - Watch Earth is a curated rotating front shelf for beautiful, interesting or time-sensitive views, especially sunrise/morning light, sunset/evening light, strong daytime scenery and city/skyline night views.
  - It does not need to show every source. A small excellent set is better than a large repetitive set.
  - The wider catalog belongs in Search/Explore so visitors can intentionally find destinations and "see before you go."
- Preserve this distinction in future ranking and UI work. Do not turn Watch Earth into a catalog dump.
- Watch Earth automatic editorial profile now rotates hourly while remaining deterministic within the hour; quality/truth/freshness gates and geographic/provider diversity still apply.
- Country clustering in the inside-ERN reserve is capped to reduce repeated Japan/Kyoto-heavy presentation.
- Small visible UI text received a conservative readability increase only; no structural spacing/layout redesign was performed.
- Future typography/spacing work should be incremental and guarded. Prefer small selector-level adjustments over broad restyling because the current layout is accepted and regression risk matters more than pixel-perfect polishing.


### Post-social-preview continuation — provider discovery expansion — 2026-10-05
- Social-preview repair is complete and production is green; autonomous ERN work resumed from the previously open lanes.
- The operator's 2026-10-05 human playback evidence for Kyoto Fushimi Inari, Kyoto Kifune Shrine, Kyoto Nishiki Market, La Palma Caldera de Taburiente and Verbier is already atomically reflected in both catalog playback markers and provider-observation ledger; playback-evidence consistency is clean.
- Continued provider-discovery research in three large batches. Newly classified families include Alaska Volcano Observatory, Aruba Tourism Authority, City of Brussels, City of Dubrovnik, Dresden Elbland Tourism, Gudauri, Hawke's Bay Regional Council, Heidelberg Marketing, Horizons Regional Council, INSIVUMEH, Lake Wānaka Tourism, Servicio Geológico Colombiano, Shetland.org, Sonnenkinderprojekt Namibia, Taiwan Tourism Administration, Tri-Mountain National Scenic Area, USGS/Yellowstone, Visit Zandvoort, ArctiComm, Bansko Ski, Bled, Borovets, Cannes, CENAPRED/UNAM, Cook Islands Airports/Tamanu Beach, Darmstadt Tourismus, EvK2CNR/ISAC CNR, Réunion/IPGP-OVPF and Jasná/Tatry Mountain Resorts.
- Strong reusable current-image opportunities identified:
  - Alaska Volcano Observatory: AVO-staff media can be public domain; specific camera ownership still must be checked.
  - Tri-Mountain National Scenic Area: OGDL Taiwan 1.0 can support reuse with attribution, subject to third-party exclusions.
  - USGS Yellowstone Volcano Observatory: exact current camera imagery is explicitly Public Domain; one exact endpoint can be staged later with refresh/truth checks.
- All other reviewed families remain fail-closed LINK_ONLY unless exact rights/permission supports more.
- Current provider-discovery backlog among healthy/current external sources is down to 39 provider families; continue in large batches, prioritizing leverage and explicit public reuse paths rather than volume.
- Existing owner gates remain unchanged: Takayama current-image review and any expired inside-ERN playback renewal still require genuine human review; do not auto-renew from reachability.



### Exact reusable current-image candidate resolution — 2026-10-05
- Reconciled the canonical handoff against current main before continuing. Preserved accepted Mount Fuji hero, globe logo, Natural Earth Atlas, social-preview repair, Search Console completion, existing human playback evidence and all public feature gates.
- Continued the provider-discovery lane without promoting research-only sources.
- USGS / Yellowstone Volcano Observatory:
  - exact current-image endpoints were resolved for Biscuit Basin and Yellowstone Lake;
  - USGS Yellowstone material used for this path is explicitly Public Domain;
  - semantics remain CURRENT_IMAGE, never live-video;
  - catalog promotion is still blocked until ERN staging verifies refresh/cache behavior and source attribution presentation.
- GeoNet / Earth Sciences New Zealand:
  - documented stable latest-image endpoint patterns were resolved for Ruapehu North and Taranaki Maunga;
  - GeoNet states volcano camera images are updated about every 10 minutes;
  - GeoNet content is licensed CC BY 3.0 NZ and requires GeoNet/programme-sponsor acknowledgement;
  - catalog promotion is still blocked until ERN staging verifies fetch/cache/refresh behavior with visible attribution.
- Provider registry updated in commit `9d80608b9074b63ba99f593e5512f80c3b99d7c2`.
- GitHub Pages for that commit completed SUCCESS. ERN Operations was still running at the time this checkpoint was written; do not infer failure from that in-progress state.
- No public ranking, Watch Earth selection, source-health state, playback proof, Guide/Now Moments gate or performance budget was changed.
- Next productive provider-rights lane remains explicit reusable current-image/player paths, including Icelandic Meteorological Office and eligible Taiwan scenic-area assets, while keeping ambiguous sources LINK_ONLY.



### Reusable current-image staging + machine-first review — 2026-10-05
- Continued autonomously from the exact USGS/GeoNet candidate checkpoint.
- Private staging now contains exact fail-closed targets for:
  - USGS/YVO Yellowstone Biscuit Basin current image;
  - USGS/YVO Yellowstone Lake current image;
  - GeoNet Ruapehu North current image;
  - GeoNet Taranaki Maunga current image;
  - USGS/HVO Kīlauea V3cam current image.
- Existing public catalog entries remain LINK_ONLY / EXTERNAL. No automatic public promotion occurred.
- USGS Kīlauea V3cam:
  - official USGS media identifies the camera image as Public Domain;
  - exact direct current-image target resolved to `https://volcanoes.usgs.gov/cams/V3cam/images/M.jpg`;
  - image is timestamped and USGS-branded;
  - preserve CURRENT_IMAGE semantics; do not conflate the still image with the separate livestream.
- Icelandic Meteorological Office Reykjavík:
  - official page confirms the web cameras belong to IMO;
  - IMO terms allow private and commercial reuse unless otherwise stated, with Icelandic Meteorological Office attribution and download date;
  - exact stable current-image asset URL remains unresolved, so the candidate stays preparation-only and fail-closed.
- Taiwan Tri-Mountain National Scenic Area:
  - official government website disclosure uses OGDL Taiwan 1.0 with attribution for publicly published copyrightable materials, subject to exclusions for third-party works;
  - official Emei Lake live-camera page confirmed, but exact current player/asset ownership is not exposed clearly enough to establish that the live player itself falls within the open license;
  - candidate therefore remains research-only until the exact agency-owned target/player is resolved.
- Added `tests/provider-authorized-current-image-staging.smoke.js` to ensure exact reusable image targets remain source-bound, unreviewed, non-promotable and non-mutating until review completes.
- Improved provider-generated-target operations semantics:
  - exact current-image targets now use `AUTOMATED_FETCH_REFRESH_ATTRIBUTION_FIRST`;
  - interactive widgets/players continue to use `DEPLOYED_HUMAN_RENDERING_REQUIRED`;
  - this reduces unnecessary owner checks and preserves human review only where media/player judgment is actually required.
- Validation after the review-mode change:
  - latest GitHub Pages deployment SUCCESS;
  - JavaScript syntax check SUCCESS;
  - ERN Operations Check SUCCESS.
- Takayama and any genuinely expired inside-ERN playback evidence remain the real human-media gates. Do not renew them from URL reachability alone.



### AVO reusable-image follow-up — 2026-10-05
- Alaska Volcano Observatory rights/source research was deepened without public promotion.
- AVO states AVO-staff media are Public Domain but warns that some database media are third-party copyrighted, so ERN must remain asset-specific.
- The official Augustine/Homer webcam currently exposes a timestamped current image and USGS marks the corresponding webcam media Public Domain.
- The retrievable image target is a dated archive JPEG, not a documented stable latest/current alias.
- ERN therefore keeps AVO camera sources LINK_ONLY for now and explicitly avoids freezing a dated archive JPEG as if it were a current-image endpoint.
- Revisit only when a stable provider latest-image endpoint/API is documented or an exact current alias is confirmed.



### Machine-verified reusable current-image pipeline — 2026-10-05
- Added a fail-closed current-image network verifier to daily ERN Operations.
- Verifier checks staged exact current-image targets for:
  - successful HTTP response,
  - real image content (including JPEG/PNG signature fallback when Content-Type is absent),
  - image byte size,
  - ETag / Last-Modified / cache headers,
  - provider metadata endpoints where available,
  - temporal freshness evidence.
- GeoNet initially exposed a useful edge case: valid JPEGs omitted Content-Type. The verifier was corrected to inspect image signatures and use trustworthy Last-Modified timestamps as freshness evidence.
- Corrected Operations evidence at 2026-10-05T06:43Z showed 5/5 machine-current:
  - USGS Yellowstone Biscuit Basin,
  - USGS Yellowstone Lake,
  - GeoNet Ruapehu North,
  - GeoNet Taranaki Maunga,
  - USGS/HVO Kīlauea V3cam.
- GeoNet staging then expanded using documented camera IDs and stable latest-image patterns to:
  - Ngauruhoe from West,
  - Tongariro from North,
  - Whakaari / White Island from Te Kaha.
- Operations evidence at 2026-10-05T06:48Z showed 8/8 staged exact targets machine-current, with zero invalid targets and zero temporal-sample debt.
- Machine verification evidence for the public-source-bound candidates is recorded in data/source-evidence.json.
- Added an Operations current-image promotion-readiness layer. It requires BOTH:
  - explicit reusable-rights evidence, and
  - passing machine-current image evidence.
- This readiness layer is advisory only:
  - catalogMutationAllowed=false;
  - automaticPromotionAllowed=false;
  - linkOnlyAutoUpgradeAllowed=false.
- Current promotion readiness:
  - 7 sources are READY_FOR_EDITORIAL_PROMOTION_REVIEW:
    - Yellowstone Biscuit Basin,
    - Yellowstone Lake,
    - GeoNet Ruapehu North,
    - GeoNet Taranaki Maunga,
    - GeoNet Ngauruhoe,
    - GeoNet Tongariro,
    - GeoNet Whakaari / White Island.
  - Kīlauea V3cam is machine-current and Public Domain but remains staged because its existing public source record is EXTERNAL_LIVE rather than LIVE_IMAGE.
- A temporary attempt to add a dedicated Kīlauea current-image core source proved why the performance gate matters:
  - lean core increased to 576,243 bytes;
  - hard ceiling remains 575 KB;
  - Pages release correctly failed;
  - the ceiling was NOT raised.
- The extra Kīlauea core row was rolled back. Subsequent Pages and Operations on the rollback path returned green. Kīlauea remains private staging only until a zero-bloat public binding strategy is available.
- Existing public visitor behavior remains unchanged: all seven review-ready sources are still LINK_ONLY / EXTERNAL. No automatic inside-ERN promotion occurred.
- This is now a genuine substantial review/approval point: ERN can either keep the seven sources link-only or deliberately transition a controlled pilot subset to inside-ERN IMAGE_REFRESH with attribution, rollback guards and an evidence-renewal policy.



### Two-source controlled IMAGE_REFRESH pilot — ACTIVE — 2026-10-05
Owner explicitly approved proceeding with the two-source controlled inside-ERN current-image pilot.

#### Active public pilot sources
1. **Yellowstone — Biscuit Basin**
   - source id: `yellowstone-biscuit-basin-current-image`
   - provider: U.S. Geological Survey / Yellowstone Volcano Observatory
   - public runtime state: `LIVE_IMAGE / EMBED_ALLOWED / IMAGE_REFRESH`
   - exact image: `https://volcview.wr.usgs.gov/ashcam-api/images/webcams/ys-bbsn2/current.jpg`
   - provider page remains the visitor-facing Source link
   - nominal refresh: 15 minutes
   - rights basis: USGS Public Domain
   - concise runtime attribution: `USGS / YVO`
   - full rights/freshness evidence remains in `data/source-evidence.json`

2. **Mount Ruapehu — Current Images**
   - source id: `nz-ruapehu-current-image`
   - provider: GeoNet / Earth Sciences New Zealand
   - public runtime state: `LIVE_IMAGE / EMBED_ALLOWED / IMAGE_REFRESH`
   - exact image: `https://images.geonet.org.nz/volcano/cameras/latest/ruapehunorth.jpg`
   - provider page remains the visitor-facing Source link
   - nominal refresh: 10 minutes
   - rights basis: GeoNet CC BY 3.0 NZ
   - concise visible attribution: `GeoNet — NHC, ESNZ, LINZ, NEMA & MBIE`
   - full attribution/rights evidence remains in `data/source-evidence.json`

#### Source-link and attribution boundary
- The image viewer uses the exact current-image endpoint.
- Visitor-facing Source/attribution links prefer `officialUrl`, not the raw JPEG.
- No current-image source is represented as live video.
- Commercial/affiliate ranking remains completely separate and cannot influence Earth ranking.

#### Automated maintenance
- Added `.github/workflows/current-image-pilot-renewal.yml`.
- Schedule: daily at 00:37 UTC plus manual workflow dispatch.
- Workflow has `contents: write` only because it must renew verification timestamps after a successful machine-current probe.
- It is NOT push-triggered, preventing renewal loops.
- Renewal is hard-scoped to exactly:
  - `yellowstone-biscuit-basin-current-image`
  - `nz-ruapehu-current-image`
- Renewal checks exact target binding plus:
  - `IMAGE_REFRESH`
  - `EMBED_ALLOWED`
  - exact staged image URL
  - valid current image response
  - fresh temporal evidence
- On any mismatch/freshness failure the renewal job fails closed and does not update evidence.
- Renewal may update only `checkedAt`, `lastSuccessfulCheck` and clear a resolved failure marker. It must not change permission, playback, ranking, provider set, or promote any additional source.

#### Performance regression handling
- First pilot version exceeded the hard 575 KB lean-core ceiling.
- The limit was NOT raised.
- Audit/pilot metadata was moved out of the runtime catalog into `data/source-evidence.json`.
- Runtime attribution/card copy was compacted without removing required attribution.
- Final production Pages release at commit `e1ddbe43159c72a7b88626d24452c62b55dae57b` completed **SUCCESS** and passed the unchanged hard performance gate.
- This preserves the standing rule: optimize to fit; never raise the performance limit merely to pass a release.

#### Latest Operations evidence
Operations packet generated around 2026-10-05T07:35:59Z reports:
- exact staged current-image targets: **8**
- machine-current: **8 / 8**
- invalid: **0**
- temporal-sample debt: **0**
- public IMAGE_REFRESH maintenance-eligible: **2**
  - Yellowstone Biscuit Basin
  - GeoNet Ruapehu North
- still READY_FOR_EDITORIAL_PROMOTION_REVIEW: **5**
  - Yellowstone Lake
  - GeoNet Taranaki Maunga
  - GeoNet Ngauruhoe
  - GeoNet Tongariro
  - GeoNet Whakaari / White Island
- blocked staged candidate: **1**
  - Kīlauea V3cam: rights/currentness pass, but source binding remains intentionally unresolved to avoid duplicate-core/runtime bloat.

#### Public gates unchanged
- Public generative ERN Guide remains OFF.
- Public Now Moments uploads remain OFF.
- No general automatic source promotion was enabled.
- The other five review-ready sources remain LINK_ONLY / EXTERNAL.
- Takayama and genuinely expired inside-ERN playback proof remain real human-media gates.

#### Pilot observation rule
Do not expand beyond these two IMAGE_REFRESH sources merely because the first deployment is green. Observe production behavior and automated renewal first. Expand only after the pilot remains healthy under real scheduled renewal and normal visitor use.
