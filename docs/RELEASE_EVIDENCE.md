# Release evidence

ERN has two separate gates:

1. **Catalog readiness** — structural validity plus at least the configured minimum strict-current inventory and strict-current inside-ERN playback.
2. **Publication readiness** — catalog readiness plus real evidence for browser, mobile, provider playback, accessibility, performance and rollback.

Publication evidence must be an auditable object containing:
- `ok: true`;
- a non-empty note describing what was checked;
- a valid `checkedAt` timestamp;
- a check no older than 14 days.

Legacy booleans are intentionally rejected. A test from months ago cannot certify today's provider playback or browser behavior.

CI/smoke success is useful engineering evidence but does not automatically satisfy these real-world publication checks.


## Evidence lifecycle

Use the release-evidence helpers to keep publication checks fail-closed. Each check can be recorded independently, and the readiness summary exposes what has passed and what remains. Evidence expires after 14 days, so an old browser or provider-playback check cannot silently certify a later release.

A green CI run does not populate these fields. Browser, mobile and provider playback require current real-world checks; accessibility, performance and rollback likewise require a dated note describing the actual validation performed.


## Evidence ledger

The checked-in fail-closed ledger lives at `data/release-evidence.json`. A missing or pending record never counts as a pass.

Use:
- `npm run release:evidence` to audit the ledger and reject any `ok: true` record that lacks a note, valid timestamp, or freshness.
- `npm run release:status` to combine the ledger with the current catalog and print the publication candidate posture.
- `npm run release:packet -- <40-char candidate SHA>` to generate the human operator packet for the exact candidate. It includes the six release checks, provider-family playback representatives, candidate-bound record commands and rollback identifiers.

Only record `ok: true` after the named real-world check has actually been performed. Notes should identify the environment/provider/check performed clearly enough that another maintainer can understand what was validated. Do not convert CI, source-health checks, or inferred behavior into browser/mobile/provider evidence.


## Recording a completed real-world check

After actually performing a check, record it with the exact candidate commit:

`npm run release:record -- <key> <pass|fail> <40-char candidate SHA> "<what was checked, where, and the result>"`

Example keys are `browser`, `mobile`, `providerPlayback`, `accessibility`, `performance`, and `rollback`.

The command writes a dated evidence object to the ledger. Then run `npm run release:evidence` and `npm run release:status` before committing it. This command is only a recorder; it does not perform or infer the check.


## Candidate-specific operator packet

Every green CI candidate now generates an `ern-release-operator-packet` artifact. The packet is intentionally a checklist, not proof: it names the deployed origin, exact candidate SHA, previous commit for rollback work, all six human evidence categories, and the representative inside-ERN provider windows that still need HUMAN_PLAYBACK confirmation. A provider URL returning HTTP 200 or an iframe loading is never converted into playback evidence.
