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
