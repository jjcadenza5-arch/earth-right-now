# Recovery pipeline hardening

Recovered historical ERN records remain evidence, not automatically public sources.

Changes:
- missing recovered URLs are now null/quarantined rather than fabricated as `about:blank`;
- a canonical public-source promotion function strips recovery-only fields before a verified candidate enters the public catalog;
- recovered IDs/place IDs are normalized consistently when the `-recovered` suffix is present;
- release gating now uses the same source-recency policy as visitor-facing live inventory rather than maintaining a duplicate age calculation.

This reduces the chance that historical implementation baggage leaks back into Fresh.
