# ERN Canonical Handoff — Soft Launch / Operating Stage 1
Updated: 2026-10-02

## Current operating state
Earth Right Now (ERN) has entered a controlled **Soft Public Launch / Real Operating Period**.

Operating stage:
- **ERN Soft Launch / Operating Stage 1**
- state: **ACTIVE / OPERATING**
- mode: **OPERATE_NOT_EXPAND**

This is not a new broad feature phase. Phases 6–10 remain complete.

## Product identity to preserve
- **Earth Right Now — The Live Discovery Engine**
- *See before you go.*
- Product direction: **Live Discovery Search Engine**
- Core journey: **Search → See Live → Discover → Decide → Go**

Immediate operating goal:
> Stop expanding ERN sideways. Let the simple Live Discovery Engine operate in the real world, keep it reliable, and begin proving that it can become a Successful Small Internet Business.

## Owner approval recorded
Canonical approval:
`data/soft-launch-stage1-approval.json`

Operating workplan:
`data/soft-launch-stage1-workplan.json`

The owner explicitly approved soft public launch of the current simple product. On 2026-10-02 the owner separately approved minimal privacy-respecting analytics and search-gap logging. That analytics lane is now active under `AGGREGATE_ONLY`; all other separately gated capabilities remain off.

## Operating lanes
Active operating lanes:
- production-operation — keep the public site stable and production-healthy;
- source-operation — maintain truth, health, currentness and fallback integrity;
- commercial-operation — maintain verified post-discovery commercial actions and verification horizons;
- operating-evidence — record only confirmed production/business facts.

Held/gated lane:
- future-differentiator-hold — preserve ERN Guide, 45-minute Now Moments, serendipity/“crispy pork skin”, Local Earth and future business/travel connections without activation.

## Real-world production heartbeat
Daily Operations now performs a real custom-domain health check using:
`npm run domain:health`

The retained Operations packet includes:
- `domain-health.json`
- `soft-launch-stage1-status.json`

The first Stage 1 production heartbeat on 2026-10-02 reported:
- host: `earthrightnow.app`
- domain state: **OK**
- GitHub Pages DNS state: **OK**
- HTTPS: **OK**
- TLS certificate covers `earthrightnow.app` and `www.earthrightnow.app`
- Stage 1 state: **OPERATING**
- Stage 1 blockers: **0**

This is network/production health evidence from CI. It is not a claim of a physical-device or manual browser test.

## Soft-launch production repair
The first Stage 1 release validation found one genuine public-route issue:
- the homepage/localized discovery surfaces linked to `/discover/wildlife-nature/`;
- the generator skipped that route when the collection temporarily had zero eligible current/schedule-verified rows;
- this also removed the route from the generated sitemap.

Repair:
- empty editorial collections remain crawlable instead of becoming broken links;
- no source is invented, promoted or relabeled to fill an empty collection;
- a zero-item collection remains truthful.

After the repair, the full release smoke suite and all Pages production/deploy steps passed.

## Business operating baseline
Stage 1 status records only confirmed evidence.

Current verified commercial foundation:
- verified affiliate partners: **4**
- verified travel offers: **11**
- Travelpayouts project active: **YES**
- exact tracked links already live: **YES**
- payout method configured: **NO**

The payout method is a future human/account action required before receiving payouts; it does not block ERN public operation or existing tracked links.

Soft-launch analytics is now **ACTIVE** using ERN's first-party aggregate analytics service:
- approximate visitors/page views: **MEASURED**
- coarse country/region: **MEASURED**
- device class: **MEASURED**
- referrer hostname: **MEASURED**
- ERN searches and zero-result search gaps: **MEASURED**
- current-window/source opens: **MEASURED**
- verified commercial outbound actions: **MEASURED**
- bookings: **NOT INFERRED / NOT MEASURED BY ERN**
- conversions/transactions: **NOT INFERRED / NOT MEASURED BY ERN**
- revenue/commission: **NOT INFERRED / NOT MEASURED BY ERN**

