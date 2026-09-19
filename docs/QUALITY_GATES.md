# ERN quality gates

Changes to source truth, playback, discovery, routing, favorites, Atlas, Watch Earth, Hero or catalog identity should keep `npm test` green.

CI is an engineering gate, not publication approval. Publication still requires dated evidence for:
- desktop browser behavior;
- mobile behavior;
- real provider playback;
- accessibility;
- performance;
- rollback readiness.

A source catalog may be structurally valid while the site remains not ready to publish.
