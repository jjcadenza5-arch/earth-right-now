# Health observation coverage

ERN health automation is report-only and must fail visibly when its observation batch does not line up with the public catalog.

Rules:
- An observation for an unknown source ID is never silently accepted.
- A catalog source omitted from a batch remains explicitly listed as unobserved.
- Coverage audit is separate from source health. A partially observed batch may still produce useful proposals, but it is not a complete catalog check.
- HTTP reachability alone never promotes a source to HEALTHY; current provider/media confirmation is still required.
- Health automation cannot alter truth, permission, rights basis, attribution or playback mode.
- `safeHealthPatch` remains intentionally narrow so operational tooling cannot accidentally publish arbitrary source mutations.

This protects ERN from typoed IDs, stale automation inventories and partial checker runs while preserving the recover-fast / promote-slow model.
