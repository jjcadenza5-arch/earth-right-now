# ERN × Viator API integration

Status: **CODE READY / NOT DEPLOYED**

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

Auckland has a working destination-level Viator affiliate click-through, but the API destination taxonomy ID has not yet been retrieved. Therefore the mapping remains `PENDING_API_TAXONOMY_MATCH`.

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
