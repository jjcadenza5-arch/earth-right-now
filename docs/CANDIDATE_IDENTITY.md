# Candidate identity

Real-world evidence is meaningful only when it can be tied to the exact ERN candidate that was exercised.

For each browser-accessible candidate retain:

- the Git commit SHA;
- the generated `release-manifest.json`;
- the HTTPS candidate origin;
- the evidence timestamp and note.

If the deployed commit changes after a check, treat that check as evidence for the earlier candidate rather than silently carrying it forward. Re-run any check whose relevant behavior may have changed.

The release artifact manifest and Git commit together provide the immutable candidate identity. The public/candidate origin provides the environment identity.

Do not put secrets, affiliate credentials, access tokens or private account data into candidate identity or evidence notes.
