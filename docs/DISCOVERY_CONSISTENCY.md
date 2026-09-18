# Discovery consistency

Search, Surprise Me and "current" discovery now share the canonical eligibility layer.

Changes:
- Search cannot return OFFLINE/unactionable sources.
- Empty search is ranked by ERN source quality/currentness rather than raw catalog order.
- "Current" requires HEALTHY + known permission + CURRENT_CHECK.
- Surprise Me prefers currently verified sources; when current sources exist, UNKNOWN/stale records are not randomly surfaced.
- Surprise Me prefers legal inside-ERN playback when available.

The broad Living Atlas may still expose appropriate non-current records with honest labels, but fast visitor actions should not surprise people with maintenance candidates.
