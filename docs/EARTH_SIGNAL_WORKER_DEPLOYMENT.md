# ERN Earth Signals Worker Deployment

Status: **PREPARED / NOT DEPLOYED**

This phase adds a production-shaped Cloudflare Worker boundary for Earth Signals without turning visitor contributions on.

## Safety posture

- `ERN_EARTH_SIGNALS_ENABLED=false` is the committed default.
- Public requests must originate from `https://earthrightnow.app`.
- Place IDs are rehydrated from ERN's published source catalog; clients cannot create arbitrary place identities.
- A server-secret HMAC converts the connection address into a short-lived opaque rate subject. Raw IP/network identifiers are never written to Durable Object storage.
- Durable Object SQLite stores only structured Earth Signal records, reports and opaque rate events.
- Free text and precise coordinates remain rejected by the canonical Earth Signal contract.
- Reports hide a signal pending review.
- Expired signals are deleted by durable-state cleanup.
- No media upload is part of this worker.

## Deployment gate

A real production deployment is still required before `data/earth-signal-deployment.json` may move from `NOT_DEPLOYED`. Deployment evidence must verify:

1. HTTPS Worker endpoint.
2. Durable Object SQLite storage.
3. Server-owned rate subjects with `ERN_RATE_HMAC_KEY` stored only as a Worker secret.
4. Origin restriction to ERN.
5. Published privacy notice.
6. Reporting and expiry cleanup.
7. Observability and bounded infrastructure cost.
8. Health evidence showing secrets are not exposed.
9. Only after all evidence passes may `ERN_EARTH_SIGNALS_ENABLED` be deliberately switched to `true`.

Repository preparation is not deployment evidence and does not activate Earth Signals.
