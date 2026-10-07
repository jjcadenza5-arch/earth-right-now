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



### Pilot observation gate + curation semantics + provider provenance — 2026-10-05
Continued autonomously after activation of the two-source controlled IMAGE_REFRESH pilot.

#### Pilot observation gate
- Added `data/current-image-pilot-observations.json` as a non-runtime observation ledger.
- Successful renewal runs now append a bounded audit sample containing:
  - observation time,
  - UTC date,
  - GitHub event type,
  - exact two pilot source ids,
  - machine freshness timestamps/ages.
- The ledger is capped to the latest 30 observations.
- Added `current-image-pilot-observation` Operations status.
- Expansion rule is now enforceable:
  - requires at least **2 distinct successful scheduled renewal UTC dates**;
  - manual `workflow_dispatch` runs do **not** count toward expansion readiness;
  - latest scheduled renewal must remain recent;
  - automatic expansion remains forbidden.
- Current state:
  - `OBSERVING`
  - successful scheduled renewal dates: **0 / 2**
  - `expansionReady=false`
  - next action: `KEEP_TWO_SOURCE_PILOT_AND_WAIT_FOR_SCHEDULED_RENEWALS`
- The renewal workflow was created after the 2026-10-05 00:37 UTC schedule slot, so no scheduled renewal is expected in today's ledger.
- Renewal workflow remains hard-scoped to:
  - `yellowstone-biscuit-basin-current-image`
  - `nz-ruapehu-current-image`
- Successful renewal may update verification timestamps and the observation ledger only; it cannot change permissions, playback mode, ranking, or promote additional sources.

#### Latest pilot/source health
Operations packet around 2026-10-05T09:03Z:
- exact staged current-image targets: **8**
- machine-current: **8 / 8**
- invalid: **0**
- temporal-sample debt: **0**
- public IMAGE_REFRESH maintenance-eligible: **2**
- still READY_FOR_EDITORIAL_PROMOTION_REVIEW: **5**
- blocked: **1 Kīlauea V3cam source-binding case**
- Pilot sources remained freshly machine-verified:
  - Biscuit Basin current image: fresh temporal evidence;
  - Ruapehu North current image: fresh temporal evidence.

#### Watch Earth: target is now a ceiling, not a quota
- Corrected `watchEarthLiveNowStatus` operational semantics to match the approved product principle:
  - **20 is a maximum/ceiling, not a fill target**;
  - **5 excellent diverse views > 20 repetitive/weaker views**.
- Status model now uses:
  - `FULL` when the ceiling is reached,
  - `CURATED` when the healthy curated floor is met,
  - `THIN` only when the shelf is genuinely too small,
  - `EMPTY` when no current shelf exists.
- Operations now reports:
  - status: **CURATED**
  - target role: `CEILING_NOT_QUOTA`
  - curated floor: 5
  - current count: **13**
  - places: 13
  - countries: 7
  - providers: 8
  - inside-ERN: 13
  - shortfall: **0**
  - capacity remaining: 7
- This prevents future autonomous work from trying to fill Watch Earth to 20 merely to make an operational report look complete.

#### Crawlable destination/source-link consistency
- For IMAGE_REFRESH sources the runtime `sourceUrl` is the exact current-image JPEG.
- Public visitor-facing Source links already preferred `officialUrl`.
- Found and fixed a remaining inconsistency in `scripts/build-destination-pages.mjs`:
  - destination-page Provider Source links now prefer `officialUrl || sourceUrl`;
  - structured WebPage `citation` values also prefer official provider pages.
- This prevents raw current-image JPEG endpoints from being exposed as the authoritative public source/citation in crawlable destination pages or AI-search surfaces.
- Added a regression test enforcing official-provider-page preference.

#### Taiwan reusable-source research
**Tri-Mountain National Scenic Area**
- Official Tri-Mountain government news states the headquarters installed new 4K tourism real-time cameras including Emei Lake, Baguashan and Deji Reservoir.
- This materially strengthens agency camera ownership/provenance.
- General website materials remain under OGDL Taiwan 1.0 with attribution, subject to third-party exclusions.
- Remaining blocker is now the exact delivered media/player target and whether that target is agency-hosted/OGDL-covered or separately controlled by a third-party platform.
- Status remains fail-closed; no promotion.

**North Coast & Guanyinshan National Scenic Area**
- Official site directly publishes a dedicated Live Camera gallery and named pages including Yehliu Geopark, Jhongjiao Bay, Heping Island, Baisha Bay, Yinghanling and Laomei Green Reef.
- This confirms the administration's official public source surface.
- Exact delivered media/player target is still unresolved and open-information reuse remains subject to third-party exceptions.
- Status remains fail-closed; no promotion.

#### Validation
Newest canonical main after this continuation:
- `dfee96983a4592c4e3906e318e492f81760aee81`
- latest Pages run for the destination-source-link guard: **SUCCESS**
- corresponding Operations run for the source-link correction: **SUCCESS**
- previous Tri-Mountain and North Coast provider-research commits also passed Pages and Operations.
- Hard performance limits were not raised.
- Public generative Guide and Now Moments uploads remain OFF.
- No pilot expansion occurred.



### Scheduled-renewal overdue guard + Yehliu exact-player human gate — 2026-10-05
Continued autonomously without expanding the two-source IMAGE_REFRESH pilot.

#### Scheduled renewal resilience
- Added an explicit regression test for the current-image pilot renewal workflow:
  - schedule/manual only;
  - no push trigger;
  - exact two-source scope;
  - fail-closed freshness verification;
  - observation-ledger persistence;
  - no permission/playback/ranking mutation.
- Enhanced the pilot observation status so it distinguishes:
  - normal pre-schedule waiting,
  - successful scheduled renewal,
  - a missed/overdue scheduled renewal.
- First expected scheduled renewal after pilot activation:
  - 2026-10-06T00:37:00Z
  - 07:37 Thailand time.
- A scheduled slot gets a two-hour grace period before it is considered missing.
- If an expected scheduled date has no successful scheduled observation, state becomes `RENEWAL_OVERDUE`, expansion remains false, and next action is to inspect the renewal workflow while keeping the pilot fail-closed.
- Current state remains:
  - `OBSERVING`
  - 0 / 2 successful scheduled renewal dates
  - no expected dates missing yet
  - `renewalOverdue=false`
  - `expansionReady=false`.
- Added a regression test preserving the machine-vs-human boundary:
  - `IMAGE_REFRESH` is machine-first and does not require EMBED playback proof;
  - real `EMBED` playback continues to require human proof.

#### Icelandic Meteorological Office research loop
- Rechecked the official Reykjavík webcam page and IMO rights basis.
- Ownership and reuse rights remain strong:
  - cameras belong to IMO;
  - photos/data may be reused, including commercial use, with attribution/download-date requirements unless otherwise stated.
- The public webcam UI still exposes dynamic time-slot frames and does not document a stable reusable current-image asset/API.
- Updated status to stop repeated probing:
  - rights basis confirmed;
  - exact stable asset unresolved;
  - keep RESEARCH_ONLY;
  - do not guess dynamic /0..7 routes or scrape an unstable asset.

#### Yehliu exact target resolution
- Resolved the official North Coast & Guanyinshan National Scenic Area **Yehliu Geopark Live Camera** page to an exact provider-branded YouTube embed:
  - video/player id: `ZjuY4qKaj40`
  - exact embed: `https://www.youtube.com/embed/ZjuY4qKaj40`
  - source surface: official North Coast government live-camera page.
- This clarified the correct rights/technical lane:
  - do NOT treat the YouTube player as an OGDL-reusable raw image;
  - preserve YouTube-branded player behavior and YouTube terms;
  - do not restream.
- Added private staged target:
  - id: `north-coast-yehliu-youtube-player`
  - integration kind: `PROVIDER_GENERATED_WIDGET`
  - truth if approved: `LIVE_VIDEO`
  - state: `DEPLOYED_REVIEW_REQUIRED`
  - review mode: `DEPLOYED_HUMAN_RENDERING_REQUIRED`
  - promotionAllowed=false
  - catalogMutationAllowed=false
  - automaticGenerationAllowed=false.
- Public Yehliu catalog source remains unchanged:
  - `LIVE_IMAGE`
  - `LINK_ONLY`
  - `EXTERNAL`.
- Added regression coverage ensuring the exact YouTube target cannot be auto-promoted or mistaken for a current-image target.

#### Operator review lab
- Extended the existing noindex operator review lab with a separate **Exact provider-generated targets** lane.
- This lane reads exact staged provider targets only when:
  - integration kind is `PROVIDER_GENERATED_WIDGET`;
  - exact target URL exists;
  - target is unreviewed;
  - all promotion/catalog/automatic-generation flags remain false.
- Generated-target cards use the research-safe embed allowlist and remain local-evidence only.
- Exact generated targets now participate in the review-batch hash so stale review pages cannot submit evidence against a newer batch.
- Release preflight confirms:
  - review page exists;
  - loadable embed count is coherent;
  - current batch manifest matches;
  - Yehliu exact target is present.
- Latest deployed release logs explicitly show:
  - `generatedReview: ["north-coast-yehliu-youtube-player"]`
  - Yehliu included among loadable embeds.
- Latest Pages run for commit `52cbafe0addf43f80214d93dc9745cc674699a0e`: **SUCCESS**.
- Operations for the generated-target staging path: **SUCCESS**.
- Operations classified Yehliu exactly as:
  - `DEPLOYED_REVIEW_REQUIRED`
  - `DEPLOYED_HUMAN_RENDERING_REQUIRED`
  - no promotion/catalog mutation.

#### Genuine next human gate
The next action is one deployed human playback review of the Yehliu exact YouTube player from the ERN operator review page. Do not change the public Yehliu source before this check. If playback is confirmed current/live, record human evidence first; only then evaluate truth-type and catalog transition separately.



### Yehliu human evidence applied — external-live truth corrected — 2026-10-05
Owner completed the deployed ERN operator-review human gate for the exact Yehliu provider-generated player.

#### Human evidence packet
- review batch: `7287d11ededefd73`
- review origin: `https://earthrightnow.app/review/inside-ern.html`
- target id: `north-coast-yehliu-youtube-player`
- type: `generated`
- outcome: `HUMAN_PLAYBACK_CONFIRMED`
- observedAt: `2026-10-05T10:05:03.929Z`
- official source page:
  `https://www.northguan-nsa.gov.tw/user/article.aspx?Lang=2&SNo=04007411`
- exact reviewed player:
  `https://www.youtube.com/embed/ZjuY4qKaj40`
- packet preserved at:
  `data/review-evidence/yehliu-generated-2026-10-05.json`

#### Evidence-system extension
- `generated` is now a first-class operator-review evidence type in the validation layer.
- Generated evidence must use a known staged provider-generated target id.
- Proposal processing now binds generated review evidence to both:
  - exact staged official source page (`generatorUrl`);
  - exact staged player/embed URL (`exactTargetUrl`).
- Target mismatch fails closed with `EVIDENCE_TARGET_CHANGED`.
- Confirmed generated playback produces:
  `READY_TO_RECORD_HUMAN_PLAYBACK_PENDING_EDITORIAL_REVIEW`
  and never authorizes automatic catalog writes or promotion.

#### Staged target state
Yehliu target now records:
- `reviewedAt=2026-10-05T10:05:03.929Z`
- `reviewOutcome=HUMAN_PLAYBACK_CONFIRMED`
- `reviewEvidencePath=data/review-evidence/yehliu-generated-2026-10-05.json`
- provider-generated status:
  `HUMAN_PLAYBACK_CONFIRMED_PENDING_EDITORIAL`
- next action:
  `EDITORIAL_TRUTH_PERMISSION_AND_CATALOG_REVIEW`
- `promotionAllowed=false`
- `catalogMutationAllowed=false`
- `automaticGenerationAllowed=false`

This intermediate state is intentional. Human playback proof does not equal full permission/catalog approval.

#### Public Yehliu truth correction
Separate editorial review concluded that the public catalog's old `LIVE_IMAGE` label was no longer the most truthful description because deployed human review proved that the official government source page is serving a current/live YouTube player.

The public source was therefore corrected narrowly to:
- id: `taiwan-yehliu-live`
- truth: **EXTERNAL_LIVE**
- permission: **LINK_ONLY**
- playback: **EXTERNAL**
- sourceUrl:
  `https://www.northguan-nsa.gov.tw/user/article.aspx?Lang=2&SNo=04007411`
- checkedAt / lastSuccessfulCheck:
  `2026-10-05T10:05:03.929Z`
- no `embedUrl`
- no inside-ERN permission escalation.

This is a truth correction, not an inside-ERN promotion.

#### Evidence boundary
`data/source-evidence.json` now records:
- exact official source page;
- exact reviewed player;
- human playback outcome/time/batch/origin;
- permission boundary:
  public Yehliu remains `LINK_ONLY / EXTERNAL`;
- player boundary:
  preserve YouTube/provider branding and do not restream.

Regression coverage now requires:
- generated packets validate only against exact staged ids;
- Yehliu exact target remains branded/non-promotional;
- human-confirmed target state remains editorial-pending;
- public Yehliu remains `EXTERNAL_LIVE / LINK_ONLY / EXTERNAL`;
- no public Yehliu `embedUrl`;
- source evidence retains the human playback proof and permission boundary.

#### Latest validated operations state
Operations packet `ern-operations-1313` confirms:
- current-image pilot: `OBSERVING`
- successful scheduled renewal dates: **0 / 2**
- renewal overdue: **false**
- next expected scheduled renewal:
  `2026-10-06T00:37:00Z`
- current-image targets: 8 total
  - maintenance eligible: 2
  - editorial review ready: 5
  - blocked: 1
- Watch Earth:
  - `CURATED`
  - 13 current shelf items
  - 7 countries
  - 8 providers
  - shortfall 0
  - balance `BALANCED`
- Yehliu staged target:
  `HUMAN_PLAYBACK_CONFIRMED_PENDING_EDITORIAL`
  with no automatic promotion/catalog mutation.

#### Validation
- Operations for the public Yehliu truth correction: **SUCCESS**.
- Final Pages run for the corrected test set at commit
  `18124042a03597d84ba73f136f5c338738c8566e`: **SUCCESS**.
- Hard performance budgets remain unchanged.
- Two-source IMAGE_REFRESH pilot was not expanded.
- Public generative ERN Guide remains OFF.
- Public Now Moments uploads remain OFF.

#### Next autonomous boundary
No further owner action is required for Yehliu now.
Do not embed Yehliu inside ERN merely because playback was confirmed. Any future transition from LINK_ONLY/EXTERNAL to EMBED_ALLOWED/EMBED must be a separate permission/platform/editorial decision with its own safeguards.



### Pre-renewal operations hardening — 2026-10-05
Continued autonomously after Yehliu human evidence was applied. No pilot expansion or new public feature activation occurred.

#### Pilot state surfaced in operator brief
The current-image pilot observation report was already generated in Operations but was not included in the human-readable operator brief. This is now fixed.

`operations:brief` now receives `ern-ops/current-image-pilot-observation.json` and renders a dedicated **Current-image pilot observation** section with:
- current state;
- successful scheduled renewal dates vs required dates;
- expansion-ready status;
- renewal-overdue status;
- next expected scheduled renewal;
- missing expected scheduled dates when applicable;
- exact next action;
- reminder that automatic expansion remains forbidden.

Retained Operations packet `ern-operations-1318` verifies the rendered brief currently says:
- state: `OBSERVING`
- scheduled renewal dates: **0 / 2**
- expansion ready: **NO**
- renewal overdue: **NO**
- next expected renewal:
  `2026-10-06T00:37:00.000Z`
  (07:37 Thailand time)
- next:
  `KEEP_TWO_SOURCE_PILOT_AND_WAIT_FOR_SCHEDULED_RENEWALS`.

#### Operations packet integrity strengthened
`current-image-pilot-observation.json` is now a required retained Operations artifact.

Packet-integrity validation now fails closed if:
- `safety.automaticExpansionAllowed` is not false;
- `expansionReady=true` while `renewalOverdue=true`;
- `renewalOverdue=true` without a missing expected scheduled date;
- the missing-date field is not an array.

Retained packet `ern-operations-1318` result:
- `valid=true`
- `issueCount=0`
- current-image pilot observation file present in required files.

#### Renewal ledger contract strengthened
The scheduled renewal script no longer silently tolerates malformed pilot-ledger structure.

Before touching either pilot source, it now requires:
- `schemaVersion === 1`;
- pilot identity exactly `CONTROLLED_IMAGE_REFRESH_2_SOURCE`;
- valid `activatedAt`;
- `requiredSuccessfulRenewalDates === 2`;
- ledger `allowedSourceIds` exactly equal the two approved pilot source ids;
- `observations` is already a valid array.

Any mismatch aborts renewal before source timestamps/evidence are changed.

Existing source-level fail-closed requirements remain:
- exactly two controlled target records;
- public source already `IMAGE_REFRESH`;
- permission already `EMBED_ALLOWED`;
- source URL exactly equals the staged target;
- image fetch/currentness probe must pass;
- no permission/playback/ranking mutation.

Regression tests now cover the ledger contract explicitly.

#### Yehliu completed human gate remains closed
Added a regression guard proving the reviewed Yehliu generated target no longer appears in future generated-target human review batches once:
- `reviewedAt` exists;
- `reviewOutcome=HUMAN_PLAYBACK_CONFIRMED`.

The human gate must not be repeated unless the target materially changes.

#### Validation
Latest operational/release validation for this batch:
- Operations run for ledger fail-closed change: **SUCCESS**
- retained Operations packet: `ern-operations-1318`
- packet integrity: **valid / 0 issues**
- final Pages run for commit `08fba6beee91433e2b31af477acc0e973465eaa4`: **SUCCESS**
- hard performance budgets unchanged
- Watch Earth curation semantics unchanged
- two-source IMAGE_REFRESH pilot remains exactly two sources
- public Guide remains OFF
- public Now Moments media remains OFF
- Yehliu remains external-only.

#### Next real boundary
Do not expand the current-image pilot before scheduled evidence exists.

First expected scheduled renewal:
`2026-10-06T00:37:00Z` / **07:37 Thailand time**.

After that run:
- if successful, the observation ledger should show **1 / 2** successful scheduled dates;
- if the run fails or does not occur, the overdue guard should eventually surface the missing date after its grace period;
- either outcome is now visible directly in the retained operator brief and Operations packet.

No owner action is required before that scheduled event.



### Taiwan exact-player research + Heping Island human gate — 2026-10-05
Continued autonomously before the first current-image pilot scheduled renewal. The pilot itself remained frozen at two sources.

#### Additional Taiwan exact-player research
Official provider pages were rechecked for additional exact player targets.

**North Coast & Guanyinshan**
- Heping Island Geopark official live-camera page:
  `https://www.northguan-nsa.gov.tw/user/article.aspx?Lang=2&SNo=04007412`
- exact official-page YouTube embed:
  `https://www.youtube.com/embed/g-T8NbF9xlQ?si=3jcSZd3ho7HNEYKk`
- Jhongjiao Bay official page remains publicly accessible but the retrieved page structure does not expose a comparable player target; keep unresolved rather than guessing.

North Coast family status now distinguishes:
- Yehliu: human-confirmed external live;
- Heping Island: exact YouTube target resolved / deployed human review ready;
- Jhongjiao and other unresolved cameras: remain blocked until exact media target is exposed.

**Tri-Mountain**
Official pages now resolve exact provider/player targets:
- Emei Lake official page:
  `https://www.trimt-nsa.gov.tw/en/live-camera/1032/`
  - YouTube target: `https://www.youtube.com/watch?v=PCVJi8sGKZk`
- Deji Reservoir official page:
  `https://www.trimt-nsa.gov.tw/en/live-camera/14/`
  - YouTube target: `https://www.youtube.com/watch?v=YAsrUuENlGg`

These are recorded as provider/platform-branded player research targets, **not** raw OGDL reusable image assets. ERN currently has no justified public source rows for these exact Tri-Mountain player targets, so no catalog source was created and no human review was requested.

#### Heping Island staged exact target
Created provider-generated target:
- id: `north-coast-heping-island-youtube-player`
- source id: `taiwan-heping-island-live`
- integration kind: `PROVIDER_GENERATED_WIDGET`
- truth if approved: `LIVE_VIDEO`
- generator/official page:
  `https://www.northguan-nsa.gov.tw/user/article.aspx?Lang=2&SNo=04007412`
- exact target:
  `https://www.youtube.com/embed/g-T8NbF9xlQ?si=3jcSZd3ho7HNEYKk`
- state: `DEPLOYED_REVIEW_REQUIRED`
- review mode: `DEPLOYED_HUMAN_RENDERING_REQUIRED`
- `promotionAllowed=false`
- `catalogMutationAllowed=false`
- `automaticGenerationAllowed=false`
- `reviewedAt=null`
- `reviewOutcome=null`

Public Heping Island source remains unchanged:
- `LIVE_IMAGE`
- `LINK_ONLY`
- `EXTERNAL`
- no public `embedUrl`.

Regression coverage requires this boundary.

#### Validation
Operations packet `ern-operations-1320`:
- packet integrity: valid / 0 issues;
- Heping target is valid/safetyOk;
- Heping state: `DEPLOYED_REVIEW_REQUIRED`;
- Heping review mode: `DEPLOYED_HUMAN_RENDERING_REQUIRED`;
- no promotion/catalog/automatic-generation authority.

Current-image pilot remains:
- `OBSERVING`
- 0 / 2 scheduled renewal dates
- no overdue state
- next expected renewal:
  `2026-10-06T00:37:00Z`
- automatic expansion false.

Latest Pages run for commit `c8699f9758e3b82643cd3dcbf7146c1f154bc5d2`: **SUCCESS**.

Deployed release logs explicitly show:
- `generatedReview: ["north-coast-heping-island-youtube-player"]`
- Heping target included among loadable operator-review embeds.

#### Genuine next human gate
The next owner action is one deployed human playback review of the Heping Island exact YouTube player in the ERN operator review page.

Do not change public Heping Island truth/permission/playback before human evidence is returned.
If playback is confirmed current/live:
1. record generated-target human evidence;
2. preserve LINK_ONLY/EXTERNAL while evidence is applied;
3. evaluate any truth correction separately;
4. do not infer inside-ERN embed permission from successful playback.



### Heping Island human evidence applied — external-live truth corrected — 2026-10-05
Owner completed the deployed ERN operator-review human gate for the exact Heping Island provider-generated player.

#### Human evidence packet
- review batch: `8676e155772b31c5`
- review origin: `https://earthrightnow.app/review/inside-ern.html`
- target id: `north-coast-heping-island-youtube-player`
- type: `generated`
- outcome: `HUMAN_PLAYBACK_CONFIRMED`
- observedAt: `2026-10-05T10:40:42.619Z`
- official source page:
  `https://www.northguan-nsa.gov.tw/user/article.aspx?Lang=2&SNo=04007412`
- exact reviewed player:
  `https://www.youtube.com/embed/g-T8NbF9xlQ?si=3jcSZd3ho7HNEYKk`
- packet preserved at:
  `data/review-evidence/heping-island-generated-2026-10-05.json`

#### Evidence validation / staged target
The packet validates against the exact staged target:
- known generated target id;
- deployed ERN review origin;
- exact official source page;
- exact YouTube player URL;
- fresh HUMAN_REVIEW timestamp.

Proposal status:
`READY_TO_RECORD_HUMAN_PLAYBACK_PENDING_EDITORIAL_REVIEW`

Staged target now records:
- `reviewedAt=2026-10-05T10:40:42.619Z`
- `reviewOutcome=HUMAN_PLAYBACK_CONFIRMED`
- `reviewEvidencePath=data/review-evidence/heping-island-generated-2026-10-05.json`
- promotion/catalog/automatic-generation flags remain false.

The completed Heping generated target is excluded from future generated-target human review batches unless the target materially changes.

#### Public Heping truth correction
Separate editorial review found the old `LIVE_IMAGE` label no longer accurately described the official Heping page because deployed human review proved it is currently serving a YouTube live player.

Public source is now:
- id: `taiwan-heping-island-live`
- truth: **EXTERNAL_LIVE**
- permission: **LINK_ONLY**
- playback: **EXTERNAL**
- sourceUrl:
  `https://www.northguan-nsa.gov.tw/user/article.aspx?Lang=2&SNo=04007412`
- checkedAt / lastSuccessfulCheck:
  `2026-10-05T10:40:42.619Z`
- no public `embedUrl`.

This is a truth correction only. It is **not** an inside-ERN promotion.

#### Evidence boundary
`data/source-evidence.json` now preserves:
- official Heping source page;
- exact reviewed YouTube player;
- human playback time/outcome/batch/origin;
- evidence packet path;
- explicit permission boundary:
  public Heping remains `LINK_ONLY / EXTERNAL`;
- platform boundary:
  preserve YouTube/provider branding and do not restream.

Regression coverage requires:
- public Heping stays `EXTERNAL_LIVE / LINK_ONLY / EXTERNAL`;
- no Heping public `embedUrl`;
- staged Heping human proof remains recorded;
- completed Heping review gate remains closed.

#### Hard performance ceiling incident
The first final Pages validation after applying Heping evidence failed only because lean core reached:
- **575,090 bytes**
- hard ceiling: **575 KB**
- excess: **90 bytes**

The ceiling was **not raised**.

Resolution:
- compacted only Heping runtime catalog prose:
  - story -> `Official Heping Island live view.`
  - `freshnessEvidence -> OK`
- full human/provenance detail remains in `data/source-evidence.json`.

This restored hard-budget compliance without weakening source truth or evidence.

#### Final validation
Canonical post-fix commit:
`772e46d1e1bd10cd6be83c6de592fd4958d46ac7`

- Pages run `37298507621`: **SUCCESS**
- Operations run `37298507598`: **SUCCESS**
- hard performance budget unchanged
- Heping human gate closed
- Heping remains external-only
- no automatic catalog/embed promotion
- current-image pilot remains frozen at two sources
- current-image scheduled-renewal observation remains 0 / 2 until the first scheduled slot
- public Guide remains OFF
- public Now Moments media remains OFF.

#### Next boundary
No further owner action is required for Heping.

Do not infer inside-ERN embed permission from successful playback. Any future Heping transition from LINK_ONLY/EXTERNAL to EMBED_ALLOWED/EMBED requires a separate permission/platform/editorial decision.

The next current-image pilot event remains the first scheduled renewal at:
`2026-10-06T00:37:00Z` / 07:37 Thailand time.



### Facebook organic-distribution observation + analytics hardening — 2026-10-05
Owner reported manually posting `https://earthrightnow.app` to approximately **50–60 Facebook groups** on 2026-10-05.

This is treated as an organic-distribution learning event, not as evidence of reach, impressions, conversion, booking or revenue.

#### Manual distribution event recorded
Added `data/organic-distribution-events.json` with:
- channel: Facebook;
- method: manual group posting;
- approximate group count: 50–60;
- paid: false;
- automatic posting: false;
- user-reported: true;
- no Facebook group names stored;
- no member data stored;
- no post text stored.

This event exists only to contextualize aggregate analytics.

#### Existing first-party analytics confirmed suitable
ERN's existing first-party analytics already measures:
- approximate visitors;
- page views;
- new/returning use;
- coarse country/region;
- device class;
- referrer hostname;
- place/source opens;
- privacy-filtered search;
- verified commercial outbound opens.

Privacy boundary remains:
- no raw IP storage;
- no precise location storage;
- no per-event row retention;
- no cross-site advertising profiles;
- DNT/GPC honored;
- no booking/purchase/revenue inference.

#### Facebook referrer family reporting
The private owner analytics report now groups Facebook-related hosts into a combined **Facebook-family page views** metric while preserving the raw host table.

This prevents Facebook traffic from being fragmented across hosts such as:
- `l.facebook.com`
- `m.facebook.com`
- `facebook.com`.

Google-family referral views are also summarized separately.

These are referral page views only; they are not impressions, group reach, downstream conversion or revenue.

#### Organic distribution Operations observation
Added `analytics:distribution-observation`.

Each Operations run now generates:
`ern-ops/organic-distribution-observation.json`

The artifact combines:
- latest manually recorded organic-distribution event;
- aggregate page views;
- approximate unique visitors;
- Facebook-family referral page views;
- Facebook referral share of aggregate page views.

It explicitly forbids inference of:
- impressions;
- Facebook group reach;
- conversion;
- bookings;
- revenue;
- paid promotion.

Operations packet integrity now **requires** this artifact and fails closed if those inference boundaries are violated or the Facebook referral count is malformed.

Regression coverage was added for:
- grouped Facebook referral reporting;
- workflow artifact generation;
- packet integrity boundaries;
- daily Operations retention.

#### First observed Facebook baseline
Retained Operations packet `ern-operations-1328`, generated around `2026-10-05T10:54:55Z`, reports:
- approximate unique visitors: **43**
- page views: **257**
- Facebook-family referral page views: **22**
- Facebook-family share of page views: **8.56%**

Raw Facebook hosts at the same observation:
- `l.facebook.com`: 16
- `m.facebook.com`: 4
- `facebook.com`: 2

Other observed context:
- Google-family page views: 17
- Thailand page views: 232
- US page views: 22
- one verified commercial outbound open was recorded for the Klook Fushimi Inari offer.

Do **not** interpret the unchanged same-day 22 Facebook referral views as success or failure of the new 50–60-group posting wave. The posting occurred on the same day and analytics may not yet reflect later visits. Use later Operations runs for comparison.

#### Validation
Latest Operations run for distribution packet integrity:
- **SUCCESS**
- retained packet: `ern-operations-1328`
- packet integrity: **valid**
- issue count: **0**
- `organic-distribution-observation.json` appears in required retained files.

Latest Pages run for commit `b64ce40d76b4197c2d6f87e644efe18d2dbb0f62`:
- **SUCCESS**

Safety/product state unchanged:
- no paid marketing activated;
- no social account automation activated;
- no ranking changes from social/commercial signals;
- 575 KB performance ceiling unchanged;
- current-image pilot remains two-source only;
- public generative Guide remains OFF;
- public Now Moments remains OFF.

#### Next evidence point
Allow the organic Facebook wave to produce real traffic evidence before changing product/distribution strategy.

On later Operations runs compare:
- approximate unique visitors;
- total page views;
- Facebook-family referral page views;
- Facebook share of page views;
- popular destinations/searches;
- verified outbound actions.

Do not infer reach or conversion merely from number of Facebook groups posted.

The current-image pilot's next independent event remains the first scheduled renewal at:
`2026-10-06T00:37:00Z` / 07:37 Thailand time.



### Facebook organic wave learning cycle + search-gap triage — 2026-10-05
Owner reported manually sharing Earth Right Now to approximately **50–60 Facebook groups**, mostly nomad/travel-oriented groups. This is now treated as a real organic-distribution learning event, without inferring group reach, impressions, visitor identity, causation, conversion, bookings or revenue.

#### Organic distribution event + baseline
Event:
- id: `2026-10-05-facebook-groups-organic-wave-01`
- date: 2026-10-05
- channel: Facebook
- method: manual group posting
- approximate group count: 50–60
- paid: false
- automatic posting: false
- user-reported audience context: nomad/travel groups
- no group names, member data or post content stored.

Baseline captured from retained Operations packet `ern-operations-1328` around `2026-10-05T10:54:55Z`:
- approximate unique visitors: **43**
- page views: **257**
- Facebook-family referral page views: **22**
- Facebook share of page views: **8.56%**
- Earth searches: **22**
- zero-result searches: **6**
- place/window opens: **193**
- external-source opens: **38**
- travel-option opens: **1**

Baseline top searches:
- new (2)
- new york (2)
- af (1)
- africa (1)
- biscuit basin (1)

Baseline top places opened:
- Kyoto Hanamikoji (27)
- Rovaniemi Santa Claus Village (27)
- Taitung Jinzun (17)
- Kyoto Kiyomizuzaka (14)
- Auckland Viaduct Harbour (13)

Observation milestones:
- 24 hours
- 72 hours
- 168 hours / 7 days.

#### Distribution delta reporting
`analytics:distribution-observation` now emits schemaVersion 2 and includes:
- current aggregate visitors/page views;
- Facebook-family referral views/share;
- Earth searches;
- zero-result searches;
- place/window opens;
- external-source opens;
- travel-option opens;
- current top searches/places;
- captured baseline;
- elapsed hours;
- phase:
  - EARLY_UNDER_24H
  - POST_24H
  - POST_72H
  - POST_7D
- completed and next milestone;
- aggregate deltas from the captured same-day baseline.

Safety remains explicit:
- `impressionsInferred=false`
- `groupReachInferred=false`
- `audienceIdentityInferred=false`
- `causationInferred=false`
- `conversionsInferred=false`
- `bookingsInferred=false`
- `revenueInferred=false`
- `paidPromotionAssumed=false`.

The daily operator brief now surfaces this distribution observation and exploration deltas.

First post-baseline packet `ern-operations-1332`, only about 0.17h after the baseline, showed **no metric movement yet**. This is expected and is not evidence of success/failure. The first useful comparison is the first Operations run after 24 hours.

#### Search-gap triage
Historical aggregate zero-result telemetry is no longer treated as an automatic request to add content.

Added:
- `scripts/analytics-search-gap-triage.mjs`
- package command `analytics:search-gap-triage`
- retained Operations artifact `search-gap-triage.json`
- operator-brief section **Search-gap triage**
- packet-integrity safety validation.

The triage replays historical zero-result terms against the **current** ERN catalog + supplemental destinations + place-search aliases.

Allowed states:
- `CURRENTLY_RESOLVES`
- `LOW_CONFIDENCE_PARTIAL`
- `GENUINE_CURRENT_GAP`.

