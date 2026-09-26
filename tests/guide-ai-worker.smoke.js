import fs from "node:fs";
const cfg=fs.readFileSync("worker/wrangler.jsonc","utf8");
const worker=fs.readFileSync("worker/src/index.js","utf8");
const state=fs.readFileSync("worker/src/guide-state.js","utf8");
const model=fs.readFileSync("worker/src/openai-model-adapter.js","utf8");
const deployment=JSON.parse(fs.readFileSync("data/guide-ai-deployment.json","utf8"));

console.assert(cfg.includes('"ERN_GUIDE_AI_ENABLED": "false"'),"Guide must default disabled");
console.assert(cfg.includes('"class_name": "GuideState"')&&cfg.includes('"storage": "sqlite"'),"Guide durable state must be SQLite-backed");
console.assert(cfg.includes('"ERN_GUIDE_MONTHLY_COST_CEILING_USD": "10"'),"Guide ceiling must remain USD 10");
console.assert(worker.includes("deriveGuideAiRateSubject")&&worker.includes("ERN_RATE_HMAC_KEY"),"Guide must derive an opaque rate subject");
console.assert(worker.includes("TRUSTED_CATALOG_UNAVAILABLE")&&worker.includes("ERN_CATALOG_URL"),"Guide must rehydrate the ERN catalog server-side");
console.assert(worker.includes("modelTimeoutMs:15000"),"Guide model timeout must remain bounded");
console.assert(state.includes("MONTHLY_COST_CEILING_REACHED")&&state.includes('op==="cost-forfeit"'),"Durable cost hard-stop state missing");
console.assert(state.includes("RATE_LIMIT")&&state.includes("REQUEST_ALREADY_IN_PROGRESS"),"Durable rate/idempotency controls missing");
console.assert(model.includes("store:false"),"OpenAI response storage must be disabled");
console.assert(model.includes('type:"json_schema"')&&model.includes("trustedContext"),"Guide output must remain grounded and schema constrained");
console.assert(deployment.status==="NOT_DEPLOYED"&&deployment.endpointUrl===null,"Local code must not masquerade as deployment evidence");
console.log("guide-ai-worker smoke: ok");
