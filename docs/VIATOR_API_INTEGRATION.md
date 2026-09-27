# ERN × Viator API integration

Status: **DEPLOYED / SANDBOX KEY ACTIVATION PENDING / PUBLIC API PRODUCTS OFF**

Purpose: scale ERN's "Things to do" layer without manually hand-building every destination link, while keeping Earth-view ranking completely independent of commercial data.

## Architecture

- A separate Cloudflare Worker: `ern-travel-api`.
- Viator API key exists only as a Worker secret named `VIATOR_API_KEY`.
- Public ERN origin is the only allowed browser origin.
- Browser never receives the API key.
- Viator product search remains downstream from an already-selected ERN place.
- ERN↔Viator destination mappings are explicit records in `data/viator-destination-map.json`.
- Fuzzy automatic destination matching is prohibited.
- Public products remain off until a mapping is approved and a tracked affiliate redirect is verified.

## Basic-access scope

ERN needs only the lightweight/basic affiliate path initially:
- destination taxonomy;
- product search;
- single-product detail later if needed;
- attraction search later if needed.

Transactions remain on Viator. ERN does not need merchant checkout or Full + Booking access for this phase.

## Product standard

A Viator result may appear only after:
1. an ERN place is already selected;
2. that ERN place has an explicit approved Viator destination ID;
3. the product query succeeds;
4. the product response is suitable for the selected destination;
5. the outbound link preserves approved affiliate attribution;
6. the UI identifies it as an affiliate travel option.

Commercial data must never alter:
- source truth labels;
- source health;
- Watch Earth ranking;
- ERN Guide Earth-source ranking;
- currentness;
- playback eligibility.

## Current state

Auckland has a working destination-level Viator affiliate click-through, but the API destination taxonomy ID has not yet been retrieved. The Travel Worker is deployed and healthy; the Viator sandbox key is enabled in the partner portal but currently returns 401 `Invalid API Key` while the provider activation window remains open. Therefore the mapping remains `PENDING_API_TAXONOMY_MATCH` and public API products remain off.

## External blocker

To continue production deployment:
1. generate/retrieve the Viator Basic Affiliate API key from the partner dashboard;
2. create/deploy the `ern-travel-api` Worker;
3. store the key as a Cloudflare secret;
4. enable the Worker only after /health is clean;
5. retrieve Viator destination taxonomy and explicitly approve the Auckland mapping;
6. test product search;
7. verify a returned product link carries affiliate attribution;
8. only then wire dynamic products into the public ERN destination/planning surface.

Do not paste the Viator API key into chat or GitHub.


## Verification environment rule

Viator's current Partner API v2 uses `/destinations` for destination taxonomy. The legacy `/v1/taxonomy/destinations` path must not be used for new ERN integration work.

All integration testing remains on `https://api.sandbox.viator.com/partner`. Production API endpoints are not used for tests. ERN may switch to production only after the mapping, product-search, attribution and public-release gates are complete.


## Affiliate URL integrity

For affiliate API responses, ERN uses Viator's returned productUrl as the authoritative outbound experience link. ERN must not rewrite, shorten, reconstruct, or remove query parameters from that URL. The public adapter accepts only HTTPS viator.com URLs and drops any product that lacks a safe affiliate URL.

Product-search requests attach an ERN campaign value derived from the already-approved ERN place ID. This is reporting metadata only; it must never influence Earth-view ranking, source selection, truth labels, or Guide ranking.

## Public activation switch

API availability and public product visibility are separate gates. ERN_VIATOR_API_ENABLED may remain true for sandbox verification while ERN_VIATOR_PUBLIC_PRODUCTS_ENABLED remains false. Approving a destination mapping alone must never make API products public.

## Current activation hold

Provider-side sandbox authentication is the only current blocker. The partner portal shows the sandbox key as enabled and states that API key activation can take up to 48 hours. During this window ERN must not rotate the key repeatedly, switch production on for testing, or loosen the public gates. Once sandbox authentication succeeds, the finite sequence is: retrieve destination taxonomy → explicitly approve Auckland mapping → verify product search → verify returned affiliate productUrl → then consider public API-product activation.


## Browser activation gate

A dormant browser helper may prepare public API-product requests, but it must fail closed unless all of the following are true in the public deployment manifest: publicActivationAllowed, taxonomyVerified, productSearchVerified, and affiliateAttributionVerified. The browser must not call the Travel Worker merely because the Worker exists or because a destination mapping is approved.

## Retest discipline

While the Viator sandbox key remains in provider activation, repeat diagnostics only after the recorded nextRecommendedRetestAt time, or earlier only if Viator reports that the key is active or another material access-state change occurs. This prevents circular retries of the same known 401 state.


## 2026-09-27 activation-window update

Viator sent partner email evidence stating that a newly issued API key can take up to 48 hours to become active. ERN therefore treats the current sandbox 401 Invalid API Key response as an expected provider-side activation hold until that window expires, unless Viator reports activation earlier.
