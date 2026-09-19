# Watch Earth curation

Watch Earth is a curated **current Earth** journey, not a generic quality playlist.

The app-level journey now requires current verification before diversity scoring. This closes a gap where the general curation helper could previously admit a healthy but stale source into Watch Earth.

Rules:
- HEALTHY;
- permission known;
- actionable playback;
- verification still CURRENT_CHECK;
- no PREVIEW;
- quality/moment scoring only after truth/currentness gates;
- country diversity may shape ordering but can never override eligibility;
- if the diverse pool is empty, the fallback is the strict `buildWatchEarth()` pool, which applies the same currentness standard.

Watch Earth therefore never falls back to stale inventory merely to keep the journey populated.
