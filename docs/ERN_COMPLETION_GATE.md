# ERN completion gate — whole product

This file prevents endless polishing from being confused with completion.

## Core ERN that should exist before beta
- Watch Earth / curated Top 20
- visitor Search / Explore
- real-map Living Atlas
- Local Earth / small-place discovery
- ERN Guide doorway and place routing
- My Earth
- destination pages / shareable discovery
- truthful live / live-image / external labels
- camera/place review path
- Now Moments concept and safe local preview
- reviewed local-place directory plumbing
- business/travel bridge with no paid ranking
- desktop/mobile lean layout
- release and rollback guards

## Things that can be complete in code but inactive without external infrastructure
These are not reasons to keep redesigning the same screens:
1. **True generative ERN AI Guide** — requires a secure backend/model service; never expose a model API key in GitHub Pages.
2. **Real camera/place submissions** — requires a private submission transport/inbox plus retention/privacy rules.
3. **Visitor photo/video Now Moment uploads** — requires storage, moderation, abuse reporting, metadata stripping, rate limits and automatic expiry/deletion.
4. **Small-business inventory** — requires real reviewed entries; ERN must not fabricate businesses.
5. **Affiliate/partner monetization** — requires actual partner accounts/inventory and disclosure.

## Final human evidence before calling beta stable
- desktop browser journey
- mobile journey
- representative provider playback
- keyboard/accessibility pass
- reasonable performance
- rollback proof

Once the core product is present, further work should either close one of these gates or fix an observed visitor problem. Do not endlessly add polish to already-working functions.


## Rollback rehearsal
A non-destructive rollback rehearsal is now preserved at branch `rollback-proof-20260923`, pinned to known-good deployed commit `a41ad2e49755d31344e8c0f04ca7338867f05d57`. The live main branch is not deliberately rolled backward while healthy. The release pipeline validates the rollback proof and documented procedure on every relevant deployment.

This closes the infrastructure question of “can ERN recover?” without intentionally breaking the production site to demonstrate it.


## Stable-beta state
The operational status script may report `STABLE_BETA_READY` only when all three are true:
- every core ERN product surface is present,
- every formal release-evidence item is explicitly passed with a note,
- every automated release gate is present.

This status does **not** activate the heavier backend roadmap. AI model service, real uploads, moderation, submission transport, reviewed local-business inventory and affiliate inventory remain separate post-beta activations.
