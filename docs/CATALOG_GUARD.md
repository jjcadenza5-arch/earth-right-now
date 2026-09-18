# Catalog Guard

Malformed source records must not crash or silently contaminate the public registry.

At load/migration time ERN can separate:
- valid records eligible for normal policy evaluation;
- rejected records with explicit schema/truth errors for operations review.

Rejection is not the same as OFFLINE. OFFLINE is a valid operational state; malformed data is an operations/data-quality problem.