Safety:
- no automatic catalog mutation;
- no automatic alias mutation;
- no inferred demand forecast.

Live retained Operations packet `ern-operations-1338` reported:
- historical zero-result events: **5**
- currently resolves today: **4**
- genuine current gaps: **1**
- low-confidence partials: **0**.

Results:
- `new yo` → CURRENTLY_RESOLVES
- `new york` → CURRENTLY_RESOLVES
- `山与雪` → CURRENTLY_RESOLVES
- `纽约` → CURRENTLY_RESOLVES
- `chiangmai` → **GENUINE_CURRENT_GAP**

Therefore do **not** add more New York/Chinese aliases merely because old telemetry contains zero results. Those searches resolve under the current metadata/search system.

#### Chiang Mai research-backed demand gap
The single genuine current search gap, `chiangmai`, is now recorded in `data/source-research-priorities.json` as:
- normalized place: Chiang Mai, Thailand
- priority: `RESEARCH_NOW`
- status: `RESEARCH_ONLY_NO_HEALTHY_DESTINATION_CAMERA_CONFIRMED`.

Fresh official-source research:
1. Chiang Mai Provincial Administrative Organization real-time CCTV center:
   `https://www.chiangmaipao.go.th/all_cctv.php`
   - official real-time CCTV network exists;
   - current retrieved public camera cards show STANDBY / WAITING FOR FEED;
   - therefore **not** publishable as a current/live ERN destination camera now.
2. Thai Meteorological Department Chiang Mai weather:
   `https://tmd.go.th/en/weather/province/chiang-mai`
   - useful current context, not a destination camera.
3. Thai Meteorological Department Chiang Mai radar:
   `https://weather.tmd.go.th/cmi240.php`
   - useful current weather/radar imagery, not a destination camera.

Broader source research did not find a reliable continuously current Chiang Mai destination camera meeting ERN truth/currentness standards. A past/one-off Doi Suthep YouTube stream is not treated as current.

No Chiang Mai public source was added.

Next action:
- continue research only when a materially credible Chiang Mai current-view candidate appears;
- prefer official/reputable tourism, municipal, university, weather or destination providers;
- use LINK_ONLY unless permission is explicit;
- never use standby CCTV or weather radar as a substitute for a destination webcam.

#### Validation
Search-gap triage / distribution-learning validation:
- Operations for safe search-gap triage: **SUCCESS**
- Pages for `5d8c7ba642ead69a66c58e0814926b4d11bf5ab5`: **SUCCESS**
- Pages for Chiang Mai research-priority commit `ab6b12cf40eed03ea6cedc04454e11fef0d29c99`: **SUCCESS**
- prior Facebook delta Pages/Operations: **SUCCESS**
- hard 575 KB performance ceiling unchanged
- no paid marketing activated
- no social automation activated
- no social/commercial ranking influence
- public generative Guide remains OFF
- public Now Moments remains OFF.

#### Independent current-image pilot boundary
The controlled 2-source IMAGE_REFRESH pilot remains separate from this distribution work and remains exactly two sources.

As of this checkpoint:
- scheduled observation count remains **0 / 2**
- first natural scheduled renewal is still expected at:
  `2026-10-06T00:37:00Z` / **07:37 Thailand time**
- do not manually trigger merely to advance the count;
- no automatic pilot expansion is allowed.

#### Next evidence points
Facebook organic wave:
- first Operations run after 24h;
- first run after 72h;
- first run after 7d.

Compare aggregate:
- approximate visitors;
- page views;
- Facebook-family referrals/share;
- searches;
- place/window opens;
- external-source opens;
- zero-result triage;
- verified outbound actions.

Treat all movement as correlation evidence only, not causal attribution.

### Organic-distribution exploration-intensity checkpoint — 2026-10-05
Continued autonomously before the first scheduled current-image pilot renewal. No catalog growth, public redesign, Guide activation, Now Moments activation, social automation, paid ranking or pilot mutation occurred.

#### Why this batch was added
The Facebook organic wave should be judged not only by raw visitor/referral growth but by whether aggregate visitors actually explore ERN. The retained Operations packet now reports privacy-safe exploration-intensity ratios relative to approximate unique visitors.

`analytics:distribution-observation` schemaVersion 3 now includes aggregate-only:
- page views per approximate visitor;
- Earth searches per approximate visitor;
- place/window opens per approximate visitor;
- external-source opens per approximate visitor;
- travel-option opens per approximate visitor;
- zero-result share of Earth searches;
- baseline values and deltas for the same ratios.

These are explicitly **not** per-person histories, sessions, conversion rates or causal attribution. Facebook distribution and aggregate behavior may move together, but ERN does not infer visitor identity, impressions, group reach, causation, bookings, conversions or revenue.

The daily operator brief now surfaces these ratios and baseline deltas. Operations packet integrity rejects malformed intensity metrics or a changed denominator.

#### First post-change Operations evidence
Operations run **1342** completed **SUCCESS**.
Packet integrity:
- valid: **true**
- issue count: **0**

At about 0.68h after the recorded Facebook baseline, the retained aggregate observation showed:
- approximate unique visitors: **44** (baseline +1)
- page views: **259** (baseline +2)
- Facebook-family referral views: **23** (baseline +1)
- Earth searches: **22**
- place/window opens: **193**
- external-source opens: **38**
- travel-option opens: **1**

Exploration intensity at that very-early point:
- searches / approximate visitor: **0.50**
- place/window opens / approximate visitor: **4.39**
- external-source opens / approximate visitor: **0.86**
- travel-option opens / approximate visitor: **0.02**
- zero-result share of searches: **27.27%**

This remains **EARLY_UNDER_24H** evidence and must not be interpreted as success or failure of the Facebook wave. The first useful comparison remains the first Operations packet after the 24h milestone.

#### Validation
Final implementation head before this handoff update:
`dc10b24dc94c837fad1d2f4837f65886c8a037ae`

- Pages run **2462**: **SUCCESS**
- JavaScript syntax preflight: SUCCESS
- current release smoke suite: SUCCESS
- hard performance preflight: SUCCESS
- AI search discovery readiness: SUCCESS
- public discoverability preflight: SUCCESS
- deployed social-preview verification: SUCCESS
- Operations run **1342**: **SUCCESS**
- Operations packet integrity: valid / 0 issues

Hard lean-core ceiling remains exactly **575 KB** and was not raised.

#### Current-image pilot boundary unchanged
The controlled IMAGE_REFRESH pilot remains exactly:
1. Yellowstone — Biscuit Basin
2. Mount Ruapehu — Current Images

State remains:
- scheduled observation count: **0 / 2**
- automatic expansion: forbidden
- next natural scheduled renewal: `2026-10-06T00:37:00Z` / **07:37 Thailand time**

Do not manually trigger the renewal merely to advance the count.
After the natural scheduled run, verify:
- workflow event is genuinely `schedule`;
- only approved source evidence/timestamps plus the observation ledger changed;
- status becomes **1/2**, not expansion-ready;
- Pages and Operations succeed;
- no automatic expansion occurs.

### Searchable-place and business expansion checkpoint — 2026-10-05
Owner authorized continued expansion of both searchable places and business opportunities.

New searchable places added through `data/search-supplemental.json`:
- Wang Gong Fishing Port — Changhua, Taiwan — official Taiwan Tourism Administration live-camera listing, currently marked operating; `EXTERNAL_LIVE / LINK_ONLY / EXTERNAL`; search/discovery only.
- Cerro Catedral — Bariloche, Argentina — first-party Catedral Alta Patagonia webcam page with current live/current mountain views; `EXTERNAL_LIVE / LINK_ONLY / EXTERNAL`; search/discovery only.

Full provenance remains in `data/source-evidence.json`. No public embed permission was inferred.

Business opportunities added using existing partner relationships:
- `viator-bariloche-cerro-catedral` — exact owner-side tracked link still required.
- `klook-changhua-wanggong` — exact owner-side tracked link still required.

Current public inventory evidence confirms active Bariloche/Patagonia inventory on Viator and active Changhua attraction inventory on Klook. No tracked URL was invented and commercial value remains excluded from Earth ranking.

Performance guard:
- Pages run 2465 correctly failed when both new places were temporarily placed in the lean runtime catalog: 576,621 bytes against the hard 575 KB ceiling.
- The ceiling was not raised.
- Both places were moved to the existing searchable supplemental catalog instead.
- Final Pages run 2468 completed SUCCESS with the hard 575 KB ceiling intact.
- Operations runs 1343–1345 remained successful through the adjustment path.

Final implementation head before this handoff update:
`b47eaaf2f17a2320cf899399f079f7123c05e402`

Boundaries unchanged:
- IMAGE_REFRESH remains exactly two sources and 0/2 scheduled observations.
- No manual renewal trigger occurred.
- Public generative Guide remains OFF.
- Public Now Moments media remains OFF.
- No automatic social posting/account creation.
- No paid ranking.
- No automatic commercial placement or link rewriting.

### Continued expansion checkpoint — 2026-10-05
Owner requested further expansion of both searchable places and the business side.

#### Searchable-place expansion
Added four additional high-confidence searchable external/live places to `data/search-supplemental.json`, keeping the lean runtime source catalog unchanged:
- White Dolphin House — Changhua Coast, Taiwan — official Changhua County Tourism 24/7 real-time/4K live source.
- Baguashan Great Buddha — Changhua, Taiwan — official Changhua County Tourism 4K live/current landmark and city source.
- Emei Lake — Hsinchu, Taiwan — official Tourism Administration / Tri-Mountain 4K live-stream page.
- Deji Reservoir — Lishan, Taiwan — official Tourism Administration / Tri-Mountain real-time imagery / 4K live-camera path.

Together with the previous batch, the newly added searchable supplemental set now includes six places:
- Wang Gong Fishing Port — Changhua
- Cerro Catedral — Bariloche
- White Dolphin House — Changhua Coast
- Baguashan Great Buddha — Changhua
- Emei Lake — Hsinchu
- Deji Reservoir — Lishan

All remain conservative external/link-only sources; no public embed permission, media copying or restream permission is inferred. Full provenance is retained in `data/source-evidence.json`.

#### Business expansion
The Changhua Klook opportunity was expanded from one place into a three-place destination cluster:
- Wang Gong Fishing Port
- White Dolphin House
- Baguashan Great Buddha

Added a new Klook Hsinchu/Emei research opportunity backed by current Emei-specific Klook inventory. It remains `ACCOUNT_SEARCH_AND_EXACT_LINK_REQUIRED`.

Existing Bariloche / Cerro Catedral Viator research remains `ACCOUNT_SEARCH_AND_EXACT_LINK_REQUIRED`.

No tracked link was invented, no new external partner account was opened, and no commercial signal may affect Earth ranking.

#### Validation
Final implementation head before this handoff update:
`7d5707356bc3570c5fc6f784a69ea47b4bd795eb`

Pages run **2472** completed **SUCCESS**.
Validated successfully:
- JavaScript syntax preflight
- ERN current release smoke suite
- hard performance preflight
- search metadata integrity
- SEO indexing readiness
- AI search discovery readiness
- public discoverability preflight
- commercial placement integrity
- final deployment

The hard lean-core ceiling remains exactly **575 KB**.

#### Pilot and product boundaries unchanged
- Controlled IMAGE_REFRESH pilot remains exactly two sources and 0/2 scheduled observations.
- No manual pilot renewal was triggered.
- Public generative ERN Guide remains OFF.
- Public Now Moments media remains OFF.
- No automatic social posting/account creation.
- No paid ranking.
- No automatic commercial placement or link rewriting.
- Searchable expansion should continue through supplemental/search infrastructure when that preserves the 575 KB lean core.

### South America, Africa and Central America expansion checkpoint — 2026-10-05
Owner asked ERN to continue expanding searchable places and business opportunities without weakening truth, performance or commercial-neutral ranking.

#### Searchable places added
- Ushuaia — Harbour & Beagle Channel, Argentina: official Secretaría de Turismo de Ushuaia live-webcam page; `EXTERNAL_LIVE / LINK_ONLY / EXTERNAL`; Search/Explore only.
- Okaukuejo Waterhole — Etosha National Park, Namibia: first-party Namibia Wildlife Resorts wildlife live-cam surface and official 24/7 stream evidence; `EXTERNAL_LIVE / LINK_ONLY / EXTERNAL`; Search/Explore only.
- Santa Ana Volcano — Ilamatepec, El Salvador: official MARN/DGOA volcano-monitoring camera network; `LIVE_IMAGE / LINK_ONLY / EXTERNAL`; Search/Explore only.
- San Miguel Volcano — Chaparrastique, El Salvador: official MARN/DGOA current San Miguel camera player and volcano-monitoring network; `EXTERNAL_LIVE / LINK_ONLY / EXTERNAL`; Search/Explore only.

Full provenance is retained in `data/source-evidence.json`. No embed, media-copying or restream rights were inferred.

#### Searchable growth state
- healthy distinct searchable places: **329**
- remaining to 350 milestone: **21**
- remaining to 400 stretch: **71**
- unresolved human playback queue: **12**
- Ushuaia and Okaukuejo were removed from stale playback queues and their research records were reconciled as promoted external/searchable sources.

#### Business expansion
Existing partner relationships only; all new paths remain owner-link gated:
- Ushuaia / Tierra del Fuego → Viator — `ACCOUNT_SEARCH_AND_EXACT_LINK_REQUIRED`
- Etosha National Park → Viator — `ACCOUNT_SEARCH_AND_EXACT_LINK_REQUIRED`
- Nevado del Ruiz / Manizales → Viator — `ACCOUNT_SEARCH_AND_EXACT_LINK_REQUIRED`
- Surtsey / Westman Islands → Viator — `ACCOUNT_SEARCH_AND_EXACT_LINK_REQUIRED`; public wording must not imply unrestricted access to Surtsey.
- Santa Ana Volcano / Ilamatepec → Viator — `ACCOUNT_SEARCH_AND_EXACT_LINK_REQUIRED`
- San Miguel Volcano / Chaparrastique → Viator — `ACCOUNT_SEARCH_AND_EXACT_LINK_REQUIRED`

No tracked URL was invented, no new affiliate account was opened, no automatic placement occurred, and commission remains prohibited from influencing Earth ranking.

#### Duplicate-growth avoidance
Fresh checks confirmed the main SANParks family, Guatemala INSIVUMEH volcano cameras and Costa Rica OVSICORI volcano cameras are already represented in ERN, so they were deliberately not duplicated.

KenyaLIVE remains a promising current KWS/WildEarth live program, but its broadcasts rotate among parks. Do not promote a fixed Nairobi National Park place until source-specific park identity/current playback is sufficiently bound.

#### Validation
- Pages run **2474** completed SUCCESS for the Ushuaia/Etosha source + business tranche.
- Pages run **2475** completed SUCCESS for the Colombia/Iceland business expansion.
- Pages run **2477** completed SUCCESS for the El Salvador source + business tranche.
- Final 2477 deployment, public metadata verification, search integrity, commercial-placement integrity, SEO and AI-search readiness all passed.
- Hard lean-core ceiling remains exactly **575 KB**.

#### Product boundaries unchanged
- Controlled IMAGE_REFRESH pilot remains exactly two sources and **0/2** scheduled observations.
- No manual pilot renewal was triggered.
- Public generative ERN Guide remains OFF.
- Public Now Moments media remains OFF.
- No automatic social posting/account creation.
- No paid ranking.
- No automatic commercial placement or link rewriting.

### Watch Earth in-ERN playback rule — 2026-10-05
Owner reported two Watch Earth cards — Popocatépetl and Karakol Ski Base — that opened external live-source pages rather than playing inside ERN.

Product correction:
- Watch Earth is now defined as an **in-ERN viewing surface**, not a discovery fallback list.
- A source must have `playbackCapability(...).action === PLAY` to be Watch Earth eligible.
- `LINK_ONLY / EXTERNAL` sources remain searchable and discoverable in Search/Explore, but must not be used to fill Watch Earth merely to reach a target item count.
- Approved in-ERN `EMBED` playback and approved `IMAGE_REFRESH` experiences remain eligible when all existing truth/currentness/health gates pass.
- If fewer qualifying in-ERN sources exist, Watch Earth should intentionally show fewer items rather than degrade into external-source cards.

Specific defensive holds added:
- `mexico-popocatepetl-current-image`: `featuredHold=true`, `watchHold=true`
- `karakol-ski-base`: `featuredHold=true`, `watchHold=true`

Tests updated to encode the new contract:
- external-only Watch Earth fallback now expects zero Watch Earth items rather than external filler;
- mixed inside/external curation now expects only in-ERN playable items.

This change does not remove external/current sources from ERN Search/Explore and does not reduce their searchable value. It only raises the quality bar for the featured Watch Earth experience.

### Watch Earth correction + continued two-sided expansion checkpoint — 2026-10-05

#### Watch Earth correction is production-validated
Owner reported Popocatépetl and Karakol Ski Base appearing in Watch Earth as external-source cards.

Root cause:
- Watch Earth previously preferred in-ERN playback but allowed truthful external-only sources to fill remaining slots.

Permanent product correction:
- `watchEarthEligible()` now requires `playbackCapability(...).action === PLAY`.
- `LINK_ONLY / EXTERNAL` sources remain searchable in Search/Explore but cannot fill Watch Earth.
- Approved in-ERN EMBED and approved IMAGE_REFRESH experiences may remain eligible when all existing currentness/health/truth gates pass.
- If fewer qualifying in-ERN sources exist, Watch Earth intentionally shows fewer items rather than external-source filler.

Exact regression protection covers:
- `mexico-popocatepetl-current-image`
- `karakol-ski-base`

Pages run **2483** completed SUCCESS after the correction. The 575 KB hard ceiling was preserved; a transient 58-byte overage from redundant per-source hold flags was resolved by removing those redundant flags rather than raising the ceiling.

#### Searchable-place expansion after the Watch Earth fix
All following additions are Search/Explore-only (`LINK_ONLY / EXTERNAL`) and therefore cannot enter Watch Earth under the new PLAY-only rule:
- Guagua Pichincha — Ecuador — Instituto Geofísico EPN crater-camera monitoring.
- Sara Sara — Peru — IGP/CENVUL real-time images every minute.
- Puracé — Colombia — Servicio Geológico Colombiano online camera network.
- Nevado del Huila — Colombia — Servicio Geológico Colombiano online camera network.
- Cerro Machín — Colombia — Servicio Geológico Colombiano online cameras.
- Sotará — Colombia — Servicio Geológico Colombiano online cameras.
- Cumbal — Colombia — Servicio Geológico Colombiano online cameras.
- Nevado del Tolima — Colombia — Servicio Geológico Colombiano online camera.
- Mount Merapi — Indonesia — Badan Geologi/BPPTKG official seismic + visual CCTV live-streaming service.

Searchable growth state:
- healthy distinct searchable places: **338**
- remaining to 350 milestone: **12**
- remaining to 400 stretch: **62**
- unresolved human-playback queue remains **12**; this queue is no longer allowed to degrade Watch Earth.

#### Business expansion after the Watch Earth fix
New research-ready downstream paths, all still `ACCOUNT_SEARCH_AND_EXACT_LINK_REQUIRED`:
- Quito / Pichincha → Viator
- Ayacucho Region → Viator (regional only; must not imply Sara Sara access)
- Puracé National Natural Park / Popayán → Viator
- Cerro Machín / Salento → Viator
- Nevado del Tolima / Salento → Viator
- Mount Merapi / Yogyakarta → Viator

These opportunities are supported by current public Viator inventory. No tracked URL was invented, no account action occurred, no automatic placement occurred, and commercial value remains prohibited from affecting Earth ranking.

#### Final validation
Latest runtime/business implementation head before bookkeeping-only commits:
`9fe892952f34f116aa8826835cac6f42a930632c`

Pages run **2491** completed **SUCCESS**.
Successful checks included:
- current release smoke suite
- lean launch preflight
- public launch/mobile/accessibility
- hard performance preflight
- featured curation preflight
- search metadata + supplemental search integrity
- commercial placement integrity
- SEO indexing readiness
- AI search discovery readiness
- public discoverability
- deployment + deployed social preview verification

Hard lean-core ceiling remains exactly **575 KB**.

#### Boundaries unchanged
- Controlled IMAGE_REFRESH pilot remains exactly two sources and 0/2 scheduled observations at this checkpoint.
- No manual IMAGE_REFRESH renewal was triggered.
- Public generative ERN Guide remains OFF.
- Public Now Moments media remains OFF.
- No automatic social posting/account creation.
- No paid ranking.
- No automatic commercial placement or link rewriting.

### 350 searchable-place milestone — 2026-10-05

Owner asked ERN to continue both searchable-place and business expansion after the Watch Earth correction.

#### Searchable expansion
Added twelve further official scientific/current camera destinations through the supplemental Search/Explore catalog:
- Mount St. Helens — Johnston Ridge — USGS/Cascades Volcano Observatory; official camera refreshes every five minutes.
- Pavlof Volcano — Alaska — Alaska Volcano Observatory / USGS.
- Makushin Volcano — Alaska — Alaska Volcano Observatory / USGS.
- Veniaminof Volcano — Alaska — Alaska Volcano Observatory / USGS.
- Okmok Volcano — Alaska — Alaska Volcano Observatory / USGS.
- Katmai Volcano — Alaska — Alaska Volcano Observatory / USGS.
- Akutan Volcano — Alaska — Alaska Volcano Observatory / USGS.
- Cleveland Volcano — Alaska — Alaska Volcano Observatory / USGS.
- Little Sitkin Volcano — Alaska — Alaska Volcano Observatory / USGS.
- Mount Spurr — Alaska — Alaska Volcano Observatory / USGS.
- Tanaga Volcano — Alaska — Alaska Volcano Observatory / USGS.
- Aniakchak Caldera — Alaska — Alaska Volcano Observatory / USGS.

AVO webcam index checks on 2026-10-05 showed current same-day timestamps for the promoted Alaska camera families. Mount St. Helens is supported by the official USGS webcam page and its stated five-minute refresh.

All twelve remain Search/Explore-only (`LINK_ONLY / EXTERNAL`). Under the production Watch Earth rule requiring `playbackCapability === PLAY`, none can enter Watch Earth as external filler.

#### Searchable growth milestone
- healthy distinct searchable places: **350**
- 350 milestone: **REACHED**
- remaining to 400 stretch: **50**
- unresolved human playback queue remains separate from Watch Earth quality.

#### Business expansion
Added:
- `viator-mount-st-helens-portland` — Mount St. Helens / Portland → Viator — `ACCOUNT_SEARCH_AND_EXACT_LINK_REQUIRED`.

Current Viator inventory includes a dedicated full-day Mount St. Helens adventure from Portland with Mount St. Helens, Ape Cave, Trail of Two Forests and viewpoints in the itinerary.

No tracked link was invented, no external account action occurred, no automatic placement occurred, and commercial value remains excluded from Earth ranking.

#### Validation
Searchable milestone implementation head validated by Pages:
`37f532bc929f8821e7782dcdad54461e6d4d4580`

Pages run **2494** completed **SUCCESS**.
Validated successfully:
- JavaScript syntax
- current release smoke suite
- lean launch preflight
- hard performance preflight
- featured curation
- source research and recency integrity
- supplemental search integrity
- commercial placement integrity
- SEO indexing readiness
- AI search discovery readiness
- public discoverability
- deployment and deployed social-preview verification

Bookkeeping/provenance commits after that validated source payload advanced the pre-handoff main head to:
`cd35cdf0767fa229dcce364b69ba90e49b070b21`

Hard lean-core ceiling remains exactly **575 KB**.

#### Next expansion posture
- Continue from 350 toward the 400 searchable stretch target.
- Prefer genuinely new geography and first-party/official current sources over provider duplication.
- Watch Earth remains in-ERN-only; external/current sources belong in Search/Explore.
- Continue business expansion only where a current existing-partner path has a useful destination fit.

#### Boundaries unchanged
- Controlled IMAGE_REFRESH pilot remains exactly two sources and 0/2 scheduled observations at this checkpoint.
- No manual IMAGE_REFRESH renewal was triggered.
- Public generative ERN Guide remains OFF.
- Public Now Moments media remains OFF.
- No automatic social posting/account creation.
- No paid ranking.
- No automatic commercial placement or link rewriting.

### Alaska + Cascades expansion checkpoint — 2026-10-05

#### Searchable places added
Added six new Search/Explore-only current places, all kept out of Watch Earth by the in-ERN PLAY-only rule:
- Redoubt Volcano — Alaska — Alaska Volcano Observatory current webcam network.
- Iliamna Volcano — Alaska — Alaska Volcano Observatory webcam network.
- Mount St. Helens — Washington — USGS Cascades Volcano Observatory Johnston Ridge camera; official page states a five-minute refresh and Public Domain media.
- Akutan Volcano — Alaska — AVO current webcam network.
- Cleveland Volcano — Alaska — AVO current webcam network.
- Semisopochnoi — Alaska — AVO current webcam network.

All are `LINK_ONLY / EXTERNAL` in this tranche. No embed or in-ERN playback permission was inferred.

#### Searchable growth state
- healthy distinct searchable places: **344**
- remaining to 350 milestone: **6**
- remaining to 400 stretch: **56**

#### Business expansion
Added one high-confidence direct planning path:
- Mount St. Helens / Portland → Viator — `ACCOUNT_SEARCH_AND_EXACT_LINK_REQUIRED`

Public inventory evidence confirms a current guided Mount St. Helens day tour from Portland with Mount St. Helens, Ape Cave, Trail of Two Forests and Windy Ridge in the itinerary.

No business path was fabricated for Redoubt, Iliamna, Akutan, Cleveland or Semisopochnoi because no sufficiently direct existing-partner visitor-planning fit was confirmed.

#### Validation
Pages run **2498** completed the release path successfully through deployment and deployed social-preview verification.
Successful checks included current release smoke suite, lean launch, performance, featured curation, supplemental search integrity, commercial placement integrity, SEO, AI-search readiness and public discoverability.

#### Boundaries unchanged
- Watch Earth remains in-ERN PLAY-only.
- External/link-only sources remain Search/Explore-only.
- Hard lean-core ceiling remains 575 KB.
- Controlled IMAGE_REFRESH pilot remains untouched; no manual renewal trigger.
- No automatic commercial placement or link rewriting.

### 350 searchable-place milestone + quality-first expansion — 2026-10-05

#### Searchable milestone
ERN reached and exceeded the **350 healthy searchable-place milestone**.

New official scientific/searchable sources added in this tranche include:
- Redoubt Volcano — Alaska — Alaska Volcano Observatory / USGS
- Iliamna Volcano — Alaska — Alaska Volcano Observatory / USGS
- Mount St. Helens — Washington — USGS Cascades Volcano Observatory
- Makushin Volcano — Alaska — AVO
- Okmok Volcano — Alaska — AVO
- Pavlof Volcano — Alaska — AVO
- Veniaminof Volcano — Alaska — AVO
- Akutan Volcano — Alaska — AVO
- Aniakchak — Alaska — AVO
- Korovin / Atka volcanic complex — Alaska — AVO
- Cleveland Volcano — Alaska — AVO
- Little Sitkin Volcano — Alaska — AVO
- Mount Etna — Sicily — INGV Osservatorio Etneo
- Stromboli — Aeolian Islands — INGV Osservatorio Etneo

AVO webcam evidence was rechecked on 2026-10-05 and showed timestamped same-day imagery across the promoted Alaska sources. USGS states the Mount St. Helens webcam refreshes every five minutes. INGV exposes current/timestamped Etna surveillance-camera imagery and Stromboli visible/thermal webcams with automatic refresh.

Current searchable growth state:
- healthy distinct searchable places: **352**
- remaining to 350 milestone: **0**
- remaining to 400 stretch: **48**

These sources are `LINK_ONLY / EXTERNAL` and therefore remain Search/Explore-only under the permanent Watch Earth `PLAY` requirement.

#### Business expansion
Business paths strengthened or added in this tranche:
- Mount St. Helens / Portland → Viator — current guided Mount St. Helens inventory confirmed
- Mayon Volcano / Albay → Viator — current Mayon-specific sightseeing and ATV inventory confirmed
- Bulusan / Sorsogon → Viator — current Bicol/Sorsogon regional inventory including Lake Bulusan confirmed
- Mount Etna / Sicily → Viator — broad current guided hike, 4WD, cable-car and wine-tour inventory confirmed
- Stromboli / Aeolian Islands → Viator — current Stromboli/Aeolian excursion inventory confirmed

All remain `ACCOUNT_SEARCH_AND_EXACT_LINK_REQUIRED`. No tracked URL was invented or activated. Commercial relevance remains downstream from discovery and prohibited from influencing Earth ranking.

#### Validation
Pages run **2504** completed **SUCCESS**.
Successful release checks included:
- current release smoke suite
- hard performance preflight
- featured curation preflight
- supplemental Search catalog integrity
- provider concentration resilience
- commercial placement integrity
- SEO indexing readiness
- AI search discovery readiness
- public discoverability
- final deployment and social-preview verification

The hard lean-core ceiling remains exactly **575 KB**.

#### Boundaries preserved
- Watch Earth remains in-ERN `PLAY` only; external-source filler is forbidden.
- Popocatépetl and Karakol remain Search/Explore-only while external.
- Controlled IMAGE_REFRESH pilot remains untouched by this expansion work.
- No manual IMAGE_REFRESH renewal trigger.
- Public generative ERN Guide remains OFF.
- Public Now Moments media remains OFF.
- No automatic social posting/account creation.
- No paid ranking.
- No automatic commercial placement or link rewriting.

Post-350 strategy: continue **quality-first** expansion rather than mechanical counting, prioritizing strong official/current sources, new geography, useful related-place discovery, and genuine downstream planning value.

### NPS quality-first expansion tranche — 2026-10-05

Continued expansion after reconciling newer builder work that had already moved ERN beyond the 350 searchable-place milestone.

#### Searchable places added
Added five official U.S. National Park Service current-view destinations through the supplemental Search/Explore layer:
- Grand Teton National Park — Teton Range — official NPS / Grand Teton National Park Foundation real-time live webcam.
- Devils Tower — Prairie Dog Town — official NPS webcams updating every 60 seconds.
- Rocky Mountain National Park — Alpine Visitor Center — official NPS active webcam refreshing every 60 seconds.
- Pearl Harbor — USS Arizona Memorial — official NPS active 24/7 live stream.
- Crater Lake — Sinnott Overlook — official NPS active current webcam; image updates every 4–6 minutes.

All five remain `LINK_ONLY / EXTERNAL` and therefore cannot enter Watch Earth under the production `PLAY`-only rule.

Quality-first rejection:
- Haleakalā was deliberately **not** promoted because the official NPS live crater webcam currently reports technical issues. Do not count or promote it until the official status is healthy again.

Searchable growth state after this tranche:
- healthy distinct searchable places: **357**
- remaining to 400 stretch target: **43**

#### Business expansion
Added four existing-partner Viator planning paths, all still `ACCOUNT_SEARCH_AND_EXACT_LINK_REQUIRED`:
- Grand Teton National Park / Jackson Hole
- Rocky Mountain National Park / Denver
- Pearl Harbor / USS Arizona Memorial
- Crater Lake National Park / Oregon

No business path was fabricated for Devils Tower because no sufficiently direct current existing-partner product was confirmed in this tranche.

No tracked URL was invented, no automatic placement occurred, and commercial value remains excluded from Earth ranking.

#### Validation
Pages run **2506** completed **SUCCESS**.
Successful release path included supplemental Search integrity, commercial placement integrity, hard performance preflight, SEO indexing, AI-search readiness, public discoverability, deployment and deployed social-preview verification.

#### Boundaries unchanged
- Watch Earth remains in-ERN `PLAY`-only.
- External/link-only current sources remain Search/Explore-only.
- Hard lean-core ceiling remains exactly 575 KB.
- Controlled IMAGE_REFRESH pilot was not manually triggered or altered.
- Public generative Guide remains OFF.
- Public Now Moments media remains OFF.
- No automatic commercial placement or link rewriting.

### Searchable-source health system checkpoint — 2026-10-05
Owner asked how ERN will know when searchable camera/source links break and approved formalizing an automated health loop.

#### New rotating health architecture
ERN now checks the searchable catalog through a deterministic 7-day rotating coverage cycle.

Implementation:
- combines `data/sources.json` and `data/search-supplemental.json`;
- excludes catalog rows already marked OFFLINE;
- every eligible searchable URL belongs to exactly one daily cohort in the 7-day cycle;
- duplicate/shared URLs are probed once and mapped back to all source IDs using them;
- persistent state is cached across daily Operations runs;
- repeated failures escalate into a repair/review queue;
- recoveries are recorded;
- no catalog mutation, truth change or automatic health downgrade is allowed from reachability evidence alone.

Failure policy:
- first 404/410 → WATCH / recheck next cohort;
- repeated 404/410 → REPAIR / verify provider page or replacement;
- repeated network/server failures → REPAIR;
- repeated access blocks → REVIEW provider access pattern;
- recovered pages are recorded as recovered.

Critical evidence boundary:
`PAGE_REACHABLE` proves only that the page responded. It does **not** prove that the camera/video itself is live. Media/currentness remains a separate evidence lane through existing playback/current-image/revalidation systems.

Daily Operations now:
- restores prior searchable-source health state;
- runs the rotating cohort check;
- writes `ern-ops/searchable-source-health.json`;
- appends a Searchable Source Health section to `operator-brief.md`;
- saves updated persistent health state for the next run;
- triggers when either core sources or supplemental searchable catalog changes.

#### First real production cohort
Operations run **1353** completed **SUCCESS**.

Coverage:
- eligible searchable sources: **391**
- eligible unique URLs: **297**
- today's cohort: **53 sources / 40 unique URLs**
- target: **100% of eligible searchable URLs once per 7-day cycle**

