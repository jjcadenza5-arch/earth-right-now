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

## Custom-domain certificate handoff — 2026-09-23

The latest Pages run built and deployed commit `2700a42926be4d292388c37167bd7afcdfcd3c26` successfully. Its post-deploy check found the four correct GitHub Pages apex A records, no conflicting AAAA or restrictive CAA records, and state `PAGES_CUSTOM_CERT_NOT_PROVISIONED`: the TLS endpoint serves GitHub's generic `*.github.io` certificate rather than one covering `earthrightnow.app`. The public custom-domain origin therefore remains uncertified.

Repository admin action: open **Settings → Pages** for `jjcadenza5-arch/earth-right-now` and confirm **Custom domain** is exactly `earthrightnow.app`. If absent, enter and save it; then allow GitHub's HTTPS provisioning to finish before enabling **Enforce HTTPS** when offered. Capture the Pages setting/status if it remains stuck. GitHub's guidance says HTTPS availability may take up to 24 hours. Only consider removing and re-adding the custom domain if the setting is already correct and provisioning remains stalled.

This repository publishes through a custom GitHub Actions workflow. GitHub's documentation states that its repository `CNAME` file is ignored for that publishing mode; the Pages setting is the control that must be checked. Do not change the already-matching apex A records merely because the certificate is missing. Once GitHub serves a certificate for `earthrightnow.app`, rerun Pages deployment and require the exact-origin verification to pass.

## Current human boundary

The public beta exposure decision has already been made. Engineering may keep the existing GitHub Pages beta deployable, but real browser/mobile/provider-playback/accessibility/performance/rollback evidence must still come from an actual tested candidate and must not be fabricated from CI or HTTP reachability. Any new host, commercial activation, account authorization, or materially different public exposure remains an explicit owner decision.


The deployed immutable candidate also contains `/release-verification.html`, an unlinked no-index operator page that consolidates the six human checks and the representative provider-playback windows. It is deliberately unable to mark release gates passed; it only reduces the manual coordination burden once the candidate origin is healthy.
