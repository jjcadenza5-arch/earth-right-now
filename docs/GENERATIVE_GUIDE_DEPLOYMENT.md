# Generative ERN Guide deployment plan

Status: **APPROVED / DORMANT / ZERO MODEL USAGE**

Decision date: 2026-09-26

## Approved stack

- Edge API: Cloudflare Worker
- Model provider: OpenAI
- Initial model: `gpt-5.6-luna`
- Monthly ERN AI hard ceiling: **USD 10**
- Public site remains on the existing deployment.
- Existing deterministic ERN Guide remains the default and permanent fallback.

The USD 10 figure is a ceiling, not a monthly subscription charge. Actual model spend is usage-based and must remain below the configured ceiling.

## Important activation rule

**Do not activate generative requests merely because this Worker code exists.**

The committed Worker configuration defaults to:

`ERN_GUIDE_AI_ENABLED=false`

The Worker also fails closed even if that flag is changed until durable production implementations for rate limiting, idempotency and cost accounting have been wired and deployment evidence passes the existing ERN Guide readiness gate.

This deliberately lets ERN finish the visitor-facing website before incurring model usage.

## Secrets

Never commit API keys or keyed rate-subject material to GitHub.

Production secrets:
- `OPENAI_API_KEY`
- `ERN_RATE_HMAC_KEY`

Cloudflare Worker secrets are the intended storage mechanism.

## Production activation gates

Before any real model call is allowed:

1. Website readiness has been deliberately approved.
2. Worker HTTPS endpoint exists.
3. OpenAI secret is present only in Cloudflare secret storage.
4. Trusted ERN catalog is rehydrated server-side.
5. Durable per-subject rate limiting is active.
6. Durable 15-minute idempotency/replay protection is active.
7. Durable monthly cost accounting enforces the USD 10 hard ceiling.
8. Model cancellation/timeout remains active.
9. Operational metrics contain no raw prompts, raw responses or raw network identifiers.
10. Safety/truth validation and deterministic fallback pass.
11. `data/guide-ai-deployment.json` is updated only with public, non-secret evidence.
12. The existing `npm run guide-ai:status` gate reports generative readiness.

## Cost behavior

The initial model adapter uses the published GPT-5.6 Luna standard text-token rates and reports an estimated per-request cost to the ERN cost guard. The production cost ledger must be durable and authoritative; the adapter estimate alone is not a hard-stop mechanism.

If the monthly ceiling is reached, the generative layer must stop and ERN must continue through the deterministic Guide.

## Current phase boundary

This repository now contains:
- a dormant fail-closed Worker shell;
- the OpenAI model adapter;
- secret-exclusion rules;
- the approved model and USD 10 ceiling in non-secret configuration.

It intentionally does **not** contain:
- an OpenAI API key;
- a Cloudflare account credential;
- live Worker deployment evidence;
- durable production state stores;
- a public generative endpoint;
- permission to start paid model usage.

Those are later activation steps, after the website itself is ready.