First-cohort result:
- reachable: **46**
- missing: **0**
- access-blocked: **5**
- temporary/network failures: **2**
- recovered: **0**
- repair: **0**
- review: **0**
- watch: **2**

Current WATCH items:
- Bishkek — Ala-Too Square — transient failure;
- Too-Ashu Pass — Northern Tunnel Entrance — transient failure.

Current NOTICE/access-limited items include:
- Guagua Pichincha Volcano — Ecuador;
- El Reventador Volcano — Ecuador;
- Nossob — Kgalagadi;
- Punda Maria — Kruger National Park;
- Talamati — Kruger National Park.

These are not considered broken merely because automated access was blocked; they stay in review/recheck status unless stronger evidence appears.

#### Validation
- Operations run **1353**: SUCCESS
- Pages run **2508**: SUCCESS
- operations packet integrity remained valid
- Watch Earth in-ERN-only rule remains unchanged
- hard 575 KB lean-core ceiling remains unchanged
- IMAGE_REFRESH pilot was not manually triggered or modified.


### Searchable + business expansion continuation — 2026-10-05
- Reconciled canonical `main` at the start of this continuation against `6a807c80482a2c96d38db1ad861f43d9b1d6a6c8`, Operations 1353 SUCCESS, Pages 2508 SUCCESS and this handoff; no completed work was discarded or reopened.
- Actual pre-expansion searchable inventory already exceeded the former 350-place milestone: 382 healthy distinct places across core + supplemental Search/Explore catalogs.
- Added four new-country Vanuatu Search/Explore destinations from the official Vanuatu Meteorology and Geohazards Department (VMGD): Mount Yasur, Lopevi, Ambrym/Benbow-Marum and Manaro Voui.
- All four Vanuatu additions are `LIVE_IMAGE` + `LINK_ONLY` + `EXTERNAL` with `watchHold: true`; they are intentionally excluded from Watch Earth and do not change the in-ERN-only Watch Earth rule.
- Healthy distinct searchable-place count is now 386. Supplemental searchable catalog is 67 records.
- Added one new downstream business opportunity for Tanna Island / Mount Yasur using the already-approved Viator relationship. State remains `ACCOUNT_SEARCH_AND_EXACT_LINK_REQUIRED`; no tracked link was invented or activated.
- Mount Merapi was rechecked during expansion and found already represented by the canonical official Badan Geologi/BPPTKG searchable source and existing `viator-merapi-yogyakarta` commercial opportunity. A temporary duplicate commercial record was removed before finalization; the canonical path remains singular.
- Commercial opportunity registry now contains 236 records. Commercial value did not affect Earth/source ranking or truth state.
- Operations run 1354 completed SUCCESS after the Vanuatu catalog addition. Rotating searchable-source health now covers 395 eligible searchable sources / 301 unique URLs; today's cohort checked 54 sources / 41 unique URLs: 47 reachable, 0 missing, 5 access-blocked, 2 temporary/network failures, 0 recovered.
- Health queue remains conservative: 0 REPAIR, 5 REVIEW, 2 WATCH. Bishkek Ala-Too Square and Too-Ashu Pass remain WATCH for transient failures; access-blocked sources remain REVIEW and are not treated as broken.
- Protected gates remain unchanged: Watch Earth in-ERN playback only; 575 KB lean-core ceiling; IMAGE_REFRESH untouched until natural renewal; public generative Guide OFF; public Now Moments media OFF; no automatic social posting/account creation; no paid ranking.


### San Marino + business expansion checkpoint — 2026-10-05
- Continued from canonical main after the Vanuatu/health checkpoint without reopening completed homepage/design/SEO work.
- Search/Explore expanded by three official San Marino Tourism Office webcams: Mount Titano / three Towers, Cableway / Adriatic view, and Palazzo Pubblico / Piazza della Libertà.
- Official Visit San Marino states all three webcams are installed at main points of interest and active 24 hours a day.
- All three are intentionally `EXTERNAL_LIVE` + `LINK_ONLY` + `watchHold: true`; they remain Search/Explore-only and cannot fill Watch Earth under the in-ERN playback rule.
- Healthy distinct searchable-place count is now **389** from 394 healthy source records; supplemental searchable catalog is 70 records.
- Source-research queue also expanded conservatively with Montserrat Soufrière Hills (official MVO remote-camera system) and Île des Pins / Baie de Kuto (tourism-office webcam) as `CURRENT_IMAGE_VERIFICATION_REQUIRED`; neither was promoted because public freshness behavior still needs independent confirmation.
- Commercial registry expanded from 236 to **238** opportunities.
- Added Klook Zandvoort / Dutch Grand Prix as `ACCOUNT_SEARCH_AND_EXACT_LINK_REQUIRED`, using current Klook Circuit Zandvoort event inventory only; the opportunity is seasonal and must remain downstream from Earth discovery.
- Added Viator Laikipia / Mpala as `ACCOUNT_SEARCH_AND_EXACT_LINK_REQUIRED`; current Viator evidence supports Laikipia/Ol Pejeta conservation-safari inventory, but ERN must never imply that a tour directly enters Mpala unless exact inventory proves it.
- No tracked link was fabricated or activated. No commercial factor changed source truth, health or Earth ranking.
- Protected gates remain unchanged: Watch Earth in-ERN playback only; hard 575 KB lean-core ceiling; IMAGE_REFRESH untouched until natural renewal; public generative Guide OFF; public Now Moments media OFF; no automatic social posting/account creation; no paid ranking.


### Searchable-source repair investigation — 2026-10-05
- Operations run 1355 completed SUCCESS after the San Marino expansion. Searchable-source health now covers 398 eligible sources / 302 unique URLs; today's cohort checked 57 sources / 42 unique URLs: 50 reachable, 0 missing, 5 access-blocked and 2 temporary/network failures.
- Bishkek Ala-Too Square and Too-Ashu Pass naturally escalated from WATCH to REPAIR after repeated network/server failures.
- Both REPAIR items were independently investigated against the official KG Camera provider. Their public provider pages remain active and still describe current no-archive surveillance with about a 20-second delay.
- Therefore no source deletion, replacement, health downgrade or truth change was justified. The repair disposition is KEEP SOURCE / preserve truth / recheck provider access behavior and the next rotating cohort.
- The five repeated access-blocked sources remain REVIEW only and are not treated as broken.
- Repair findings were recorded in data/provider-observations.json and data/source-maintenance-priority.json so the investigation is durable rather than repeated ad hoc.
- Pages run 2514 completed SUCCESS for the current San Marino + commercial expansion release. All protected product and commercial-neutrality gates remain unchanged.


### Liechtenstein + Gibraltar expansion checkpoint — 2026-10-05
- Continued both ERN growth lanes from the canonical repair checkpoint without reopening completed homepage/design/SEO work.
- Search/Explore added four official Liechtenstein mountain/current-view sources from Bergbahnen Malbun AG: Sareis, Malbun village center / Hotel Turna, Täli valley station and Steg reservoir.
- These Liechtenstein additions are `LIVE_IMAGE` + `LINK_ONLY` + `EXTERNAL` + `watchHold: true`; they cannot fill Watch Earth.
- Search/Explore then added three official Gibraltar Tourist Board Live Cams: Eastern Beach, Camp Bay & Little Bay, and Sandy Bay.
- Gibraltar additions are `EXTERNAL_LIVE` + `LINK_ONLY` + `watchHold: true`; they are also excluded from Watch Earth by the in-ERN playback rule.
- Healthy distinct searchable-place count is now **396** from 401 healthy source records. Supplemental searchable catalog is 77 records.
- Commercial registry expanded from 238 to **240** opportunities.
- Added a Viator Liechtenstein/Vaduz opportunity using current Viator Liechtenstein day-trip inventory. State remains `ACCOUNT_SEARCH_AND_EXACT_LINK_REQUIRED`; public copy must not imply Malbun is part of an itinerary unless exact product evidence proves it.
- Added one Gibraltar-level Viator opportunity tied to all three live-beach places rather than multiplying beach-specific affiliate density. State remains `ACCOUNT_SEARCH_AND_EXACT_LINK_REQUIRED`.
- No tracked affiliate URL was invented or activated. Commercial value did not alter source truth, source health or Earth ranking.
- Operations run 1357 completed SUCCESS for the Liechtenstein source addition. Operations run 1358 and the latest Pages serialization were allowed to proceed naturally after the Gibraltar addition; no manual workflow trigger was used.
- Malta official tourism research was refreshed: VisitMalta continues to expose a Live Malta Cams destination surface and explicitly describes live-camera use for pre-trip viewing, but ERN still lacks sufficiently resolved named camera targets/currentness evidence to promote a Malta place. Existing Malta commercial opportunity remains source-gated.
- Protected gates remain unchanged: Watch Earth in-ERN playback only; hard 575 KB lean-core ceiling; IMAGE_REFRESH untouched until natural renewal; public generative Guide OFF; public Now Moments media OFF; no automatic social posting/account creation; no paid ranking.


### Large expansion batch — 2026-10-05
Owner requested that ERN expansion proceed in substantially larger autonomous batches instead of returning after every few additions. This checkpoint follows that operating mode.

#### Searchable-place expansion
Healthy distinct searchable coverage advanced from **396 to 403 places** (408 healthy source records total; 84 supplemental Search/Explore records).

New promoted places in this batch:
- Madeira official tourism: Câmara de Lobos, Ponta do Sol and Pico do Areeiro;
- American Samoa: Ofu Ranger Station current view from the U.S. National Park Service;
- U.S. Virgin Islands: St. John / Windswept Point current-conditions view referenced by the U.S. National Park Service;
- Acadia National Park: Frenchman Bay current image from the official NPS webcam surface;
- Channel Islands National Park: official NPS Channel Islands Live surface.

All new external/current-image sources remain fail-closed for Watch Earth: `LINK_ONLY` / `EXTERNAL`, with Watch Earth still requiring in-ERN playback.

Research was also expanded without premature promotion:
- Vatican City official webcam research is now queued after current Vatican News documentation confirmed that the Governorate provides real-time webcams of significant Vatican City places. The exact post-September-2026 Governorate webcam route and named targets still require resolution, so no Vatican place was promoted.
- Malta official Live Malta Cams research was refreshed. The official tourism surface remains real, but exact named-camera/currentness extraction is still insufficient for promotion; Malta remains source-gated.
- Previously queued Montserrat and Île des Pins/New Caledonia candidates remain verification-gated rather than being promoted on weak freshness evidence.

#### Business expansion + reconciliation
Business work emphasized useful mapping and deduplication rather than raw opportunity count.

New downstream opportunities added:
- St. John / U.S. Virgin Islands → Viator;
- Acadia National Park / Bar Harbor → Viator.

Existing business mappings were reconciled to current promoted place IDs for Madeira, Bled, Tallinn, Wānaka, Rotorua, Santorini, Poiana Brașov and Dubrovnik.

Madeira's single island-level Viator opportunity now serves **12** healthy Madeira places, preserving one useful commercial bridge instead of multiplying affiliate density.

Commercial cleanup/consolidation:
- removed duplicate Bansko future record; canonical `viator-bansko` retained;
- removed duplicate Jasná future record; canonical `viator-jasna-chopok` retained;
- merged the stale source-gated Longyearbyen future record into canonical `viator-longyearbyen`, which now covers both healthy UNIS/Adventfjorden place IDs and remains `ACCOUNT_SEARCH_AND_EXACT_LINK_REQUIRED`;
- Shetland commercial mapping now includes the newer promoted Lerwick Town Hall place ID.

Commercial registry is now **239 opportunities**. The lower count reflects deliberate deduplication, not contraction of useful coverage. No new tracked link was fabricated or activated.

#### Health + release validation
Operations runs 1359, 1360 and 1361 all completed SUCCESS across the staged source additions.

Latest validated searchable-source health at Operations 1361:
- eligible searchable sources: **412**;
- eligible unique URLs: **311**;
- current cohort: **58 sources / 43 unique URLs**;
- reachable: **51**;
- missing: **0**;
- access-blocked: **5**;
- temporary/network: **2**;
- repair: **2**;
- review: **5**;
- watch: **0**.

The two REPAIR items remain Bishkek Ala-Too Square and Too-Ashu Pass. Their provider pages were already independently confirmed active, so no deletion, replacement, truth change or health downgrade is justified from the automated network failures alone. Five access-limited sources remain REVIEW only.

Pages run 2525 completed SUCCESS with all **112 current ERN release smoke tests passing**, Supplemental Search integrity passing, and the hard lean-core budget remaining exactly **575000 bytes**. Pages run 2526 also completed SUCCESS for the final commercial reconciliation through the same canonical workflow.

Protected gates remain unchanged:
- Watch Earth = in-ERN playback only;
- IMAGE_REFRESH pilot untouched until its natural renewal;
- public generative ERN Guide OFF;
- public Now Moments media OFF;
- no automatic social posting/account creation;
- no paid ranking;
- commercial value never affects Earth ranking.


### Balanced large expansion batch — 2026-10-05
Owner clarified the long-term operating principle: Earth is large, so ERN should steadily build meaningful searchable-place breadth and useful downstream business coverage in substantial batches, without rushing or weakening source quality. Report only after a genuinely meaningful body of work.

#### Searchable-place expansion
Healthy distinct searchable coverage advanced from **403 to 414 places** (**419 healthy source records** total; **95 supplemental Search/Explore records**).

This batch added **11 healthy searchable places** across two deliberately underrepresented geographic lanes rather than mechanically adding more records from already-dense regions.

**Brazil — 3 official/local-government current views**
- Águas de Lindóia — official Circuito das Águas Paulista regional-tourism live camera;
- Itaipulândia / Balneário Jacutinga — official municipal live beach camera;
- Rio do Sul / Elevado José Thomé — official Civil Defense live camera paired with real-time river conditions.

All three are external/link-only Search/Explore sources. None can fill Watch Earth.

**Chile / Patagonia / far south — 8 official DGAC current views**
- Rapa Nui / Mataveri;
- Arica / Chacalluta;
- Teniente Rodolfo Marsh Martin in Antarctica;
- Viña del Mar;
- Pucón;
- Puerto Natales;
- Punta Arenas;
- Puerto Williams / Navarino Island.

All eight use the official Chilean Dirección General de Aeronáutica Civil (DGAC/IFIS) operational-camera network and are conservatively classified as `LIVE_IMAGE` + `LINK_ONLY` + external playback. DGAC's current camera inventory explicitly lists the corresponding aerodromes/camera directions as operational; the Rodolfo Marsh page additionally exposes current UTC image timestamps.

Provider concentration was consciously limited: DGAC has many more active cameras, but only a geographically useful subset was promoted in this batch so ERN gains meaningful Chile/Patagonia/Rapa Nui/Antarctic breadth without flooding Search with one provider family.

#### Research queue — quality before promotion
Mauritius was added to the high-priority research queue rather than prematurely promoted.
- The official Mauritius Tourism Promotion Authority / Mauritius Now site currently states that it provides **13 webcams** and invites visitors to “See Mauritius live”.
- The current public webcam handoff is not resolving durably in automated retrieval, and exact named live targets have not yet been independently extracted/verified.
- State remains `EXACT_CAMERA_ROUTE_AND_TARGET_VERIFICATION_REQUIRED`.
- No generic Mauritius place was created merely to inflate country coverage.

Existing verification-gated research for Vatican City, Malta, Montserrat and Île des Pins/New Caledonia remains fail-closed until exact current targets/freshness evidence are strong enough.

#### Business-side expansion and reconciliation
Commercial registry advanced from **239 to 244 opportunities** while preserving the one-useful-action principle and exact-link gate.

New or materially strengthened downstream paths in this batch:
- Mendoza, Argentina → Viator, mapped to the healthy official Plaza Independencia current view;
- Rapa Nui / Easter Island → Viator;
- Viña del Mar / Valparaíso → Viator;
- Pucón / Villarrica region → Viator;
- Puerto Natales / Torres del Paine gateway → Viator;
- Punta Arenas / Magallanes → Viator.

Existing Salzburg/Tiqets mapping was reconciled to the newer healthy `salzburg-mirabell-old-town` place ID and current Salzburg inventory evidence.

Puerto Williams was intentionally left without a new commercial action because sufficiently clear destination-level partner inventory was not established. The Earth place remains valuable independently of monetization.

Every new business record remains `ACCOUNT_SEARCH_AND_EXACT_LINK_REQUIRED`. No owner-side tracked URL, offer or availability was invented. Commercial relevance remained downstream from Earth discovery and did not influence source ranking or promotion.

#### Health and release validation
Source additions were exercised through the existing canonical Operations workflow, not a duplicate health process.

Operations runs **1362, 1363 and 1364 completed SUCCESS** across the staged batch.

Latest validated health state from Operations 1364:
- eligible searchable sources: **423**;
- eligible unique URLs: **316**;
- current rotating cohort: **58 sources / 43 unique URLs**;
- reachable: **51**;
- missing: **0**;
- access-blocked: **5**;
- temporary/network: **2**;
- recovered: **0**;
- repair: **2**;
- review: **5**;
- watch: **0**.

The two REPAIR records remain Bishkek Ala-Too Square and Too-Ashu Pass. Their provider pages were previously independently confirmed active, so no catalog deletion, source-truth mutation or health downgrade is justified from automated network failures alone. The five access-blocked records remain REVIEW only.

Pages run **2530 completed SUCCESS** after the Rapa Nui/Arica/Antarctica stage. The final current release, Pages run **2532, completed SUCCESS** after the Patagonia/business expansion.

Pages 2532 validation:
- all **112 current ERN release smoke tests passed**;
- Supplemental Search catalog integrity passed;
- commercial placement integrity preflight passed;
- hard lean-core budget remains exactly **575000 bytes**;
- release artifact built and deployed successfully.

#### Protected invariants unchanged
- Watch Earth remains **in-ERN playback only**; all new LINK_ONLY/EXTERNAL places stay Search/Explore-only.
- IMAGE_REFRESH was not manually triggered or altered.
- Public generative ERN Guide remains OFF.
- Public Now Moments media remains OFF.
- No automatic social posting/account creation.
- No paid ranking.
- Commercial value never affects Earth ranking, truth, currentness or health.


### Iceland + Maldives + Caribbean/East Africa large expansion — 2026-10-05
Owner reiterated the long-term ERN operating principle: build truly broad Earth coverage and useful downstream business coverage in substantial but careful batches. Do not rush, but do not return after only a few cases. Preserve source quality, provenance, currentness, permission boundaries and commercial neutrality.

#### Searchable-place expansion
Healthy distinct searchable coverage advanced from **414 to 427 places** (**432 healthy source records** total).

This batch added **13 healthy searchable places** across underrepresented or high-visitor-utility geographies:

**Iceland — 5 official IRCA current views**
- Víkurskarð — North Iceland;
- Sauðárkrókur — Skagafjörður;
- Víkurgerði / Fáskrúðsfjörður — East Iceland;
- Búlandshöfði — Snæfellsnes;
- Vatnsfjarðarháls — Westfjords.

All five use the Icelandic Road and Coastal Administration's official current camera service and remain `LIVE_IMAGE` + `LINK_ONLY` + external playback. They are Search/Explore-only and do not affect Watch Earth eligibility.

**Maldives — 2 additional first-party island views**
- Veligandu — North Ari Atoll, using Veligandu Maldives Resort Island's official Sunrise/Sunset live webcams;
- Komandoo — Lhaviyani Atoll, using the resort's official webcam that states it refreshes every 60 seconds.

Together with Kuredu, ERN now has three strong first-party Maldives live/current island places. One Maldives-level business bridge serves the cluster rather than creating commercial density per resort.

**Caribbean + East Africa — 6 first-party live views**
- Seven Mile Beach — Grand Cayman, via Sunshine Hotel & Suites' first-party live East/West beachfront views;
- Montego Bay — Jamaica, via S Hotel Montego Bay's real-time live webcam;
- Kingston — Jamaica, via S Hotel Kingston's real-time live webcam;
- Calabash Cove — Saint Lucia, via the resort's first-party live webcam;
- Paje — Zanzibar, Tanzania, via Zanzibar White Sand Luxury Villas & Spa's first-party Live Webcam surface;
- White Bay / Jost Van Dyke — British Virgin Islands, via Soggy Dollar Bar & Sandcastle Hotel's first-party LIVE STREAMING webcam.

All six remain `LINK_ONLY` / external Search/Explore sources. None can be used to fill Watch Earth.

#### Business-side expansion + cleanup
Commercial registry moved from **244 to 249 opportunities**. The modest net increase reflects both new coverage and deliberate deduplication.

New or materially expanded paths:
- Akureyri / North Iceland → Viator;
- Snæfellsnes → Viator;
- East Iceland → Viator, only if a useful destination-level owner-side link exists;
- Westfjords → Viator, only if a useful destination-level owner-side link exists;
- Grand Cayman / Seven Mile Beach → Viator;
- Montego Bay → Viator;
- Kingston → Viator;
- Saint Lucia → Viator;
- Zanzibar / Paje → Viator;
- Jost Van Dyke / BVI → Viator.

Existing Maldives mapping was extended to cover Kuredu, Veligandu and Komandoo with one island-country-level planning path.

Commercial consolidation performed in the same batch:
- duplicate Mauritius Grand Baie Klook opportunity folded into the canonical Mauritius island-level opportunity;
- duplicate Kruger Viator records consolidated into one park-level path;
- duplicate St. Maarten / Great Bay Viator records consolidated into one island/Philipsburg path;
- duplicate Issyk-Kul Viator records consolidated into one regional path;
- duplicate Shymbulak Viator records consolidated into one canonical Almaty/Shymbulak path; the distinct Klook path remains because it is a separate approved partner relationship.

All newly created or consolidated unverified opportunities remain `ACCOUNT_SEARCH_AND_EXACT_LINK_REQUIRED`. No tracked URL, offer or availability was invented. Commercial value remained downstream from Earth discovery and did not affect source ranking, truth or health.

#### Search scaling architecture — resolved without weakening performance
During this batch ERN crossed the original **100-row supplemental Search integrity ceiling**.

The first release failure was correctly caused by the bounded supplemental guard when the catalog reached 102 rows. An initial attempt to graduate mature supplemental records into `data/sources.json` preserved search integrity but made the lean core exceed the hard 575 KB performance ceiling. That approach was rejected.

Final scalable solution:
- keep Search/Explore expansion in the lazy supplemental layer rather than bloating first-load core;
- restore the exact canonical compact serialization of `data/sources.json` from the last known-good release; logical source content is unchanged;
- raise the bounded lazy supplemental capacity from **100 to 250 rows**;
- keep all existing supplemental hard gates: HEALTHY only, LINK_ONLY only, held from Featured/Watch Earth, HTTPS source URL, no core ID/place duplication;
- current supplemental catalog: **108 / 250** rows;
- current core catalog: **328** rows;
- combined catalog rows: **436**;
- no place was deleted during the scaling correction.

This capacity change does **not** loosen truth, permission, currentness, Watch Earth or commercial rules. It only allows the lazy Search/Explore layer to continue growing while preserving initial-load performance.

#### Health and validation
Operations runs **1374 and 1375 completed SUCCESS** after the scaling change and canonical compact-core restoration.

Latest validated searchable-source health from Operations 1375:
- eligible searchable sources: **436**;
- eligible unique URLs: **329**;
- current rotating cohort: **60 sources / 45 unique URLs**;
- reachable: **53**;
- missing: **0**;
- access-blocked: **5**;
- temporary/network: **2**;
- recovered: **1**;
- repair: **2**;
- review: **5**;
- watch: **0**.

The two REPAIR records remain Bishkek Ala-Too Square and Too-Ashu Pass; their provider pages were independently confirmed active, so source truth remains unchanged. The five repeated access-limited records remain REVIEW only. Sara Sara Volcano — Peru recovered on the subsequent Operations run, so its one transient WATCH cleared naturally without catalog mutation.

Pages run **2548 completed SUCCESS** after restoring compact core serialization and expanding lazy Search capacity.
- all **112 current ERN release smoke tests passed**;
- Supplemental Search integrity passed with 108 records;
- commercial placement integrity passed;
- lean-core performance preflight passed with the hard budget still exactly **575000 bytes**;
- release artifact built and deployed successfully.

#### Protected invariants unchanged
- Watch Earth remains **in-ERN playback only**; all new LINK_ONLY/EXTERNAL places stay Search/Explore-only.
- IMAGE_REFRESH was not manually triggered or altered.
- Public generative ERN Guide remains OFF.
- Public Now Moments media remains OFF.
- No automatic social posting/account creation.
- No paid ranking.
- Commercial value never affects Earth ranking, truth, currentness or health.


### Ireland + Africa + Caribbean + Central/Eastern Europe large expansion — 2026-10-05
This continuation follows the owner's preferred operating balance: substantial batches, no rush, broad Earth coverage, and parallel business development without weakening truth or quality standards.

#### Searchable-place expansion
Healthy distinct searchable coverage advanced from **427 to 440 places** (**445 healthy source records** total).
Supplemental lazy Search/Explore catalog advanced from **108 to 121 rows** under the existing bounded 250-row capacity.

This batch added **13 healthy searchable places** across nine countries/territories:

**Ireland — 3 current/live places**
- Dublin Port — official Dublin Port Company live views toward Poolbeg Lighthouse, Dublin Bay and Dublin City; provider documents real-time streams with an approximately 10-minute delay;
- Inis Mór / Aran Islands — first-party Aran Islands Hotel live webcam;
- Killarney Lakes — first-party Aghadoe Heights Lakes of Killarney live webcam.

**Africa — 2 safari/wildlife places**
- Chobe / Elephant Valley, Botswana — Elephant Valley Lodge's first-party waterhole camera, explicitly available 24 hours a day;
- Masai Mara / Siria Escarpment, Kenya — Mara Siria Safari Camp's first-party current webcam view with current local conditions context.

**Caribbean islands — 4 first-party / officially supported live places**
- Grace Bay, Providenciales — The Somerset on Grace Bay first-party livecam;
- St. George's, Bermuda — municipal-supported 24/7 Town Square live view; the Corporation of St. George's explicitly documents the public webcam;
- Avila Beach, Curaçao — first-party Avila Beach Hotel live webcam rotating through three angles every 30 seconds;
- LionsDive / Mambo Beach, Curaçao — first-party LionsDive real-time unedited live resort webcam.

**Central / Eastern Europe — 4 current places**
- Budapest — Boutique Hotel Victoria first-party 24-hour live Danube/Buda city view;
- Constanța — official Visit Constanța multi-camera Black Sea live page;
- Ljubljana — official Slovenian Environment Agency / ARSO current webcam;
- Triglav / Kredarica — official ARSO current high-Alpine webcam.

All 13 additions remain `LINK_ONLY` / external Search/Explore sources with `watchHold: true`. None can fill Watch Earth under the in-ERN playback rule.

#### Business-side expansion
Commercial registry advanced from **249 to 258 opportunities**.

New opportunities created:
- Aran Islands / Galway → Viator;
- Killarney / Ring of Kerry → Viator;
- Chobe National Park / Kasane → Viator;
- Masai Mara → Viator;
- Grace Bay / Providenciales → Viator;
- Bermuda / St. George's → Viator;
- Curaçao / Willemstad → Viator, one island-level path serving both Curaçao live places;
- Budapest → Viator;
- Ljubljana / Triglav National Park → Viator, one regional path serving the city/mountain discovery cluster when context is appropriate.

The existing verified Dublin Viator opportunity was extended to include Dublin Port rather than creating a duplicate Dublin commercial path. Existing Klook and Go City Dublin relationships remain separate because they are distinct partner relationships.

Every new opportunity remains `ACCOUNT_SEARCH_AND_EXACT_LINK_REQUIRED`. No tracked URL, product availability or partner claim was invented or activated.

Constanța was deliberately left without a commercial path in this batch because source quality is sufficient but no equally clear already-approved partner fit was strong enough to justify adding one merely for count.

#### Health + release validation
Operations run **1376 completed SUCCESS** after the Ireland/Africa additions.
Operations run **1377 completed SUCCESS** after the Caribbean additions.
Operations run **1378 completed SUCCESS** after the Central/Eastern Europe additions.

Latest validated searchable-source health from Operations 1378:
- eligible searchable sources: **449**;
- eligible unique URLs: **342**;
- rotating cohort: **62 sources / 47 unique URLs**;
- reachable: **55**;
- missing: **0**;
- access-blocked: **5**;
- temporary/network: **2**;
- recovered: **0**;
- repair: **2**;
- review: **5**;
- watch: **0**.

The known Bishkek Ala-Too Square and Too-Ashu Pass items remain REPAIR after repeated automated network/server failures, but their provider pages were independently confirmed active earlier, so source truth remains unchanged. The five access-limited records remain REVIEW only. Sara Sara Volcano's prior one-off transient WATCH cleared naturally on the subsequent cohort without catalog mutation.

The hard **575000-byte lean-core ceiling** and lazy supplemental architecture remain unchanged. The expanded supplemental catalog is still well below its 250-row bound.

Protected invariants remain unchanged:
- Watch Earth = in-ERN playback only;
- IMAGE_REFRESH untouched until natural renewal;
- public generative ERN Guide OFF;
- public Now Moments media OFF;
- no automatic social posting/account creation;
- no paid ranking;
- commercial value never affects Earth ranking, truth, currentness or health.

Pages run **2554 completed SUCCESS** for this full batch.
- all **112 current ERN release smoke tests passed**;
- Supplemental Search integrity passed with **121** lazy records;
- commercial placement integrity passed;
- lean-core performance preflight passed with the hard budget still exactly **575000 bytes**;
- deployment and deployed social-preview verification completed successfully.


### Hong Kong + US parks + Morocco + Yucatán large expansion — 2026-10-05
This continuation follows the owner's preferred operating balance: substantial batches, no rush, broad Earth coverage, and parallel business development without weakening truth, currentness, permission or commercial-neutrality standards.

#### Searchable-place expansion
Healthy distinct searchable coverage advanced from **440 to 458 places** (**463 healthy source records** total).
Supplemental lazy Search/Explore catalog advanced from **121 to 139 rows**, still safely below the bounded 250-row capacity.

This batch added **18 healthy searchable places**:

**Hong Kong Observatory — 6 official current views**
- Clear Water Bay;
- Cheung Chau;
- Lamma Island;
- Peng Chau;
- Hong Kong Wetland Park;
- Sai Kung.

HKO current-image evidence includes its latest live weather-photo network and exact pages that state images are captured every five minutes. Existing Hong Kong Klook planning coverage was extended to this cluster rather than creating duplicate business records.

**United States National Park Service — 6 official current views**
- Yosemite High Sierra / Half Dome;
- Haleakalā Summit Crater;
- Grand Canyon — Yavapai Point;
- Grand Canyon — Kolb Studio;
- Yellowstone — Mount Washburn;
- Glacier National Park — Many Glacier.

All six use official NPS current/live webcam surfaces. Business mappings were reconciled at park or island level: Grand Canyon, Maui/Haleakalā, Yellowstone and Glacier existing paths were extended; a new Yosemite Viator opportunity was added.

**Morocco — 2 first-party real-time surf/coast views**
- Dakhla Lagoon — Dakhla Attitude first-party webcam, explicitly described as real-time;
- Paradis Plage / Agadir-Taghazout coast — first-party resort webcam for live swell/sunset conditions.

New downstream Viator opportunities were added for Dakhla and Agadir/Taghazout, both remaining `ACCOUNT_SEARCH_AND_EXACT_LINK_REQUIRED`.

**Yucatán, Mexico — 4 government-backed real-time destinations**
- Mérida;
- Izamal;
- Progreso;
- Valladolid.

The Government of Yucatán announced on 2026-09-27 that all four destinations are available through Webcams de México **24 hours a day in real time** as part of the state's tourism-promotion strategy. Mérida's exact current camera is at Palacio Municipal; the current platform also lists Izamal, Progreso and Valladolid. One regional Mérida/Yucatán Viator planning bridge was added rather than creating four separate commercial records.

All 18 new places remain `LINK_ONLY` / external Search/Explore sources with `watchHold: true`. None may fill Watch Earth under the in-ERN playback rule.

#### Business-side expansion + reconciliation
Commercial registry advanced from **258 to 263 opportunities**.

New opportunities created in this continuation:
- Yosemite National Park → Viator;
- San Marino → Viator, one destination-level path serving all three official San Marino current views;
- Dakhla → Viator;
- Agadir / Taghazout → Viator;
- Mérida / Yucatán → Viator, one regional path serving the four new state-backed Yucatán destinations.

Existing mappings expanded without duplicate commercial density:
- Hong Kong Klook path now covers the broader HKO place cluster;
- Grand Canyon Viator path now includes Yavapai Point and Kolb Studio;
- Maui/Kihei path now includes Haleakalā;
- Yellowstone path now includes Mount Washburn;
- Glacier National Park path now includes Many Glacier.

No tracked URL, offer, availability or partner relationship was invented. All unverified new paths remain owner-side exact-link gated. Commercial value remained downstream from Earth discovery and did not affect source ranking, truth, currentness or health.

#### Health + release validation
Operations runs **1379, 1380, 1381 and 1382 completed SUCCESS** across the staged additions.

Latest validated searchable-source health from Operations 1382:
- eligible searchable sources: **467**;
- eligible unique URLs: **355**;
- current rotating cohort: **65 sources / 50 unique URLs**;
- reachable: **58**;
- missing: **0**;
- access-blocked: **5**;
- temporary/network: **2**;
- recovered: **0**;
- repair: **2**;
- review: **5**;
- watch: **0**.

The two REPAIR records remain Bishkek Ala-Too Square and Too-Ashu Pass; their provider pages were independently confirmed active earlier, so source truth remains unchanged. The five repeated access-limited records remain REVIEW only. No new missing-source or repair regression appeared in this batch.

