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
