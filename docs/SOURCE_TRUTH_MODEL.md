# Source Truth Model

Evaluation order:

**Truth → Permission → Health → Freshness/View → Quality → Moment → Playback → Story**

## Truth labels
- LIVE_VIDEO — genuinely live moving video.
- LIVE_IMAGE — current/refreshed still image.
- EXTERNAL_LIVE — genuinely live but must be viewed at provider.
- PARTNER — submitted/approved partner source; truth subtype still required.
- PREVIEW — non-live visual/context. Never display as live.

## Permission
EMBED_ALLOWED, LINK_ONLY, PARTNER_PERMISSION, UNKNOWN.

## Health
HEALTHY, DEGRADED, OFFLINE, UNKNOWN. Health never changes truth by itself.

## Playback
EMBED, IMAGE_REFRESH, EXTERNAL, PREVIEW.

## Promotion
Only healthy, permitted, sufficiently fresh and high-quality sources enter primary Live Right Now / Watch Earth journeys. Broader legitimate sources may remain discoverable in Living Atlas with truthful status.

Every source should retain provider, source URL, attribution, checkedAt, lastSuccessfulCheck and failureReason when known.
