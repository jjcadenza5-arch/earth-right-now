# Static host contract

ERN is a static application. The release snapshot in `dist/` is the deployable unit.

## Required host behavior

- HTTPS on the candidate and public origin.
- Serve `index.html`, `src/`, and `data/` without build-time mutation.
- Preserve third-party provider URLs; do not proxy or rewrite live-camera media.
- Preserve the browser's normal iframe/security enforcement.
- Return `index.html` for application navigation fallbacks where the host requires an explicit rule.
- Keep the previous known-good snapshot available until the candidate passes release evidence.
- Do not inject analytics, ads, affiliate IDs, cookies, or trackers during beta verification.

## Portable host files

The snapshot builder includes:
- `_headers` with conservative browser privacy/security headers that do not block ERN's provider architecture.
- `_redirects` with a static-app fallback for hosts that support this convention.
- `release-manifest.json` with candidate hashes and rollback identity.

Hosts that do not support these convention files may ignore them; equivalent host settings should be configured instead.

## Deliberately omitted

ERN does not ship a restrictive Content-Security-Policy yet because the source registry intentionally spans multiple public providers and the permitted provider set should be derived and tested before enforcing CSP. A guessed CSP could silently break legitimate live windows.

The first candidate origin is for real browser validation, not an automatic public-production declaration.
