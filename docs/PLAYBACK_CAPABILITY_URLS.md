# Playback capability URL gate

A catalog label cannot make an unsafe or missing URL actionable.

- EXTERNAL/LINK_ONLY requires a safe HTTP(S) provider URL.
- IMAGE_REFRESH requires a safe HTTP(S) image URL.
- EMBED still requires the explicit reviewed-provider embed allowlist.
- Otherwise the canonical action is UNAVAILABLE.

This keeps cards, Hero actions, Atlas discovery and the actual player aligned on the same capability decision.
