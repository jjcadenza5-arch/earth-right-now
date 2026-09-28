# Phase L Cloudflare Media Worker Foundation

Status: **PREPARED / NOT DEPLOYED**

The media Worker is separate from structured Earth Signals and camera/place submissions.

- Public photos are OFF by default.
- R2 storage is private; media is served only through the Worker after APPROVED moderation.
- Durable Object SQLite stores metadata and anonymous rate events.
- Uploads are limited to sanitized derivatives and canonical ERN places.
- Upload result is always PENDING_REVIEW / published:false.
- Reported photos are hidden immediately.
- Scheduled cleanup runs every 15 minutes and deletes expired metadata plus the R2 object.
- Hard retained-media ceiling: 500.
- Per anonymous visitor: max 3 photos/day, max 2/place/day.
- Video remains disabled.
- Review and rate keys are Worker secrets, not public code.

Deployment requires creating the private R2 bucket, installing runtime secrets, deploying with photoEnabled=false, and verifying /health before any activation decision.
