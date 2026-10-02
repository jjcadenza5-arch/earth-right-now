# ERN Affiliate Coverage Expansion — Owner Audit — 2026-10-02

Stage: **Soft Launch / Operating Stage 1**

Product boundary:
**Earth Right Now — The Live Discovery Engine**
*See before you go.*

Journey:
**Search → See Live → Discover → Decide → Go**

Commercial rule:
Earth discovery and source ranking remain independent of commission, payout, partner status and commercial availability. Commercial actions are optional downstream planning paths.

## Verified active relationships

| Partner/network | Relationship | Tracking | Primary categories | Current verified ERN coverage | Account/payout notes |
|---|---|---|---|---|---|
| Viator Partner Program | ACTIVE_PARTNER_VERIFIED | Exact tracked links allowed | activities, tickets | Auckland | Viator relationship active; no new account required |
| Klook via Travelpayouts | ACTIVE / human-verified manual links | Travelpayouts exact links | activities, attractions | Auckland, New York, Tokyo, Sydney, Honolulu/Waikiki | Travelpayouts project active; destination links must be deliberately generated and verified |
| Tiqets via Travelpayouts | ACTIVE / human-verified manual links | Travelpayouts exact links | attractions, museums, landmark tickets | Statue of Liberty / New York | Travelpayouts project active; destination links must be deliberately generated and verified |
| Welcome Pickups via Travelpayouts | ACTIVE / human-verified manual links | Travelpayouts exact links | airport/destination transfers | Auckland | Travelpayouts project active; destination links must be deliberately generated and verified |

Travelpayouts Earthrightnow Project is active/green with 26 programs observed. Travelpayouts Drive, automatic link rewriting and automatic placement remain disabled.

**Payout method is not configured.** This does not block current tracked links, but it blocks receiving a payout and requires owner account action before first payout.

## Current verified public offers

Current registry: **11 offers / 7 ERN place IDs / 5 destination areas**.

### Auckland
- Viator — activities — destination-level activity path — attributable.
- Klook — activities — destination-level tracked link — attributable.
- Welcome Pickups — airport transfer — destination-level tracked link — attributable.

### New York / Statue of Liberty
- Klook — activities — New York destination link on skyline and both Statue of Liberty place IDs — attributable.
- Tiqets — Statue of Liberty tickets/tours — both Statue of Liberty place IDs — attributable.

### Tokyo
- Klook — activities — Tokyo destination link — attributable when the referenced ERN source is currently eligible.

### Sydney
- Klook — activities — Sydney destination link — attributable when the referenced ERN source is currently eligible.

### Honolulu / Waikiki
- Klook — activities — Honolulu destination link — attributable when the referenced ERN source is currently eligible.

All public affiliate offers fail closed if partner verification expires, the offer verification expires, or the referenced ERN source is no longer currently eligible.

## Analytics evidence

Private Operations analytics is active and must remain private.

The first soft-launch sample is too small for demand-driven commercial ranking:
- no affiliate/commercial outbound actions recorded yet;
- source/live outbound actions are being recorded separately;
- search-gap logging is active;
- early place-view counts are insufficient to justify broad commercial expansion.

Therefore this expansion should follow the existing visitor-utility opportunity queue rather than overfit the first sample.

## Next exact-link batch

These destinations already have useful current ERN discovery and strong public partner inventory. Public placement still requires account-generated ERN tracked links.

### Batch A — highest-value next placements
1. **Kyoto → Klook**
   - ERN has five source-specific Kyoto windows.
   - Klook currently has a deep Kyoto activities inventory.
   - Preferred action: one destination-level Kyoto tracked link, not multiple product links.

2. **Seoul → Klook**
   - ERN has the Seoul Plaza 24h live source.
   - Klook currently has broad Seoul activities/attractions inventory.
   - Preferred action: one destination-level Seoul tracked link.

3. **Rome → Tiqets**
   - ERN has a current Spanish Steps live view.
   - Tiqets currently has broad Rome attraction/ticket inventory.
   - Preferred action: one Rome destination/attractions tracked link.

4. **Rovaniemi / Santa Claus Village → Klook**
   - ERN has a strong official current Arctic Circle window.
   - Klook currently has a Rovaniemi destination inventory including Santa Claus Village / Lapland activities.
   - Preferred action: one destination-level Rovaniemi tracked link.

### Batch B — after Batch A or when analytics supports it
- Dublin → Klook
- Chicago → Tiqets
- Bangkok → Klook
- Singapore → Klook
- London → Klook

No Batch B link should be created merely to increase offer count.

## Category gaps

### Covered
- activities / tours
- attraction and landmark tickets
- airport/destination transfer

### Missing or weak
- **accommodation / stay** — largest current gap.
- **car rental / broader ground transport** — useful for park, island and regional destinations.
- local food / local experiences — can remain non-commercial until a verified partner fit exists.
- flights — lower priority for the immediate See Live → Decide → Go moment.

Booking.com affiliate application was rejected on 2026-09-28 and is not an active relationship.
Agoda and Skyscanner are research-only / application-required.
Do not create accounts, reapply, or accept new terms without owner approval.

## Measurement and attribution

ERN first-party analytics distinguishes:
- source/live outbound opens;
- travel/affiliate offer opens;
- offer ID;
- ERN place ID;
- intent;
- link scope;
- affiliate/sponsored flag.

An outbound click is **not** treated as evidence of booking, sale, eligible transaction, commission or revenue.

Partner-side transaction/revenue reporting remains the authoritative source for downstream conversion. ERN should connect that evidence only when it is available from an approved partner/account workflow without collecting unnecessary visitor identity.

## Owner-only actions now required

1. In the existing Travelpayouts Earthrightnow Project, generate and verify exact destination-level links for Batch A:
   - Klook Kyoto
   - Klook Seoul
   - Tiqets Rome
   - Klook Rovaniemi

2. Configure the Travelpayouts payout method **before first payout**. This is not required for current click tracking, but it is required to receive money.

Do not activate Travelpayouts Drive or automatic link rewriting.

## Completion condition for this expansion tranche

After the four exact links are supplied/verified:
- add them to `data/travel-offers.json`;
- keep one useful destination-level action per partner/destination unless a distinct visitor need justifies more;
- run commercial placement preflight, release smoke, analytics/privacy guards and public link validation;
- verify attribution events;
- deploy without changing discovery ranking.

Near-term business milestone remains:
**visitor → discovery → useful travel action → affiliate click → eligible transaction**

First proof target:
**first real revenue from a stranger**.
