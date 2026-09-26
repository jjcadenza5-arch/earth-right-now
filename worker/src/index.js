const JSON_HEADERS = Object.freeze({
  "content-type": "application/json; charset=utf-8",
  "cache-control": "no-store"
});

function json(status, body, origin = null) {
  const headers = {...JSON_HEADERS};
  if (origin) {
    headers["access-control-allow-origin"] = origin;
    headers["vary"] = "Origin";
  }
  return new Response(JSON.stringify(body), {status, headers});
}

function allowedOrigin(request, env) {
  const configured = String(env.ERN_PUBLIC_ORIGIN || "https://earthrightnow.app").replace(/\/$/, "");
  const origin = String(request.headers.get("origin") || "").replace(/\/$/, "");
  return origin && origin === configured ? origin : null;
}

export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    const origin = allowedOrigin(request, env);

    if (request.method === "OPTIONS") {
      if (!origin) return new Response(null, {status: 403});
      return new Response(null, {
        status: 204,
        headers: {
          "access-control-allow-origin": origin,
          "access-control-allow-methods": "POST, OPTIONS",
          "access-control-allow-headers": "content-type",
          "access-control-max-age": "600",
          "vary": "Origin"
        }
      });
    }

    if (request.method === "GET" && url.pathname === "/health") {
      return json(200, {
        ok: true,
        service: "ERN Guide API",
        generativeEnabled: env.ERN_GUIDE_AI_ENABLED === "true",
        model: env.ERN_GUIDE_MODEL || "gpt-5.6-luna",
        monthlyCostCeilingUsd: Number(env.ERN_GUIDE_MONTHLY_COST_CEILING_USD || 10),
        mode: env.ERN_GUIDE_AI_ENABLED === "true" ? "PREPARED_NOT_ACTIVATED" : "DETERMINISTIC_ONLY",
        secretValuesExposed: false
      }, origin);
    }

    if (request.method !== "POST" || url.pathname !== "/api/guide") {
      return json(404, {ok: false, reason: "NOT_FOUND"}, origin);
    }

    if (!origin) {
      return json(403, {ok: false, reason: "ORIGIN_NOT_ALLOWED"});
    }

    if (env.ERN_GUIDE_AI_ENABLED !== "true") {
      return json(503, {
        ok: false,
        mode: "DETERMINISTIC_ONLY",
        reason: "GUIDE_AI_DISABLED",
        truth: "ERN remains on its deterministic Guide. No model request was sent."
      }, origin);
    }

    // Deliberately fail closed until durable rate/idempotency/cost state and
    // deployment evidence are wired. Turning the flag on cannot spend money yet.
    return json(503, {
      ok: false,
      mode: "DETERMINISTIC_ONLY",
      reason: "PRODUCTION_STATE_STORES_NOT_WIRED",
      truth: "Generative activation requires durable rate limiting, idempotency, cost enforcement and deployment evidence."
    }, origin);
  }
};
