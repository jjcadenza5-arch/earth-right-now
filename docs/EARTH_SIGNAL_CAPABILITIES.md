# Earth Signal capability manifest

Earth Signals now have one explicit source of truth for infrastructure readiness. Every launch capability defaults to **false**:

- transport
- rate limits
- moderation
- reporting
- expiry/deletion
- privacy notice

Architecture modules and tests do not make these capabilities true. A capability may be switched only after its real infrastructure is implemented and verified. The activation gate consumes this posture and therefore remains closed by default.

This prevents documentation, UI prototypes or client-side policy code from accidentally being interpreted as a production-ready visitor contribution system.
