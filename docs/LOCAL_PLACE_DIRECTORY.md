# ERN reviewed local-place directory

This registry is the bridge that allows **small businesses and useful local places to become discoverable through ERN Search and ERN Guide** without mixing paid promotion into editorial ranking.

The public file is `data/local-directory.json`.

Only reviewed entries belong here. A real entry should include `id`, `name`, `type`, `place`, `country`, a short factual `summary`, a public `url`, `verifiedAt`, and `status: "APPROVED"`. Optional fields include coordinates, tags and a related ERN `placeId`.

Guardrails:
- Payment never buys placement or ranking.
- Submitted records remain drafts until reviewed.
- Search relevance is based on visitor query and useful place context.
- ERN Guide may surface approved local entries when a visitor looks for a cafe, restaurant, market, farm, shop or another small local place.
- Empty is acceptable. It is better to show no local-business result than fabricate one.

The registry starts empty intentionally. The website plumbing is active; real entries can be added after review without rebuilding the search architecture.