Analytics is first-party, aggregate-only, honors DNT/GPC, stores no raw IP address or precise visitor coordinates, does not transmit My Earth favorites/recent history, and retains aggregate analytics for no more than 90 days under the current policy.

## Minimal privacy analytics and search-gap learning
Canonical approval:
`data/soft-launch-analytics-approval.json`

Verified deployment:
`data/analytics-deployment.json`

Service:
- first-party ERN analytics Worker on the existing Cloudflare account;
- no new external account or paid analytics vendor;
- Durable Object aggregate storage;
- raw IP storage: **NO**;
- per-event row storage: **NO**;
- precise location storage: **NO**;
- cross-site tracking / advertising profiles: **NO**;
- retention: **90 days maximum**.

Measured soft-launch events include page views, approximate unique/new/returning use, coarse country/region, device class, referrer hostname, ERN place/source opens, privacy-filtered searches, zero-result searches, and verified commercial outbound opens.

Daily Operations produces:
- `analytics-health.json`;
- a public-safe/redacted aggregate summary;
- a private retained owner report with aggregated search-gap terms.

The first Operations baseline after deployment correctly recorded zero measured visitors/searches because public analytics had not yet been deployed to the site. Treat that as baseline zero, not evidence of no demand.

## Evidence-driven catalog growth
Zero-result search terms are demand evidence, not automatic publishing instructions.

Use repeated gaps to raise research priority only after ERN truth, permission, currentness, playback and quality checks remain satisfied.

**Chiang Mai** is a known initial demand gap. The official Chiang Mai PAO CCTV candidate remains research-only because the current official page still reports standby / waiting-for-feed rather than a dependable visitor-facing current view. It is now tagged `P1_KNOWN_DEMAND_GAP` and should be revisited only after a material source-state change or repeated production demand evidence. Do not promote a weak/static substitute merely to fill the gap.

## Verified commercial inventory
Owner-readable inventory:
`docs/ERN_VERIFIED_COMMERCIAL_INVENTORY_2026-10-02.md`

Current verified relationships:
- **4 affiliate partners**
- **11 verified travel-offer records**

Current partners: Viator, Klook via Travelpayouts, Tiqets via Travelpayouts and Welcome Pickups via Travelpayouts.

Existing verified destinations/actions cover Auckland, Statue of Liberty / New York, Tokyo, Sydney, Honolulu/Waikiki and Auckland airport transfer use cases.

Already-approved-partner expansion candidates such as Kyoto, Seoul, Rovaniemi, Dublin, Rome and Chicago may proceed without destination-by-destination owner approval **only after an exact tracked link is generated and independently verified**. Do not fabricate links or mass-activate inventory.

The first business proof funnel is now measurable through:
**visitor → discovery → useful action → verified affiliate click**

The next milestone requires real partner evidence:
**first eligible transaction / first real revenue from a stranger**

An outbound click alone is never evidence of a booking, sale, commission or revenue.

## Commercial operating rule
The operating sequence remains:
**visitor → discovery → useful travel/business opportunity → optional verified commercial action**

Commercial relationships remain downstream from Earth discovery.

Never allow:
- payment or commission to affect Earth-window ranking;
- unverified offers to display;
- stale-only places to become commercial surfaces;
- automatic link rewriting;
- automatic commercial placement;
- automatic partner/account applications;
- booking or revenue inference.

Do not expand affiliate breadth merely because more programs exist. Maintain the current small verified inventory until real visitor utility or verified external evidence justifies a change.

## Gates that remain OFF
Unless the owner explicitly approves otherwise:
- public generative ERN Guide OFF;
- 45-minute Now Moment media OFF;
- Pilot 2 OFF;
- public Submission intake OFF;
- analytics **ON only in owner-approved `AGGREGATE_ONLY` mode**;
- social-account actions OFF;
- payout/account actions OFF;
- all other separately gated features OFF.

Also:
- no major PR campaign;
- no paid marketing;
- no new external accounts;
- no spending;
- no irreversible business/account changes;
- no credential exposure;
- no paid ranking.

Earth Signals Pilot 1 remains governed by its existing limited-pilot approval and safety rules.

