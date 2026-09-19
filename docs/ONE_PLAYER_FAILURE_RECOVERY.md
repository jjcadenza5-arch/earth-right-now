# One-player failure recovery

Provider failure recovery stays inside the same PlaybackController.

An EMBED failure does not create a second player or send the visitor back to Hero. The controller transitions the current source through its legal fallback chain:

`EMBED → EXTERNAL → UNAVAILABLE`

or, where applicable:

`IMAGE_REFRESH → EXTERNAL → UNAVAILABLE`

The source remains one history item. Runtime failure metadata is attached to viewer state, not written back into source truth. This preserves ERN's one-player architecture and prevents a browser/provider-specific failure from corrupting the global catalog.

The UI may explain that embedded playback was unavailable and offer the official provider source. It must never claim the source itself is offline unless operations validation establishes that separately.
