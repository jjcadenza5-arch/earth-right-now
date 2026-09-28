# ERN Participation Operator Control

Phase J moderation is deliberately private and separate from the public ERN website.

## Credentials

Operator credentials are supplied only through environment variables:

- `ERN_OPERATOR_ENDPOINT`
- `ERN_OPERATOR_TOKEN`

Do not put review tokens in URLs, browser code, repository files, issue text, logs, or command-line arguments.

## Camera/place submissions

```bash
ERN_OPERATOR_ENDPOINT=https://<submission-worker> ERN_OPERATOR_TOKEN=... \
  node scripts/participation-operator.mjs submissions list

ERN_OPERATOR_ENDPOINT=https://<submission-worker> ERN_OPERATOR_TOKEN=... \
  node scripts/participation-operator.mjs submissions review <id> APPROVED
```

Approval remains a review state only. It does not publish or mutate the ERN catalog automatically.

## Earth Signals

```bash
ERN_OPERATOR_ENDPOINT=https://<signals-worker> ERN_OPERATOR_TOKEN=... \
  node scripts/participation-operator.mjs signals reports

ERN_OPERATOR_ENDPOINT=https://<signals-worker> ERN_OPERATOR_TOKEN=... \
  node scripts/participation-operator.mjs signals resolve <signal-id> REMOVE
```

A reported signal is hidden pending review. `RESTORE` makes the structured signal visible again if it is still within its normal TTL. `REMOVE` deletes the signal and its report record. Neither action changes source truth, place ranking, LIVE HERE playback evidence, or catalog health.
