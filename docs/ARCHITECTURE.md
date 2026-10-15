# ERN Architecture

## Target
**One Hero, one live engine, one Explore system.**

### Layers
1. Earth Catalog — places, coordinates, categories, aliases, stories.
2. Source Registry — provider, truth, permission, health, freshness, quality, attribution.
3. Selection Engine — filters/ranks sources for context.
4. Playback Controller — one state machine; embed/image/external/preview adapters.
5. Experience Surfaces — Hero, Watch Earth, Explore, Living Atlas, Beautiful Moments, My Earth, ERN AI.
6. Travel Bridge — nearby stays, food, transport, tickets/affiliate opportunities.

### Playback rule
Surfaces request playback with a source ID. The controller opens in the visitor's current context (inline/local or immersive). It must not scroll the document to Hero.

### Recovery rule
Recovered ERN HTML is specification/evidence. Extract data and behavior deliberately; do not import its accumulated duplicate player generations wholesale.


### Optional Generative Guide layer
The existing deterministic ERN Guide remains the public baseline and permanent fallback. A future generative layer may sit above it only as a server-side interpretation/wording layer; it must never become a parallel source of Earth truth.

Generative Guide flow:
1. Validate a bounded visitor request.
2. Treat all client place/source identifiers as untrusted hints.
3. Rehydrate trusted place/source context from the server-side ERN catalog and current truth gates.
4. Apply rate limits and hard cost guard before model invocation.
5. Generate concise Guide wording under ERN truth/no-paid-ranking constraints.
6. Reject model source references outside the trusted context.
7. Fall back to the deterministic Guide on transport, model, truth, safety or cost failure.

Model/API credentials must remain server-side. The generative layer stays disabled until its production deployment evidence, privacy notice, observability and hard cost ceiling all pass. Local code, test adapters and browser configuration never count as activation evidence.

### Bounded lazy camera catalog parts (2026-10-15)

`src/search-extra-catalog.js` registers two supplemental JSON parts, each limited to 500 records. This module is imported dynamically by Search after the existing initial render and by commercial attribution only when needed; it is not an eager homepage dependency. `scripts/read-search-supplemental.mjs` reads the same registered parts for destination builds, recency/operations, demand triage, source maintenance and commercial audits. Add new reviewed sources to a part with capacity, preserving unique source/place identities and existing truth/permission/currentness rules. Never increase a part limit or core/startup byte budget to fit expansion.

Both files and the lazy module are included in release artifacts and manifest hashes. The supplemental validator rejects cross-part duplicate IDs, over-limit parts and existing source-policy violations. A transport failure can retain successfully loaded parts; missing evidence cannot create current coverage. Counts must combine both parts and core, then deduplicate place IDs. Moving a record between files does not renew verification or add a place. The 1,000-place goal still requires independently verified camera coverage.