## Future differentiators — preserve, do not activate
ERN Guide:
- future conversational live discovery layer;
- must remain downstream from truthful current-source evidence;
- public generative mode remains OFF.

45-minute Now Moments:
- future temporary visitor glimpse;
- must show freshness and remaining lifetime clearly;
- must remain separate from camera/source truth;
- public media remains OFF.

Crispy Pork Skin Principle:
- ERN should surface useful, interesting small nearby discoveries people did not know to search for;
- serendipity is editorial discovery, not paid placement.

Local Earth / nearby discovery:
- preserve as the path for smaller useful places and nearby context;
- payment never buys discovery ranking.

Future business/travel connections:
- attach after discovery/decision;
- keep simple, verified and secondary to the Earth experience.

## Anti-expansion operating rule
Do not manufacture work.

Do not:
- begin another broad feature phase;
- redesign working surfaces without a production reason;
- increase source count for its own sake;
- increase partner/offer count for its own sake;
- reopen completed Phase 6–10 work;
- repeatedly retest known human-playback failures without a material provider/target change.

Act only on:
- real production/release failures;
- source evidence/currentness changes;
- verification horizons becoming due;
- commercial offer/partner expiry or material evidence;
- explicit owner approvals;
- genuine owner/account/business decisions.

## Current validation evidence
Latest analytics deployment:
- Worker deployment run `36975370219` — **SUCCESS**
- analytics health: **VERIFIED**
- raw network identifiers stored: **NO**
- per-event rows stored: **NO**

Latest Soft Launch Operations validation:
- Operations run at current analytics integration — **SUCCESS**
- private analytics fetch/report generation: **SUCCESS**
- domain and Stage 1 checks: **SUCCESS**

Latest public release:
- Pages run `36976547930` at commit `3a14bd0eeaebad58e469326c4dd0d9589d839327` — **SUCCESS**
- current release smoke suite: **SUCCESS**
- public launch/mobile/accessibility/performance/commercial checks: **SUCCESS**
- static release and public module integrity: **SUCCESS**
- GitHub Pages deployment: **SUCCESS**

Earlier Stage 1 reference evidence follows:

Stage 1 Operations heartbeat:
- run `36968809467` — **SUCCESS**
- domain health: **OK**
- Stage 1 status: **OPERATING**
- packet integrity: **SUCCESS**

Soft-launch release repair:
- Pages run `36968978722`
- release smoke suite: **SUCCESS**
- public launch/mobile/accessibility/performance/commercial checks: **SUCCESS**
- static release build: **SUCCESS**
- artifact upload: **SUCCESS**
- GitHub Pages deploy step: **SUCCESS**

## Atlas / reference-only visitor recovery repair
Owner testing on 2026-10-02 found mapped places such as Georgia Aquarium, St. John's Harbour, Cold Lake Marina and Kīlauea Summit opening into a truth-safe but unhelpful placeholder when source verification had aged into `RECHECK DUE`.

Preserved invariant:
> Never fake LIVE. But never leave the visitor wondering what to do next.

Repair:
- current verified sources remain normal Atlas results;
- healthy but stale/unverified mapped sources remain only as visually distinct **reference-only handoffs** when a safe official/provider source URL exists;
- stale sources with no usable safe handoff are excluded from live-first Atlas discovery;
- degraded/offline entries are not promoted as ordinary live Atlas results;
- opening a reference-only handoff now shows a prominent main-area message: **“Live view temporarily unavailable”**;
- when a safe provider URL exists, the main area offers **“Open official source”**;
- reference-only opens remain non-stateful: they do not create stale deep links or record the place as a current-view interaction;
- commercial actions remain unavailable from non-current source states.

A new read-only audit checks every mapped reference-only Source handoff:
`npm run atlas:reference-audit -- --network`

First production audit:
- reference-only mapped entries audited: **78**
- safe handoff URLs: **78**
- missing/unsafe handoffs: **0**
- definite broken destinations (404/410): **0**
- transient attention: Kīlauea USGS older path timed out from CI; Tonami returned temporary 502
- network reachability never refreshes source currentness and never proves LIVE.

