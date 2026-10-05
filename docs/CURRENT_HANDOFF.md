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
