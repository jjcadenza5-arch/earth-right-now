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

## Current summary

ERN has **completed the Phase 5 entry gate and is now operating in Phase 5**.

Phase 4 is active with **Pilot 1 — Earth Signals** now live in limited form:
- Earth Signals: runtime ON + public manifest ON for structured 45-minute signals only;
- Submission: deployed and verified, PUBLIC-OFF;
- Now Moment media: prepared but not deployed, PUBLIC-OFF;
- Guide AI, Seoul context, analytics and social lanes remain separately gated.

Phase 4 Pilot 1 remains active and monitored as an operating dependency, but it is no longer the project phase. Phase 5 non-gated operations and monetization preparation may continue. Expansion is not automatic: Pilot 2 and every other separate feature gate remain closed until separately approved.
