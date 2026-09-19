# Playback truth boundary

Playback is the final visitor-facing truth boundary.

Even if an upstream selector makes a mistake, Watch Earth session construction rechecks strict current-source eligibility. A stale source therefore cannot enter the automatic Watch Earth journey merely because it was handed to the session.

Playback capability labels are also currentness-aware. Historical truth type does not grant present-tense language:
- verified current external source: **Open current source**;
- stale/rechecking external source: **Open source**;
- verified current embed: **Watch live**;
- stale/rechecking embed: **View source**.

The external playback adapter itself avoids unconditional **Live at source** wording.

Viewer open/close is idempotent and teardown remains centralized through the player session and media lifecycle, preserving the one-player architecture and preventing duplicated playback after repeated open/close actions.
