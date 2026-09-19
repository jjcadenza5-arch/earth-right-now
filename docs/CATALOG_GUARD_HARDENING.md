# Catalog guard hardening

Recovered and submitted source records are untrusted data until they pass the runtime guard.

The guard now rejects:
- relative/non-HTTP source, official, embed and thumbnail URLs;
- non-HTTPS embed URLs;
- invalid IANA timezones;
- malformed check timestamps;
- malformed category/alias arrays;
- existing truth/permission/playback invariant violations.

This prevents malformed recovery data from reaching playback, Atlas local-time logic or discovery ranking.

The JSON Schema remains the interchange description; the runtime validator is the browser safety gate and therefore intentionally checks the same critical invariants directly.
