# Revalidation Queue

Recovered catalog growth and current live promotion are separate jobs.

The queue prioritizes:
1. UNKNOWN operational health;
2. provider-level checks needed for video platforms/live video;
3. embed candidates;
4. higher-quality sources likely to improve the visible ERN experience.

Old checkedAt timestamps do not become current merely because a record was migrated or edited. Revalidation updates checkedAt only after a real current check.
