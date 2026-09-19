# Release gate model

Catalog validity alone is not enough to make ERN release-ready.

The machine-readable catalog gate now requires:
- zero malformed promoted records;
- a non-empty catalog;
- at least one HEALTHY source whose verification is still CURRENT_CHECK;
- at least one HEALTHY, CURRENT_CHECK source that can actually play inside ERN.

UNKNOWN sources may remain in the broad Atlas catalog by default because ERN's discovery/currentness policies already prevent them from being presented as verified live. A stricter release audit can set `allowUnknown:false`.

This catalog gate is only one part of release readiness. Browser/device testing, provider iframe behavior, visual fidelity, accessibility, performance and rollback readiness remain separate human/integration gates.
