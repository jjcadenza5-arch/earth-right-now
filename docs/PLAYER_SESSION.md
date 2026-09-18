# Player session lifecycle

Some playback adapters return cleanup work, especially refreshed-image timers. ERN now has a small player-session primitive that guarantees the previous adapter cleanup runs before a new source begins and again when the session closes.

This is separate from media DOM destruction:
- media lifecycle destroys iframe/video/audio/image elements;
- player session stops non-DOM work such as timers.

The shared-player integration should use this lifecycle for every handoff so long browsing sessions do not accumulate invisible refresh timers.
