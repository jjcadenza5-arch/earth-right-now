# Preview and deployment handoff

ERN remains fail-closed for public publication, but a reproducible static preview package can be built before a host is selected.

## Preview artifact

The `ERN Preview Artifact` workflow runs the smoke suite and release reports, then packages only the visitor runtime:

- `index.html`
- `src/`
- `data/`

The resulting `ern-preview` artifact is for real-browser verification and deployment handoff. Creating it does **not** satisfy any publication evidence gate.

## Host handoff

ERN is a dependency-light static app. A future host should serve the packaged files over HTTPS without rewriting provider URLs or weakening iframe/security behavior. The repository remains source of truth.

Before public publication, use the candidate origin to perform and record the six dated checks in `data/release-evidence.json`: browser, mobile, provider playback, accessibility, performance and rollback.

Do not mark a check passed from CI alone. Provider playback must be exercised against real provider media in a browser. Rollback evidence must identify a tested prior artifact/tag/commit and the actual restore procedure.

## Business activation

Affiliate inventory and camera-submission transport are intentionally separate from static preview deployment. ERN can publish a useful beta before monetization is fully activated, while all sponsored/affiliate relationships remain explicitly disclosed when enabled.
