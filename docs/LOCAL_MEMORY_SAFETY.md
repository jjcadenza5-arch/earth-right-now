# Local memory safety

My Earth is intentionally local-first and privacy-light, but browser storage is not guaranteed to be available or well-formed.

Favorites, favorite places, recent places and session state now share safe JSON storage helpers:
- malformed JSON falls back safely;
- storage quota/privacy exceptions do not crash ERN;
- saved ID collections are normalized to unique non-empty strings;
- oversized/corrupt arrays are bounded;
- invalid favorite IDs are ignored by the My Earth model.

This preserves My Earth even in stricter browser/privacy environments without adding an account requirement.
