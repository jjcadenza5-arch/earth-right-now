## Privacy notice preparation
The structured Earth Signal privacy wording is now content-complete in code: purpose, allowed signal types, 45-minute retention, optional location evidence, place-only public location scope, reporting, expiry deletion, no free text, no public precise coordinates and no account requirement. It remains explicitly **DRAFT_NOT_PUBLISHED**. The privacyNotice capability must stay false until this wording is actually published at the real public privacy surface and that publication is verified.

## Backend service boundary and storage contract
The structured Earth Signal foundation now includes a deployment-neutral service layer and explicit durable-storage interface. The service composes canonical-place validation, server-owned freshness, rate limiting, moderation visibility, reporting and 45-minute expiry around a storage adapter. A reference in-memory adapter exists only for tests. The service and HTTP adapter are both fail-closed behind the complete activation gate, so this preparation still does not turn on public contribution or imply that production transport/storage exists.

## Structured Earth Signal API contract
ERN now has a deployment-neutral v1 contract for the first backend phase. It defines a bounded structured-signal submission path, server-owned timestamps/expiry, canonical place validation, no free text, no precise coordinates, privacy-minimal public responses and a 45-minute TTL. This contract prepares a future serverless implementation but does **not** enable submissions by itself; transport, rate limits, moderation, reporting, expiry deletion and the privacy notice still have to be real before contribution mode can turn on.

# Now Moments backend activation plan

Now Moments is intentionally **not** a permanent social feed.

## Target lifecycle
1. Visitor chooses a place and creates a short-lived Earth Signal or photo/short clip.
2. Client compresses/resizes media before upload where practical.
3. Strip EXIF/GPS and other unnecessary metadata.
4. Apply file/type/size validation, rate limits and abuse controls.
5. Moderate before public display.
6. Store only the temporary public derivative needed by ERN.
7. Publish as a clearly labeled NOW MOMENT, never as proof that a camera is LIVE.
8. Expire after about **45 minutes**.
9. Delete the object and public metadata automatically after expiry.
10. Keep only minimal moderation/audit data if legally and operationally necessary.

## Capacity principle
Temporary storage is not the main scaling risk. At steady state, simultaneous media roughly equals uploads-per-minute × 45 minutes. Compression, per-user/place limits, deduplication and a hard ERN-wide storage ceiling keep costs bounded.

## Suggested first activation
Activate structured Earth Signals before photos:
- Beautiful light
- Raining
- Busy
- Peaceful
- Something happening
- Worth seeing

Then activate still photos after moderation/reporting/TTL infrastructure is real. Short video comes later.

## Required backend pieces
- serverless upload endpoint
- private object storage
- signed/controlled upload path
- moderation queue/service
- rate limiting
- metadata stripping
- automatic TTL cleanup
- abuse reporting
- privacy/retention notice
- observability and cost ceiling

## Guardrail
GitHub Pages remains the public static frontend. Never expose storage credentials, moderation secrets or model/API keys in client-side code.
