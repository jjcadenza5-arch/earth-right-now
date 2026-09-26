# Generative ERN Guide deployment

Status: **PHASE 2 IMPLEMENTATION / NOT DEPLOYED / AI OFF**

Decision date: 2026-09-26

## Approved initial stack

- Cloudflare Worker for the ERN Guide API.
- OpenAI Responses API.
- Initial model: `gpt-5.6-luna`.
- Monthly ERN model-spend ceiling: **USD 10**.
- Existing deterministic ERN Guide remains the default fallback.

The USD 10 value is a ceiling, not a subscription charge. The repository configuration still sets `ERN_GUIDE_AI_ENABLED=false`, so this code cannot make a model request in its default state.

## Architecture now implemented in code

The production Worker foundation now includes:

- exact-origin CORS for `https://earthrightnow.app`;
- server-side rehydration from ERN's authoritative public source catalog;
- deterministic ERN ranking before generative wording;
- HMAC-derived opaque request subjects; raw network identifiers are not stored;
- one SQLite-backed Cloudflare Durable Object for the initial low-volume deployment;
- hourly per-subject request limits and one concurrent request per subject;
- 15-minute idempotency/replay state;
- durable monthly cost state with a USD 10 ceiling and a conservative per-request reservation;
- OpenAI Responses API with `store:false`;
- Structured Outputs constrained to server-trusted ERN source IDs;
- 15-second model cancellation;
- aggregate operational counters only, with no raw prompt/response logging;
- deterministic fallback on any unavailable or rejected generative path.

Cloudflare Durable Objects are used because this state must be authoritative across Worker instances; the existing in-memory implementations remain test helpers only.

## Still intentionally not done

Code readiness is not deployment evidence. The public evidence file remains `NOT_DEPLOYED`.

Before paid generative traffic can start, ERN still needs:

1. A real Cloudflare Worker deployment and HTTPS endpoint.
2. `OPENAI_API_KEY` stored as a Cloudflare Worker secret.
3. `ERN_RATE_HMAC_KEY` stored as a separate Cloudflare Worker secret.
4. Provider/data-handling review recorded in public non-secret evidence.
5. Production health/cost-state verification.
6. A deliberate switch of `ERN_GUIDE_AI_ENABLED` from `false` to `true`.
7. Front-end routing that calls generative AI only when ERN's deterministic Guide genuinely needs it.

Do **not** paste either secret into GitHub, source code, browser JavaScript or the ERN catalog.

## Phase boundary

Merging this implementation does not start paid AI. The next genuine external step is Cloudflare/OpenAI credential setup and Worker deployment. Until then, ERN continues to use the deterministic Guide and model usage remains zero.
