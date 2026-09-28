# ERN Submission Worker Deployment

Status: **PREPARED / NOT DEPLOYED**

This worker turns the existing camera/place submission contract into a deployable review inbox without creating any publication path.

## Default state

- `ERN_SUBMISSION_ENABLED=false`.
- Public intake accepts only explicit-consent POST requests from `https://earthrightnow.app`.
- Server-side validation repeats the canonical ERN business-submission checks.
- A secret-HMAC-derived opaque rate subject limits intake without storing raw IP/network identifiers.
- Durable Object SQLite stores the bounded review record and rate events.
- Unapproved intake is deleted no later than 30 days; the worker clamps configured retention to 30 days.
- Human review endpoints require `ERN_SUBMISSION_REVIEW_TOKEN`.
- APPROVED only means reviewed intake; responses still say `published:false`.
- Approval removes contact data from the retained record.
- No source is embedded, fetched, promoted, marked live, or added to the catalog automatically.

## Real deployment gate

Repository code is not deployment evidence. Before `data/submission-transport.json` can be enabled, ERN must verify a real HTTPS Worker endpoint, Durable Object storage, secret isolation, rate limiting, private review access, retention cleanup, health evidence, and origin restriction. Only then may the public form transport be pointed at the endpoint.
