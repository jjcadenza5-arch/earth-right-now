# Health transitions

ERN source health uses conservative transitions.

A source becomes **HEALTHY** only when the current media itself is confirmed, not merely because its webpage returns successfully.

- HTTP/page reachable + current media confirmed → HEALTHY; update checkedAt and lastSuccessfulCheck.
- Page reachable but media not confirmed → DEGRADED; update checkedAt but preserve the previous lastSuccessfulCheck.
- Definitive provider/media failure → OFFLINE.
- Inconclusive check → UNKNOWN.

Health checks never change truth type, permission, or playback rights. A checker cannot convert LINK_ONLY into EMBED_ALLOWED.

This transition model is intentionally separate from browser connectivity. A visitor going offline does not change provider health.