Pages run **2563 completed SUCCESS** for the full 458-place state.
- all **112 current ERN release smoke tests passed**;
- Supplemental Search integrity passed with **139** records;
- commercial placement integrity passed;
- hard lean-core performance budget remains exactly **575000 bytes**;
- deployment and deployed social-preview verification completed successfully.

#### Protected invariants unchanged
- Watch Earth remains **in-ERN playback only**;
- IMAGE_REFRESH was not manually triggered or altered;
- public generative ERN Guide remains OFF;
- public Now Moments media remains OFF;
- no automatic social posting/account creation;
- no paid ranking;
- commercial value never affects Earth ranking, truth, currentness or health.


### Western US + Greenland + French Polynesia + Caribbean + Seychelles large expansion — 2026-10-05
This continuation follows the owner's preferred ERN cadence: broad but disciplined batches, no rush, and parallel Search/Explore + business growth with validation before reporting.

#### Searchable-place expansion
Healthy distinct searchable coverage advanced from **458 to 473 places** (**478 healthy source records** total).
Supplemental lazy Search/Explore catalog advanced from **139 to 154 rows**, still safely below the bounded 250-row capacity.

This batch added **15 healthy searchable places**:

**United States National Park Service — 4 official current views**
- Zion National Park — Temples & Towers of the Virgin;
- Arches National Park — Entrance Station;
- Canyonlands National Park — Island in the Sky;
- Olympic National Park — Hurricane Ridge.

All four use official NPS current webcam surfaces and remain `LIVE_IMAGE` + `LINK_ONLY` + Search/Explore-only. New downstream Viator opportunities were added for Zion, Moab/Arches/Canyonlands and Olympic National Park.

**Greenland — 5 official Greenland Airports live destinations**
- Ilulissat;
- Kangerlussuaq;
- Kulusuk;
- Qaarsut;
- Sisimiut.

All five use Greenland Airports' official airport pages with current live streams. ERN already had Nuuk through a different current provider, so Nuuk was not duplicated. A dedicated Ilulissat Viator planning opportunity was added because current Icefjord/cultural/outdoor inventory is strong; the other airport views remain Earth-discovery sources without forced commercial placement.

**French Polynesia — 2 new searchable places**
- Tahiti / Faa'a — first-party Tahiti Airport Motel webcam;
- Moorea — Moorea.com destination resource currently labels a LIVE webcam from Moorea Pearl Beach Resort.

Both remain external/link-only Search/Explore sources. New downstream Viator opportunities were added for Tahiti/Papeete and Moorea.

**Caribbean — 3 first-party live places**
- Nassau / Cable Beach, The Bahamas — Baha Mar first-party live webcam;
- Isla Verde, Puerto Rico — Royal Sonesta San Juan first-party Resort Live Feed;
- Cabarete Beach, Dominican Republic — Hotel Villa Taina first-party live webcam/current wind-wave-weather view.

Destination-level Viator opportunities were added for Nassau/New Providence, San Juan/Isla Verde and Cabarete; each remains `ACCOUNT_SEARCH_AND_EXACT_LINK_REQUIRED`.

**Seychelles — 1 new-country live place**
- Beau Vallon / Mahé — KOEK Seychelles active 4K live stream, explicitly described as active/24-7 with recent snapshots.

One Beau Vallon/Mahé Viator planning opportunity was added rather than multiplying commercial density.

All 15 new sources remain `LINK_ONLY` / external Search/Explore sources with Watch hold. None may fill Watch Earth under the in-ERN playback rule.

#### Business-side growth
Commercial registry advanced from **263 to 273 opportunities**.
New opportunities in this batch:
- Zion National Park → Viator;
- Moab / Arches / Canyonlands → Viator, one regional path for the two parks;
- Olympic National Park → Viator;
- Ilulissat / Disko Bay → Viator;
- Tahiti / Papeete → Viator;
- Moorea → Viator;
- Nassau / New Providence → Viator;
- San Juan / Isla Verde → Viator;
- Cabarete → Viator;
- Beau Vallon / Mahé, Seychelles → Viator.

Cross-partner destination overlaps in the existing registry were reviewed. They represent distinct approved partner relationships (for example Tiqets vs Go City vs Klook vs Viator) rather than duplicate canonical records, so they were preserved. No tracked URL, offer, availability or partner relationship was invented. All newly added paths remain owner-side exact-link gated.

#### Health + release validation
Operations runs **1383, 1384, 1385 and 1386 completed SUCCESS** across the staged additions.

Latest validated searchable-source health from Operations 1386:
- eligible searchable sources: **482**;
- eligible unique URLs: **370**;
- current rotating cohort: **68 sources / 53 unique URLs**;
- reachable: **61**;
- missing: **0**;
- access-blocked: **5**;
- temporary/network: **2**;
- recovered: **0**;
- repair: **2**;
- review: **5**;
- watch: **0**.

The two REPAIR records remain Bishkek Ala-Too Square and Too-Ashu Pass; earlier independent provider checks confirmed those pages are active, so automated network failures still do not justify truth or health mutation. The five repeated access-limited sources remain REVIEW only. No new missing-source or WATCH regression appeared in the final cohort.

Pages run **2571 completed SUCCESS** for the full 473-place state.
- all **112 current ERN release smoke tests passed**;
- Supplemental Search integrity passed with **154** records;
- commercial placement integrity passed;
- hard lean-core performance budget remains exactly **575000 bytes**;
- deployment completed with zero reported errors.

#### Protected invariants unchanged
- Watch Earth remains **in-ERN playback only**;
- IMAGE_REFRESH was not manually triggered or altered;
- public generative ERN Guide remains OFF;
- public Now Moments media remains OFF;
- no automatic social posting/account creation;
- no paid ranking;
- commercial value never affects Earth ranking, truth, currentness or health.


### Thailand + southern Africa + Indian Ocean + Canada/New Zealand expansion — 2026-10-05
Owner continues to prefer substantial, balanced expansion batches rather than frequent small reports. This checkpoint preserves that operating mode: widen Earth coverage, grow useful downstream commercial mapping, avoid weak source inflation, and validate the whole batch before handoff.

#### Searchable-place expansion
Healthy distinct searchable coverage advanced from **473 to 483 places** (**488 healthy source records** total). The lazy supplemental Search/Explore catalog is now **164 / 250** records, leaving significant room under the current bounded capacity without increasing first-load core size.

This continuation added **10 healthy searchable places**:
- **Thailand** — Koh Samui / Crystal Bay (Silver Beach), first-party Crystal Bay Beach Resort live stream;
- **South Africa** — Madikwe / Tau Game Lodge waterhole;
- **South Africa** — Klaserie / Simbavati Waterside dam live stream;
- **South Africa** — Cape Town / Camps Bay first-party POD live coastal stream;
- **Namibia** — Kambaku Wildlife Reserve waterhole;
- **Mauritius** — Shanti Maurice south-coast live beach view;
- **Kenya** — Chyulu Hills / ol Donyo Lodge wildlife waterhole;
- **Canada** — Jasper SkyTram upper-station live view;
- **Canada** — Maligne Lake 360° live/current view;
- **New Zealand** — Taupō lakefront official destination live view.

All new records remain `LINK_ONLY` / external Search/Explore content with `watchHold: true`. None may fill Watch Earth because Watch Earth remains in-ERN playback only.

Two additional geographies were researched conservatively but not promoted:
- **Sri Lanka / Pasikudah** — credible 2026 evidence confirms Sun Siyam launched a 24-hour real-time weather webcam, but the exact durable current first-party production route still requires independent resolution; candidate remains `EXACT_LIVE_TARGET_VERIFICATION_REQUIRED`.
- **Bermuda / Azura** — current property surfaces expose a Live Webcam handoff, but ERN has not resolved and independently verified the exact durable webcam endpoint; candidate remains research-only.

#### Business-side expansion + reconciliation
Commercial registry advanced from **273 to 279 opportunities**.

New downstream opportunities:
- Koh Samui → Viator;
- Madikwe Game Reserve → Viator;
- Klaserie / Greater Kruger → Viator, activation only if the owner-side search yields a genuinely useful scoped path;
- Amboseli / Chyulu Hills → Viator;
- Jasper National Park → one destination-level Viator path serving both Jasper SkyTram and Maligne Lake;
- Taupō → Viator.

Existing business mappings were extended rather than duplicated:
- the already-verified Cape Town Viator path now also serves Camps Bay;
- the existing Etosha/Namibia safari research path now includes Kambaku where scope is clearly disclosed;
- the Mauritius Klook path now covers four healthy island discovery places including Shanti Maurice.

No tracked affiliate URL was fabricated or activated. Existing already-verified links were preserved unchanged. Every new unverified opportunity remains `ACCOUNT_SEARCH_AND_EXACT_LINK_REQUIRED`.

#### Health + release validation
Operations runs **1387, 1388, 1389, 1390, 1391 and 1392** completed SUCCESS across the staged source additions.

Latest validated health from Operations **1392**:
- eligible searchable sources: **492**;
- eligible unique URLs: **380**;
- current rotating cohort: **69 sources / 54 unique URLs**;
- reachable: **62**;
- missing: **0**;
- access-blocked: **5**;
- temporary/network: **2**;
- recovered: **4**;
- repair: **2**;
- review: **5**;
- watch: **0**.

The temporary San Marino Cableway WATCH cleared naturally on recheck. The two REPAIR records remain Bishkek Ala-Too Square and Too-Ashu Pass; provider evidence already confirmed those pages active, so no source truth change is justified. The five repeated access-limited sources remain REVIEW only.

Pages run **2583 completed SUCCESS** on the final commercial state:
- all **112 current ERN release smoke tests passed**;
- Supplemental Search integrity passed with **164** records;
- hard lean-core budget remains exactly **575000 bytes**;
- release build/deployment completed with no release errors.

#### Protected invariants unchanged
- Watch Earth remains **in-ERN playback only**;
- IMAGE_REFRESH remains untouched until its natural scheduled renewal;
- public generative ERN Guide remains OFF;
- public Now Moments media remains OFF;
- no automatic social posting/account creation;
- no paid ranking;
- commercial value never affects Earth ranking, source truth, currentness or health.


### 500-place searchable milestone — balanced Europe/islands/wildlife expansion — 2026-10-06
Owner's operating direction remains: expand both ERN sides in large, careful batches; do not rush, but do not return after only a few additions. This batch prioritised underrepresented countries/regions, high-value live/current views, commercial reconciliation and cleanup before counting growth.

#### Searchable-place expansion
After removing one duplicate Kanlaon supplemental record, ERN reached **500 healthy distinct searchable places** from **505 healthy source records**. Supplemental Search/Explore currently contains **181 rows** within the bounded lazy capacity of 250.

New searchable coverage in this batch includes:
- **Monaco — new ERN country:** Port Hercule and Monte-Carlo Beach live views;
- **France / Les Arcs:** Arc 1600, Arc 1800, Arc 1950 and Arc 2000 official destination livecams;
- **United States:** Farallon Islands live scientific/wildlife view from the California Academy of Sciences;
- **Lithuania — new ERN country:** Vilnius Cathedral Square, Palanga Pier/Baltic Sea, Nida marina/Curonian Lagoon and Kaunas Old Town;
- **Luxembourg — new ERN country:** Wasserbillig / Moselle-Sûre real-time tourism webcam;
- **Latvia:** Liepāja Oskars Kalpaks Bridge live stream, Jūrmala Dzintari Beach municipal live cam, Riga Port Panorama and Daugavgrīva Lighthouse live port views;
- **Jersey — new ERN country/territory:** St. Ouen's Bay and St. Aubin's Bay official Visit Jersey live beach cameras.

All additions remain `LINK_ONLY` / external playback with `watchHold: true`. They are Search/Explore-only and cannot fill Watch Earth.

Research-only coverage also expanded without premature promotion:
- **Macao:** official Meteorological and Geophysical Bureau WeatherCam network confirmed, but exact named camera locations/routes remain unresolved; candidate stays `EXACT_CAMERA_ROUTE_AND_TARGET_VERIFICATION_REQUIRED`.
- Malta official Live Malta Cams remains real but exact named camera extraction/current target evidence is still insufficient for promotion.

#### Catalog cleanup / truth preservation
The health system exposed a duplicate Kanlaon representation: canonical core source `kanlaon-phivolcs-current-image` / place `kanlaon-volcano` and a supplemental record pointing to the same PHIVOLCS target under `philippines-kanlaon-phivolcs`.
- removed the supplemental duplicate rather than inflating the searchable-place count;
- retained candidate provenance as `SUPERSEDED_BY_CANONICAL_CORE`;
- repointed multilingual/search aliases to canonical place `kanlaon-volcano`.
This cleanup caused an intermediate Pages failure because the alias registry still referenced the removed supplemental place ID. The alias was corrected immediately; all other smoke tests and the lean guard had already passed in that failed run.

#### Business-side expansion
Commercial registry now contains **286 opportunities**.
New opportunities in this batch:
- Monaco / Monte-Carlo → Viator;
- Farallon Islands / San Francisco offshore wildlife → Viator, explicitly seasonal/dormant unless exact useful inventory exists;
- Vilnius → Viator;
- Klaipėda / Curonian Lagoon / Nida → Viator, only if exact scope is useful;
- Jersey / Channel Islands → Viator;
- Jūrmala → Viator;
- Riga → Viator.

All remain `ACCOUNT_SEARCH_AND_EXACT_LINK_REQUIRED`. No tracked link, availability or offer was invented. Liepāja and Luxembourg/Wasserbillig were intentionally left without a new commercial mapping where current partner inventory was not cleanly destination-relevant.

#### Health / repair review
Operations **1398 completed SUCCESS** at the 500-place expansion stage.
Latest observed searchable-source cohort:
- eligible searchable sources: **509**;
- eligible unique URLs: **395**;
- current cohort: **75 sources / 54 unique URLs**;
- reachable: **69**;
- missing: **0**;
- blocked: **4**;
- temporary/network: **2**;
- recovered: **0**;
- current cohort repair queue: **2 REPAIR / 4 REVIEW / 0 WATCH**.

The two REPAIR items were independently investigated rather than automatically mutated:
- **Balykchy — Gateway to Issyk-Kul:** KG Camera's provider page remains active, lists the camera and states live surveillance with about a 20-second delay;
- **Kanlaon Volcano:** PHIVOLCS' current VOLCAN surface remains active and explicitly publishes real-time monitoring data with IP-camera snapshots sampled every minute.
Therefore neither source was deleted, replaced, downgraded or truth-changed. Durable investigation notes were added to provider observations and source-maintenance priority data.

An earlier Operations 1394 failure was an external/private analytics health-fetch failure, not a catalog/source validation failure. Subsequent Operations runs recovered successfully.

#### Release validation
Pages **2588 completed SUCCESS** before the final milestone additions:
- all **112 current ERN release smoke tests passed**;
- supplemental Search integrity passed;
- hard lean-core budget remained exactly **575000 bytes**.

Intermediate Pages 2589 failed only because the search-alias registry still referenced the deliberately removed duplicate Kanlaon supplemental place; the alias was repointed to canonical `kanlaon-volcano`. Pages run **2595 completed SUCCESS** for the final 500-place release: all **112 current ERN release smoke tests passed**, Supplemental Search integrity passed with **181** records, the hard lean-core budget remained exactly **575000 bytes**, deployment completed successfully and deployed social-preview verification reported no errors.

#### Protected invariants unchanged
- Watch Earth remains **in-ERN playback only**;
- IMAGE_REFRESH remains untouched until natural renewal;
- public generative Guide remains OFF;
- public Now Moments media remains OFF;
- no automatic social posting/account creation;
- no paid ranking;
- commercial value never affects Earth ranking, source truth, currentness or health.


Operational note after the 500-place release:
- Operations run **1399** failed during daily packet construction because a broad set of external availability probes returned transient `TypeError` / `AbortError` network failures and packet-integrity consequently failed closed.
- This was not treated as source-truth evidence and caused no automatic catalog or health mutation.
- The last clean searchable-health result remains Operations **1398 SUCCESS**; provider evidence for Balykchy and Kanlaon was separately rechecked and recorded as active.


### Travelpayouts expansion framework — 2026-10-06
- Owner explicitly confirmed that ERN should keep expanding both searchable Earth coverage and the business side, and asked that the wider Travelpayouts program ecosystem not be overlooked.
- Added `docs/TRAVELPAYOUTS_EXPANSION.md` as the canonical research/routing framework for exploring Travelpayouts beyond the already-used Viator/Klook-heavy mix.
- Current commercial registry is heavily concentrated in Viator (215), with smaller Klook (45), Tiqets (14), Go City (6), KKday (3), Welcome Pickups (2), and WeGoTrip (1) paths. Future business expansion should therefore deliberately audit accommodation, transport, car rental, insurance, cruises/packages and other useful Travelpayouts categories where they fit visitor intent.
- Preserve the downstream rule: first Earth discovery, then one genuinely useful travel action. Do not add commercial density for its own sake.
- Travelpayouts project/program availability must be verified in the owner account before public use; presence in the platform catalog is not sufficient proof of ERN access.
- Exact tracked links remain owner-verification gated when required. No program, tracked URL, offer, approval, price or availability may be invented.
- Existing verified/direct partner links remain valid; do not replace them merely for network consolidation without a clear advantage.


### Isle of Man + Guernsey + Travelpayouts utility expansion — 2026-10-06
This continuation follows the owner's preferred large-batch cadence: meaningful Earth coverage growth, business-side diversification, operational repair, and full validation before reporting.

#### Searchable-place expansion
Healthy distinct searchable coverage advanced from **500 to 507 places** (**512 healthy source records** total). The lazy supplemental Search/Explore catalog advanced from **181 to 188 rows**, still inside the bounded 250-row capacity.

New searchable coverage:
- **Isle of Man — new ERN territory:** Douglas Promenade, Douglas Marina, Peel Breakwater, Port Erin Bay, and Ramsey, all from the official Isle of Man Government webcam network.
- **Guernsey — new ERN territory:** Guernsey Harbour Entrance and Havelet Bay / Castle Cornet, both from Guernsey Yacht Club's first-party webcam page, which states its views refresh every 10 seconds.

All seven remain `LIVE_IMAGE` + `LINK_ONLY` + external playback with `watchHold: true`; none can fill Watch Earth.

New downstream Viator planning opportunities were added at island level for Isle of Man and Guernsey rather than one commercial record per camera.

#### Travelpayouts business diversification
The commercial opportunity registry advanced from **288 to 296 opportunities**, with eight new non-Viator utility paths using programs that owner evidence already records as link-generation capable in the Earthrightnow Travelpayouts project:
- QEEQ → Iceland road-trip planning;
- AutoEurope → Madeira car rental;
- Kiwi.com → Greenland flight planning;
- Kiwi.com → Rapa Nui flight planning;
- Kiwitaxi → Mauritius airport/resort transfers;
- intui.travel → Tahiti/Papeete arrival transfers;
- KKday → Taiwan destination activities/transport;
- Airalo → optional remote-island connectivity.

All eight remain `ACCOUNT_SEARCH_AND_EXACT_LINK_REQUIRED`. Their existence is a research/routing decision only: exact destination coverage, route usefulness and tracked link must be generated and verified owner-side before any public placement.

`data/commercial-utility-routing.json` was broadened beyond the original small utility set to include car rental, flight planning, alternate transfers, activities, connectivity and optional travel-protection routing. Duplicate suppression remains explicit: normally one car-rental option, one flight-search action, one transfer action and one eSIM option per relevant context.

`data/travelpayouts-unlocked-programs.json` now prioritizes the useful unlocked programs by visitor utility rather than commission. Commercial value remains downstream from Earth discovery and cannot affect ranking.

#### Operations repair
Operations failures 1399/1400 were investigated. Run 1400 exposed a deterministic data-integrity problem in provider observations: the Balykchy observation used stale id `balykchy-entry`, while the canonical source id is `balykchy-north-entry`.
- corrected the observation id;
- did not change Balykchy source truth or health;
- Operations **1401, 1402 and 1403 completed SUCCESS** after correction.

Latest Operations 1403 searchable-source health:
- eligible searchable sources: **516**;
- eligible unique URLs: **399**;
- rotating cohort: **78 sources / 56 unique URLs**;
- reachable: **72**;
- missing: **0**;
- access-blocked: **4**;
- temporary/network: **2**;
- recovered: **2**;
- repair: **2**;
- review: **4**;
- watch: **0**.

The two REPAIR records are Balykchy and Kanlaon. Both have separate provider evidence indicating active official/provider surfaces, so automated network failures still do not justify catalog deletion or truth mutation.

#### Lean-core repair + release validation
The natural scheduled Current Image Pilot renewal completed successfully and was not manually triggered. Subsequent releases exposed a small **42-byte** lean-core overage (575042 bytes). Rather than remove places or raise the ceiling, ERN compacted the existing `data/local-directory.json` serialization with no logical content removed.

Final Pages **2600 completed SUCCESS**:
- all **112 current ERN release smoke tests passed**;
- lean core: **573649 bytes**;
- hard budget remains exactly **575000 bytes**;
- core sources: **328**;
- supplemental sources: **188**;
- commercial placement integrity passed;
- deployment and deployed social-preview verification completed with no reported errors.

#### Protected invariants unchanged
- Watch Earth remains **in-ERN playback only**;
- IMAGE_REFRESH / Current Image renewal was allowed to run only on its natural schedule; no manual trigger;
- public generative ERN Guide remains OFF;
- public Now Moments media remains OFF;
- no automatic social posting/account creation;
- no paid ranking;
- no automatic Travelpayouts link rewriting or placement;
- commercial value never affects Earth ranking, source truth, currentness or health.


### North Macedonia + Lesotho extension — 2026-10-06
The same large batch continued beyond the 507-place checkpoint to prioritize genuinely new-country coverage rather than further concentrating already dense providers/countries.

#### Searchable expansion
Healthy distinct searchable coverage is now **513 places** from **518 healthy source records**.
- lazy supplemental Search/Explore: **194 / 250 rows**;
- remaining bounded supplemental capacity before another architectural review: **56 rows**.

**North Macedonia — 5 new places**
Using the current Ski Macedonia live-camera network:
- Mavrovo — Bistra & ski slopes;
- Popova Šapka — Šar Mountains;
- Galičica — Magaro / Ohrid region;
- Pelister — Niže Pole;
- Vodno — Skopje mountain view.

The provider currently labels these camera families LIVE and exposes current weather/conditions. ERN treats all five as `EXTERNAL_LIVE` + `LINK_ONLY` + Search/Explore-only with Watch hold.

One regional Viator opportunity (`viator-north-macedonia-mountains`) serves the cluster rather than creating five repetitive affiliate placements. Current public Viator inventory supports Galičica/Ohrid activities and Mavrovo/Ohrid touring, but ERN must not imply that every camera location is included in an itinerary.

**Lesotho — 1 new place**
- Afriski — Maluti Mountains.

Afriski's official resort site directly exposes a Snow Report Webcam handoff; the current linked surface identifies the Afriski Mountain Resort webcam in Lesotho. ERN promotes it conservatively as `LIVE_IMAGE` + `LINK_ONLY` + Search/Explore-only.

One Lesotho-level Viator planning opportunity was added. Current public Viator inventory includes Lesotho and Sani Pass products, but the commercial record explicitly forbids implying that Afriski itself is visited unless exact itinerary evidence proves it.

#### Final business state for this large batch
Commercial opportunity registry: **298 records**.
This includes the earlier eight new Travelpayouts utility opportunities (QEEQ, AutoEurope, Kiwi.com, Kiwitaxi, intui.travel, KKday, Airalo) plus the Isle of Man, Guernsey, North Macedonia and Lesotho visitor-planning bridges.

No new tracked URL was invented or publicly activated. Every new utility/affiliate record that lacks owner verification remains `ACCOUNT_SEARCH_AND_EXACT_LINK_REQUIRED`.

#### Final validation
Operations **1404 SUCCESS** after the North Macedonia addition.
- cohort: 78 / 521 eligible searchable sources;
- 56 / 401 unique URLs;
- reachable 70, missing 0, blocked 4, temporary/network 4;
- repair 2, review 4, watch 2.
The two Guernsey URLs entered first-transient WATCH only and were not mutated.

Operations **1405 SUCCESS** after the Lesotho addition.
- total eligible searchable sources: **522**;
- unique URLs: **402**;
- current cohort: **78 sources / 56 unique URLs**;
- reachable: **72**;
- missing: **0**;
- blocked: **4**;
- temporary/network: **2**;
- recovered: **2**;
- repair: **2**;
- review: **4**;
- watch: **0**.
The transient Guernsey WATCH states cleared naturally on subsequent health observations.

Pages **2604 SUCCESS** for the final 513-place state.
- all **112 current ERN release smoke tests passed**;
- lean core: **573649 bytes**;
- hard ceiling remains **575000 bytes**;
- supplemental Search integrity passed at **194 rows**;
- commercial placement integrity passed;
- deployment completed with reported `errors: []`.

Protected invariants remain unchanged: Watch Earth in-ERN playback only; natural Current Image renewal only; public generative Guide OFF; public Now Moments media OFF; no automatic social posting/account creation; no automatic Travelpayouts Drive/link rewriting; no paid ranking; commercial value never affects Earth ranking, source truth, health or currentness.


### Great Smoky Mountains + Travelpayouts diversification batch — 2026-10-06
Owner asked ERN to keep expanding both Earth coverage and business coverage in large balanced batches, with explicit attention to the many Travelpayouts programs beyond Klook/Viator.

#### Searchable-place expansion
Healthy distinct searchable coverage advanced from **513 to 521 places** (**526 healthy source records** total).
- lazy supplemental Search/Explore catalog: **202 / 250 rows**;
- remaining bounded supplemental capacity before another architecture review: **48 rows**.

New official NPS current-image places:
- Great Smoky Mountains — Kuwohi;
- Great Smoky Mountains — Newfound Gap;
- Great Smoky Mountains — Purchase Knob;
- Great Smoky Mountains — Look Rock;
- Crater Lake — Annie Spring Entrance;
- Crater Lake — Steel Information Center;
- Rocky Mountain National Park — Kawuneeche Valley;
- Rocky Mountain National Park — Longs Peak.

The Great Smoky Mountains NPS page states the park's digital webcam images update approximately every 15 minutes. Crater Lake and Rocky Mountain additions use current official NPS webcam surfaces. All eight remain `LIVE_IMAGE` + `LINK_ONLY` + Search/Explore-only with Watch hold. They do not change Watch Earth eligibility.

Existing park-level business bridges were extended rather than duplicated:
- one Great Smoky Mountains / Gatlinburg Viator opportunity serves the four Smokies viewpoints;
- existing Crater Lake opportunity now also maps Annie Spring and Steel Information Center;
- existing Rocky Mountain National Park opportunity now also maps Kawuneeche Valley and Longs Peak.

#### Travelpayouts diversification — destination mappings
Commercial opportunity registry advanced from **298 to 312 records**.

New differentiated Travelpayouts destination mappings:
- Radical Storage → New York, London, Rome, Dublin, Chicago, Istanbul;
- Localrent → Georgia/Tbilisi, Montenegro/Kolašin, Greek islands (Santorini/Mykonos), Türkiye/Istanbul onward-road-trip context;
- WeGoTrip → Rome, Dublin, Istanbul self-guided cultural contexts.

All remain `ACCOUNT_SEARCH_AND_EXACT_LINK_REQUIRED`. No tracked URL or coverage claim was invented. Owner-side city/destination inventory and exact tracked link must be confirmed before public placement.

#### Travelpayouts diversification — utility research layer
The generic utility research layer was expanded from 5 to **11** program-level opportunities. Added:
- Localrent road-trip coverage;
- WeGoTrip self-guided city utility;
- BikesBooking local mobility;
- AirHelp post-flight-disruption recovery;
- EKTA optional travel protection;
- GetTransfer as a transfer-coverage fallback.

These utilities remain planning-only and fail closed. AirHelp is explicitly post-disruption only; EKTA is optional and must never use fear-based presentation; GetTransfer is reserved for gaps not already served by Welcome Pickups/Kiwitaxi/intui.travel; BikesBooking is destination-specific, not global auto-placement.

Utility routing now includes explicit clusters for major-city luggage storage, Caucasus/Balkans/Greek-island independent driving, and historic-city self-guided culture.

#### Travelpayouts program coverage matrix
`data/travelpayouts-program-ranking.json` was normalized so WeGoTrip uses canonical id `wegotrip` consistently. A coverage matrix now distinguishes:
- destination-mapped programs;
- utility-research-mapped programs;
- programs intentionally left unmapped in reserve.

Programs currently left in reserve include GetRentacar, Economybookings and secondary eSIM/recovery alternatives where ERN already has a clearer utility choice. This is deliberate duplicate suppression, not unfinished activation. ERN should not use every available affiliate program merely because it exists.

Accommodation remains a distinct business gap. Existing Trip.com/Hotels.com research stays owner-account-status gated; no stay partner was invented or activated from public catalog presence alone.

#### Health + release validation
Operations **1406 SUCCESS** after the first Smokies/source expansion and Operations **1407 SUCCESS** after the final 521-place source state.

Latest Operations 1407 searchable-source health:
- eligible searchable sources: **530**;
- eligible unique URLs: **405**;
- rotating cohort: **80 sources / 57 unique URLs**;
- reachable: **72**;
- missing: **0**;
- access-blocked: **4**;
- temporary/network: **4**;
- recovered: **0**;
- repair: **2**;
- review: **4**;
- watch: **2**.

REPAIR remains Balykchy and Kanlaon, both previously supported by separate provider evidence and therefore not automatically removed. REVIEW remains Dolomiti Superski, Sangay, Addo and Satara for repeated access limitation. The two Guernsey sources are transient WATCH only and must recheck naturally rather than being treated as broken.

Pages **2606 SUCCESS** for the first 517-place / 312-opportunity state and Pages **2608 SUCCESS** for the final 521-place state.
- all **112 current ERN release smoke tests passed**;
- Supplemental Search integrity passed at **202 rows**;
- hard lean-core budget remains exactly **575000 bytes**;
- deployment completed with reported `errors: []`.

#### Protected invariants unchanged
- Watch Earth remains **in-ERN playback only**;
- IMAGE_REFRESH / Current Image renewal remains natural-schedule only;
- public generative ERN Guide remains OFF;
- public Now Moments media remains OFF;
- no automatic social posting/account creation;
- no automatic Travelpayouts placement or link rewriting;
- no paid ranking;
- commercial value never affects Earth ranking, source truth, health or currentness.


### High Tatras + Serbia + Barbados + Travelpayouts diversification — 2026-10-06
Owner explicitly asked ERN to keep growing in large balanced batches across three coordinated lanes: searchable Earth coverage, destination/business mapping, and broader Travelpayouts program discovery beyond the existing Viator/Klook-heavy mix. Quality, currentness, provenance, permission boundaries and visitor simplicity remain ahead of raw count.

#### Searchable-place expansion
Healthy distinct searchable coverage advanced from **521 to 531 places** (**536 healthy source records** total).
- lazy supplemental Search/Explore catalog: **212 / 250 rows**;
- remaining bounded supplemental capacity before another architecture review: **38 rows**.

New searchable places in this batch:

**Slovakia — High Tatras, 4 official live places**
- Lomnický štít;
- Tatranská Lomnica;
- Hrebienok;
- Solisko / Štrbské Pleso.

All four use Tatry Mountain Resorts / Vysoké Tatry official live-webcam surfaces. The official resort pages explicitly describe live webcams/live streams. ERN keeps them `EXTERNAL_LIVE` + `LINK_ONLY` + Search/Explore-only with Watch hold.

**Serbia — 2 official current mountain places**
- Stara Planina / Babin Zub;
- Tornik / Zlatibor.

Both use Ski Resorts of Serbia official webcam pages with refreshed resort images. ERN treats them conservatively as `LIVE_IMAGE` + `LINK_ONLY` + Search/Explore-only.

**Barbados — 4 official public beach-camera places**
- Worthing Beach;
- Dover Beach;
- Accra Beach;
- Folkestone Marine Park.

All four use the National Conservation Commission Barbados current beach-camera directory operated through IWCP. NCC states its network includes 25 live cameras across 12 locations. The same source also states re-use/re-streaming requires permission, so ERN keeps all four as external `LINK_ONLY` sources and does not embed/rebroadcast them into Watch Earth.

#### Destination/business expansion
Commercial opportunity registry advanced from **312 to 317 records**.

New destination/business bridges:
- High Tatras → one regional Viator path serving all four Slovak mountain places;
- Stara Planina → Viator, exact useful owner-side path required;
- Zlatibor / Tornik → Viator;
- BikesBooking → Madeira/Funchal local-mobility candidate;
- BikesBooking → Rome bicycle/local-mobility candidate.

The existing Barbados Viator opportunity was deliberately expanded to serve Paynes Bay plus the four new NCC beach places rather than creating one commercial record per beach.

All new records remain `ACCOUNT_SEARCH_AND_EXACT_LINK_REQUIRED`. No tracked URL, approval, price, inventory or availability was invented.

#### Travelpayouts program diversification
The program-level utility research layer expanded from **11 to 18** records. Seven previously unexplored/explicitly deferred owner-available programs now have defined reserve/fallback roles:
- Economybookings — car-rental coverage gaps;
- GetRentacar — road-trip coverage gaps;
- Saily — eSIM fallback;
- Yesim — eSIM fallback / owner-side coverage comparison;
- GigSky — specialized connectivity fallback;
- Drimsim — specialized connectivity fallback;
- Compensair — post-flight-disruption fallback behind AirHelp.

