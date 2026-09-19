# Cache boundary

ERN currently has **cache policy**, not an installed offline/PWA guarantee.

No service worker should be added merely to make the site appear offline-capable. Camera/source truth changes frequently, and a stale source catalog is worse than a clean network failure.

Rules:
- source catalog: network request with no-store semantics;
- third-party media: provider controlled;
- favorites/recent history: local browser state only;
- same-origin shell assets may be versioned/cached only if a deliberate service-worker release is introduced later.

UI copy must never promise saved/offline Earth content until that capability actually exists.