Final validation after the repair:
- Pages run `36977666710` — **SUCCESS**
- Operations run `36977666779` — **SUCCESS**
- release smoke suite: **SUCCESS**
- whole-product guard: **SUCCESS**
- public launch/mobile/accessibility/performance checks: **SUCCESS**
- GitHub Pages deployment: **SUCCESS**

## Destination search matching repair
Owner testing on 2026-10-02 found that searching **New York** could return no public result even though ERN already contained **New York Skyline — Jersey City** and the broader New York Harbor destination.

Root cause:
- text matching already contained some geography;
- public browser search then filtered matched catalog records through current-only eligibility;
- therefore an existing destination could disappear entirely when its source verification became `RECHECK DUE`;
- the catalog also had no populated `aliases`, `city`, `state` or `tags` metadata on any of its 94 records.

New search contract:
- destination matching is forgiving and metadata-first, not exact-display-title-only;
- searchable metadata includes title, placeId, city, state, region, country, provider, story, categories, tags and aliases;
- punctuation/diacritics are folded for search without changing display names;
- current verified windows rank ahead of stale/reference-only windows;
- a healthy known destination with a safe official/provider handoff remains discoverable when current verification expires;
- that stale result keeps `RECHECK DUE` / reference-only truth and never becomes fake LIVE;
- unhealthy/offline or unsafe-link records are not admitted through this fallback.

Explicit high-confidence aliases were added to 26 current catalog records, including:
- New York / New York City / NYC;
- Mount Rainier / Mt Rainier;
- ISS / International Space Station;
- St Johns / Saint John's variants;
- Rio / Rio de Janeiro;
- Cancun;
- Reykjavik;
- Sydney / Coogee / Randwick;
- Honolulu / Waikiki;
- Chicago, Boston, Seoul, Bangkok, Singapore, Rome and Rovaniemi destination forms.

Required examples now pass:
- `New York` → New York Harbor / New York Skyline destination;
- `NYC` → New York Harbor / New York Skyline destination;
- `New York City` → New York Harbor / New York Skyline destination;
- a future Chiang Mai record with `city: "Chiang Mai"`, region/title/placeId/alias evidence is searchable by `Chiang Mai` even when the display title is more specific.

Catalog-wide audit:
`npm run search:metadata-audit`

The audit validates every explicit alias against the production search engine and verifies that destination metadata remains represented in each searchable document. It is also part of daily ERN Operations.

Final validation:
- Pages run `36979017139` — **SUCCESS**
- Operations run `36979017171` — **SUCCESS**
- JavaScript syntax — **SUCCESS**
- 106 current release smoke tests — **SUCCESS**
- whole-product guard — **SUCCESS**
- performance hard cap — **SUCCESS**
- mobile/accessibility/public-launch checks — **SUCCESS**

## Search-engine discoverability / SEO hardening
Completed during Soft Launch / Operating Stage 1 on 2026-10-02.

### Indexing architecture
- `robots.txt` keeps the public site crawlable and continues to exclude operator/release-verification surfaces.
- the release build regenerates `sitemap.xml` from the same current/scheduled truth catalog that builds destination pages;
- indexable destination pages are included in the sitemap;
- stale/reference-only destination pages remain `noindex,follow` and are excluded from the sitemap;
- canonical URLs are stable under `https://earthrightnow.app/places/<placeId>/`;
- `/places/`, `/discover/`, localized Discover roots/collections and appropriate public trust/editorial pages remain crawlable;
- no thin-page expansion was introduced.

### Destination page contract
Indexable destination pages now expose crawlable:
- destination/place name;
- city/state/region/country when present in trusted catalog metadata;
- high-confidence aliases/abbreviations;
- useful destination description;
- truthful current/scheduled source state and source type;
- source-provider attribution and citation URLs;
- related ERN destinations;
- related editorial discovery collections;
- Earth Right Now / See before you go branding.

SEO titles use a destination-first pattern such as:
- `New York Live Now | Earth Right Now`;
- `Auckland Live Now | Earth Right Now`;
- specific same-city pages stay distinct, e.g. `Kyoto Hanamikoji Street Live Now | Earth Right Now`, avoiding duplicate Kyoto titles.

