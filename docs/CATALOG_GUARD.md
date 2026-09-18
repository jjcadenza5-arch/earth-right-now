# Catalog Guard

The public registry loader now passes every fetched record through the source validator before creating the runtime registry.

Malformed rows are quarantined rather than silently entering discovery/playback. The loader reports rejected IDs and validation errors to operations/console while returning only valid records to the visitor experience.

Validation includes:
- required identity/truth/permission/health/playback fields;
- enum consistency;
- HTTP/HTTPS source, official, embed and thumbnail URLs;
- embed permission + embed URL invariants;
- LINK_ONLY → EXTERNAL invariant;
- IMAGE_REFRESH → LIVE_IMAGE invariant;
- coordinate and quality/freshness/moment ranges.

A malformed recovery row therefore cannot break the whole visitor registry.
