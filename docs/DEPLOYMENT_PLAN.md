# Deployment Plan

ERN deploys through GitHub Pages from the exact tested commit. A successful static artifact deployment is not the same as a certified public release.

## Automated gates before origin certification

1. Pass the smoke suite, accessibility/mobile preflights, source/embed/fallback audits and Watch Earth audit.
2. Build the immutable release snapshot and manifest for the exact commit.
3. Deploy that snapshot through the Pages workflow.
4. Run custom-domain DNS/TLS/HTTPS diagnostics.
5. Verify the public origin serves the exact release-manifest commit plus canonical, manifest, robots, About and Privacy resources.

## Real-world release evidence

After the origin is healthy, complete the candidate-specific operator packet for:
- desktop browser journeys;
- mobile device/viewport journeys;
- real provider playback;
- keyboard/accessibility;
- performance/responsiveness;
- rollback.

CI never auto-passes these observations.

## Custom-domain boundary

The public apex is `earthrightnow.app`. ERN's domain checker now reports the actual and expected GitHub Pages DNS state, CAA/Let's Encrypt compatibility, TLS certificate coverage, HTTPS reachability and the next remediation action.

For an apex domain, GitHub's current Pages guidance uses the GitHub Pages A addresses (and optionally the documented AAAA set or ALIAS/ANAME). Extra/conflicting apex A/AAAA records can block HTTPS provisioning. If CAA records are used, they must allow `letsencrypt.org`.

For `www.earthrightnow.app`, the recommended CNAME target is `jjcadenza5-arch.github.io`.

If DNS is correct but the certificate remains mismatched, re-trigger GitHub Pages certificate provisioning from repository Pages settings rather than changing ERN application code.

## Rollback

Keep the exact candidate SHA and previous known-good SHA in the release operator packet. Rollback must restore the previous static snapshot without silently changing source truth, permissions, health or playback labels.
