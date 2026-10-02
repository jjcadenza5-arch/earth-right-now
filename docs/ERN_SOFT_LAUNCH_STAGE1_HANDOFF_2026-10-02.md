# ERN Canonical Handoff — Soft Launch / Operating Stage 1
Updated: 2026-10-02

## Current operating state
Earth Right Now (ERN) has entered a controlled **Soft Public Launch / Real Operating Period**.

Operating stage:
- **ERN Soft Launch / Operating Stage 1**
- state: **ACTIVE / OPERATING**
- mode: **OPERATE_NOT_EXPAND**

This is not a new broad feature phase. Phases 6–10 remain complete.

## Product identity to preserve
- **Earth Right Now — The Live Discovery Engine**
- *See before you go.*
- Product direction: **Live Discovery Search Engine**
- Core journey: **Search → See Live → Discover → Decide → Go**

Immediate operating goal:
> Stop expanding ERN sideways. Let the simple Live Discovery Engine operate in the real world, keep it reliable, and begin proving that it can become a Successful Small Internet Business.

## Owner approval recorded
Canonical approval:
`data/soft-launch-stage1-approval.json`

Operating workplan:
`data/soft-launch-stage1-workplan.json`

The owner explicitly approved soft public launch of the current simple product, while keeping all separately gated capabilities off.

## Operating lanes
Active operating lanes:
- production-operation — keep the public site stable and production-healthy;
- source-operation — maintain truth, health, currentness and fallback integrity;
- commercial-operation — maintain verified post-discovery commercial actions and verification horizons;
- operating-evidence — record only confirmed production/business facts.

Held/gated lane:
- future-differentiator-hold — preserve ERN Guide, 45-minute Now Moments, serendipity/“crispy pork skin”, Local Earth and future business/travel connections without activation.

## Real-world production heartbeat
Daily Operations now performs a real custom-domain health check using:
`npm run domain:health`

The retained Operations packet includes:
- `domain-health.json`
- `soft-launch-stage1-status.json`

The first Stage 1 production heartbeat on 2026-10-02 reported:
- host: `earthrightnow.app`
- domain state: **OK**
- GitHub Pages DNS state: **OK**
- HTTPS: **OK**
- TLS certificate covers `earthrightnow.app` and `www.earthrightnow.app`
- Stage 1 state: **OPERATING**
- Stage 1 blockers: **0**

This is network/production health evidence from CI. It is not a claim of a physical-device or manual browser test.

## Soft-launch production repair
The first Stage 1 release validation found one genuine public-route issue:
- the homepage/localized discovery surfaces linked to `/discover/wildlife-nature/`;
- the generator skipped that route when the collection temporarily had zero eligible current/schedule-verified rows;
- this also removed the route from the generated sitemap.

Repair:
- empty editorial collections remain crawlable instead of becoming broken links;
- no source is invented, promoted or relabeled to fill an empty collection;
- a zero-item collection remains truthful.

After the repair, the full release smoke suite and all Pages production/deploy steps passed.

## Business operating baseline
Stage 1 status records only confirmed evidence.

Current verified commercial foundation:
- verified affiliate partners: **4**
- verified travel offers: **11**
- Travelpayouts project active: **YES**
- exact tracked links already live: **YES**
- payout method configured: **NO**

The payout method is a future human/account action required before receiving payouts; it does not block ERN public operation or existing tracked links.

Because analytics remains OFF, Stage 1 explicitly records:
- traffic measured: **NO**
- bookings measured: **NO**
- conversions measured: **NO**
- revenue measured: **NO**

Do not infer any of those from clicks, links, partner readiness, source traffic or public availability.

## Commercial operating rule
The operating sequence remains:
**visitor → discovery → useful travel/business opportunity → optional verified commercial action**

Commercial relationships remain downstream from Earth discovery.

Never allow:
- payment or commission to affect Earth-window ranking;
- unverified offers to display;
- stale-only places to become commercial surfaces;
- automatic link rewriting;
- automatic commercial placement;
- automatic partner/account applications;
- booking or revenue inference.

Do not expand affiliate breadth merely because more programs exist. Maintain the current small verified inventory until real visitor utility or verified external evidence justifies a change.

## Gates that remain OFF
Unless the owner explicitly approves otherwise:
- public generative ERN Guide OFF;
- 45-minute Now Moment media OFF;
- Pilot 2 OFF;
- public Submission intake OFF;
- analytics OFF;
- social-account actions OFF;
- payout/account actions OFF;
- all other separately gated features OFF.

Also:
- no major PR campaign;
- no paid marketing;
- no new external accounts;
- no spending;
- no irreversible business/account changes;
- no credential exposure;
- no paid ranking.

Earth Signals Pilot 1 remains governed by its existing limited-pilot approval and safety rules.

## Future differentiators — preserve, do not activate
ERN Guide:
- future conversational live discovery layer;
- must remain downstream from truthful current-source evidence;
- public generative mode remains OFF.

45-minute Now Moments:
- future temporary visitor glimpse;
- must show freshness and remaining lifetime clearly;
- must remain separate from camera/source truth;
- public media remains OFF.

Crispy Pork Skin Principle:
- ERN should surface useful, interesting small nearby discoveries people did not know to search for;
- serendipity is editorial discovery, not paid placement.

Local Earth / nearby discovery:
- preserve as the path for smaller useful places and nearby context;
- payment never buys discovery ranking.

Future business/travel connections:
- attach after discovery/decision;
- keep simple, verified and secondary to the Earth experience.

## Anti-expansion operating rule
Do not manufacture work.

Do not:
- begin another broad feature phase;
- redesign working surfaces without a production reason;
- increase source count for its own sake;
- increase partner/offer count for its own sake;
- reopen completed Phase 6–10 work;
- repeatedly retest known human-playback failures without a material provider/target change.

Act only on:
- real production/release failures;
- source evidence/currentness changes;
- verification horizons becoming due;
- commercial offer/partner expiry or material evidence;
- explicit owner approvals;
- genuine owner/account/business decisions.

## Current validation evidence
Stage 1 Operations heartbeat:
- run `36968809467` — **SUCCESS**
- domain health: **OK**
- Stage 1 status: **OPERATING**
- packet integrity: **SUCCESS**

Soft-launch release repair:
- Pages run `36968978722`
- release smoke suite: **SUCCESS**
- public launch/mobile/accessibility/performance/commercial checks: **SUCCESS**
- static release build: **SUCCESS**
- artifact upload: **SUCCESS**
- GitHub Pages deploy step: **SUCCESS**

## What to do next
Continue operating autonomously through the existing scheduled Operations checks.

Only return to the owner when:
1. a genuine owner approval/account/business decision is required;
2. a gated feature is ready for explicit approval;
3. a real production issue requires direct human/browser/device testing;
4. or a substantial operating/business-readiness review point has accumulated.

Until then, the correct state is:
**OPERATE · VERIFY · MAINTAIN · DO NOT EXPAND**
