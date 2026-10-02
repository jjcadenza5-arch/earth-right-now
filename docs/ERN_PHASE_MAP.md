# ERN Product Phase Map

Canonical phase framing for Earth Right Now (ERN). This document describes product maturity, not public marketing.

## Phase 1 — Foundation / Prototype
**State: COMPLETE**

Purpose:
- prove the core “See before you go” idea;
- establish Hero, Watch Earth, Atlas, Explore and source labels;
- learn from early navigation/playback problems.

Exit condition:
- stable enough architecture to stop rebuilding from scratch.

## Phase 2 — Stable Beta / Truth Architecture
**State: COMPLETE**

Purpose:
- make source truth reliable and fail-closed;
- separate LIVE VIDEO, LIVE IMAGE, EXTERNAL LIVE, PARTNER and PREVIEW;
- establish playback/currentness horizons, attribution, schedule-aware availability, degraded/recheck states, deep-link truth, offline boundaries and release gates;
- establish a stable public shell across desktop/mobile.

Exit condition:
- ERN can remain online without knowingly presenting stale/reference content as current.

## Phase 3 — Intelligence, Discovery & Readiness
**State: COMPLETE**

Purpose:
- make ERN useful beyond a list of cameras;
- deterministic ERN Guide;
- Stories;
- personalized/current Watch Earth;
- geographic/provider diversity;
- crawlable destination pages;
- Local Earth reviewed places;
- travel-planning links after editorial selection;
- organic/AI-search readiness;
- business/affiliate readiness;
- participation infrastructure prepared but PUBLIC-OFF;
- privacy, moderation, retention, rate-limit and operator boundaries prepared before activation.

Completion condition:
- stable beta release and truth architecture are green;
- deterministic Guide, Stories, Local Earth, destination/discovery and commercial-readiness layers are established;
- Earth Signals and Submission infrastructure are deployed fail-closed with live health evidence;
- public activation remains separated from infrastructure deployment;
- operator/handoff state records remaining external/product gates;
- no major provider-concentration or catalog-integrity blocker remains.

### Phase 3 exit criteria
Phase 3 is complete when:
1. normal Pages releases remain green after participation/readiness hardening;
2. public truth/currentness/discovery surfaces have no known release blocker;
3. participation stacks are deployable fail-closed with secrets isolated and operator controls prepared;
4. all PUBLIC-OFF features require explicit activation rather than becoming visible through deployment alone;
5. operator/handoff state clearly lists remaining human/provider gates;
6. no major provider-concentration or catalog-integrity debt remains.

## Phase 4 — Controlled Infrastructure Pilots
**State: COMPLETE FOR PHASE 5 ENTRY — PILOT 1 REMAINS ACTIVE/OBSERVED**

Purpose:
- deploy selected prepared backends while they are still OFF;
- verify health, cost, storage, moderation and cleanup in production;
- intentionally activate one small feature/pilot at a time only after evidence passes.

Current Phase 4 progress:
1. Earth Signals Worker is deployed and the limited structured-signal public pilot is ACTIVE.
2. Live health verified contributions enabled, durable storage healthy, runtime secrets configured, no raw network identifiers stored and no secret exposure.
3. Submission Worker remains deployed but PUBLIC-OFF.
4. Now Moment media remains prepared but NOT_DEPLOYED / PUBLIC-OFF.
5. Storage, rate limits, moderation, retention, privacy and rollback boundaries remain enforced.
6. The current Phase 4 task is observation of Pilot 1; do not open Pilot 2 while Pilot 1 is still being validated.

Controlled sequence:
1. keep deployed infrastructure OFF;
2. verify health, limits, storage and cleanup;
3. select one small pilot;
4. obtain explicit activation approval;
5. enable only that pilot;
6. observe/review;
7. expand only if useful and stable.

Human gates:
- Cloudflare credentials / account resources;
- explicit approval to deploy prepared Workers;
- explicit approval before any visitor-facing activation;
- Seoul API credential if Seoul context is pursued;
- social-account connection if ERN starts official channels;
- affiliate/provider account actions where external services require account-owner approval.

## Phase 5 — Broader Public Operations & Monetization
**State: ACTIVE — ENTRY APPROVED; SEPARATE FEATURE GATES OFF**

Purpose:
- broader public opening;
- routine operations/monitoring;
- official social/distribution channels;
- scaled Local Earth / partner intake;
- more destinations and context;
- selective monetization around visitor intent;
- possibly public generative Guide after cost/privacy/quality gates.

