# ERN operations report

ERN keeps visitor experience and maintenance diagnostics separate.

The operations report composes existing truth systems without changing them:
- catalog health/currentness summary;
- catalog release-gate blockers;
- deterministic revalidation queue;
- a bounded list of the next sources requiring human/provider-specific checking.

Revalidation priority favors UNKNOWN and DEGRADED records, sources requiring deep provider validation, embed candidates, legal inside-ERN playback candidates, then source quality. Priority is an operations scheduling aid only; it cannot promote health, permission, truth or playback.

Production release evidence is separate from the catalog gate. Browser, mobile, provider playback, accessibility, performance and rollback checks should carry a dated note. Legacy booleans remain temporarily accepted for compatibility, but new release tooling should write auditable evidence objects.
