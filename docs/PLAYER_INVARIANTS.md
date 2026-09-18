# Player Invariants

1. One active media mount.
2. Switching windows destroys the previous iframe/video/audio before mounting the next.
3. Cards, Atlas pins and search results never create media players.
4. Opening a window must not scroll to Hero.
5. Closing the viewer returns keyboard focus to the invoking control when possible.
6. External-only sources remain explicit external actions.
7. Source attribution follows every handoff.
8. A provider failure cannot leave hidden audio/video running.
