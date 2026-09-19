# Beta deployment handoff

ERN's engineering path to a browser-accessible beta is now deliberately narrow.

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

## First browser-accessible candidate

The first deployed candidate is a verification environment, not an automatic production launch. Record its HTTPS origin and exact release manifest. Then perform the six checks in `docs/RELEASE_EVIDENCE.md`.

Recommended order:

1. Desktop browser.
2. Mobile viewport/device.
3. Real provider playback.
4. Keyboard/accessibility.
5. Performance/one-player behavior.
6. Rollback restore.

Only evidence for the exact tested candidate should be recorded.

## Current human boundary

Creating a public or externally reachable deployment changes ERN from a private repository artifact into a network-accessible application. Host/account selection and that exposure are therefore an explicit owner decision. Engineering preparation should stop short of silently enabling a public site.
