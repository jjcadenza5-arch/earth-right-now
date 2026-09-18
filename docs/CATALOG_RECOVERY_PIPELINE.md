# Catalog Recovery Pipeline

1. Extract recovered record from ERN lineage.
2. Normalize fields.
3. Deduplicate provider/source/title.
4. Preserve recovered provenance and rights notes.
5. Force operational health to UNKNOWN.
6. Never carry forward an old embed URL as trusted without current validation.
7. Validate schema/policy.
8. Add to Living Atlas.
9. Recheck current provider/source.
10. Promote to primary live inventory only after release rules pass.

This allows ERN to recover hundreds of useful historical source leads without turning stale historical state into false present-tense claims.
