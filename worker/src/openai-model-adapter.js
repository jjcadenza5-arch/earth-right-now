const DEFAULT_MODEL = "gpt-5.6-luna";
const OPENAI_RESPONSES_URL = "https://api.openai.com/v1/responses";

const PRICE_PER_MILLION = Object.freeze({
  input: 0.20,
  cachedInput: 0.02,
  output: 1.20
});

function extractOutputText(payload = {}) {
  if (typeof payload.output_text === "string" && payload.output_text.trim()) return payload.output_text.trim();
  const parts = [];
  for (const item of Array.isArray(payload.output) ? payload.output : []) {
    for (const content of Array.isArray(item?.content) ? item.content : []) {
      if (content?.type === "output_text" && typeof content.text === "string") parts.push(content.text);
    }
  }
  return parts.join("").trim();
}

function usageCost(usage = {}) {
  const input = Math.max(0, Number(usage.input_tokens) || 0);
  const output = Math.max(0, Number(usage.output_tokens) || 0);
  const cached = Math.min(input, Math.max(0, Number(usage.input_tokens_details?.cached_tokens) || 0));
  const uncached = Math.max(0, input - cached);
  return {
    inputTokens: input,
    cachedInputTokens: cached,
    outputTokens: output,
    estimatedCostUsd:
      (uncached * PRICE_PER_MILLION.input +
       cached * PRICE_PER_MILLION.cachedInput +
       output * PRICE_PER_MILLION.output) / 1_000_000
  };
}

function responseSchema(sourceIds = []) {
  const allowed = [...new Set(sourceIds.map(String))].slice(0, 12);
  if (!allowed.length) throw new Error("TRUSTED_SOURCE_IDS_REQUIRED");
  return {
    type: "object",
    additionalProperties: false,
    properties: {
      segments: {
        type: "array",
        minItems: 1,
        maxItems: 8,
        items: {
          type: "object",
          additionalProperties: false,
          properties: {
            text: {type: "string", minLength: 1, maxLength: 500},
            sourceIds: {
              type: "array",
              minItems: 1,
              maxItems: 12,
              items: {type: "string", enum: allowed}
            }
          },
          required: ["text", "sourceIds"]
        }
      }
    },
    required: ["segments"]
  };
}

export function createOpenAiGuideModelAdapter({
  apiKey,
  model = DEFAULT_MODEL,
  fetchImpl = fetch
} = {}) {
  if (!apiKey) throw new Error("OPENAI_API_KEY_REQUIRED");
  if (typeof fetchImpl !== "function") throw new Error("FETCH_REQUIRED");

  return {
    async generate({query, language = "en", trustedContext, signal, constraints = {}} = {}) {
      const sourceIds = Array.isArray(trustedContext?.sourceIds) ? trustedContext.sourceIds : [];
      const schema = responseSchema(sourceIds);
      const maxAnswerChars = Math.min(1600, Math.max(200, Number(constraints.maxAnswerChars) || 1600));

      const system = [
        "You are the Earth Right Now (ERN) Guide.",
        "Answer briefly and warmly like a tour guide, not a generic chatbot.",
        "Use ONLY the trusted ERN context supplied below for place/source claims.",
        "Never upgrade LIVE VIDEO, LIVE IMAGE, EXTERNAL LIVE, PARTNER, PREVIEW, health, permission, currentness or playback labels.",
        "Never let paid or sponsored status affect Earth-view ranking.",
        "If the trusted context is insufficient, say so instead of inventing facts.",
        "Return only the requested structured segments.",
        "Keep the combined answer under " + maxAnswerChars + " characters."
      ].join(" ");

      const response = await fetchImpl(OPENAI_RESPONSES_URL, {
        method: "POST",
        signal,
        headers: {
          "authorization": "Bearer " + apiKey,
          "content-type": "application/json"
        },
        body: JSON.stringify({
          model,
          store: false,
          reasoning: {effort: "low"},
          input: [
            {role: "system", content: system},
            {
              role: "user",
              content: JSON.stringify({
                language,
                query: String(query || ""),
                trustedContext
              })
            }
          ],
          text: {
            format: {
              type: "json_schema",
              name: "ern_guide_response",
              strict: true,
              schema
            }
          },
          max_output_tokens: 900
        })
      });

      if (!response.ok) {
        const body = await response.text().catch(() => "");
        throw new Error("OPENAI_RESPONSE_" + response.status + (body ? ":" + body.slice(0, 180) : ""));
      }

      const payload = await response.json();
      const text = extractOutputText(payload);
      if (!text) throw new Error("OPENAI_EMPTY_RESPONSE");

      let parsed;
      try { parsed = JSON.parse(text); }
      catch { throw new Error("OPENAI_INVALID_STRUCTURED_OUTPUT"); }

      return {
        segments: parsed.segments,
        usage: usageCost(payload.usage)
      };
    }
  };
}

export const GUIDE_OPENAI_MODEL_DEFAULT = DEFAULT_MODEL;
export const GUIDE_OPENAI_PRICING_USD_PER_MILLION = PRICE_PER_MILLION;