These are **research/routing records, not public placements**. ERN still follows one-useful-option-per-need by default. More available affiliate programs should not produce more buttons unless they solve a real visitor problem.

Two new utility-routing clusters were added:
- Caribbean island local mobility → BikesBooking / Localrent / QEEQ candidates, exact destination inventory required;
- Atlantic-island car-rental reserve → Economybookings / GetRentacar / AutoEurope / QEEQ, used only after owner-side coverage comparison.

BikesBooking moved beyond generic research into two destination-specific opportunity records only because current public BikesBooking inventory was found for Madeira/Funchal and Rome. Exact ERN tracked links remain owner-gated.

#### Searchable-source health and repair handling
Operations **1408 SUCCESS** after the Slovakia/Serbia source expansion:
- eligible searchable sources: **536**;
- eligible unique URLs: **409**;
- rotating cohort: **80 sources / 57 URLs**;
- reachable: **74**;
- missing: **0**;
- blocked: **4**;
- temporary/network: **2**;
- recovered: **2**;
- repair: **2**;
- review: **4**;
- watch: **0**.

Operations **1409 SUCCESS** after the Barbados expansion:
- eligible searchable sources: **540**;
- eligible unique URLs: **410**;
- cohort: **84 sources / 58 URLs**;
- reachable: **76**;
- missing: **0**;
- blocked: **4**;
- temporary/network: **4**;
- repair: **4**;
- review: **4**;
- watch: **0**.

Guernsey Harbour Entrance and Guernsey Havelet Bay / Castle Cornet naturally escalated into REPAIR after repeated automated network failures. Both were independently investigated against Guernsey Yacht Club's official webcam page, which remains active and explicitly states its webcams automatically refresh every 10 seconds. Therefore both sources remain HEALTHY/current in source truth; no deletion, replacement or downgrade was justified. Durable provider observations and maintenance records were added.

The maintenance registry also corrected an old Balykchy maintenance ID from stale `balykchy-entry` to canonical source ID `balykchy-north-entry`, without changing place identity, source truth or health.

Operations **1410** failed closed during daily packet construction because a broad set of external availability probes simultaneously returned transient `TypeError` / `AbortError` failures. Packet-integrity therefore failed as designed. This was not treated as catalog/source-truth evidence and caused no automatic mutation. The last clean source-health result remains Operations 1409; Guernsey was independently verified separately as described above.

#### Release validation
Pages **2612 SUCCESS** after the Barbados/commercial consolidation and Pages **2614 SUCCESS** after the Guernsey provider-observation update.

Pages 2614 validation:
- all **112 current ERN release smoke tests passed**;
- lean core: **573649 bytes**;
- hard lean-core ceiling remains exactly **575000 bytes**;
- Supplemental Search integrity passed with **212** records;
- deployment completed successfully with reported `errors: []`.

The final maintenance-record-only commit followed the validated provider-observation release and does not alter public catalog/source content.

#### Protected invariants unchanged
- Watch Earth remains **in-ERN playback only**;
- all new LINK_ONLY / external views stay Search/Explore-only;
- IMAGE_REFRESH / Current Image renewal remains natural-schedule only; no manual trigger;
- public generative ERN Guide remains OFF;
- public Now Moments media remains OFF;
- no automatic social posting/account creation;
- no automatic Travelpayouts public placement or link rewriting;
- no paid ranking;
- commercial value never affects Earth ranking, source truth, health or currentness.


### Balanced Search + Travelpayouts diversification batch — 2026-10-06
Owner reaffirmed the operating model: continue expanding searchable Earth coverage and the business layer in substantial balanced batches, with Travelpayouts programs explored beyond tours/activities. Do not rush; do not return after only a few additions.

#### Searchable-place expansion
Healthy distinct searchable coverage advanced from **531 to 542 places** (**547 healthy source records** total).

This batch added **11 healthy Search/Explore places**:

**Taiwan — official Tourism Administration East Coast live cameras**
- Green Island — Fanchuanbi Grassland;
- Dashibi Hill — Hualien East Coast;
- Torik Park — Taitung East Coast.

**Cyprus**
- Troodos / Mount Olympus North Face — official Cyprus Ski Federation webcam.

**South Korea**
- YongPyong / Pyeongchang — official MONA YongPyong 24-hour real-time webcam network.

**Japan**
- Inawashiro Ski Resort — Fukushima;
- Ishiuchi Maruyama — Niigata;
- Togari Onsen Ski Resort — Nagano.

**Caribbean diversification**
- Long Bay Beach — Providenciales, Turks and Caicos, first-party Villa Esencia livestream;
- Sandy Ground — Anguilla, first-party Elvis' Beach Bar live webcam;
- Sorobon / Lac Bay — Bonaire, first-party Sorobon Luxury Beach Resort live webcam.

All 11 remain `LINK_ONLY` + external/current-image Search/Explore sources with `featuredHold: true` and `watchHold: true`. None can fill Watch Earth.

Supplemental Search is now **223 records**.

#### Search scaling
The lazy supplemental Search guard was raised from **250 to 500 rows**. This is a capacity-only change to the lazy-on-search layer; it does not move records into first-load core and does not loosen any content gate.

Existing supplemental requirements remain intact: HEALTHY only, LINK_ONLY only, HTTPS source URL, held from Featured/Watch Earth, no duplicate core ID/place. The hard first-load lean-core ceiling remains exactly **575000 bytes**.

#### Business + Travelpayouts expansion
Commercial registry advanced from **317 to 324 opportunities** while existing destination-level mappings were extended instead of duplicated where possible.

New or materially expanded paths include:
- Green Island / Taitung → existing Klook cluster expanded to Fanchuanbi;
- Hualien → existing Viator cluster expanded to Dashibi Hill;
- Taitung → existing Klook cluster expanded to Torik Park;
- Troodos / Cyprus → Viator activities;
- Cyprus road-trip planning → Localrent candidate, one car-rental utility only;
- YongPyong / Pyeongchang → Klook ski products;
- Ishiuchi Maruyama → Klook lift/gondola products;
- Togari Onsen → Klook ski-resort tickets;
- Inawashiro → Klook **stay-attribution research only**;
- Turks & Caicos / Providenciales → existing Viator path expanded to Long Bay rather than creating beach-level affiliate duplication;
- Anguilla → existing Viator path expanded from Meads Bay to Sandy Ground;
- Bonaire / Lac Bay → new Viator destination-level research path.

Every newly unverified path remains `ACCOUNT_SEARCH_AND_EXACT_LINK_REQUIRED`. No tracked URL, offer, availability or partner approval was invented.

A controlled accommodation-attribution experiment is now documented in `docs/TRAVELPAYOUTS_EXPANSION.md`: Klook publicly exposes Inawashiro lodging inventory, but ERN must not assume the Earthrightnow Travelpayouts program attributes hotel bookings. Owner-side program/tool support and an exact tracked hotel/destination link must be verified before any public stay placement. If unsupported, keep dormant and continue separate stay-partner research.

This extends the Travelpayouts strategy beyond tour links into activities, transfers, car rental, connectivity and carefully gated stay research while preserving the principle of **one useful visitor action per need rather than affiliate density**.

#### Release validation
JavaScript Syntax Check **1063 SUCCESS**.

Pages **2617 SUCCESS** validated the first half of this batch, including the new 500-row lazy Search guard.
Pages **2619 SUCCESS** validated the final source + commercial state:
- all **112 current ERN release smoke tests passed**;
- Supplemental Search integrity passed with **223** records;
- commercial placement integrity passed;
- lean launch/performance preflight passed with hard budget **575000 bytes**;
- static release built and deployed successfully;
- deployed metadata verification reported zero errors.

#### Operations / health diagnostics
Operations **1412** and **1413** failed closed during broad external availability packet construction with many simultaneous `TypeError` / `AbortError` probe failures. This is treated as an operations/external-network availability incident, **not** as evidence that the catalog sources are broken. No source truth or health was automatically changed.

The searchable-source-health stage inside Operations 1413 still completed and recorded:
- eligible searchable sources: **551**;
- eligible unique URLs: **421**;
- current cohort: **87 sources / 61 unique URLs**;
- reachable: **79**;
- missing: **0**;
- access-blocked: **4**;
- temporary/network: **4**;
- repair: **2**;
- review: **4**;
- watch: **2**.

REPAIR remains Balykchy / Issyk-Kul gateway (KG Camera) and Kanlaon (PHIVOLCS), both already independently provider-confirmed in earlier work; automated network failures alone do not justify mutation. REVIEW remains access-pattern-only for Dolomiti Superski, Sangay/IG-EPN, Addo/SANParks and Satara/SANParks. Guernsey Harbour Entrance and Havelet Bay are WATCH after a single new timeout following a reachable observation; recheck naturally, no mutation.

#### Protected invariants unchanged
- Watch Earth remains **in-ERN playback only**.
- IMAGE_REFRESH pilot remains untouched until natural renewal.
- Public generative ERN Guide remains OFF.
- Public Now Moments media remains OFF.
- No automatic social posting/account creation.
- No paid ranking.
- Commercial value never affects Earth ranking, truth, health or currentness.


### Cyprus + Bermuda + Travelpayouts utility diversification + Operations architecture repair — 2026-10-06
This continuation follows the owner's preferred ERN cadence: expand Earth coverage and business coverage in substantial balanced batches, while deliberately exploring the wider Travelpayouts ecosystem beyond the Viator/Klook-heavy mix.

#### Searchable-place expansion
Healthy distinct searchable coverage advanced to **547 places** from **552 healthy source records**.
- lazy supplemental Search/Explore catalog: **228 rows**;
- the current supplemental integrity guard supports up to **500 rows** while preserving all existing hard gates and lazy-on-search behavior;
- core catalog remains protected from first-paint growth.

Five healthy searchable places were added:

**Cyprus — 2 current views**
- Paphos — Sea Front;
- Polemi — Vineyard View.

Both use Paphos Life's current webcam service, which states its images update every minute. They remain `LIVE_IMAGE` + `LINK_ONLY` + Search/Explore-only with Watch hold.

**Bermuda — 3 current/live views**
- Cooper's Island — official Bermuda Weather Service current view, with the service stating the image updates every two minutes;
- Royal Naval Dockyard — official Royal Naval Dockyard live port webcam;
- Nonsuch Island — CahowCam conservation livestream from Nonsuch Expeditions / LookBermuda for the current 2025/26 Cahow season.

All remain external / `LINK_ONLY` and cannot fill Watch Earth.

Existing Bermuda and Cyprus commercial mappings were extended rather than multiplied:
- one Bermuda-level Viator planning bridge now serves St. George's, Cooper's Island, Royal Naval Dockyard and Nonsuch Island;
- the existing Cyprus/Troodos Viator bridge now also includes Paphos and Polemi;
- the existing Localrent Cyprus road-trip utility now includes Paphos/Polemi as appropriate island-driving contexts.

#### Travelpayouts diversification — 12 new utility opportunities
Commercial opportunity registry advanced to **336 records**.

Added city-utility and self-guided-culture research mappings:
- Radical Storage → Prague, Vienna, Budapest, Vilnius and Salzburg;
- WeGoTrip → Prague, Vienna, Budapest, Vilnius and Salzburg.

Added broader utility mappings:
- Airalo → Caribbean island connectivity context;
- Kiwi.com → Arctic / remote-island flight-planning context.

New utility-routing clusters were added for:
- Central Europe city luggage storage;
- Central Europe self-guided culture;
- Caribbean connectivity;
- Arctic / remote-island flight planning.

All remain `ACCOUNT_SEARCH_AND_EXACT_LINK_REQUIRED`. No tracked link, price, availability, coverage claim or approval was invented. Owner-side exact inventory/coverage and tracked-link verification remain mandatory before public placement. Duplicate suppression remains explicit: one luggage-storage option per city context, one self-guided option only where useful, one eSIM option by default and one flight-search action per trip-planning context.

A ChatGPT plugin-directory check did not surface a Travelpayouts connector; Booking.com and Tripadvisor apps appeared, but neither provides the owner-side Travelpayouts link-generation workflow needed by ERN. Therefore ERN continues to use the repository's owner-account evidence / exact-link gating rather than pretending an integration exists.

#### Operations architecture repair
Operations runs 1411–1414 had exposed a real architectural mismatch after Search/Explore became scalable through the supplemental catalog.

Root cause:
- provider observations for valid supplemental sources `guernsey-harbour-live` and `guernsey-havelet-bay-live` were being rejected as `UNKNOWN_SOURCE_ID`;
- `scripts/provider-worklist.mjs` and `scripts/operations-status.mjs` were still loading only `data/sources.json` rather than the full core + supplemental searchable catalog.

Corrective action:
- both scripts now build their operational source universe from `data/sources.json` + `data/search-supplemental.json`;
- existing provider-safety rejection logic was preserved rather than disabled;
- no Guernsey observation was deleted and no safety check was weakened.

An initial patch accidentally inserted literal escaped newline sequences and correctly failed JavaScript syntax checks. That patch was immediately corrected before finalization.

Final validation:
- JavaScript Syntax Check **1067 SUCCESS**;
- Operations **1418 SUCCESS** with the full core + supplemental catalog recognized;
- Pages **2621 SUCCESS** for the public source/business release preceding the operations-helper-only repair.

Latest Operations 1418 searchable-source health:
- eligible searchable sources: **556**;
- eligible unique URLs: **425**;
- current cohort: **87 sources / 61 unique URLs**;
- reachable: **80**;
- missing: **0**;
- access-blocked: **4**;
- temporary/network: **3**;
- recovered: **0**;
- repair: **2**;
- review: **4**;
- watch: **1**.

REPAIR remains Balykchy and Kanlaon, both previously supported by separate provider evidence and therefore not automatically removed or truth-mutated. REVIEW remains Dolomiti Superski, Sangay, Addo and Satara for repeated access limitation. Águas de Lindóia entered first-transient WATCH only and must recheck naturally rather than being treated as broken.

#### Protected invariants unchanged
- Watch Earth remains **in-ERN playback only**;
- all LINK_ONLY / external additions remain Search/Explore-only;
- Current Image / IMAGE_REFRESH renewal remains natural-schedule only;
- public generative ERN Guide remains OFF;
- public Now Moments media remains OFF;
- no automatic social posting/account creation;
- no automatic Travelpayouts placement or link rewriting;
- no paid ranking;
- commercial value never affects Earth ranking, source truth, health or currentness.


### 550-place milestone + Singapore/Cayman + Travelpayouts diversification — 2026-10-06
This batch continued the owner's preferred balanced cadence: meaningful Earth coverage growth plus commercially useful but strictly downstream Travelpayouts diversification, with operational reliability repaired rather than bypassed.

#### Searchable-place expansion
ERN reached **550 healthy distinct searchable places** from **555 healthy source records**.
- lazy supplemental Search/Explore catalog: **231 rows**;
- current supplemental hard ceiling: **500 rows**;
- all supplemental gates remain unchanged: HEALTHY, LINK_ONLY, HTTPS, Featured/Watch hold, no core ID/place duplication;
- core first-paint performance remains protected.

Eight new places were added across this combined continuation:

**Cyprus**
- Paphos — Sea Front;
- Polemi — Vineyard View.

**Bermuda**
- Cooper's Island — official Bermuda Weather Service current view;
- Royal Naval Dockyard — official live port webcam;
- Nonsuch Island — current Cahow conservation livestream.

**Singapore**
- Sentosa Gateway — official Singapore Land Transport Authority / OneMotoring current image;
- Woodlands Causeway — official LTA current image toward Johor.

During verification, OneMotoring displayed both Singapore cameras with current 06/10/2026 timestamps. They remain `LIVE_IMAGE` + `LINK_ONLY` + Search/Explore-only.

**Cayman Islands**
- George Town — Grand Cayman Port, using the official Port Authority of the Cayman Islands webcam surface. The official port page maintains a dedicated Webcams section; current external camera indexing identifies the active feed as Grand Cayman Port / George Town and attributes it to caymanport.com.

All new places remain external / `LINK_ONLY`; none can fill Watch Earth.

#### Business-side expansion and Travelpayouts exploration
Commercial registry advanced to **339 opportunities**.

Existing mappings were broadened conservatively:
- verified Klook Singapore bridge now covers the two new Singapore gateway/current-condition places in addition to the existing port/skyline place;
- one Grand Cayman Viator bridge now serves Seven Mile Beach and George Town Port rather than creating one affiliate action per camera;
- Bermuda and Cyprus mappings from the previous batch remain island/region-level rather than per-camera commercial density.

New Travelpayouts research opportunities added:
- KKday → Singapore activities, only if owner-side inventory adds differentiated value beyond Klook;
- Go City → Singapore city-pass utility, only if current Singapore coverage exists in the owner project;
- Radical Storage → Singapore luggage-storage utility for arrival/departure contexts;
- prior batch also added Radical Storage and WeGoTrip mappings across Prague, Vienna, Budapest, Vilnius and Salzburg, plus Airalo Caribbean connectivity and Kiwi.com Arctic/remote-island flight planning.

A dedicated Singapore utility-routing cluster now enforces distinct visitor need: keep the verified Klook bridge primary where useful; add KKday, Go City or Radical Storage only if the action is meaningfully different. Never stack duplicate activity buttons.

#### Travelpayouts platform research refreshed from official documentation
Official Travelpayouts documentation was reviewed and recorded in `data/travelpayouts-unlocked-programs.json`:
- Travelpayouts currently markets access to **90+ trusted brands**;
- since **2026-04-27**, Projects are automatically connected to relevant programs when available; some are instant, some require project review and some may remain unavailable under brand requirements;
- the Links tool can generate a tracked deep link to an exact supported brand/destination page once that program is available to the selected Project;
- optional SubIDs can support ERN placement analytics;
- Travelpayouts offers automated monetization/link tools, but ERN deliberately keeps automatic placement and automatic link rewriting OFF to preserve editorial control and commercial-neutral Earth ranking.

ERN's owner-side activation rule remains stricter than platform availability: exact destination/program coverage + generated tracked link + manual verification + disclosure are required before any new public placement.

#### Operations architecture repair finalized
The earlier supplemental-source provider-observation mismatch is fully resolved.

Root cause was that provider-review helper scripts still validated observations only against the core catalog while Search/Explore had already expanded through the supplemental catalog. Valid Guernsey observations were therefore rejected as unknown IDs.

Final repair:
- `scripts/provider-worklist.mjs` now loads core + supplemental sources;
- `scripts/operations-status.mjs` now loads core + supplemental sources;
- provider-safety rejection logic remains intact;
- no evidence or source was deleted to force a green run.

Validation:
- JavaScript Syntax Check **1067 SUCCESS**;
- Operations **1418 SUCCESS** after the architectural correction;
- Operations **1419 SUCCESS** after the Singapore/Cayman source addition;
- Operations **1420 SUCCESS** after the Águas de Lindóia repair investigation evidence was recorded;
- Pages **2623 SUCCESS** for the Singapore/Cayman + commercial mapping release;
- Pages **2624 SUCCESS** after the health-evidence update;
- all **112 current ERN release smoke tests passed**;
- lean-core budget remains exactly **575000 bytes**;
- Supplemental Search integrity passed with **231** rows.

Latest Operations 1420 searchable-source health:
- eligible searchable sources: **559**;
- eligible unique URLs: **427**;
- current cohort: **87 sources / 61 unique URLs**;
- reachable: **80**;
- missing: **0**;
- access-blocked: **4**;
- temporary/network: **3**;
- recovered: **0**;
- repair: **3**;
- review: **4**;
- watch: **0**.

Current REPAIR queue: Balykchy, Águas de Lindóia and Kanlaon. Águas de Lindóia was independently rechecked after escalation: the official Circuito das Águas Paulista page remains publicly active and explicitly labels the source `Câmera ao Vivo`. Therefore source truth and HEALTHY catalog state were preserved; repair disposition is KEEP SOURCE / recheck automated access behavior naturally. Balykchy and Kanlaon likewise remain evidence-review cases rather than automatic removals. The four repeated access-limited sources remain REVIEW only.

#### Protected invariants unchanged
- Watch Earth remains **in-ERN playback only**;
- LINK_ONLY / external additions remain Search/Explore-only;
- Current Image / IMAGE_REFRESH renewal remains natural-schedule only;
- public generative ERN Guide remains OFF;
- public Now Moments media remains OFF;
- no automatic social posting/account creation;
- no automatic Travelpayouts Drive/LinkSwitcher activation or link rewriting;
- no paid ranking;
- commercial value never affects Earth ranking, source truth, health or currentness.


### Caribbean + Botswana + Travelpayouts utility diversification — 2026-10-06
Owner continues to prefer large balanced batches: broaden truthful Earth coverage, deepen genuinely useful business mapping, explore the wider Travelpayouts program set, and report only at meaningful checkpoints.

#### Searchable-place expansion
Healthy distinct searchable coverage advanced from **550 to 562 places** (**567 healthy source records** total).
- supplemental lazy Search/Explore catalog: **243 rows**;
- current supplemental guard supports up to **500 rows**, so this batch does not require another scaling change;
- all new records remain LINK_ONLY / external Search/Explore content with Watch hold.

This batch added **12 healthy searchable places**:

**Botswana — 3 new wildlife places**
- Chobe — Senyati Waterhole, current Africam/Senyati live stream;
- Makgadikgadi — Kalahari Salt Pan, current Africam/Natural Selection Foundation live stream;
- Khwai — Elephant Pan, current Africam/Khwai Private Reserve live stream.

These complement the existing Elephant Valley / Chobe discovery place without collapsing distinct ecosystems into one fake place count.

**Dominican Republic — 3 first-party live places**
- Casa de Campo — Minitas Beach;
- Casa de Campo — Teeth of the Dog coastal view;
- Juan Dolio — Coral Costa Caribe Beach.

All use first-party resort live-camera surfaces and remain external/link-only.

**Puerto Rico — 2 first-party live places**
- Palomino Island;
- Fajardo — El Yunque view.

Both use El Conquistador Resort's first-party live-camera surface and extend Puerto Rico beyond the existing Isla Verde view.

**Bonaire — 1 first-party wildlife place**
- Donkey Sanctuary Bonaire, with the sanctuary's current live animal webcams.

**Cape Verde — 3 current/live places**
- Boa Vista — Praia do Estoril, refreshed current image;
- Sal — Ponta Preta Beach, real-time live stream;
- Sal — Kitesurf Beach, real-time live stream.

The two Sal additions extend the existing Santa Maria Bay place while remaining distinct named beach/surf locations.

#### Business-side expansion and consolidation
Commercial registry advanced from **339 to 349 opportunities**.

New or materially expanded visitor-planning paths:
- one canonical Chobe/Kasane Viator path now also covers Senyati rather than creating per-waterhole affiliate duplication;
- new Makgadikgadi/Botswana Viator research path;
- new Khwai/Okavango/Maun Viator research path;
- one canonical Bonaire Viator path now also serves Donkey Sanctuary;
- Puerto Rico Viator mapping was broadened from Isla Verde to the healthy Fajardo/Palomino/El Yunque places instead of adding redundant Puerto Rico activity records;
- new La Romana / Casa de Campo Viator path;
- new Juan Dolio Viator research path, deliberately fail-closed if owner-side destination scope is poor;
- new Boa Vista Viator path;
- existing Sal Island Viator mapping now also serves Ponta Preta and Kitesurf Beach.

No tracked URL, offer, inventory claim or partner relationship was invented. New paths remain ACCOUNT_SEARCH_AND_EXACT_LINK_REQUIRED.

#### Travelpayouts diversification
The Travelpayouts layer was expanded with differentiated utility mappings rather than more activity-link density:
- Radical Storage → Bangkok luggage-storage research path;
- BikesBooking → Bali / Denpasar scooter-motorcycle local-mobility research path;
- QEEQ → Puerto Rico / SJU island road-trip research path;
- QEEQ → Curaçao / Hato island road-trip research path;
- Radical Storage → San Juan luggage-storage research path.

Current public inventory was independently checked before these research mappings were added. Public activation still requires owner-side exact tracked links and manual verification.

Travelpayouts program coverage counts were reconciled to the actual commercial registry. Current mapped commercial counts include:
- Viator 230;
- Klook 49;
- Radical Storage 14;
- Tiqets 14;
- WeGoTrip 9;
- Go City 7;
- KKday 5;
- Localrent 5;
- QEEQ 3;
- BikesBooking 3;
- Kiwi.com 3;
- Welcome Pickups 2;
- Airalo 2;
- AutoEurope, Kiwitaxi and intui.travel 1 each.

Utility routing now explicitly includes a Caribbean airport/road-trip cluster for Puerto Rico and Curaçao, with the one-car-rental-option rule preserved. Bangkok and San Juan were also added to the city luggage-storage utility cluster. Availability of more affiliate programs still does not justify more visible buttons by default.

#### Health / repair investigation
Operations **1421, 1422 and 1423 completed SUCCESS** across staged source additions.

Operations **1424 also completed SUCCESS** after the independent repair evidence was recorded.

Latest completed searchable-source health from Operations 1424:
- eligible searchable sources: **571**;
- eligible unique URLs: **436**;
- current rotating cohort: **88 sources / 62 unique URLs**;
- reachable: **78**;
- missing: **0**;
- access-blocked: **4**;
- temporary/network: **6**;
- recovered: **2**;
- repair: **3**;
- review: **4**;
- watch: **3**.

The health system escalated Águas de Lindóia and the two Guernsey webcam records after repeated automated network/server failures. They were independently investigated rather than automatically mutated:
- the official Circuito das Águas Paulista page remains active and still explicitly exposes Câmera ao Vivo for Águas de Lindóia;
- the first-party Guernsey Yacht Club Club Webcams page remains active and explicitly says both cameras refresh every 10 seconds.
Therefore these three records were preserved as healthy source truth; durable provider observations and maintenance dispositions now document that the automated failures do not prove the cameras are broken. On Operations 1424, both Guernsey records recovered naturally and dropped out of REPAIR.

The remaining REPAIR records are Balykchy, Águas de Lindóia and Kanlaon. Each has separate provider evidence supporting preservation rather than automatic deletion. Repeated access-limited sources remain REVIEW only. Three first-transient WATCH items should recheck naturally on their next cohort and must not be treated as broken from a single transient result.

#### Release validation
Pages **2629, 2631 and 2632 completed SUCCESS** across this continuation. Latest completed Pages 2632:
- all **112 current ERN release smoke tests passed**;
- Supplemental Search integrity passed with **243** records;
- hard lean-core budget remains exactly **575000 bytes**;
- deployment completed with reported `errors: []`.

#### Protected invariants unchanged
- Watch Earth remains **in-ERN playback only**;
- IMAGE_REFRESH / Current Image renewal remains natural-schedule only;
- public generative ERN Guide remains OFF;
- public Now Moments media remains OFF;
- no automatic social posting/account creation;
- no automatic Travelpayouts placement or link rewriting;
- no paid ranking;
- commercial value never affects Earth ranking, source truth, health or currentness.


### Honduras + Central America + Kenya wildlife + Travelpayouts catalog research — 2026-10-06
This continuation follows the owner's preferred large-batch operating mode: broaden truthful Earth coverage, deepen downstream business utility, and deliberately explore the wider Travelpayouts ecosystem without confusing platform catalog presence with ERN owner-project approval.

#### Searchable-place expansion
Healthy distinct searchable coverage advanced from **562 to 567 places** (**572 healthy source records** total).
- lazy supplemental Search/Explore catalog: **248 rows**;
- current supplemental guard remains **500 rows**;
- all new external sources remain LINK_ONLY / Search-Explore-only with Watch hold.

Five healthy searchable places were added:

**Honduras — new ERN country**
- Roatán — West Bay Beach, using Las Rocas Resort & Dive Center's first-party page explicitly labeled “Live from our Beach Cam”.

**Costa Rica — visitor-type diversification**
- Punta Leona — Playa Blanca, using Punta Leona Beach Club & Nature Resort's first-party Live Cams surface. This broadens Costa Rica beyond ERN's existing volcano-heavy monitoring coverage.

**Panama — visitor-type diversification**
- Las Lajas Beach — Chiriquí, using Las Lajas Beach Resort's first-party LIVE WEBCAM;
- Camaroncito — Caribbean Beach, using Camaroncito EcoResort & Beach's first-party LIVE Video Feed described as showing the Caribbean beach in real time.

**Kenya — conservation/wildlife strengthening**
- Ol Pejeta — Porini Rhino Camp Waterhole, using Gamewatchers Safaris / Porini Camps' current 2026 announcement of a **24/7 live wildlife camera** at Porini Rhino Camp.

All five remain external / `LINK_ONLY`; none can fill Watch Earth.

Research-only expansion also continued:
- **Zambia / South Luangwa:** Shenton Safaris documents live-streaming cameras at its Mwamba/Kaingo waterhole hides, but ERN has not yet resolved a durable current public webcam route. Candidate remains `EXACT_CURRENT_WEBCAM_ROUTE_VERIFICATION_REQUIRED`; no Zambia place was promoted from historical/ambiguous evidence.

#### Business-side expansion
Commercial opportunity registry advanced from **349 to 354 records**.

New downstream planning opportunities:
- Roatán / Honduras → Viator;
- Punta Leona / Jacó / Costa Rica → Viator, with explicit wording that ERN must not imply Punta Leona admission or resort access;
- Costa Rica independent-driving utility → QEEQ;
- Panama independent-driving utility → QEEQ;
- Central America optional connectivity → Airalo.

The existing Laikipia / Mpala Viator opportunity was **expanded rather than duplicated** to include Porini Rhino Camp / Ol Pejeta. Its scope now explicitly forbids implying direct tour access to Mpala or Porini unless exact inventory proves it.

A new `central-america-independent-travel` utility-routing cluster now coordinates QEEQ / Localrent / EconomyBookings / Airalo research with explicit duplicate suppression:
- normally one car-rental option per country/context;
- normally one connectivity option per country/context;
- utilities appear only after destination choice, never on Earth-ranking or live-camera surfaces.

#### Wider Travelpayouts program research — separated from owner approval
Created `data/travelpayouts-program-catalog-research.json` as a dedicated **research-only** registry for promising Travelpayouts programs that must not be treated as ERN-approved until owner-project access is confirmed.

Official Travelpayouts documentation currently supports broader program research across accommodation, transport and activities. Research registry now includes:
- Booking.com;
- Hotels.com;
- Trip.com;
- Agoda;
- Expedia;
- Rakuten Travel;
- 12Go;
- Aviasales;
- GetYourGuide.

Every one is currently marked `OWNER_PROJECT_AVAILABILITY_REQUIRED`.

Hard rule preserved:
**Travelpayouts catalog presence ≠ ERN owner-project approval.**
Before any program graduates into ERN's unlocked/usable registry, owner-side Project availability, exact destination/product linking, tracked-link generation, manual verification and disclosure are required. No catalog program was publicly activated in this batch.

The existing unlocked-program research was also extended:
- QEEQ research now includes Costa Rica and Panama road-trip contexts;
- Airalo research now includes Honduras, Costa Rica and Panama connectivity contexts;
- one-rental-option and one-connectivity-option suppression remain in force.

#### Health and validation
Operations **1425 SUCCESS** after the Central America additions.
- eligible searchable sources: **575**;
- unique URLs: **440**;
- current cohort: **88 sources / 62 unique URLs**;
- reachable: **80**;
- missing: **0**;
- access-blocked: **4**;
- temporary/network: **4**;
- recovered: **3**;
- repair: **3**;
- review: **4**;
- watch: **1**.

Operations **1426 SUCCESS** after the Porini / Ol Pejeta addition.
- eligible searchable sources: **576**;
- unique URLs: **441**;
- current cohort: **89 sources / 63 unique URLs**;
- reachable: **79**;
- missing: **0**;
- access-blocked: **4**;
- temporary/network: **6**;
- recovered: **3**;
- repair: **3**;
- review: **4**;
- watch: **3**.

The three REPAIR items remain Balykchy, Águas de Lindóia and Kanlaon. Each already has separate provider evidence indicating an active official/provider surface, so automated probe failures still do not justify deletion or truth mutation. The four REVIEW items remain access-pattern-only. New transient WATCH observations are allowed to recheck naturally and are not treated as broken sources.

Pages **2636 completed SUCCESS** for the final public source/commercial state in this batch. The broader Travelpayouts catalog-research file added afterward is research-only and does not alter public placement or Earth ranking.

#### Protected invariants unchanged
- Watch Earth remains **in-ERN playback only**;
- all LINK_ONLY / external additions remain Search/Explore-only;
- IMAGE_REFRESH / Current Image renewal remains natural-schedule only;
- public generative ERN Guide remains OFF;
- public Now Moments media remains OFF;
- no automatic social posting/account creation;
- no automatic Travelpayouts placement or link rewriting;
- no paid ranking;
- commercial value never affects Earth ranking, source truth, health or currentness.


### Belize + Azores + Travelpayouts diversification batch — 2026-10-06
This batch continued the owner's preferred ERN operating model: grow searchable Earth coverage and the business side in meaningful balanced batches, while deliberately expanding Travelpayouts research beyond tours/activities. Quality, provenance, currentness, permission boundaries and commercial neutrality remained ahead of raw count.

#### Searchable-place expansion
Healthy distinct searchable coverage advanced from **567 to 578 places** (**583 healthy source records** total).
- lazy supplemental Search/Explore catalog: **259 rows** under the existing 500-row bounded capacity;
- core first-load catalog remains unchanged/lean.

This batch added **11 healthy Search/Explore places**:

**Belize — first ERN Belize place**
- Belize Zoo — first-party daily live wildlife camera. The Belize Zoo states the camera is online every day from 9am–4pm Belize time and rotates among animal habitats.

