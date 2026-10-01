# ERN Phase 5 Readiness Gate

## Purpose

Phase 5 is **Broader Public Operations & Monetization**. It must not start merely because the Phase 4 Earth Signals pilot has been switched on.

Phase 5 becomes eligible for human review only after Phase 4 has produced enough healthy operating evidence.

## Minimum entry conditions

Before Phase 5 can be reviewed:

1. ERN core remains `STABLE_BETA_READY`.
2. Earth Signals Pilot 1 remains active and healthy.
3. The Phase 4 observation window has reached at least **24 hours**.
4. Current live health still reports the pilot healthy.
5. Submission intake remains OFF unless separately reviewed.
6. Now Moment media remains OFF unless separately reviewed.
7. Generative Guide activation remains a separate decision.
8. Privacy, moderation, storage, rate limits and rollback boundaries remain intact.

Meeting these conditions creates **review eligibility only**.

It does **not**:
- enter Phase 5 automatically;
- activate Pilot 2;
- activate submissions;
- activate Now Moment media;
- enable generative Guide;
- connect analytics or social accounts;
- change ranking for commercial reasons.

## Canonical status

Run:

`npm run phase5:readiness -- <current-earth-signals-live-health.json>`

The status has three possible states:

- `PHASE4_OBSERVATION_CONTINUES`
- `PHASE5_HUMAN_REVIEW_ELIGIBLE`
- `PHASE5_ENTRY_APPROVED`

The repository never sets the final state automatically. Explicit human approval is required after evidence review.

## Current state

Phase 4 Pilot 1 was publicly activated at **2026-09-30T06:53:05Z**.

Therefore the earliest the minimum observation window can complete is **2026-10-01T06:53:05Z**, provided live health remains green throughout the operating period.

This timestamp is only an eligibility boundary, not a scheduled promotion.

## Operational monitoring

The daily ERN Operations workflow now records:

- current Earth Signals live health;
- Phase 4 observation state;
- Phase 5 readiness state.

The operator brief and operations packet preserve the rule that Phase 5 entry and Pilot 2 activation are never automatic.
## Entry approval

Phase 5 entry received explicit owner approval on **2026-10-01**, after the healthy Phase 4 Pilot 1 observation window exceeded 24 hours.

The approval is intentionally narrow: Phase 5 may begin, while Pilot 2, Submission public intake, Now Moment media, public generative Guide activation, analytics, social channels, and all other separate feature gates remain OFF unless separately approved.

Canonical approval state: `data/phase5-entry-approval.json`.

