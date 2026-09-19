# Player session generation

Every playback handoff invalidates the previous player generation before the new adapter mounts.

The session exposes a generation token to adapters that need asynchronous work. Late callbacks from an old camera can therefore be ignored instead of mutating the current viewer.

Cleanup returned by an adapter is retained only while that generation is still current. If a render is superseded during setup, its cleanup runs immediately.

This is a guard against the prototype class of bugs where an older iframe/image/timer could reappear after the visitor had already chosen another window.
