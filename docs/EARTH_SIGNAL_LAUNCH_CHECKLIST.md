# Earth Signals launch checklist

Earth Signals contribution must remain **read-only** until the activation gate reports all launch dependencies ready.

The readiness report mirrors the code gate and must not be manually interpreted around a missing requirement:

- Submission transport
- Rate limiting
- Moderation
- Reporting
- Automatic expiry/deletion
- Updated privacy notice

A future UI may display this internally for operators, but it must not turn a missing dependency into a warning-only state. Any missing item is a launch blocker.