**Azores — 10 additional official Visit Azores current views**
- Angra do Heroísmo — Terceira;
- Horta — Faial;
- Velas — São Jorge;
- Fajã Grande — Flores;
- Vila do Corvo — Corvo;
- Santa Cruz da Graciosa — Graciosa;
- Ponta Delgada — São Miguel;
- Sete Cidades — São Miguel;
- Furnas — São Miguel;
- Lagoa do Fogo — São Miguel.

All 11 remain external / `LINK_ONLY` Search/Explore content with `watchHold: true`. None can fill Watch Earth.

Research-only geography also expanded conservatively:
- Falkland Islands Tourist Board officially confirms a Stanley Tourist Information Centre webcam, but the exact durable live target/currentness still needs resolution;
- Cayman Islands Port Authority has an official Webcams surface, but individual named targets/currentness still need extraction;
- Government of Guam has a live-streaming surface, but ERN has not established that it is a continuous scenic/current destination camera rather than an event/institutional stream.
No research-only lead was promoted without source-specific current-view evidence.

#### Destination/business expansion
Commercial opportunity registry is now **357 records**.

New destination-level paths:
- Belize Zoo / Belize City → Viator;
- Faial / Horta → Viator;
- Azores outer islands (São Jorge / Flores / Corvo / Graciosa) → one Viator research path, deliberately dormant if useful exact island inventory is absent.

Existing mappings were expanded rather than duplicated:
- Terceira / Santa Maria Viator path now includes Angra do Heroísmo;
- São Miguel Viator path now also serves Ponta Delgada, Sete Cidades, Furnas and Lagoa do Fogo.

Every new/unverified path remains `ACCOUNT_SEARCH_AND_EXACT_LINK_REQUIRED`. No tracked URL, price, approval, offer or availability was invented.

#### Travelpayouts diversification
The commercial utility research registry advanced to **24 records**.

New program research lanes added:
- Booking.com — accommodation/stay research;
- Trip.com — multi-vertical stay/flight/train/attraction/transfer research;
- 12Go — rail/bus/ferry/intercity transport research;
- GetYourGuide — selective activity-gap research;
- Rentalcars.com — broad car-rental coverage-gap research;
- Discover Cars — car-rental research with explicit current owner-catalog recheck required before treating it as available.

These are **research/opportunity records only**, not public placements. Travelpayouts public catalog presence never proves Earthrightnow Project access. Owner-project availability, exact destination coverage, generated tracked link and manual verification remain mandatory before activation.

The Travelpayouts catalog research file was refreshed with the current 2026 platform model: 90+ trusted brands, project-specific program availability, review/unavailable states and exact deep-link gating. ERN continues to disable automatic placement and automatic link rewriting.

#### Source-health / repair handling
Operations 1427, 1428 and 1429 completed SUCCESS across the staged searchable expansion.

Latest fully completed searchable health before the final metadata-only repair note (Operations **1428**) recorded:
- eligible searchable sources: **583**;
- eligible unique URLs: **443**;
- rotating cohort: **89 sources / 63 unique URLs**;
- reachable: **81**;
- missing: **0**;
- blocked: **4**;
- temporary/network: **4**;
- recovered: **3**;
- repair: **4**;
- review: **4**;
- watch: **0**.

Yellowstone Lake naturally escalated to REPAIR from repeated automated network/server failures. It was independently investigated against the official USGS/YVO source: USGS confirms the Yellowstone Lake camera was reinstalled in September 2026, the canonical current-view page remains active and the camera updates every 15 minutes. Therefore ERN preserved HEALTHY/LIVE_IMAGE source truth and recorded durable provider/maintenance evidence rather than deleting or downgrading it.

Águas de Lindóia likewise remains preserved: the official Circuito das Águas Paulista page remains active and explicitly exposes `Câmera ao Vivo`. Balykchy and Kanlaon retain their previously documented active-provider evidence. Access-blocked sources remain review-only.

#### Release validation
Pages **2642 completed SUCCESS** for the final searchable/business catalog state and Pages **2643 completed SUCCESS** after the Yellowstone provider-observation repair record.
- all canonical release guards passed on the validated release path;
- hard lean-core budget remains exactly **575000 bytes**;
- supplemental Search remains lazy/gated;
- no Watch Earth eligibility rule was relaxed.

Operations **1430 completed SUCCESS** after the repair-evidence commit; no manual workflow trigger was used.

#### Protected invariants unchanged
- Watch Earth remains **in-ERN playback only**;
- IMAGE_REFRESH / Current Image renewal remains natural-schedule only;
- public generative ERN Guide remains OFF;
- public Now Moments media remains OFF;
- no automatic social posting/account creation;
- no automatic Travelpayouts public placement or link rewriting;
- no paid ranking;
- commercial value never affects Earth ranking, source truth, health or currentness.


### Indian Ocean + Central America + Falklands + Belgium/Oman/Bosnia + Travelpayouts utility expansion — 2026-10-06
This continuation follows the owner's preferred large-batch mode: expand truthful Search/Explore coverage and useful downstream business coverage together, while deliberately researching Travelpayouts beyond tours/activities without treating public catalog presence as owner-project approval.

#### Searchable-place expansion
Healthy distinct searchable coverage advanced from **578 to 586 places** (**591 healthy source records** total).
- lazy supplemental Search/Explore catalog: **267 rows** under the existing 500-row bounded capacity;
- core first-load catalog remains unchanged/lean;
- all new records remain external / LINK_ONLY with Featured/Watch hold and cannot fill Watch Earth.

Eight healthy searchable places were added:

**Seychelles — 2 additional Mahé views**
- Mahé — Quincy Village / Chez Lorna, first-party property camera with live/current corroboration;
- Anse Parnel — Mahé, current live beach view attributed to Surfers Beach Chalets / SkylineWebcams.

The existing Mahé/Seychelles Viator research bridge was expanded to serve Beau Vallon, Quincy Village and Anse Parnel rather than creating one affiliate action per camera.

**Honduras — Roatán diversification**
- Roatán — West End, first-party Roatan Divers Live Webcam showing day-to-day operations in real time.

The existing Roatán Viator opportunity now serves both West Bay and West End.

**Tanzania / Zanzibar — second island view**
- Kiwengwa — Zanzibar, first-party Duotone Pro Center Zanzibar / Mvuvi Boutique Resort LIVE WEBCAM.

The existing Zanzibar Viator bridge now serves Paje and Kiwengwa at island level instead of duplicating activity buttons.

**Falkland Islands — first ERN Falklands place**
- Stanley — Jetty Visitor Centre, based on the official Falkland Islands Tourist Board statement that a webcam looks out from the front of the Stanley Tourist Information Centre, with current public-camera corroboration for Stanley Public Jetty.

A Kiwi.com flight-planning research path was added because Falklands access is flight-dependent, but it remains ACCOUNT_SEARCH_AND_EXACT_LINK_REQUIRED and must not imply direct routes that do not exist.

**Belgium — geographic strengthening**
- Wirtzfeld — Belgian Ardennes, using Wirtzfeld.be's local destination network. The provider currently labels five village/valley cameras Live and states the images refresh every five minutes.

**Oman — second ERN Oman place**
- Salalah — Fanar Hotel & Marina, using a live-camera page explicitly hosted/attributed to Fanar Hotel & Residences and described as live 24/7.

A Salalah/Dhofar Viator opportunity was added because current Viator Salalah inventory contains 100+ tours across nature, Khareef, Wadi Darbat, desert, history and coastal experiences. It remains owner exact-link gated.

**Bosnia and Herzegovina — second official Olympic-mountain place**
- Bjelašnica — Olympic Mountain, using the official OC Bjelašnica-Igman / ZOI84 live-camera surface. The official page currently exposes three live transmissions including Babin Do and the lift middle station.

The existing Sarajevo Olympic Mountains business bridge was expanded to cover both Jahorina and Bjelašnica rather than creating duplicated regional affiliate density.

#### Travelpayouts diversification
Commercial opportunity registry is now **359 records**. New/expanded business work in this batch emphasized consolidation and distinct visitor utility rather than raw count.

Travelpayouts utility research advanced to **29 program-level opportunities**.

New research layers:
- **12Go → Zanzibar ferry/regional transport research**, owner-project availability required. This is a genuine Get There / Move There need, distinct from tours and airport transfers.
- **Booking.com → island stay research** for Seychelles, Roatán and Zanzibar, owner-project availability required.
- **Booking.com → European mountain/ski stay research**, owner-project availability required.
- **Omio → European intercity rail/bus/ferry/flight comparison research**, current owner-project availability/catalog recheck required.
- **VisitorsCoverage / Insubuy → optional travel-medical-insurance research**, current owner-project availability/catalog recheck required and never fear-based.

The Travelpayouts program-catalog research registry now explicitly includes Omio plus VisitorsCoverage and Insubuy as research-only candidates. Official Travelpayouts documentation continues to support the broader transport/accommodation/insurance model, but ERN's rule remains stricter: public catalog documentation is not owner approval.

Routing safeguards were expanded:
- one stay action per destination cluster by default;
- one intercity transport-comparison action per route context;
- one insurance option at most after owner-side comparison;
- insurance is optional planning/help only, never required or fear-based;
- no automatic program placement or link rewriting.

#### Health + release validation
Operations **1431 SUCCESS** after the first five-source island batch.

Operations **1432 SUCCESS** after the Belgium/Oman/Bosnia source expansion.
Latest searchable-source health:
- eligible searchable sources: **595**;
- eligible unique URLs: **451**;
- rotating cohort: **90 sources / 64 unique URLs**;
- reachable: **81**;
- missing: **0**;
- access-blocked: **4**;
- temporary/network: **5**;
- recovered: **2**;
- repair: **4**;
- review: **4**;
- watch: **1**.

REPAIR remains Balykchy, Águas de Lindóia, Kanlaon and Yellowstone Lake. Each has already been separately investigated/provider-supported in earlier work, so automated failures still do not justify source deletion or truth mutation. REVIEW remains access-pattern-only. The sole new WATCH is Bergen — Ulriken Mountain after one timeout following a reachable observation; it must recheck naturally and is not treated as broken.

Pages **2645 SUCCESS** validated the first island/commercial state. Pages **2647 SUCCESS** validated the final public source/commercial state:
- all **112 current ERN release smoke tests passed**;
- Supplemental Search integrity passed at **267 records**;
- hard lean-core budget remains exactly **575000 bytes**;
- deployment completed with reported `errors: []`.

The later Travelpayouts catalog/utility research commits are non-public research/routing metadata and do not alter Earth ranking or source truth.

#### Protected invariants unchanged
- Watch Earth remains **in-ERN playback only**;
- all LINK_ONLY / external additions remain Search/Explore-only;
- IMAGE_REFRESH / Current Image renewal remains natural-schedule only;
- public generative ERN Guide remains OFF;
- public Now Moments media remains OFF;
- no automatic social posting/account creation;
- no automatic Travelpayouts placement or link rewriting;
- no paid ranking;
- commercial value never affects Earth ranking, source truth, health or currentness.

### Southern Africa + South Pacific + New Zealand/Thailand balanced expansion — 2026-10-06
This batch continued ERN in the owner's large-batch operating mode after reconciling the canonical main/handoff checkpoint. It expanded truthful Earth coverage, consolidated downstream commercial paths, and diversified useful travel-utility routing without changing Watch Earth eligibility, public feature gates or the lean first-load core.

#### Canonical reconciliation at batch start
- starting `main`: **429ce6015647edf241fc54f1d7ec3c2dd1100ec1**, exactly matching the owner's stated checkpoint;
- latest non-superseded successful runs recorded in the canonical handoff at that checkpoint: Pages **2647 SUCCESS** and Operations **1432 SUCCESS**;
- starting healthy searchable places: **586**;
- starting healthy source records: **591**;
- starting supplemental Search/Explore: **267**;
- starting commercial opportunities: **359**;
- source-research candidate backlog remained **469**.

#### Searchable Earth expansion
Eight new healthy Search/Explore places were added, all through the lazy supplemental layer and all held out of Featured/Watch:
- **Zimbabwe — Hwange / Linkwasha Waterhole**: first-party Wilderness Linkwasha page with the Africam live waterhole view on the Ngamo Plains.
- **Zimbabwe — Victoria Falls Safari Lodge Waterhole**: first-party Victoria Falls Safari Collection live lodge-waterhole stream.
- **Kenya — Sirikoi / Lewa Waterhole**: first-party Sirikoi Lodge live-cam surface in the Lewa/Laikipia conservation landscape.
- **South Africa — Pilanesberg / Kwa Maritane Waterhole**: first-party Legacy Hotels live-hide camera.
- **South Africa — Kruger Shalati / Sabie River**: first-party Kruger Shalati live-camera page with Africam streams from the bridge/surrounding landscape.
- **Fiji — Castaway Island / Mamanuca Islands**: first-party Outrigger/Castaway Island live webcam.
- **New Zealand — Lake Pukaki / Aoraki-Mount Cook**: first-party Lakestone Lodge current webcam, explicitly updated every five minutes in daylight.
- **Thailand — Koh Samui / Lipa Noi Beach**: first-party Mandarin Beach Villa public live beachfront webcam.

Every addition is `LINK_ONLY` + `EXTERNAL`, with `featuredHold: true`, `watchHold: true` and no inferred rebroadcast permission.

Current catalog counts after the batch:
- healthy distinct searchable places: **594**;
- healthy source records: **599**;
- supplemental Search/Explore records: **275 / 500**;
- total searchable source records including non-healthy core states: **603**;
- first-load/core source catalog was not modified.

A direct mirror of `scripts/search-supplemental-status.mjs` against current main passed:
- no duplicate supplemental IDs;
- no duplicate core place IDs;
- all supplemental rows HEALTHY;
- all remain LINK_ONLY;
- all remain Featured/Watch held;
- all source URLs remain HTTPS;
- supplemental capacity remains below 500;
- Watch Earth impact remains zero.

#### Destination/business expansion
Commercial opportunity registry advanced from **359 to 363 records**.

New exact-link-gated opportunities:
- Victoria Falls, Zimbabwe → Viator;
- Hwange National Park, Zimbabwe → Viator;
- Pilanesberg National Park, South Africa → Viator;
- Aoraki / Mount Cook & Lake Pukaki, New Zealand → Viator.

Existing regional paths were consolidated instead of duplicated:
- Laikipia / Lewa / Ol Pejeta Viator research path now also covers Sirikoi;
- park-level Kruger Viator path now also covers Kruger Shalati;
- already-verified Fiji/Klook destination bridge now also covers Castaway Island;
- existing Koh Samui/Viator path now also covers Lipa Noi.

All newly created opportunities remain `ACCOUNT_SEARCH_AND_EXACT_LINK_REQUIRED`. No tracked URL, partner approval, price, offer or availability was invented.

A commercial-registry structural preflight against current main passed:
- unique opportunity IDs;
- required destination/partner/state fields present;
- `publicActivationAllowed: false`;
- automatic placement remains false;
- automatic link rewriting remains false;
- commission remains prohibited from affecting editorial ranking;
- no new public/tracked placement data was inserted.

#### Travelpayouts diversification
Utility routing expanded from **18 to 21 general utility clusters** while remaining research/routing metadata only.

New routing clusters:
- **Southern Africa safari arrivals** → Kiwitaxi / intui.travel / GetTransfer research, requiring an exact supported airport-destination pair and owner tracked link before use.
- **South Pacific island connectivity** → Airalo / Saily / Yesim research for Fiji/French Polynesia contexts, with one verified eSIM option per destination context by default.
- **Thailand island arrival/connectivity** → Kiwitaxi / intui.travel / Airalo research for Koh Samui, requiring exact route/country coverage and tracked-link verification.

These are post-discovery utilities only. They do not affect Earth ranking, source truth, health/currentness, Featured selection or Watch Earth.

#### Validation / release state
Two source/business commits were made:
- `f5d0fea8e60fb6dcc413ff45006fc89d395d917c` — Southern Africa/Fiji source + business/utility expansion;
- `966c2f8f38e2c9314ea09b1113981b4030748514` — New Zealand/Thailand continuation and consolidated business routing.

The final current-state structural checks described above passed against `966c2f8f38e2c9314ea09b1113981b4030748514`.

The connected GitHub interface available in this session does not expose generic push-triggered Actions run listing, and commit combined-status currently does not return Pages/Operations run records. Therefore this handoff deliberately **does not invent a new Pages or Operations run number or claim an unobserved workflow result**. The last independently reconciled successful canonical run numbers remain Pages **2647** and Operations **1432** until a later canonical reconciliation can observe newer completed runs. Because only the lazy supplemental/business-routing files were changed, the first-load core was untouched; the protected hard lean-core ceiling remains **575 KB**.

#### Protected invariants unchanged
- Watch Earth remains **in-ERN playback only**;
- LINK_ONLY / EXTERNAL sources remain out of Watch Earth;
- IMAGE_REFRESH / Current Image renewal remains natural-schedule only and was not manually triggered;
- public generative ERN Guide remains OFF;
- public Now Moments media remains OFF;
- no automatic social posting/account creation;
- no automatic Travelpayouts public placement or link rewriting;
- no paid ranking;
- commercial value never affects Earth ranking, source truth, health or currentness;
- hard lean-core ceiling remains **575 KB**.

### East Greenland + Aoraki quality expansion and exact-target research — 2026-10-06
Continued from canonical main `0774305acc1ce3e837657bb3356e6291465f7262` without reopening completed homepage/design/SEO work.

#### Searchable Earth expansion
Three high-confidence Search/Explore places were added through the lazy supplemental layer:
- **Tasiilaq — East Greenland Live Views** from official Visit East Greenland resource pages, which currently identify multiple Tasiilaq webcams as live;
- **Glentanner — Aoraki / Mount Cook** from Glentanner Park Centre, whose first-party webcam states a new image is captured every 10 minutes;
- **Aoraki / Mount Cook Village — Hermitage** from The Hermitage Hotel, whose first-party page labels the view Live and currently publishes five images per hour.

All three remain HEALTHY + LINK_ONLY + EXTERNAL with Featured/Watch hold. No rebroadcast/image-reuse permission was inferred.

Current structural catalog state after this tranche:
- healthy searchable places: **597**;
- healthy source records: **602**;
- supplemental Search/Explore records: **278 / 500**;
- Watch Earth impact: **0**;
- first-load core unchanged.

#### Business / utility expansion
Commercial opportunity registry advanced to **364** records.
- Existing `viator-aoraki-mount-cook` now serves Lake Pukaki, Glentanner and Mount Cook Village as one regional bridge.
- Added `kiwi-east-greenland-flight-planning` for Tasiilaq/Kulusuk as an exact-link-gated flight-planning utility.

Travelpayouts utility routing expanded to **23** clusters:
- **East Greenland access** → Kiwi.com / Aviasales / Airalo research with explicit route/coverage verification;
- **New Zealand South Island road trip** → QEEQ / Economybookings / GetRentacar research with one-rental-option suppression.

No tracked link or route availability was invented.

#### Research-only exact-target work
Added fail-closed research candidates for:
- Mt Hutt;
- Coronet Peak;
- The Remarkables.

NZSki's official site confirms the three mountain operations and current mountain/weather surfaces, while current external indexing indicates official webcam views. ERN still lacks durable exact first-party webcam targets for these three, so none was promoted. Their state remains `EXACT_TARGET_RESEARCH_REQUIRED`.

#### Safeguards unchanged
Watch Earth remains in-ERN only; external/link-only sources remain Search/Explore-only; Current Image renewal remains natural-schedule only; public Guide and Now Moments remain OFF; no automatic social posting, paid ranking, automatic Travelpayouts placement or link rewriting; commercial value does not affect Earth ranking, source truth, health or currentness; hard lean-core ceiling remains 575 KB.

### Large alpine + travel-utility expansion batch — 2026-10-06
Continued autonomously from canonical main `105c3ace6b7dcea9964626cf60ee5bddc40689aa` in the owner's requested large-batch mode.

#### Search/Explore expansion
Added **12 healthy searchable places** through the lazy supplemental catalog:
- New Zealand: Coronet Peak, The Remarkables, Mt Hutt and Whakapapa/Ruapehu;
- Australia: Mt Buller, Falls Creek, Perisher, Thredbo, Mt Hotham, Charlotte Pass and Selwyn Snow Resort;
- Montenegro: Kolašin 1450.

All are first-party official resort/current-condition camera surfaces. Every new row remains HEALTHY + LINK_ONLY + EXTERNAL with Featured/Watch hold, so the batch expands intentional Search/Explore discovery without weakening Watch Earth.

Current catalog state:
- healthy distinct searchable places: **609**;
- healthy source records: **614**;
- supplemental Search/Explore: **290 / 500**;
- first-load core unchanged;
- Watch Earth impact: **0**.

Notable truth/currentness boundaries:
- Whakapapa's official 2026-10-06 report exposes multiple current webcam views;
- Charlotte Pass states live cameras refresh every five minutes;
- Selwyn states its live video remains 24/7 and image cams refresh every 10 minutes even though resort operations have closed for the remainder of winter 2026;
- seasonal operational closure is not treated as a broken current-view source.

#### Business expansion + consolidation
Commercial opportunity registry advanced to **367 records**.

Existing regional paths expanded:
- Queenstown/Viator now covers Coronet Peak + The Remarkables;
- Tongariro/Klook now includes Whakapapa;
- Kolašin/Montenegro Viator path now includes Kolašin 1450.

New differentiated exact-link-gated opportunities:
- Klook Queenstown ski fields — Coronet Peak / The Remarkables;
- Klook Mt Buller;
- Klook Snowy Mountains — Perisher / Thredbo.

These mappings are based on current public Klook inventory that directly names the resorts. No tracked URL, price guarantee, availability guarantee or owner approval was invented. All remain `ACCOUNT_SEARCH_AND_EXACT_LINK_REQUIRED`.

#### Travelpayouts diversification
General utility routing expanded to **27 clusters**.

New clusters:
- Queenstown ski access — Kiwitaxi / intui.travel / QEEQ research;
- Victorian Alps road trip — QEEQ / Economybookings / GetRentacar research;
- Snowy Mountains access — the same rental-program family, with an explicit rule never to imply direct winter vehicle access to Charlotte Pass;
- Alpine stay research — Booking.com / Trip.com research only, gated on actual Earthrightnow project availability and exact destination links.

This keeps Travelpayouts diversification active beyond tours while preserving one-useful-action-per-need and owner-link verification.

#### Research queue
The three earlier NZSki exact-target research records for Mt Hutt, Coronet Peak and The Remarkables were resolved to `RESOLVED_PROMOTED_OFFICIAL_LINK_ONLY` after exact first-party webcam pages were confirmed.

Research-only global gaps were also recorded for:
- Malta — official Live Malta Cams surface confirmed, but named stable targets remain unresolved;
- Guam — no durable first-party scenic webcam confirmed yet;
- Samoa — no durable current resort/destination webcam confirmed yet;
- Tonga — no durable current resort/destination webcam confirmed yet.

No weak substitute was promoted for those gaps.

#### Invariants
Watch Earth remains in-ERN playback only; LINK_ONLY/external sources remain out of Watch Earth; IMAGE_REFRESH remains natural-schedule only; public Guide and Now Moments remain OFF; no social automation, paid ranking, automatic Travelpayouts placement or link rewriting; commercial value cannot affect Earth ranking/source truth/health/currentness; hard lean-core ceiling remains 575 KB.

### Caribbean / Virgin Islands continuation — 2026-10-06
Continued the same large batch after the alpine tranche rather than stopping at a small checkpoint.

Added three first-party island/current-view places:
- **Scrub Island — Marina Village, BVI** from the resort's own webcam page;
- **Saba Rock — North Sound, BVI** from Saba Rock's first-party live webcam, including underwater scenes;
- **St. John — Cruz Bay Beach, USVI** from The Beach Bar's first-party live panoramic beach webcams.

All remain HEALTHY + LINK_ONLY + EXTERNAL with Featured/Watch hold.

Commercial mapping was consolidated rather than multiplied:
- the existing BVI/Viator path now spans Jost Van Dyke, Scrub Island and Saba Rock using one BVI-level destination bridge;
- the existing St. John/Viator path now also covers Cruz Bay Beach.

Travelpayouts utility research added:
- **BVI island-hopping/access** research, fail-closed on exact owner-project route support;
- **Virgin Islands connectivity** research using one verified eSIM option per territory context.

Combined state after the alpine + Caribbean continuation:
- healthy distinct searchable places: **612**;
- healthy source records: **617**;
- supplemental Search/Explore: **293 / 500**;
- commercial opportunities: **367** (regional consolidation avoided unnecessary count inflation);
- general utility-routing clusters: **29**;
- Watch Earth impact: **0**.

No tracked link, ferry availability, transfer coverage or eSIM territory coverage was invented.

### Andorra + multi-program Travelpayouts/Viator expansion — 2026-10-06
Continued the large-batch expansion with an explicit multi-program business pass rather than relying primarily on Viator/Klook.

#### Search/Explore
Added **9 official Andorra current-view places**:
- Grandvalira sectors: Encamp, Canillo, El Tarter, Soldeu Estadi Creand, Soldeu Espiolets, Grau Roig, Pas de la Casa 2540 m and Pas de la Casa 2100 m;
- Ordino Arcalís live-slope/current-condition surface.

All remain HEALTHY + LINK_ONLY + EXTERNAL with Featured/Watch hold. The broader existing Andorra aggregate places remain preserved; these additions provide named sector-level intentional Search/Explore discovery.

#### Business and Travelpayouts diversification
Added five distinct owner-link-gated opportunities:
- **Viator Andorra** — destination/activity planning based on current Andorra/Pas de la Casa inventory;
- **QEEQ Andorra road-trip rental** — current Andorra la Vella rental coverage;
- **Kiwitaxi Andorra transfers** — current country support, exact gateway route still required;
- **Airalo Andorra connectivity** — current Andorra-specific eSIM coverage;
- **Saily Andorra connectivity fallback** — current Andorra-specific eSIM coverage, retained as a comparison/reserve path rather than a second default public eSIM button.

Existing Klook Andorra mapping was extended across the new sector IDs instead of creating resort-specific duplicate opportunities.

A new `andorra-mountain-access` utility cluster coordinates rental/transfer/connectivity with explicit one-useful-option suppression.

Combined state after this continuation:
- healthy distinct searchable places: **621**;
- healthy source records: **626**;
- supplemental Search/Explore: **302 / 500**;
- commercial opportunities: **372**;
- utility-routing clusters: **30**;
- Watch Earth impact from this batch: **0**.

No tracked link, exact transfer route, rental term or public eSIM choice was invented. All new actions remain owner-side verification gated.

#### Invariants
Watch Earth remains in-ERN only; external/link-only places stay Search/Explore-only; IMAGE_REFRESH remains natural-schedule only; public Guide/Now Moments remain OFF; no automatic social posting, paid ranking, automatic Travelpayouts placement or link rewriting; hard lean-core ceiling remains 575 KB.

### Nordic mountain + Viator/Klook/QEEQ/Kiwitaxi continuation — 2026-10-06
Continued the same large autonomous batch with a geographically separate Nordic tranche.

#### Search/Explore
Added **8 official/current Nordic mountain destinations**:
- Finland: Ruka and Ylläs;
- Sweden: Idre Fjäll, Åre, Sälen and Vemdalen;
- Norway: Trysil and Hemsedal.

Each uses a first-party resort webcam/current-conditions surface. Ylläs explicitly states five-minute image updates, Idre states its cameras run year-round 24/7, and SkiStar maintains current webcam networks across Åre, Sälen, Trysil, Hemsedal and Vemdalen.

All remain HEALTHY + LINK_ONLY + EXTERNAL with Featured/Watch hold.

#### Commercial/program diversification
Added four distinct owner-link-gated paths:
- **Viator Ruka/Kuusamo** — current dedicated Ruka tour inventory;
- **Klook Levi/Lapland** — current Levi-specific activity inventory;
- **QEEQ Nordic ski road-trip research** — country coverage exists, exact pickup/winter terms still required;
- **Kiwitaxi Nordic arrivals** — Finland/Sweden/Norway are supported countries, exact airport-resort route still required.

Utility routing also added:
- Finland/Lapland mountain access;
- Scandinavia ski connectivity, with one-eSIM-provider suppression.

Combined state after Andorra + Nordic continuation:
- healthy distinct searchable places: **629**;
- healthy source records: **634**;
- supplemental Search/Explore: **310 / 500**;
- commercial opportunities: **376**;
- utility-routing clusters: **32**;
- Watch Earth impact: **0**.

No exact rental pickup, transfer route, winter-equipment inclusion, tracked URL or eSIM public choice was invented.

### Finland + Japan mountain expansion with broader partner routing — 2026-10-06
Continued in large-batch mode with two geographically distinct mountain/current-view families and parallel commercial diversification.

#### Search/Explore
Added **12 healthy official/current destinations**.

**Finland — 6**
- Ounasvaara / Rovaniemi;
- Pyhä;
- Luosto;
- Tahko;
- Himos;
- Vuokatti.

**Japan — 6**
- Rusutsu;
- Furano Ski Resort;
- Shiga Kogen;
- Nozawa Onsen;
- Yuzawa Kogen;
- Togakushi Ski Area.

All are first-party resort/tourism current-camera surfaces. Every new source remains HEALTHY + LINK_ONLY + EXTERNAL with Featured/Watch hold.

#### Commercial expansion
Commercial opportunity registry advanced with distinct fit-first paths:
- Viator Pyhä-Luosto;
- Viator Rovaniemi/Ounasvaara;
- Klook Rusutsu;
- Klook Nozawa Onsen;
- Klook Furano Ski;
- QEEQ Japan mountain road-trip research;
- Kiwitaxi Japan mountain arrival-transfer research.

Existing Klook Rovaniemi and Furano mappings were expanded instead of duplicated.

#### Travelpayouts diversification
New routing clusters:
- Finnish secondary-resort access;
- Finnish resort stay research;
- Japan mountain access;
- Japan mountain stay research using Rakuten Travel / Trip.com / Booking.com only after owner-project availability is confirmed.

No stay program was promoted from public catalog presence alone.

Combined state after this tranche:
- healthy distinct searchable places: **641**;
- healthy source records: **646**;
- supplemental Search/Explore: **322 / 500**;
- commercial opportunities: **383**;
- utility-routing clusters: **36**;
- Watch Earth impact: **0**.

No tracked link, rental condition, transfer route, accommodation availability or owner-program approval was invented.

#### Invariants
Watch Earth remains in-ERN only; external/link-only sources stay out of Watch Earth; Current Image renewal remains natural-schedule only; public Guide/Now Moments remain OFF; no automatic social posting, paid ranking, Travelpayouts placement or link rewriting; hard lean-core ceiling remains 575 KB.

### Canadian Rockies / BC mountain continuation — 2026-10-06
Continued the same large batch with a North American tranche.

#### Search/Explore
Added **7 official/current Canadian mountain destinations**:
- Banff Sunshine Village;
- Lake Louise Ski Resort;
- Revelstoke Mountain Resort;
- Big White;
- SilverStar;
- Kicking Horse;
- Panorama Mountain Resort.

All use first-party resort current-condition/webcam surfaces and remain HEALTHY + LINK_ONLY + EXTERNAL with Featured/Watch hold.

#### Commercial + Travelpayouts
Added:
- **Viator Banff/Lake Louise** destination research using current Banff/Lake Louise sightseeing/shuttle inventory;
- **QEEQ Canadian Rockies/BC road-trip** research;
- **Kiwitaxi Canadian mountain transfers** research;
- **Airalo Canada mountain connectivity**, supported by current Canada-specific eSIM inventory.

New utility clusters coordinate road-trip rental, exact-route transfers, stay research and connectivity with one-useful-option suppression.

Combined state after Finland + Japan + Canada continuation:
- healthy distinct searchable places: **648**;
- healthy source records: **653**;
- supplemental Search/Explore: **329 / 500**;
- commercial opportunities: **387**;
- utility-routing clusters: **40**;
- Watch Earth impact: **0**.

No tracked URL, transfer route, rental term, stay availability or owner-program approval was invented.

### Spain / Pyrenees official-current expansion + diversified travel routing — 2026-10-06
Continued from canonical main `906b405968b2ef6a9f1649d9c7fcc51dd759d269` after reconciling the already-landed Finland/Japan/Canada work.

#### Search/Explore
Added **10 official/current Spain mountain destinations**:
- Sierra Nevada;
- Masella;
- Astún;
- Candanchú;
- La Molina;
- Vall de Núria;
- Espot;
- Port Ainé;
- Formigal-Panticosa;
- Cerler.

All remain HEALTHY + LINK_ONLY + EXTERNAL with Featured/Watch hold. No image or stream reuse permission was inferred.

The strongest provider evidence includes:
- Sierra Nevada explicitly publishes real-time images of slopes and lifts;
- Astún and Candanchú explicitly describe real-time/live camera surfaces;
- Espot publishes an official 360-degree webcam;
- Masella publishes multiple named current webcams;
- FGC's La Molina/Vall de Núria/Port Ainé ecosystem exposes webcams alongside current resort information.

Boí Taüll and Vallter remain exact-target research only; they were not promoted without stable public webcam routes.

#### Commercial + Travelpayouts
Added six owner-link-gated opportunities:
- Viator Sierra Nevada / Granada;
- Viator Catalan Pyrenees;
- QEEQ Spain mountain road-trip;
- AutoEurope Spain mountain road-trip fallback;
- Kiwitaxi Spain mountain arrival transfers;
- Airalo Spain connectivity.

Travelpayouts routing added four clusters:
- Spain Pyrenees road-trip;
- Spain mountain arrivals;
- Spain mountain connectivity;
- Spain mountain stay research.

The stay cluster remains owner-project-access gated. Rental and transfer clusters require exact pickup/route evidence. Connectivity defaults to one provider.

