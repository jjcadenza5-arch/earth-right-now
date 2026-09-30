# ERN Phase 4 — Controlled Pilot Plan

## Status
**ACTIVE — Pilot 1 Earth Signals is live and under observation**

Phase 4 exists to validate one small visitor-facing capability at a time without weakening ERN's truth, privacy, moderation or cost boundaries.

## Pilot 1 — Earth Signals

Earth Signals is the active Phase 4 Pilot 1 because:
- its production Worker is deployed and live-health verified;
- durable storage, bounded retention, rate limits, moderation/reporting, secret isolation and cost bounds are evidenced;
- public UI already fails closed when the feature is OFF;
- signals are structured, short-lived and explicitly unverified;
- Now Moment photo media is downstream of structured Earth Signals and must not activate first.

### Pilot scope
- structured signal types only:
  - RAINING
  - BEAUTIFUL_LIGHT
  - BUSY
  - PEACEFUL
  - SOMETHING_HAPPENING
  - WORTH_SEEING
- canonical ERN places only;
- 45-minute expiry;
- optional self-reported near-place flag only;
- no photos or video;
- no automatic truth upgrade;
- no effect on Watch Earth ranking;
- no commercial ranking effect;
- no generative inference from signals;
- public copy must continue to say visitor reports are not independently verified.

### Activation boundary
Activation requires **both**:
1. Worker runtime flag `ERN_EARTH_SIGNALS_ENABLED=true`;
2. public manifest `publicActivationAllowed=true`.

Changing only one side must remain fail-closed.

### Pilot safeguards
- keep rate limits and hard storage caps unchanged;
- retain raw-network-identifier prohibition;
- keep report/moderation flow available;
- preserve 45-minute expiry/deletion;
- preserve deterministic Guide truth boundaries;
- preserve public OFF state for Submission and Now Moment media;
- do not activate Now Moment photo upload during this pilot.

### Pilot observation
After activation, observe:
- Worker health;
- pending/active signal counts;
- report volume;
- storage ceilings;
- error rate;
- whether visitors understand the structured signal UI;
- whether signal wording creates any confusion with camera truth.

### Minimum observation window
Before any Pilot 2 deployment is even review-eligible, Pilot 1 must complete at least **24 hours** of healthy live observation.

This is a review gate, not an automatic promotion rule:
- the 24-hour clock starts from the verified public activation timestamp;
- current live health must still be green;
- runtime contributions must remain enabled;
- privacy boundaries and hard caps must remain intact;
- completing 24 hours only makes expansion eligible for human review;
- automatic expansion remains forbidden.

The daily Operations workflow records this state through `phase4:earth-signals-observation`.

### Pilot success condition
The pilot may continue only if:
- health remains stable;
- moderation/reporting remains bounded;
- no privacy or truth-boundary issue appears;
- signal volume stays within configured ceilings;
- public copy remains understandable;
- no release regression appears.

### Rollback
Immediate rollback path:
1. set `ERN_EARTH_SIGNALS_ENABLED=false`;
2. set public manifest `publicActivationAllowed=false`;
3. verify `/health` reports contributions disabled;
4. verify public UI returns to local/read-only preview;
5. retain deployment infrastructure and evidence for later review.

## Pilot 2 and later
Do not open another participation pilot while Pilot 1 is still being validated.

Submission intake, generative Guide activation, Seoul context, analytics, social channels and Now Moment media remain separate gates. Now Moment media must remain downstream of successful structured Earth Signals operation.

## Current operating gate
Pilot 1 activation is complete and live-health verified. The present gate is **observation before expansion**.

Do not activate Submission, Now Moment media or any other participation lane merely because Earth Signals is running. Open Pilot 2 only after Pilot 1 remains healthy, bounded, understandable and operationally useful under real traffic.
