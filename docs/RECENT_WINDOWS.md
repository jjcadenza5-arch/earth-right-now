# Recent windows

Recent playback history is local-only and resilient.

The original app wrote directly to the legacy ern:recent browser-storage key, which could crash playback in storage-denied/privacy modes or on malformed JSON. Recent windows now use the shared safe-storage boundary and a versioned key.

Existing legacy history is migrated opportunistically when valid. Invalid IDs are filtered later against the current registry, so removed cameras cannot break My Earth.
