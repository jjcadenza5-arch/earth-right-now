# Beta deployment handoff

ERN already has a GitHub Pages public beta verification path. The remaining release path is deliberately narrow: keep the beta deployable while collecting auditable real-world evidence for an exact candidate before any production/release promotion.

## What is already ready

- Static visitor runtime with no server-side application dependency.
- Immutable preview artifact with SHA-256 fingerprints.
- Candidate commit identity when built in GitHub Actions.
- Portable static-host controls.
- Fail-closed source truth, embed permission and provider fallback audits.
- Catalog release gate.
- Real-world evidence ledger and recording command.
- Rollback identity contract.

## What deployment must not change

A candidate host must not rewrite provider URLs, proxy third-party live media, inject affiliate identifiers, add tracking, or weaken ERN's source labels. Business-camera submission transport remains disabled until a real reviewed service is configured.

## Public beta candidate

A deployed GitHub Pages build is a verification environment, not automatic production-release certification. Record the tested HTTPS origin and exact candidate commit/release manifest, then perform the six checks in `docs/RELEASE_EVIDENCE.md`. Do not infer provider playback from page reachability, and do not claim a custom domain is serving correctly until it has been independently verified.

Recommended order:

1. Desktop browser.
2. Mobile viewport/device.
3. Real provider playback.
4. Keyboard/accessibility.
5. Performance/one-player behavior.
6. Rollback restore.

Only evidence for the exact tested candidate should be recorded.

## Current human boundary

The public beta exposure decision has already been made. Engineering may keep the existing GitHub Pages beta deployable, but real browser/mobile/provider-playback/accessibility/performance/rollback evidence must still come from an actual tested candidate and must not be fabricated from CI or HTTP reachability. Any new host, commercial activation, account authorization, or materially different public exposure remains an explicit owner decision.