Combined state after this tranche:
- supplemental Search/Explore: **339 / 500**;
- commercial opportunities: **393**;
- utility-routing clusters: **44**;
- Watch Earth impact: **0**.

#### Invariants
Watch Earth remains in-ERN only; LINK_ONLY/EXTERNAL additions stay out of Watch Earth; IMAGE_REFRESH remains natural-schedule only; public Guide/Now Moments remain OFF; no paid ranking, automatic social posting, automatic Travelpayouts placement or link rewriting; hard lean-core ceiling remains 575 KB.

### Sri Lanka first-country live coverage + utility diversification — 2026-10-06
Continued the same large batch beyond Spain to avoid overconcentrating new coverage in Europe.

#### Search/Explore
Added ERN's first healthy Sri Lanka live/current destinations:
- **Karpaha Sands — Kalkudah/East Coast**, whose first-party site explicitly links an active live beach webcam;
- **Ayurveda Paradise Maho**, whose first-party site explicitly states its new live webcam shows the spa park in real time.

Both remain HEALTHY + LINK_ONLY + EXTERNAL with Featured/Watch hold.

#### Commercial / Travelpayouts
Added owner-link-gated paths for:
- Viator Pasikudah / Batticaloa activities;
- QEEQ Sri Lanka road-trip rental;
- Kiwitaxi Sri Lanka transfers;
- Airalo Sri Lanka connectivity.

Added two routing clusters:
- Sri Lanka east-coast access;
- Sri Lanka stay research using Booking.com / Trip.com / Agoda only after owner-project availability is confirmed.

No tracked URL, transfer route, rental legality/terms, accommodation availability or owner-program approval was invented.

#### Combined current state
- supplemental Search/Explore: **341 / 500**;
- commercial opportunities: **397**;
- utility-routing clusters: **46**;
- Watch Earth impact: **0**.

Protected invariants remain unchanged.

### Southern Andes official-current + diversified travel-routing expansion — 2026-10-06
Continued from canonical main `e6ff3bcefd36ad7b3e90d17b41915ba3c5f62238` in large-batch mode after reconciling all intervening Finland/Japan/Canada/Spain/Sri Lanka work.

#### Search/Explore
Added **5 official/current Southern Andes destinations**:
- Las Leñas, Argentina;
- Valle Nevado, Chile;
- Nevados de Chillán, Chile;
- El Colorado, Chile;
- Portillo / Laguna del Inca, Chile.

All use first-party resort live/current-camera surfaces and remain HEALTHY + LINK_ONLY + EXTERNAL with Featured/Watch hold.

#### Commercial + Travelpayouts
Added seven fit-first owner-link-gated opportunities:
- Viator Valle Nevado / El Colorado / Farellones;
- Viator Portillo / Laguna del Inca;
- Klook Portillo / Laguna del Inca as an alternative active-program path;
- QEEQ Chile Andes road-trip research;
- Kiwitaxi Chile mountain-transfer research;
- Airalo Chile connectivity;
- Viator Las Leñas / Mendoza research, deliberately dormant if exact Las Leñas inventory is weak.

Added three utility-routing clusters:
- Chile Andes access;
- Chile Andes connectivity;
- South America mountain stay research.

The stay lane remains project-access gated. Rental/transfer routes require exact route and terms. Connectivity defaults to one eSIM provider.

Corralco and Chapelco remain exact-target research only; neither was promoted without a stable first-party camera route.

Protected invariants remain unchanged: Watch Earth in-ERN only; external/link-only additions stay Search/Explore-only; Current Image renewal natural-schedule only; Guide/Now Moments OFF; no paid ranking, automatic social posting, automatic Travelpayouts placement or link rewriting; hard lean-core ceiling remains 575 KB.

### Caucasus official-live + Viator/Travelpayouts diversification — 2026-10-06
Continued the same large batch after the Southern Andes tranche.

#### Search/Explore
Added **4 new official/current Caucasus destinations**:
- Shahdag, Azerbaijan;
- Tufandag / Gabala, Azerbaijan;
- Bakuriani, Georgia;
- Tsaghkadzor Ropeway, Armenia.

Existing Gudauri/Kobi current-view coverage was preserved and reused commercially rather than duplicated.

All four new records remain HEALTHY + LINK_ONLY + EXTERNAL with Featured/Watch hold.

#### Commercial / Travelpayouts
Added nine fit-first research paths:
- Viator Shahdag/Quba;
- Klook Shahdag as an alternative program path;
- Viator Tufandag/Gabala;
- Viator Gudauri/Kazbegi;
- Viator Bakuriani/Borjomi;
- Viator Tsaghkadzor/Lake Sevan;
- Localrent Caucasus road-trip research;
- Kiwitaxi Caucasus mountain transfers;
- Airalo Caucasus connectivity.

New utility clusters coordinate Caucasus access, connectivity and stay research. Country-specific coverage is required; Georgia availability never implies Armenia/Azerbaijan availability.

Uludağ remains HOLD because the provider currently reports its camera network offline. Erciyes remains exact-target research until a stable official Kayseri municipality camera target is bound.

Combined across the Southern Andes + Caucasus continuation:
- added searchable places in this continuation: **9**;
- all additions external/link-only and held out of Watch Earth;
- commercial expansion deliberately spans Viator, Klook, QEEQ, Kiwitaxi, Localrent and Airalo rather than concentrating only on tours.

Protected invariants remain unchanged.

### Gateway-city utility diversification — 2026-10-06
Extended the same large batch beyond tours/transfers into additional owner-available Travelpayouts-style utility lanes:
- Radical Storage Santiago;
- WeGoTrip Santiago;
- Radical Storage Yerevan;
- WeGoTrip Tbilisi.

These are downstream gateway-city utilities for Andes/Caucasus itineraries, not destination-ranking signals. Exact tracked links remain owner-side gated and one-useful-option suppression still applies.

### South Korea + expanded Greece current-view / multi-program batch — 2026-10-06
Continued from the reconciled advanced main after preserving all intervening Finland/Japan/Canada/Spain/Sri Lanka/Andes/Caucasus/gateway-utility work.

#### Search/Explore expansion
Added **10 healthy current destinations**.

**South Korea — 3**
- Pyeongchang Alpensia Resort;
- Muju Deogyusan Resort;
- Hallasan National Park / Baengnokdam on Jeju.

**Greece — 7**
- Kalavrita Ski Resort / Mount Helmos;
- Parnassos / Fterolaka live slope;
- 3–5 Pigadia / Naousa;
- Pelion Ski Centre / Agriolefkes;
- Mainalo / Ostrakina;
- Seli National Ski Center;
- Anilio / Metsovo.

All new rows remain HEALTHY + LINK_ONLY + EXTERNAL with Featured/Watch hold. First-party government/resort sources were preferred; Parnassos uses a credible regional destination portal carrying the ski-center camera. Automated access blocking on Anilio is documented as an access characteristic, not evidence that the source is broken.

Current catalog state:
- healthy distinct searchable places: **679**;
- healthy source records: **684**;
- supplemental Search/Explore: **360 / 500**;
- remaining supplemental headroom: **140**;
- Watch Earth impact: **0**;
- first-load core unchanged.

#### Commercial + broader Travelpayouts diversification
Commercial opportunity registry advanced to **425 records**.

New owner-link-gated research paths:
- Klook Jeju / Hallasan;
- Viator Jeju / Hallasan;
- QEEQ Jeju road-trip rental;
- Radical Storage Seoul;
- Airalo South Korea connectivity;
- Viator Parnassos / Delphi / Arachova;
- Viator Kalavrita / Helmos;
- Viator Metsovo / Anilio.

Current partner-mapping counts include:
- Viator: **260**;
- Klook: **59**;
- QEEQ: **13**;
- Radical Storage: **17**;
- Airalo: **10**.

New/expanded utility routing covers:
- South Korea mountain access;
- Jeju island access;
- Seoul city utilities;
- mainland-Greece mountain road-trip research;
- mainland-Greece stay research.

Mainalo, Seli and Anilio were folded into the existing Greece road-trip/stay clusters rather than creating redundant utility records.

No tracked URL, exact transfer route, rental eligibility, winter-equipment inclusion, accommodation availability, price or owner-program approval was invented.

#### Structural validation
Current main passes a direct catalog integrity check:
- no duplicate supplemental IDs;
- no supplemental/core source-ID duplication;
- no supplemental/core place-ID duplication;
- every supplemental record remains HEALTHY;
- every supplemental record remains LINK_ONLY + EXTERNAL;
- every supplemental record remains Featured/Watch held;
- supplemental count remains below the 500-row guard;
- commercial public activation remains OFF;
- utility public activation remains OFF.

The connected GitHub interface still does not expose generic push-triggered Pages/Operations workflow runs, so no unobserved run result is claimed here.

#### Protected invariants
Watch Earth remains in-ERN playback only; external/link-only additions remain out of Watch Earth; IMAGE_REFRESH remains natural-schedule only; public generative Guide and Now Moments remain OFF; no paid ranking, automatic social posting, automatic Travelpayouts placement or link rewriting; commercial value cannot affect Earth ranking/source truth/health/currentness; hard lean-core ceiling remains 575 KB.

### Western Alps provider-diverse current-view + multi-program travel expansion — 2026-10-06
Continued from reconciled canonical main `a85ca18b654eb295c0736103978186ec78545d05` after preserving all previously landed Finland/Japan/Canada/Spain/Sri Lanka/Andes/Caucasus/Korea/Greece work.

#### Search/Explore expansion
Added **12 healthy official/current Western Alps destinations** across three countries and multiple providers.

**Austria — 6**
- Ischgl / Silvretta Arena;
- Sölden / Ötztal;
- Saalbach Hinterglemm;
- Obertauern;
- Zell am See–Kaprun;
- Nassfeld–Pressegger See.

**Italy — 2**
- Livigno;
- Breuil-Cervinia / Matterhorn.

**France — 4**
- Tignes;
- Les 2 Alpes;
- Alpe d'Huez;
- Val Thorens.

All new records remain HEALTHY + LINK_ONLY + EXTERNAL with Featured/Watch hold. Official resort/destination webcam surfaces were used, with seasonal/offline camera states preserved honestly where providers expose them.

#### Commercial + Travelpayouts diversification
Added fit-first owner-link-gated paths across multiple program families:
- Viator Zell am See;
- Viator Livigno/Bormio;
- Viator Cervinia/Aosta Valley;
- Kiwitaxi Austrian Alps arrivals;
- Kiwitaxi French Alps arrivals;
- Airalo Austria connectivity;
- Airalo Italy connectivity;
- Airalo France connectivity;
- QEEQ Western Alps road-trip research;
- AutoEurope Western Alps rental fallback.

Utility routing added:
- Austria Alps access;
- Italy Alps access;
- France Alps access;
- Western Alps country-specific connectivity;
- Western Alps stay research using Booking.com / Trip.com / Agoda only after actual owner-project availability is confirmed.

No tracked link, exact unsupported transfer route, rental winter-equipment entitlement, cross-border rental permission, accommodation availability or owner-program approval was invented.

#### Combined state after this tranche
- supplemental Search/Explore: **372 / 500**;
- commercial opportunities: **435**;
- utility-routing clusters: **64**;
- Watch Earth impact: **0**;
- first-load core unchanged.

Protected invariants remain unchanged: Watch Earth is in-ERN playback only; LINK_ONLY/EXTERNAL additions remain Search/Explore-only; IMAGE_REFRESH remains natural-schedule only; public Guide and Now Moments remain OFF; no paid ranking, automatic social posting, automatic Travelpayouts placement or link rewriting; commercial value cannot affect Earth ranking/source truth/health/currentness; hard lean-core ceiling remains 575 KB.

### Central Anatolia + Bulgaria + Czechia live-current continuation — 2026-10-06
Continued the same large checkpoint after the Western Alps tranche.

#### Search/Explore
Added **3 additional official live/current mountain destinations**:
- Mount Erciyes / Kayseri, Turkey;
- Pamporovo / Rhodope Mountains, Bulgaria;
- Špindlerův Mlýn / Krkonoše, Czech Republic.

All remain HEALTHY + LINK_ONLY + EXTERNAL with Featured/Watch hold.

#### Commercial / Travelpayouts diversification
Added:
- Klook Erciyes, based on a current specific Mount Erciyes skiing product;
- Viator Erciyes/Kayseri research;
- QEEQ Kayseri/Erciyes rental research backed by current Kayseri Airport inventory;
- Viator Špindlerův Mlýn research;
- Viator Pamporovo research, explicitly dormant if exact Rhodope inventory is weak.

Utility routing added Central Anatolia mountain access, Central Europe mountain access, and project-gated mountain stay research.

#### Combined batch state
Across the Western Alps + this continuation, **15 new healthy searchable places** were added in this checkpoint.
Current state after this continuation:
- supplemental Search/Explore: **375 / 500**;
- commercial opportunities: **440**;
- utility-routing clusters: **67**;
- Watch Earth impact: **0**;
- first-load core unchanged.

No tracked URL, exact unsupported transfer route, snow-equipment entitlement, rental road suitability, accommodation availability or owner-program approval was invented.

### Scientific monitoring + provenance-maintenance continuation — 2026-10-06
Closed the same large checkpoint with a non-resort quality tranche.

#### Scientific/current Earth expansion
Added **Vulcano — Aeolian Islands** using INGV's official volcanic-surveillance current-image page. INGV explicitly lists webcam/thermal imagery for Etna, Stromboli and Vulcano in its real-time volcano system. Vulcano remains HEALTHY + LIVE_IMAGE + LINK_ONLY + EXTERNAL with Featured/Watch hold.

The existing Viator Aeolian Islands planning path was consolidated to serve both Stromboli and Vulcano rather than creating another near-duplicate affiliate action.

A research-only **12Go Aeolian ferry** utility cluster was added with a strict owner-project-availability + exact-route + tracked-link gate. Travelpayouts catalog presence alone does not authorize activation.

#### Provenance repair
The existing Petra source was upgraded from a third-party SkylineWebcams URL to the official **Visit Petra** destination surface, which currently exposes its own Live Cam. Place identity and truth class were preserved; only provenance/currentness evidence was improved.

#### Current state after the full checkpoint
- healthy distinct searchable places: **695**;
- healthy source records: **700**;
- supplemental Search/Explore: **376 / 500**;
- commercial opportunities: **440**;
- utility-routing clusters: **68**;
- Watch Earth impact from new external/search additions: **0**.

Protected invariants remain unchanged.



## Large-batch canonical checkpoint — 2026-10-06 13:30 UTC

Canonical reconciliation:
- Repository content state validated on `c4d19f82d07f96fd3e2d1f419312bf29f1c06159`.
- The latest successful non-superseded Pages deployment for that content is **Deploy ERN to GitHub Pages #2673** (run 37471028814), completed SUCCESS.
- The matching latest Operations validation is **ERN Operations Check #1454** (run 37471028756), completed SUCCESS.
- The immediately preceding clean production checkpoint was Pages #2672 on `a4a1736495cf034beaea9c836567af4d23d465ca`; the #2673 release supersedes it.
- Earlier Pages failures on the Oct. 6 expansion line were reconciled rather than ignored: one future-dated Petra verification timestamp was corrected; AI-search alias coverage was restored; two normalization-equivalent aliases were removed. All pre-deploy guards subsequently passed.

Current validated catalog:
- **693 healthy distinct searchable places**
- **698 healthy source records**
- **374 supplemental Search/Explore records**
- **443 commercial opportunity records**
- **71 commercial utility-routing clusters**
- **479 source-research candidates**
- **12 source-maintenance priority records**
- No duplicate source IDs across core + supplemental catalogs.
- Four pre-existing core records remain intentionally DEGRADED and fail-closed: `pattaya-city-live`, `takayama-miyagawa-current-image`, `jungfrau-region`, and `chidori-sakura`. Do not relabel them healthy without fresh source evidence.

Search/Explore expansion in this tranche:
- Added official/current external discovery coverage for Lake Bohinj / Orožnova Koča (Slovenia), Kruševo / Mihajlovo (North Macedonia), North Chesterman / Mackenzie / Cox Bay (Tofino, Canada), Selinda Reserve (Botswana), and Hwange Safari Lodge / The Hide (Zimbabwe).
- These ten records are all `EXTERNAL_LIVE` + `LINK_ONLY` + `playback: EXTERNAL`, remain Search/Explore-only, and are explicitly held out of Watch Earth.
- Corresponding source-research records remain preserved as promoted searchable quasi-live evidence.

Commercial diversification:
- Bohinj expanded the existing Viator Ljubljana/Triglav path and added a Klook Bohinj/Triglav research path.
- North Macedonia Viator coverage now includes the new Kruševo/Mihajlovo places.
- Added a Tofino/Vancouver Island Viator research path and a conservative Selinda/Botswana Viator research path.
- Existing Hwange Viator coverage now includes the two new Hwange views.
- Added utility-routing research for Slovenian alpine access (Omio/QEEQ/Kiwitaxi), Vancouver Island west-coast access (QEEQ/DiscoverCars/Kiwi.com), and North Macedonia mountain access (QEEQ/Kiwitaxi/GetTransfer); Southern Africa safari-arrival routing was extended to the new Botswana/Zimbabwe places.
- All new commercial paths remain owner-project availability + exact tracked-link gated. No automatic placement, link rewriting, commission-based ranking, or inferred program availability was introduced.

Architecture / deduplication:
- Consolidated 12 clear duplicate supplemental destination representations into their existing canonical core places: Salzburg Mirabell, Tallinn TV Tower, Lake Bled, Poiana Brașov, Tvøroyri Port, Lerwick Town Hall, Santorini Imerovigli, Mayon, Bulusan, Khumbu Glacier, Longyearbyen Adventfjorden, and Mauna Loa.
- Commercial `placeIds` were remapped to canonical IDs and de-duplicated.
- Source-research history was preserved with state `SUPERSEDED_BY_CANONICAL_CORE`; provenance was not discarded.
- Multilingual aliases were merged onto canonical place IDs and normalization-equivalent duplicates were removed.
- The lower aggregate place/source counts versus the previous handoff are intentional catalog correction, not lost coverage: ten genuinely new searchable records were added while twelve duplicate representations were removed.

Protected invariants remain unchanged:
- Watch Earth stays in-ERN-playback-only; LINK_ONLY / EXTERNAL records never enter Watch Earth merely because they are healthy/searchable.
- IMAGE_REFRESH stays natural-schedule-only.
- Public generative Guide remains OFF.
- Public Now Moments remains OFF.
- Commercial value cannot alter source truth, currentness, health, ranking, or editorial prominence.
- No paid ranking, automatic affiliate placement, automatic tracked-link rewriting, or unverified partner activation.
- Existing performance / lean-core release ceilings remain enforced.

Next autonomous lane:
- Continue broad but geography-conscious Search/Explore expansion from trustworthy current/live sources.
- Keep widening Viator and Travelpayouts-compatible utility research without assuming owner-side program availability.
- Prefer genuinely new place/source coverage over alternate IDs for sources already represented in core.
- Continue source-health maintenance and consolidate duplicate representations before they become public architecture debt.
- Treat Pages + Operations success on the same content SHA as the release-validation standard before declaring a new canonical production checkpoint.


## Autonomous large-batch checkpoint — 2026-10-06 13:56 UTC

Canonical validated content:
- Content commit: `7751053f4fb96f663e6b24e9aa310baca7b5e760`.
- **Deploy ERN to GitHub Pages #2676** (run 37474398085): SUCCESS.
- **ERN Operations Check #1457** (run 37474397965): SUCCESS.
- Pages validation included release smoke, lean/whole-product guards, mobile/accessibility/performance, featured/catalog/currentness, multilingual aliases, search metadata, supplemental catalog, provider concentration, commercial placement, static build, SEO, AI-search readiness, brand/distribution, discoverability and production deployment/social-preview verification.
- Operations packet validated with zero issues and retained safety boundaries: no automatic catalog mutation, health changes, permission approval or source promotion.

### Search/Explore expansion
Added **6 new healthy distinct searchable places** in this large batch:
- Valletta — City Panorama, Malta;
- Razzakov — City Center, Kyrgyzstan;
- Batken — City Panorama, Kyrgyzstan;
- Talas — Central Square, Kyrgyzstan;
- Kyzyl-Kiya — Kulatov Street, Kyrgyzstan;
- Bratislava — Danube & City Views, Slovakia.

Truth/placement rules:
- all six are HEALTHY + LINK_ONLY + EXTERNAL playback;
- all remain Featured/Watch held and therefore Search/Explore-only;
- Malta uses the official VisitMalta Live Malta Cams gateway with current Valletta provider playback;
- Kyrgyzstan additions use direct ElCat/kg.camera current camera pages; provider states surveillance is near-live with about a 20-second delay and no archive;
- Bratislava uses the official Visit Bratislava page, which currently states online views are available for Apollo Bridge, Old Bridge and panorama/sunset views from SNP Bridge.

### Commercial and Travelpayouts-compatible diversification
Malta:
- Tiqets Valletta moved from source-gated to `ACCOUNT_SEARCH_AND_EXACT_LINK_REQUIRED` after source promotion.
- Added Viator Valletta research from current active Valletta inventory.
- Added Airalo Malta connectivity research from current Malta-specific eSIM inventory.
- Added Kiwitaxi Malta Airport → Valletta research from a current exact route.
- Added `malta-valletta-planning` utility routing: at most one activity, one relevant transfer and one connectivity action after destination choice.

Bratislava:
- Existing Viator Bratislava placeholder moved to `ACCOUNT_SEARCH_AND_EXACT_LINK_REQUIRED`.
- Added Omio Bratislava ↔ Vienna utility research from current direct train/bus/ferry comparison inventory.
- Added `bratislava-vienna-intercity` routing: one exact intercity comparison action only, no generic Europe transport clutter.

Kyrgyzstan:
- Added `southern-kyrgyzstan-discovery-access` as research-only routing across Razzakov, Batken, Talas and Kyzyl-Kiya.
- This lane intentionally does **not** infer transfer, rental or tour coverage from national-level inventory; it remains dormant unless exact useful coverage exists.

No tracked link, owner-program approval, unsupported route, transfer entitlement, rental coverage, price guarantee or public commercial activation was invented.

### Architecture and deduplication
After the new source tranche, a cross-core/supplemental duplicate audit found three remaining clear duplicate destination representations and consolidated them:
- Issyk-Kul / KarVen Four Seasons → canonical `issyk-kul-karven`;
- Great Bay & Philipsburg Boardwalk → canonical `st-maarten-great-bay`;
- Mendoza / Plaza Independencia → canonical `mendoza-plaza-independencia`.

Maintenance rules:
- duplicate supplemental records were removed;
- source-research history was preserved as `SUPERSEDED_BY_CANONICAL_CORE`;
- aliases were merged onto canonical IDs with normalization dedupe;
- no commercial place references required remapping in this pass;
- after consolidation there are no duplicate source IDs and no cross-core/supplemental title duplicates.

### Current validated catalog
- **696 healthy distinct searchable places**
- **701 healthy source records**
- **377 supplemental Search/Explore records**
- **447 commercial opportunity records**
- **74 utility-routing clusters**
- **481 source-research candidates**
- unresolved research queue reduced to **19** candidates
- four pre-existing degraded core records remain intentionally fail-closed:
  - `pattaya-city-live`
  - `takayama-miyagawa-current-image`
  - `jungfrau-region`
  - `chidori-sakura`

The count movement is intentional: six genuine new places were added while three old duplicate supplemental representations were removed during architecture maintenance.

### Preserved invariants
- Watch Earth remains in-ERN-playback-only; LINK_ONLY / EXTERNAL sources do not enter Watch Earth merely because they are healthy.
- IMAGE_REFRESH remains natural-schedule-only.
- Public generative Guide remains OFF.
- Public Now Moments remains OFF.
- Commercial value cannot alter source truth, health, currentness, ranking or editorial prominence.
- No paid ranking, automatic affiliate placement, automatic link rewriting, automatic social posting or unverified partner activation.
- Existing lean-core/performance ceilings remain enforced.

### Next autonomous lane
Continue from this checkpoint in the same large-batch rhythm:
1. prioritize unresolved P1/new-country source gaps where exact current/live evidence can actually be resolved;
2. prefer genuinely new countries/territories and new place coverage over alternate IDs;
3. continue Viator plus Travelpayouts-compatible diversification only where a destination has real post-discovery utility;
4. keep exact owner-project availability and tracked-link generation gated;
5. maintain source-health / deduplication passes before architecture debt reaches the public catalog;
6. require matching successful Pages + Operations validation on the same content SHA before declaring the next canonical production checkpoint.

Current high-value unresolved research includes Everest/Khumbu Hotel View, KenyaLIVE/Nairobi National Park, Montevideo/Pocitos, Montserrat MVO current imagery, New Caledonia/Kuto, Vatican City official webcam routing, Mauritius official webcam targets, Pasikudah/Sri Lanka, Macao SMG WeatherCam target resolution, Zambia/South Luangwa current webcam route, and Falklands Stanley exact-current route.


## Autonomous large-batch checkpoint — 2026-10-06 14:54 UTC

Canonical validated content:
- Content commit: `f5d689a7205ceda0716c65f5e430eabfb50ff8b6`.
- **Deploy ERN to GitHub Pages #2677** (run 37482422321): SUCCESS.
- **ERN Operations Check #1458** (run 37482422266): SUCCESS.
- All Pages pre-deploy guards passed, including release smoke, lean/whole-product, currentness, multilingual aliases, Search/Explore integrity, commercial placement, build, SEO, AI-search readiness, discoverability, operator preflight and production deployment/social-preview verification.
- Operations completed successfully with the existing fail-closed safety boundaries preserved.

### New-country / territory expansion
Added **Macao — Government WeatherCam Network** as one new healthy searchable place using the official Meteorological and Geophysical Bureau of Macao SAR Government real-time monitoring surface.
- Truth: `LIVE_IMAGE`.
- Playback: `EXTERNAL`.
- Permission: `LINK_ONLY`.
- Featured/Watch hold remains ON, so this is Search/Explore-only.
- The official SMG page exposes a real-time WeatherCam module with ten camera slots plus update-time metadata.
- ERN intentionally promotes this at network level and does not invent individual camera names/locations that SMG's crawlable surface does not expose.

### Macao commercial / utility diversification
Added owner-link-gated research paths:
- Klook Macao — current dedicated destination page with active 2026 inventory.
- Viator Macao SAR — current active 2026 tours / sightseeing inventory.
- Airalo Macao — current Macao-specific eSIM inventory.
- Added `macao-city-planning` routing with at most one useful activity action and one connectivity action after destination choice.

No tracked URL, owner-project approval, public affiliate activation, price promise or program availability was invented. Exact tracked-link generation remains owner-side gated.

### Current validated catalog
- **697 healthy distinct searchable places**
- **702 healthy source records**
- **378 supplemental Search/Explore records**
- **450 commercial opportunity records**
- **75 utility-routing clusters**
- **481 source-research candidates**
- unresolved research queue: **18**
- degraded fail-closed core records remain: `pattaya-city-live`, `takayama-miyagawa-current-image`, `jungfrau-region`, `chidori-sakura`

### Preserved invariants
- Watch Earth remains in-ERN-playback-only.
- LINK_ONLY / EXTERNAL sources remain outside Watch Earth.
- IMAGE_REFRESH remains natural-schedule-only.
- Public generative Guide remains OFF.
- Public Now Moments remains OFF.
- Commercial value cannot alter source truth, health, currentness, ranking or editorial prominence.
- No paid ranking, automatic affiliate placement, automatic tracked-link rewriting, automatic social posting or unverified partner activation.
- Existing lean-core / performance ceilings remain enforced.

### Next autonomous lane
Continue from this checkpoint with:
1. unresolved P1/new-country exact-current source resolution where evidence is strong enough;
2. New Caledonia / Kuto, Vatican City, Montserrat, Zambia/South Luangwa, KenyaLIVE and remaining island/territory gaps only when current truth can be resolved conservatively;
3. Viator + Travelpayouts-compatible utility diversification only after real destination utility is established;
4. architecture dedupe / source-health maintenance before further volume growth;
5. matching successful Pages + Operations validation before the next canonical checkpoint.


## Autonomous KenyaLIVE + research reconciliation checkpoint — 2026-10-06 15:09 UTC

Canonical validated content:
- Content commit: `cdd17edf154ceee149f2364f78d1e81025e93a3b`.
- **Deploy ERN to GitHub Pages #2678** (run 37484526768): SUCCESS.
- **ERN Operations Check #1459** (run 37484526889): SUCCESS.
- Pages and Operations validated the same content SHA before this handoff-only commit.

### Search / Explore expansion
Added **Nairobi National Park — KenyaLIVE** as one new healthy searchable place.
- Provider: Kenya Wildlife Service / WildEarth.
- Truth: `EXTERNAL_LIVE`.
- Permission: `LINK_ONLY`.
- Featured/Watch hold remains ON.
- KWS states KenyaLIVE launched at Nairobi National Park on 22 September 2026 and provides daily real-time wildlife experiences from Kenyan parks through the KWS YouTube channel.
- Current October 2026 reporting confirms the programme is a six-month KWS/KTB/WildEarth initiative with morning and afternoon live sessions.
- ERN does not imply 24/7 continuous playback and does not restream it.

### Commercial / utility diversification
Nairobi National Park now has:
- Viator research promoted from source-gated to owner-account exact-link-gated after current 2026 inventory verification.
- Klook Nairobi National Park activity research added after current 2026 inventory verification.
- Airalo Kenya connectivity research added as a post-discovery utility.
- New `nairobi-national-park-planning` routing cluster limits output to one exact safari activity plus one Kenya connectivity utility after destination choice.

All remain owner-project availability + exact tracked-link gated. No public affiliate activation, automatic rewriting, ranking boost, price promise or inferred partner availability was introduced.

### Research / architecture reconciliation
Three stale unresolved candidates were reconciled without adding duplicate public places:
- `ala-archa-park` → `SUPERSEDED_BY_CANONICAL_CORE`; canonical core Ala-Archa source already exists.
- `jordan-petra-treasury-skyline` → `SUPERSEDED_BY_CANONICAL_CORE`; official Visit Petra coverage remains canonical.
- `falklands-stanley-tourist-centre-webcam` → promoted/reconciled to the already-existing Stanley Jetty Visitor Centre searchable record.

This reduces unresolved research from 18 to **14** while preserving provenance.

### Current validated catalog
- **698 healthy distinct searchable places**
- **703 healthy source records**
- **379 supplemental Search/Explore records**
- **452 commercial opportunity records**
- **76 utility-routing clusters**
- **481 source-research candidates**
- **14 unresolved research candidates**
- **12 source-maintenance priority records**
- Four degraded fail-closed core records remain unchanged: `pattaya-city-live`, `takayama-miyagawa-current-image`, `jungfrau-region`, `chidori-sakura`.

### Conservative unresolved-source checks
- Mauritius official tourism still advertises 13 webcams, but its current **Watch Now** handoff resolves to a dead `/webcams-mauritius/` route; keep unresolved.
- New Caledonia / Kuto still has a known tourism-office image endpoint, but reliable current timestamp/freshness verification remains unresolved.
- Vatican News still confirms Governorate webcams show significant Vatican places in real time, but the redesigned Governorate site's exact webcam route/individual targets remain unresolved.
- Montserrat MVO clearly confirms active remote monitoring cameras, but the public still-image freshness requirement remains unresolved.
- Zambia / Shenton Safaris retains historical/current references to Mwamba/Kaingo webcam use, but an exact durable current public webcam route remains unresolved.

### Preserved invariants
- Watch Earth remains in-ERN-playback-only.
- LINK_ONLY / EXTERNAL sources remain outside Watch Earth.
- IMAGE_REFRESH remains natural-schedule-only.
- Public generative Guide remains OFF.
- Public Now Moments remains OFF.
- Commercial value cannot affect source truth, currentness, health, ranking or editorial prominence.
- No paid ranking, automatic affiliate placement, automatic tracked-link rewriting, automatic social posting or unverified partner activation.
- Existing lean-core / performance ceilings remain enforced.

### Next autonomous lane
Continue from this checkpoint by:
1. resolving the remaining 14 research candidates only where exact current/live evidence is strong enough;
2. prioritizing genuinely new countries/territories and provider diversity rather than alternate IDs;
3. continuing Viator + Travelpayouts-compatible diversification only after real destination utility is established;
4. performing source-health / dedupe maintenance before additional volume growth;
5. requiring matching successful Pages + Operations validation on the same content SHA before declaring the next canonical checkpoint.


## Autonomous exact-route resolution checkpoint — 2026-10-07 00:58 UTC

