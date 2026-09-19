# Routing and share safety

ERN destination deep links remain intentionally simple: `#place=<id>`.

Hardening rules:
- malformed, empty, overlong or compound place hashes fail closed;
- only a place ID that exists in the current place model can open a destination drawer;
- history navigation never invents a recent-place visit;
- URL parsing helpers are safe outside browser contexts;
- share generation rejects missing place IDs;
- native share failure falls back to clipboard only when available;
- cancelled native sharing is not treated as an error;
- shared copy describes ERN's current-source status rather than claiming every destination is live.

These rules preserve durable links without turning URL state into a source-truth bypass.