Structured data includes WebPage, Place, BreadcrumbList, geographic/address fields when supported, aliases through `alternateName`, source status/type properties and provider citations. It does not upgrade stale evidence into LIVE.

### Internal discovery
Related-place links remain deterministic, current/schedule-verified and non-commercial. Same country, region/city and category similarity can strengthen related links. Editorial collection links add useful crawl paths without paid ranking.

### Automated SEO audit
`npm run seo:indexing-audit -- dist`

The Pages workflow runs this against the actual generated release artifact before deployment. It checks:
- robots/sitemap integrity;
- sitemap duplicate URLs;
- sitemap routes;
- canonical existence and duplicate canonicals;
- title/description/Open Graph coverage;
- JSON-LD validity;
- index/noindex versus sitemap consistency;
- destination title pattern;
- visible crawlable text;
- truthful Place/status structured data;
- related links/provider attribution warnings.

Final successful artifact audit:
- files checked: **143**
- indexable pages: **59**
- generated destination pages: **90**
- destination pages currently eligible for indexing: **9**
- sitemap URLs: **59**
- blocking SEO issues: **0**
- non-blocking warnings: **14**, limited to concise localized Discover meta descriptions.

The low indexed-destination count is intentional under ERN's fail-closed truth policy: stale/reference-only destinations remain public for transparency but are not presented to search engines as current destination pages until they regain current/schedule-verified status.

### Search-engine owner readiness
Owner instructions are in `docs/SEARCH_ENGINE_OWNER_READINESS.md`.

The homepage already contains a Google site-verification meta token. ERN code does not claim that the Search Console property is verified. Google/Bing account creation, login, DNS verification and ownership confirmation remain owner-only actions.

Recommended next owner sequence:
1. verify/add `earthrightnow.app` in Google Search Console;
2. submit `https://earthrightnow.app/sitemap.xml`;
3. inspect representative URLs;
4. import the verified Search Console property into Bing Webmaster Tools, or use Bing's owner verification flow;
5. confirm Bing knows the same sitemap.

No DNS token should ever be invented or added without the exact value supplied by the owner's search-engine account.

### Validation
Pages run `36980095488` — **SUCCESS**.
All release, lean, whole-product, public-launch, mobile, accessibility, performance, generated SEO indexing and existing public discoverability checks passed.

Direct HTTP fetch of the custom domain could not be independently repeated from the current assistant environment because its DNS/network resolver is unavailable. The conclusion is based on the successfully generated release artifact plus GitHub Pages deployment success; do not misstate this as a manual external browser fetch.

## External live-source wording refinement
Completed during Soft Launch / Operating Stage 1 on 2026-10-02.

Visitor-language rule:
- embedded current stream works in ERN → show normally;
- verified-current external live stream → **Live stream available at the source** with **Open live source**;
- healthy source whose verification is stale → **Source recheck due** with a neutral **Open source** handoff;
- degraded/offline/no usable source → unavailable wording only.

This keeps ERN positive without weakening source truth: `HEALTHY` alone does not prove currentness, and stale/recheck entries are never upgraded to LIVE.

The same positive wording is used on generated destination-page links for verified-current external sources.

During validation, the production audit exposed a time-dependent false positive for the Kyoto Nishiki Market embed outside its provider-published 11:00–18:00 JST live window. The fallback audit now accepts official-source fallback outside published hours instead of incorrectly requiring EMBED to remain primary.

Final Pages run `36989173238` — **SUCCESS**. Release smoke, whole-product, performance, mobile, accessibility, SEO and deployment checks all passed.

## What to do next
Continue operating autonomously through the existing scheduled Operations checks.

Only return to the owner when:
1. a genuine owner approval/account/business decision is required;
2. a gated feature is ready for explicit approval;
3. a real production issue requires direct human/browser/device testing;
4. or a substantial operating/business-readiness review point has accumulated.

Until then, the correct state is:
**OPERATE · VERIFY · MAINTAIN · DO NOT EXPAND**
