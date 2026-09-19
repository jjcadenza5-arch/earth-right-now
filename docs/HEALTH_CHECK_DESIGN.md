# Source Health Design

Health is operational and must not rewrite truth or permission.

A checker records:
- checkedAt
- lastSuccessfulCheck
- HTTP/provider failure reason
- HEALTHY / DEGRADED / OFFLINE

Rules:
- A successful page response is not sufficient proof that a video is actually playing.
- Provider-specific checks may be stricter than generic HTTP checks.
- YouTube/private/deleted/ended streams require provider-level validation before LIVE promotion.
- Embed permission is independent from health.
- Historical recovered verification never counts as a current check.
- DEGRADED/UNKNOWN remain available to Living Atlas with truthful UI but are excluded from primary Live Right Now.

## Transition contract

Health mutations must go through the conservative transition model in `src/health-transition.js`. A reachable page without confirmed current media is DEGRADED, not HEALTHY. Only a confirmed current-media success advances `lastSuccessfulCheck`. Definitive provider/media failure may mark OFFLINE; inconclusive checks remain UNKNOWN. Health automation must never modify permission or truth.
