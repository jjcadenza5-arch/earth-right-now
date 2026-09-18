# Watch Earth repair

Watch Earth now uses the same capability-aware source action as the rest of ERN.

This matters because a curated journey can contain an EXTERNAL source. Such a source must open at its provider rather than being pushed into the immersive ERN player.

The session now exposes a stable `state()` snapshot. Pause/Continue uses `state().playing`, and viewer Previous/Next delegates to the Watch Earth sequence while that journey owns the viewer.

Surface navigation also no longer forces `scrollTo(top)`. Focus moves to the destination surface without scroll jumps, preserving the mature ERN interaction principle that visitor actions should not unexpectedly throw them back to another part of the page.