Phase 5 entry gate:
- Phase 4 Pilot 1 must complete at least 24 hours of healthy observation;
- current live health must still be green;
- core stable-beta gates must remain green;
- Submission, Now Moment media and generative Guide remain separately gated;
- meeting the technical gate creates human-review eligibility only;
- explicit human approval is required before Phase 5 entry;
- automatic Phase 5 entry and automatic Pilot 2 activation are forbidden.

Canonical readiness: `npm run phase5:readiness -- <current-earth-signals-live-health.json>`.

This phase does not remove ERN’s core rules:
- truth before quantity;
- usefulness before monetization;
- no ranking for sale;
- visitor contributions never create camera LIVE truth;
- Unknown/recheck is preferable to invented certainty.

## Phase 6 — Discovery & Growth
**State: COMPLETE**

Purpose:
- move ERN from a stable operating site toward an ERN-style Earth discovery/search product;
- improve deterministic search, intent discovery, destination pathways and crawlable usefulness;
- strengthen on-site journeys from curiosity → current Earth window → destination context → optional verified action;
- improve reliability/performance without reopening completed infrastructure lanes.

Phase 6 may proceed autonomously only in non-gated work. The following remain separately OFF unless explicitly approved: Pilot 2, Submission public intake, Now Moment media, public generative Guide, analytics, social-channel connection and any other separate feature gate.

Phase 6 exit direction:
- search/discovery behaves coherently across public surfaces;
- destination journeys are useful without requiring generative AI;
- crawlable discovery surfaces are stronger and fail-closed truth rules remain intact;
- growth work does not depend on analytics, social accounts or gated visitor-contribution features.

## Phase 7 — Launch & Distribution Readiness
**State: COMPLETE**

Purpose:
- turn ERN's stable discovery product into a coherent launch package;
- prepare launch messaging, profile copy, story/share packs, organic distribution surfaces and partner/business launch materials;
- make public trust, disclosure and canonical identity easy to reuse across future channels;
- separate preparation from account ownership, posting, analytics and payout actions.

Phase 7 may proceed autonomously only in non-gated preparation. ERN may prepare copy, pages, share assets, checklists and launch packets, but may not create or claim social accounts, post externally, enable analytics, change payout settings, generate new affiliate links in external accounts, activate Pilot 2, enable Submission/Now Moment media or turn on the public generative Guide without separate approval.

Phase 7 exit direction:
- a reusable launch/message kit exists;
- website/share surfaces point coherently to canonical ERN identity;
- ERN Stories can supply a launch content pack without automated posting;
- partner/business launch materials clearly separate verified relationships from future opportunities;
- any remaining work is a genuine human/external account action rather than unfinished site preparation.

## Phase 8 — Editorial Collections & Evergreen Growth
**State: ACTIVE — NON-GATED LANES ONLY**

Purpose:
- create evergreen thematic entry points from ERN's existing truthful current-window catalog;
- build crawlable collection pages for moods and Earth categories such as calm places, water, mountains, night cities and wildlife;
- strengthen multilingual discovery copy and shareable editorial pathways without depending on analytics or social accounts;
- keep collections downstream from source truth, currentness and playback rules.

Phase 8 may proceed autonomously only in non-gated work. Social accounts, automatic posting, analytics, payout actions, Pilot 2, Submission public intake, Now Moment media and public generative Guide remain separately OFF unless explicitly approved.

Phase 8 exit direction:
- a deterministic thematic collection engine exists;
- collection pages are crawlable, truthful and shareable;
- multilingual collection discovery copy is present where useful;
- seasonal/current collections fail closed when their source evidence is not current;
- remaining work is external/account-gated or belongs to a later product phase.

## Current summary

ERN has completed **Phase 7 — Launch & Distribution Readiness** and is now advancing into **Phase 8 — Editorial Collections & Evergreen Growth** in non-gated lanes only.

Phase 4 is active with **Pilot 1 — Earth Signals** now live in limited form:
- Earth Signals: runtime ON + public manifest ON for structured 45-minute signals only;
- Submission: deployed and verified, PUBLIC-OFF;
- Now Moment media: prepared but not deployed, PUBLIC-OFF;
- Guide AI, Seoul context, analytics and social lanes remain separately gated.

Phase 4 Pilot 1 remains active and monitored as an operating dependency, but it is no longer the project phase. Phase 5 non-gated operations and monetization preparation may continue. Expansion is not automatic: Pilot 2 and every other separate feature gate remain closed until separately approved.
