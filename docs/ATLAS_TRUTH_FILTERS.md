# Atlas truth filters

"Live/current capable" is now a current-state filter, not merely a truth-type filter.

A source passes it only when it:
- has a current/live truth type;
- is HEALTHY;
- has a CURRENT_CHECK;
- remains actionable under canonical playback policy.

UNKNOWN or stale historical records can still be explored in the broader Living Atlas where appropriate, but the live/current filter no longer implies current verification when none exists.
