# Integration repair — 2026-09-18

A repository-wide inspection found that several newer controllers had been added without their required DOM mounts surviving in `index.html`.

Repaired:
- strict Live Right Now mount and honest empty state;
- My Earth favorite-place and recent-place mounts;
- Atlas filter controls and reset control;
- Hero trust copy mount;
- Hero trust/action state wiring;
- recent-place recording on destination open;
- Atlas projection now uses a direct 100 × 100 percentage coordinate system;
- Atlas ignores records without finite coordinates rather than producing invalid pins;
- obsolete journey/controller state removed.

This pass is intentionally integration-first: a feature is not considered complete merely because its module exists.
