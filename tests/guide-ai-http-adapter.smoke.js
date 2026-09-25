import assert from "node:assert/strict";
import {GUIDE_AI_API_VERSION} from "../src/guide-ai-api-contract.js";
import {guideAiHttpRequest} from "../src/guide-ai-http-adapter.js";
import {createInMemoryGuideAiRateLimiter} from "../src/guide-ai-rate-limit.js";
import {createInMemoryGuideAiMetrics} from "../src/guide-ai-observability.js";
import {createInMemoryGuideAiIdempotencyStore} from "../src/guide-ai-idempotency.js";

const disabled=await guideAiHttpRequest({method:"POST",path:"/api/guide",body:{}},{});
assert.equal(disabled.status,503);
assert.equal(disabled.body.mode,"DETERMINISTIC_ONLY");

const all={transport:true,secretIsolation:true,trustedContext:true,costGuard:true,rateLimits:true,idempotency:true,observability:true,safetyBoundary:true,privacyNotice:true,deterministicFallback:true};
const catalog=[{id:"a",placeId:"p",title:"A",truth:"LIVE_VIDEO",permission:"EMBED_ALLOWED",health:"HEALTHY",playback:"EMBED",checkedAt:"2026-09-25T00:00:00Z"}];
const context={
 capabilities:all,catalog,
 costGuard:{allow:async()=>({allowed:true}),commit:async()=>({allowed:true})},
 modelAdapter:{generate:async()=>({segments:[{text:"A",sourceIds:["a"]}]})},
 resolver:{resolve:async()=>({placeId:"p",sourceIds:["a"]})},
 rateLimiter:createInMemoryGuideAiRateLimiter(),
 idempotency:createInMemoryGuideAiIdempotencyStore(),
 metrics:createInMemoryGuideAiMetrics(),
 rateSubject:"anon_AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA"
};
const ok=await guideAiHttpRequest({method:"POST",path:"/api/guide",body:{version:GUIDE_AI_API_VERSION,query:"A",language:"en",placeId:"p",requestId:"req_HTTPAAAAAAAAAAAAAAAAAAAAA"}},context);
assert.equal(ok.status,200);
assert.equal(ok.headers["cache-control"],"no-store");
assert.equal(ok.body.response.generated,true);
const bad=await guideAiHttpRequest({method:"POST",path:"/api/guide",body:{version:GUIDE_AI_API_VERSION,query:"",language:"en"}},context);
assert.equal(bad.status,400);
console.log("Generative Guide HTTP adapter is fail-closed, rate-limited and no-store");
