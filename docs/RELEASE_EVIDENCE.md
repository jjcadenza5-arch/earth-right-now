# Release evidence

ERN has two separate gates:

1. **Catalog readiness** — structural validity plus at least the configured minimum strict-current inventory and strict-current inside-ERN playback.
2. **Publication readiness** — catalog readiness plus real evidence for browser, mobile, provider playback, accessibility, performance and rollback.

Publication evidence must be an auditable object containing:
- `ok: true`;
- a non-empty note describing what was checked;
- a valid `checkedAt` timestamp;
- a check no older than 14 days.

Legacy booleans are intentionally rejected. A test from months ago cannot certify today's provider playback or browser behavior.

CI/smoke success is useful engineering evidence but does not automatically satisfy these real-world publication checks.