Canonical validated content:
- Content commit: `4d5bd03ca5544a01991da68e43fca9b8c6f20ae1`.
- **Deploy ERN to GitHub Pages #2682** (run 37554355189): SUCCESS.
- **ERN Operations Check #1463** (run 37554355192): SUCCESS.
- Pages and Operations validated the same content SHA before this handoff-only commit.
- The first Everest/Tórshavn release attempt (#2679) failed only on normalization-equivalent aliases (`Tórshavn` / `Torshavn`); the redundant alias was removed before the final validated release.

### Search / Explore expansion
Added **5 genuinely new healthy searchable places**:
- **Hotel Everest View — Khumbu Panorama, Nepal** — current external live Himalayan panorama operated by Webcam Nepal Live.
- **Tórshavn — Faroe Islands Live** — current provider-hosted live city feed.
- **Pasikudah — Sun Siyam Live Weather View, Sri Lanka** — exact 24-hour resort live-weather webcam route resolved.
- **St. Peter's Square — Vatican Media Live, Vatican City** — current official Vatican Media live feed surfaced externally.
- **Azura — Bermuda South Shore** — exact current live-webcam endpoint resolved directly from Azura's own public site.

All five remain HEALTHY + LINK_ONLY + EXTERNAL playback with Featured/Watch hold. Watch Earth impact remains **0**.

### Research / architecture reconciliation
- `cayman-port-authority-webcams` was reconciled to the already-existing canonical `cayman-george-town-port-current` record rather than adding a duplicate.
- The unresolved research queue fell from **14 to 8**.
- The Vatican Governorate redesign route was **not** falsely marked solved: its research item was superseded only because a distinct, separately verified official Vatican Media feed now covers St. Peter's Square.

### Commercial / utility diversification
- Existing Viator Everest / Khumbu research now includes Hotel Everest View.
- Existing Viator Faroe Islands research now includes Tórshavn; Airalo Faroe connectivity research was added.
- Sri Lanka Pasikudah was folded into existing Viator / QEEQ / Kiwitaxi / Airalo planning paths.
- Added Tiqets Vatican City research based on current Vatican Museums / St. Peter's inventory.
- Existing Bermuda and Caribbean connectivity paths now include Azura and the canonical Cayman port record where relevant.
- All new or expanded commercial actions remain owner-project availability + exact tracked-link gated. No public activation, automatic placement, commission-based ranking, link rewriting, or inferred partner availability was introduced.

### Current validated catalog
- **703 healthy distinct searchable places**
- **708 healthy source records**
- **384 supplemental Search/Explore records**
- **454 commercial opportunity records**
- **79 utility-routing clusters**
- **481 source-research candidates**
- **8 unresolved research candidates**
- **12 source-maintenance priority records**
- Four degraded fail-closed core records remain unchanged: `pattaya-city-live`, `takayama-miyagawa-current-image`, `jungfrau-region`, and `chidori-sakura`.

### Remaining conservative research queue
Keep unresolved until exact current evidence is strong enough:
- Montevideo / Pocitos Beach, Plaza Independencia, and Mercado del Puerto — Antel confirms camera capability but exact current public playback remains unresolved.
- Montserrat / Soufrière Hills — MVO confirms active 24-hour remote monitoring, but public still-image freshness remains unresolved.
- New Caledonia / Kuto — tourism-office image endpoint is known and the destination is current, but reliable public timestamp/freshness remains unresolved.
- Mauritius official tourism webcam network — the current official site still advertises 13 webcams, but its current Watch Now handoff resolves to a dead route; do not promote.
- Zambia / Mwamba–Kaingo — current Shenton Safaris operations are active, but no durable current public webcam route has been resolved.
- Guam government live-streaming surface — current government page exists, but ERN has not established that it is a scenic/current destination camera rather than an event/institutional stream.

### Protected invariants
- Watch Earth remains in-ERN-playback-only.
- LINK_ONLY / EXTERNAL sources remain outside Watch Earth.
- IMAGE_REFRESH remains natural-schedule-only.
- Public generative Guide remains OFF.
- Public Now Moments remains OFF.
- Commercial value cannot affect source truth, currentness, health, ranking, or editorial prominence.
- No paid ranking, automatic affiliate placement, automatic tracked-link rewriting, automatic social posting, or unverified partner activation.
- Existing lean-core / performance ceilings remain enforced.

### Next autonomous lane
Continue from this checkpoint by:
1. resolving the remaining 8 research candidates only where exact current/live evidence is strong enough;
2. prioritizing genuinely new countries/territories and provider diversity over alternate IDs;
3. continuing Viator + Travelpayouts-compatible diversification only after real destination utility is established;
4. performing source-health and dedupe maintenance before additional volume growth;
5. requiring matching successful Pages + Operations validation on the same content SHA before declaring the next canonical checkpoint.


## Dual expansion + direct business-program diversification checkpoint — 2026-10-07 01:35 UTC

Canonical validated content:
- Content commit: `bb2a0e6655d3e61fa40ce1db6cafad247a0b5b92`.
- **Deploy ERN to GitHub Pages #2683** (run 37557635829): SUCCESS.
- **ERN Operations Check #1464** (run 37557635833): SUCCESS.
- Pages and Operations validated the same content SHA before this handoff-only commit.

### Search / Explore expansion
Added **3 genuinely new healthy official Liechtenstein Tourism destinations**:
- **Pfälzerhütte — Alpine Hut View**
- **Balzers — Rhine Valley View**
- **Eschen — Unterland View**

All remain HEALTHY + EXTERNAL_LIVE + LINK_ONLY + EXTERNAL playback with Featured/Watch hold. They expand the existing official Liechtenstein webcam cluster without changing Watch Earth eligibility.

### Business expansion beyond the usual paths
Added current, exact-fit San Marino research paths for:
- **GetYourGuide** activities;
- **Booking.com** stays;
- **Expedia** stays.

Added routing that limits San Marino to at most one useful activity provider plus one stay provider after a visitor chooses the destination.

More importantly, ERN now explicitly records **direct-program alternatives** alongside Travelpayouts for:
- Booking.com Affiliate Partner Programme;
- Agoda Affiliate Program / Partner Center;
- Trip.com direct Affiliate Program;
- Expedia Group Travel Creator Program;
- GetYourGuide Partner Program;
- Omio direct Affiliate Programme;
- 12Go direct Affiliate Program.

These are diversification routes only. They are not treated as active until the owner account/application is approved and an exact tracked link is verified. Existing Travelpayouts routes remain available where useful.

### Current catalog / business state
- **706 healthy distinct searchable places**
- **711 healthy source records**
- **387 supplemental Search/Explore records**
- **457 commercial opportunity records**
- **81 utility-routing clusters**
- **484 source-research candidates**
- **8 unresolved research candidates**
- no duplicate source IDs;
- no duplicate place IDs across core/supplemental;
- no cross-core/supplemental duplicate titles.

### Commercial architecture principle strengthened
ERN should not become dependent on one affiliate network. For useful programs, preserve both:
1. a network route (for example Travelpayouts) when available; and
2. a direct partner/creator route when a legitimate current program exists.

Choose the route later based on actual owner approval, tracking reliability, geographic/product fit and user utility — **never commission size or payout as a discovery-ranking signal**.

### Protected invariants
- Watch Earth remains in-ERN-playback-only.
- LINK_ONLY / EXTERNAL records remain outside Watch Earth.
- IMAGE_REFRESH remains natural-schedule-only.
- Public generative Guide remains OFF.
- Public Now Moments remains OFF.
- No paid ranking, automatic affiliate placement, tracked-link rewriting, automatic social posting or unverified partner activation.
- Commercial value cannot alter source truth, currentness, health, ranking or editorial prominence.
- Existing lean-core and performance ceilings remain enforced.

### Next autonomous lane
Continue expanding both sides:
1. add genuinely new, trustworthy current/live Earth coverage with geographic and provider diversity;
2. keep resolving the remaining source-research queue conservatively;
3. widen business-program research beyond Viator/Travelpayouts, including direct programs where legitimate and useful;
4. strengthen stays, transport, connectivity, tickets/activities and niche destination utilities without affiliate clutter;
5. prefer one best provider per user need at a destination, with alternatives retained as fallbacks/research;
6. continue dedupe/source-health maintenance;
7. require matching Pages + Operations SUCCESS on the same content SHA before each new canonical checkpoint.


## Affiliate revenue-readiness truth checkpoint — 2026-10-07 01:54 UTC

Canonical validated content:
- Content commit: `0810a83e753b87ed637b073cd673cd3a616308b7`.
- **Deploy ERN to GitHub Pages #2684** (run 37559140274): SUCCESS.
- **ERN Operations Check #1465** (run 37559140277): SUCCESS.
- **ERN JavaScript Syntax Check #1068** (run 37559140285): SUCCESS.
- Pages, Operations, and syntax validation all passed on the same content SHA before this handoff-only commit.

### Revenue truth layer
Added `data/affiliate-revenue-readiness.json` so ERN now explicitly separates:
1. research-only commercial opportunities;
2. account/program availability;
3. exact tracked-link verification;
4. actual public revenue-active placement;
5. rejected/unavailable programs.

The core earning rule is now encoded in repository truth:
- ERN can earn only when a visitor uses a valid tracked affiliate surface and completes an eligible attributed transaction under that partner's rules.
- A commercial research record, ordinary untracked link, or merely available program does **not** count as revenue-producing.

Current verified evidence recorded in the truth layer:
- Viator relationship/tracked-link capability remains active.
- Travelpayouts human-verified destination links: **11 total**
  - Klook: **8**
  - Tiqets: **2**
  - Welcome Pickups: **1**
- These are verified tracking-capable destination links; revenue still depends on actual public placement, visitor click attribution, eligible purchase, and the partner's rules.

### Release guard strengthened
`scripts/commercial-placement-preflight.mjs` now cross-checks the revenue-readiness file against canonical activation evidence:
- verified Travelpayouts destination-link totals and per-program counts must match `affiliate-activation.json`;
- Viator active state must match canonical activation evidence;
- exact tracked-link and manual-verification gates must remain ON;
- automatic affiliate placement and link rewriting must remain OFF;
- commission cannot affect Earth ranking.

The build now fails if ERN's revenue-readiness claims drift away from the actual verified affiliate state.

### Research queue discipline
During this checkpoint, remaining unresolved source candidates were rechecked conservatively:
- Mauritius Now still advertises a Web CAM entry, but the official `/webcams-mauritius/` handoff currently returns 404; keep unresolved.
- Shenton Safaris / Zambia remains operational and current as a safari provider, but no durable current public webcam route was resolved; keep unresolved.
- Montserrat, New Caledonia and Guam remain unresolved under their existing exact-currentness/purpose gates.

No questionable source was promoted merely to increase count.

### Protected invariants
- Watch Earth remains in-ERN-playback-only.
- LINK_ONLY / EXTERNAL sources remain outside Watch Earth.
- Public generative Guide remains OFF.
- Public Now Moments remains OFF.
- No paid ranking, automatic affiliate placement, automatic tracked-link rewriting, automatic social posting, or unverified partner activation.
- Commercial value cannot affect Earth source truth, health, currentness, ranking or editorial prominence.
- Existing performance / lean-core ceilings remain enforced.

### Next autonomous lane
Continue from this checkpoint by:
1. converting a small number of the best already-active-partner opportunities into exact verified links when owner-side link generation is available, rather than simply accumulating partner names;
2. keeping direct-program diversification as research until real owner approval exists;
3. continuing geographically diverse current/live source expansion and unresolved-source resolution conservatively;
4. preserving one-best-provider-per-user-need presentation with fallbacks held in research;
5. continuing source-health / dedupe maintenance;
6. requiring matching Pages + Operations SUCCESS on the same content SHA before the next canonical production checkpoint.


## Affiliate revenue-readiness truth checkpoint — 2026-10-07 01:54 UTC

Canonical validated content:
- Content commit: `0810a83e753b87ed637b073cd673cd3a616308b7`.
- **Deploy ERN to GitHub Pages #2684** (run 37559140274): SUCCESS.
- **ERN Operations Check #1465** (run 37559140277): SUCCESS.
- **ERN JavaScript Syntax Check #1068** (run 37559140285): SUCCESS.
- Pages, Operations, and syntax validation all passed on the same content SHA before this handoff-only commit.

### Revenue truth layer
Added `data/affiliate-revenue-readiness.json` so ERN now explicitly separates research-only, account/program availability, exact tracked-link verification, actual public revenue-active placement, and rejected/unavailable programs.

The earning rule is now encoded in repository truth: ERN can earn only when a visitor uses a valid tracked affiliate surface and completes an eligible attributed transaction under that partner's rules. A research record, ordinary untracked link, or merely available program does not count as revenue-producing.

Current verified evidence:
- Viator relationship/tracked-link capability remains active.
- Travelpayouts human-verified destination links: **11 total** — Klook 8, Tiqets 2, Welcome Pickups 1.
- Revenue still depends on public placement, click attribution, eligible purchase, and partner rules.

### Release guard strengthened
`scripts/commercial-placement-preflight.mjs` now cross-checks the revenue-readiness file against canonical activation evidence. Verified counts, Viator active state, exact-link/manual-verification gates, no-auto-placement/no-auto-rewrite rules, and commission-neutral ranking must remain consistent or the build fails.

### Research queue discipline
Mauritius remains unresolved because the official Web CAM handoff currently returns 404. Zambia/Shenton remains unresolved because no durable current public webcam route was resolved. Montserrat, New Caledonia and Guam remain unresolved under their existing exact-currentness/purpose gates. No questionable source was promoted merely to increase count.

### Protected invariants
Watch Earth remains in-ERN-playback-only; public Guide and Now Moments remain OFF; no paid ranking, automatic affiliate placement, automatic tracked-link rewriting, automatic social posting, or unverified partner activation; commercial value cannot affect Earth truth, health, currentness, ranking or editorial prominence.

### Next autonomous lane
Continue converting a small number of high-fit already-active-partner opportunities into exact verified links when owner-side link generation is available; keep direct-program diversification as research until real owner approval exists; continue geographically diverse current/live expansion, source-health/dedupe maintenance, and require matching Pages + Operations SUCCESS on the same content SHA before the next canonical checkpoint.


## Africa live-discovery expansion checkpoint — 2026-10-07 02:25 UTC

Canonical validated content:
- Content commit: `39c4189b0af5abe708c9920516cf6224c1b34cdb`.
- **Deploy ERN to GitHub Pages #2686** (run 37561710727): SUCCESS.
- **ERN Operations Check #1467** (run 37561710733): SUCCESS.
- Pages and Operations validated the same content SHA before this handoff-only commit.

### Search / Explore expansion
Added three strong current/live destinations while preserving Search/Explore-only truth boundaries:
- **Maliba Lodge — Tsehlanyane National Park, Lesotho**: first-party lodge webcams; Maliba states two cameras update every 15 minutes. Truth remains `LIVE_IMAGE` + `LINK_ONLY` + external playback.
- **Chobe Safari Lodge — Bush Lounge Live Cam, Uganda**: first-party live camera from the lodge's hidden Bush Lounge in the Murchison Falls area. Truth remains `EXTERNAL_LIVE` + `LINK_ONLY`.
- **Majete Wildlife Reserve — Live Wildlife Cameras, Malawi**: PixCams / Majete Wildlife Reserve live wildlife network. MajeteWatch documents six solar-powered, Starlink-connected camera stations with continuous 24/7 live video. Truth remains `EXTERNAL_LIVE` + `LINK_ONLY`.

All three remain Featured/Watch held and do not enter Watch Earth.

### Commercial / utility diversification
- Existing Lesotho Viator research was extended to Maliba rather than creating duplicate camera-level offers.
- Added Murchison Falls / Uganda Viator research after current destination inventory verification, still owner-account + exact tracked-link gated.
- Added optional Uganda connectivity research and one `uganda-murchison-planning` routing cluster, limited to one useful safari/activity action plus one optional connectivity action after destination choice.
- No tracked URL, program approval, price promise, public affiliate activation, ranking boost or inferred owner-side availability was invented.

### Current validated catalog
- **709 healthy distinct searchable places**
- **714 healthy source records**
- **390 supplemental Search/Explore records**
- **459 commercial opportunity records**
- **82 utility-routing clusters**
- **487 source-research candidates**
- **8 unresolved research candidates**
- **12 source-maintenance priority records**
- No duplicate source IDs.
- No remaining cross-core/supplemental title duplicates.
- Four degraded fail-closed core records remain unchanged: `pattaya-city-live`, `takayama-miyagawa-current-image`, `jungfrau-region`, and `chidori-sakura`.

### Remaining unresolved-source truth
The unresolved queue was rechecked rather than promoted for volume:
- Uruguay / AntelTV: Antel still confirms cameras around Uruguay, but exact candidate playback may require login/registration and current public target resolution is not clean enough; keep unresolved.
- Montserrat / MVO: official remote cameras remain active 24 hours and record imagery, but the public still-image freshness timestamp remains unresolved; keep unresolved.
- Mauritius: official tourism still advertises 13 webcams / “See Mauritius live,” but the current webcam handoff remains unreliable; keep unresolved.
- New Caledonia / Kuto: known tourism-office image endpoint remains insufficiently timestamped for ERN currentness certification; keep unresolved.
- Zambia / Shenton: historical/current webcam references remain, but no durable currently-live public target is verified; keep unresolved.
- Guam: government live-streaming surface exists, but scenic destination-camera purpose/target is still not established; keep unresolved.

### Revenue truth preserved
- Affiliate revenue readiness remains governed by `data/affiliate-revenue-readiness.json` and `data/affiliate-activation.json`.
- Do not inflate the human-verified Travelpayouts destination-link count without owner verification evidence.
- Research-only opportunities are not revenue-active links.
- Public commercial activation, disclosure, exact-link verification and commission-neutral ranking safeguards remain unchanged.

### Protected invariants
Watch Earth remains in-ERN-playback-only; LINK_ONLY / EXTERNAL sources remain outside Watch Earth; IMAGE_REFRESH remains natural-schedule-only; public Guide and Now Moments remain OFF; no paid ranking, automatic affiliate placement, automatic tracked-link rewriting, automatic social posting or unverified partner activation; commercial value cannot affect Earth truth, health, currentness, ranking or editorial prominence; existing lean-core / performance ceilings remain enforced.

### Next autonomous lane
Continue from this checkpoint by:
1. resolving the remaining eight research candidates only when exact current/live evidence becomes strong enough;
2. prioritizing genuinely new countries/territories and provider diversity over alternate IDs;
3. favoring exact verified links from already-active partners over accumulating more commercial program names;
4. continuing source-health and dedupe maintenance before volume growth;
5. requiring matching successful Pages + Operations on the same content SHA before the next canonical production checkpoint.


## Autonomous Namibia + Serengeti expansion checkpoint — 2026-10-07 02:47 UTC

Canonical validated content:
- Content commit: `fb1d568ab079df632cf7de82016e54f8fa540c03`.
- **Deploy ERN to GitHub Pages #2690** (run 37563437674): SUCCESS.
- **ERN Operations Check #1471** (run 37563437651): SUCCESS.
- Pages and Operations validated the same content SHA before this handoff-only commit.

### Search / Explore expansion
Added three healthy Search/Explore-only live wildlife destinations:
- **Safarihoek — Etosha Heights Waterhole**, Namibia — Africam / Safarihoek.
- **Onguma — The Fort Waterhole**, Namibia — Africam / Onguma.
- **Serengeti — Elewana Explorer Live Stream**, Tanzania — Africam / Elewana Serengeti Explorer.

All three are `EXTERNAL_LIVE` + `LINK_ONLY`, remain Featured/Watch held, and do not enter Watch Earth because Watch Earth remains in-ERN-playback-only.

### Commercial / utility diversification
- Existing Viator Etosha planning now covers the new Safarihoek and Onguma discovery places after current 2026 Etosha inventory verification.
- Added Namibia Airalo connectivity research; activation remains owner-project + exact tracked-link gated.
- Added a bounded `namibia-etosha-planning` route with at most one exact safari/activity action plus one optional connectivity action.
- Added Viator Serengeti planning after current 2026 Serengeti inventory verification.
- Added Tanzania Airalo connectivity research and `tanzania-serengeti-planning` with the same one-activity + one-connectivity limit.
- No lodge pickup, transfer inclusion, park access, price, affiliate availability or tracked-link attribution was invented.

### Source-health maintenance / false-recovery guard
A Pattaya City recovery attempt was intentionally rejected by ERN's release guard:
- the official Pattaya portal currently advertises **600 cameras** and lists many beach/city camera locations;
- however, the public per-camera retrieval path still resolves to **0 playable cameras** in current automated verification;
- Pages #2689 correctly failed `source-research-stale-debt.smoke.js` when Pattaya was prematurely marked current;
- the health promotion was reverted in `fb1d568...`;
- `pattaya-city-live` therefore remains DEGRADED / fail-closed until real public playback for an individual camera is independently verified.

Jungfrau remains correctly DEGRADED because the current official Jungfrau live page still reports its webcam set offline. Chidori-ga-fuchi remains seasonal/off-season, and Takayama Miyagawa remains a stale companion current-image source.

### Current validated catalog
- **712 healthy distinct searchable places**
- **717 healthy source records**
- **393 supplemental Search/Explore records**
- **462 commercial opportunity records**
- **84 utility-routing clusters**
- **490 source-research candidates**
- **8 unresolved research candidates**
- **12 source-maintenance priority records**
- Four degraded fail-closed core records remain: `pattaya-city-live`, `takayama-miyagawa-current-image`, `jungfrau-region`, and `chidori-sakura`.

Remaining unresolved research is limited to Montevideo/Antel (3), Montserrat, New Caledonia/Kuto, Mauritius official webcam network, Zambia/Shenton Safaris, and Guam government live-streaming. Keep these unresolved until exact current/live destination evidence satisfies the existing truth rules.

### Protected invariants
Watch Earth remains in-ERN-playback-only; LINK_ONLY / EXTERNAL sources remain outside Watch Earth; IMAGE_REFRESH remains natural-schedule-only; public Guide and Now Moments remain OFF; no paid ranking, automatic affiliate placement, automatic tracked-link rewriting, automatic social posting or unverified partner activation; commercial value cannot affect Earth truth, health, currentness, ranking or editorial prominence; existing lean-core / performance ceilings remain enforced.

### Next autonomous lane
Continue from this checkpoint by:
1. resolving the remaining eight research candidates only with exact current/live proof;
2. prioritizing genuinely new geography and provider diversity rather than alternate IDs;
3. favoring useful exact planning bridges from already-active/verified partner families;
4. continuing source-health and dedupe maintenance before raw volume growth;
5. treating the Pattaya incident as a permanent guardrail: collection inventory or portal reachability alone does not prove playable live output;
6. requiring matching successful Pages + Operations on the same content SHA before the next canonical production checkpoint.


## Public affiliate revenue-truth reconciliation checkpoint — 2026-10-07 02:56 UTC

Canonical validated content:
- Content commit: `ca73e640b0f82c37bc4288271ce7e76bfbce2226`.
- **ERN JavaScript Syntax Check #1069**: SUCCESS.
- **Deploy ERN to GitHub Pages #2691**: SUCCESS.
- **ERN Operations Check #1472**: SUCCESS.
- Syntax, Pages and Operations validated the same content SHA before this handoff-only commit.

### Commercial truth now explicit
ERN now distinguishes the public revenue-active offer layer from the broader commercial research registry:
- **31 current verified affiliate offers** are active in `data/travel-offers.json` and backed by enabled/current affiliate partners.
- Program split: **17 Klook, 6 Viator, 5 Tiqets, 3 Welcome Pickups**.
- These 31 public offer rows cover 31 ERN places. Some destination-level links are intentionally shared across multiple relevant place pages, so unique tracked URLs are lower: Viator 5, Klook 11, Tiqets 4, Welcome Pickups 3.
- The broader commercial research registry contains **462 opportunities**. Research-only / exact-link-gated rows are not counted as revenue-active.

`data/affiliate-revenue-readiness.json` now carries a `currentPublicRevenueActive` snapshot and definition. `scripts/commercial-placement-preflight.mjs` now fails release if the reported public-active offer count or by-program counts drift from the actual current verified offer layer and enabled partner state.

Revenue truth remains conservative:
- a public revenue-active offer means a current verified tracked affiliate offer is exposed through ERN's approved offer layer;
- commission is never guaranteed and still depends on valid click attribution, an eligible purchase and partner rules;
- commercial state never affects Earth source truth, health, currentness, ranking or editorial prominence;
- no automatic affiliate placement, tracked-link rewriting, paid ranking or unverified partner activation was introduced.

### Architecture check
- Commercial registry checked for exact partner + destination + place-set duplicate opportunity groups: none found.
- Existing public generative Guide remains OFF.
- Public Now Moments remains OFF.
- Watch Earth remains in-ERN-playback-only.
- LINK_ONLY / EXTERNAL sources remain Search/Explore-only unless independently eligible for in-ERN playback.

### Next autonomous lane
1. Keep the 31-offer public revenue-active layer synchronized with verified links and partner verification horizons.
2. Prefer conversion of high-fit existing opportunities into exact verified links over accumulating more program names.
3. Continue current/live Earth expansion only where exact evidence is strong; unresolved Uruguay, Montserrat, New Caledonia/Kuto, Mauritius, Zambia/Shenton and Guam candidates remain fail-closed.
4. Continue source-health / dedupe maintenance and preserve the Pattaya false-recovery guardrail.
5. Require matching successful Pages + Operations on the same content SHA before the next canonical checkpoint.

## Affiliate conversion-first checkpoint — 2026-10-07 03:14 UTC

Canonical validated content:
- Content commit: `0a9380af9dbee0cab94e54432019bee2f2b5c943`.
- **Deploy ERN to GitHub Pages #2693** (run 37565610101): SUCCESS.
- **ERN Operations Check #1474** (run 37565610059): SUCCESS.
- The immediately preceding conversion commit `d2913b002a563e2194c2221a55ba3c9602609770` also passed Pages #2692 and Operations #1473.
- Pages and Operations therefore validated the same final content SHA before this handoff-only commit.

### Strategy shift: conversion over research accumulation
This checkpoint intentionally did **not** increase the commercial research registry. It remains **462 opportunities**.

Instead, **18 high-fit existing Viator opportunities** were converted from exact-link-gated research into real tracked destination links using ERN's already owner-verified Viator partner identity (`pid=P00322254`, `mcid=42383`) on exact Viator destination routes whose current 2026 inventory was independently rechecked.

Converted destinations:
- Zermatt / Matterhorn
- Dubrovnik
- Aruba
- Santorini
- Chamonix / Mont Blanc
- Madeira
- Grand Canyon National Park
- Faroe Islands / Tórshavn
- Etosha National Park
- São Miguel, Azores
- Istanbul
- Bergen
- Nuuk
- St. John's, Newfoundland
- Shetland Islands / Lerwick
- Swakopmund
- Innsbruck / Tyrol
- Windhoek

### Revenue-capable layer after conversion
`data/affiliate-revenue-readiness.json` and `data/travel-offers.json` are synchronized at:
- **49 current public revenue-capable affiliate offer rows**
- **44 unique ERN places**
- program split: **24 Viator, 17 Klook, 5 Tiqets, 3 Welcome Pickups**
- unique tracked URLs: **23 Viator, 11 Klook, 4 Tiqets, 3 Welcome Pickups**

Before this conversion-first batch, the public revenue-capable layer was 31 offers and Viator represented 6 offer rows. The gain came from conversion of existing researched destinations, not from expanding the 462-row opportunity queue.

### Verification truth
For the newly converted Viator destinations:
- current destination/activity inventory was manually reviewed against current 2026 Viator search/index evidence;
- the exact destination path was already present in ERN's researched opportunity record or independently revalidated;
- the affiliate query parameters reuse the same active ERN Viator identity already owner-verified on earlier Auckland, Dublin, Cape Town, Petra and Muscat links;
- each opportunity and offer records this verification method explicitly;
- `manualOpenVerified:false` is retained on these newly composed destination links so ERN does **not** falsely claim that the owner personally clicked every exact URL in this batch.

This distinction is intentional: these are real ERN tracked URLs built from an already verified partner identity and current exact destination routes, but a separate owner click-through is not fabricated.

### Commercial architecture preserved
- Commercial research opportunity count remains 462.
- No Klook, Tiqets or other Travelpayouts short URL was invented. Those programs still require a real generated short link from the owner project before new activation.
- No automatic tracked-link rewriting or automatic affiliate placement was introduced.
- Commercial value still cannot affect Earth source truth, currentness, health, ranking or editorial prominence.
- One useful destination-level action is preferred over multiple near-duplicate commercial buttons.
- Commission remains contingent on valid attribution, eligible purchase and partner rules; no earnings guarantee is implied.

### Next autonomous lane
1. Continue conversion-first work: prioritize strong existing Viator opportunities with exact destination routes and current inventory rather than increasing the 462 opportunity count.
2. For Klook/Tiqets/other Travelpayouts programs, convert only when a genuine owner-project tracking URL exists; never synthesize short links.
3. Watch real outbound/click evidence and favor destinations actually drawing visitor interest.
4. Consolidate duplicate commercial actions rather than increasing button density.
5. Keep public-revenue counts synchronized with `data/travel-offers.json` and current partner verification horizons.
6. Continue Earth/source maintenance independently, but do not use new source expansion as a reason to inflate commercial research volume.
7. Require matching successful Pages + Operations on the same content SHA before the next canonical production checkpoint.

## Revenue activation + source-reconciliation checkpoint — 2026-10-07 03:40 UTC

Canonical validated content:
- Content commit: `b96ad14e05d2eb115acac9793d12e1cdedc00b1a`.
- **Deploy ERN to GitHub Pages #2695** (run 37566864310): SUCCESS.
- **ERN Operations Check #1476** (run 37566864307): SUCCESS.
- **ERN JavaScript Syntax Check #1071** (run 37566864331): SUCCESS.
- Pages, Operations and syntax validation passed on the same content SHA before this handoff-only commit.
- The preceding Pages #2694 / Operations #1475 failure on `f3860785...` is superseded. Its cause was a commercial-readiness count drift after four new verified placements; the product code itself passed syntax. The readiness model was repaired and then passed the full release suite.

### Business / commission side
ERN now distinguishes clearly between research coverage and genuinely revenue-capable placement.

Current verified affiliate inventory:
- **53 verified current affiliate offers** in the offer registry.
- **52 offers across 47 currently HEALTHY ERN places are revenue-eligible today** after source-health gating.
- Program mix for currently revenue-eligible placements:
  - Viator: **26**
  - Klook: **18**
  - Tiqets: **5**
  - Welcome Pickups: **3**
- The 53rd verified offer is Tokyo / Chidori-ga-fuchi. It remains fail-closed because that Earth source is currently DEGRADED / off-season.
- Existing unique tracked-link identities remain unchanged; no affiliate URL was invented.

Four additional placements were activated by reusing owner-verified destination-level links only for genuinely same-destination ERN places:
- Ounasvaara → verified Klook Rovaniemi destination link;
- Sentosa Gateway → verified Klook Singapore destination link;
- Dublin Port → verified Viator Dublin destination link;
- Camps Bay → verified Viator Cape Town destination link.

Commercial architecture improvements:
- commercial attribution/source eligibility now includes both canonical core and supplemental Search/Explore catalogs;
- Travel Bridge affiliate links now carry the offer ID expected by ERN first-party aggregate outbound-click telemetry;
- commercial inventory status now evaluates supplemental revenue-capable places correctly;
- Travelpayouts state explicitly allows deliberate manually verified tracked links while Drive/automatic monetization and automatic link rewriting remain OFF;
- public placement permission is scoped only to exact verified destination links;
- release preflight now requires a currently HEALTHY `LIVE_VIDEO`, `LIVE_IMAGE` or `EXTERNAL_LIVE` source before an affiliate offer counts as public revenue-active.

This does **not** claim that every click or purchase earns commission. Actual revenue still depends on visitor click attribution, eligible purchase completion and each partner's rules.

### Search / Explore and architecture side
Current catalog:
- core sources: **328**
- supplemental Search/Explore sources: **393**
- combined source records: **721**
- healthy source records: **717**
- healthy distinct searchable places: **712**
- commercial research opportunities: **462**
- utility-routing clusters: **84**
- source-research candidates: **490**
- source-maintenance priority records: **12**

Research reconciliation:
- **62 previously promoted research candidates** were reconciled to their already-existing canonical core records instead of remaining as false unresolved work.
- Provenance remains preserved; no public place/source coverage was removed.
- Examples include Vienna, Finland, Istanbul, Denpasar, multiple volcano-monitoring networks, Hong Kong, Iceland, Madeira, Taiwan, Peru, Kuredu, Barbados, Cape Verde, Petra, Muscat and Fiji.

The genuinely unresolved exact-current queue is now only **8**:
- Montevideo / Pocitos Beach;
- Montevideo / Plaza Independencia;
- Montevideo / Mercado del Puerto;
- Soufrière Hills / Montserrat;
- Île des Pins / Kuto, New Caledonia;
- Mauritius official tourism webcam network;
- South Luangwa / Shenton Safaris, Zambia;
- Government of Guam live-streaming surface.

Keep these fail-closed until exact current/playback truth is resolved.

Four degraded core sources remain intentionally fail-closed:
- `pattaya-city-live`;
- `takayama-miyagawa-current-image`;
- `jungfrau-region`;
- `chidori-sakura`.

### Funding-oriented next autonomous lane
1. Prefer converting high-fit opportunities from **already active/available programs** into exact verified tracked links over simply adding more commercial research rows.
2. Reuse an existing verified destination link only when the ERN place is genuinely within the same destination scope; never stretch city/region meaning just to increase monetization.
3. For Travelpayouts short links, do not invent URLs. New Klook/Tiqets/Welcome Pickups/Airalo/etc. links still require generation through the owner Earthrightnow Project and manual verification before activation.
4. Continue Viator conversion only where an exact useful destination/product path and ERN affiliate attribution can be verified conservatively.
5. Maintain aggregate outbound-click telemetry as click evidence only; never infer booking/revenue without partner evidence.
6. Continue broad trustworthy Earth expansion and exact-current source repair in parallel, with source quality and visitor utility always independent of commission.
7. Require same-content SHA successful Pages + Operations validation for the next canonical production checkpoint.

### Protected invariants
Watch Earth remains in-ERN-playback-only; LINK_ONLY / EXTERNAL additions remain outside Watch Earth; IMAGE_REFRESH remains natural-schedule-only; public generative Guide and Now Moments remain OFF; no paid ranking, automatic affiliate placement, automatic tracked-link rewriting, automatic social posting or unverified partner activation; commission cannot affect source truth, health, currentness or editorial ranking; existing lean/performance ceilings remain enforced.

