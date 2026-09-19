# My Earth memory

My Earth is visitor memory, not a second source catalog.

A saved window remains visible in My Earth even if the provider later becomes OFFLINE, stale or otherwise non-discoverable. ERN does not silently erase a visitor's choice because source health changed.

The card itself remains truthful: playback capability/currentness controls whether it says Watch live, Open current source, Open source, View source or Unavailable. Favorites therefore preserve memory without preserving an outdated live claim.

The model also exposes available and unavailable favorite subsets for future UI treatment. Favorite buttons expose aria-pressed state.

Recent places and favorite places continue to resolve only to places still known to the current catalog; stale local IDs are ignored rather than crashing the experience.
