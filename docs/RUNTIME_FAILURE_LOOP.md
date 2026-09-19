# Runtime failure loop

The one-player recovery architecture is now connected end-to-end.

Media adapter → generation-safe player session → PlaybackController → legal fallback → same viewer.

For an allowed embed:
- the adapter listens for load/error;
- a bounded timeout prevents an indefinitely blank iframe;
- a failure is emitted only while that exact player generation is current;
- the controller advances to the next legal fallback.

For refreshed images:
- successful loads reset the local failure counter;
- repeated image load failures emit a runtime failure;
- the controller can fall back to the official provider source.

A late event from a destroyed/previous iframe or image cannot change the current source because the player-session generation token rejects stale callbacks.

Important limitation: iframe `load` confirms the frame document loaded, not that every provider's internal live video is actually playing. Provider-specific playback validation remains required for release evidence.
