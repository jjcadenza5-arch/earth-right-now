import assert from "node:assert/strict";
import {GUIDE_AI_API_VERSION} from "../src/guide-ai-api-contract.js";
import {guideAiService} from "../src/guide-ai-service.js";
import {createInMemoryGuideAiRateLimiter} from "../src/guide-ai-rate-limit.js";
import {createInMemoryGuideAiMetrics} from "../src/guide-ai-observability.js";

const all={transport:true,secretIsolation:true,trustedContext:true,costGuard:true,rateLimits:true,observability:true,safetyBoundary:true,privacyNotice:true,deterministicFallback:true};
const catalog=[{id:"a",placeId:"p",title:"A",truth:"LIVE_VIDEO",permission:"EMBED_ALLOWED",health:"HEALTHY",playback:"EMBED",checkedAt:"2026-09-25T00:00:00Z"}];
const costGuard={allow:async()=>({allowed:true}),commit:async()=>({allowed:true})};
const modelAdapter={generate:async({trustedContext})=>({answer:"A is a current ERN window.",sourceIds:[trustedContext.sourceIds[0]],usage:{units:1}})};
const subject="anon_AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA";
const context=(overrides={})=>({
  capabilities:all,catalog,costGuard,modelAdapter,
  resolver:{resolve:async({placeHint})=>({placeId:placeHint||"p",sourceIds:["a"]})},
  rateLimiter:createInMemoryGuideAiRateLimiter(),
  metrics:createInMemoryGuideAiMetrics(),
  rateSubject:subject,
  ...overrides
});

const off=await guideAiService({version:GUIDE_AI_API_VERSION,query:"show me A",language:"en"},{});
assert.equal(off.mode,"DETERMINISTIC_ONLY");

const ok=await guideAiService({version:GUIDE_AI_API_VERSION,query:"show me A",language:"en",placeId:"p"},context());
assert.equal(ok.ok,true);
assert.equal(ok.response.sourceIds[0],"a");

let releases=0;
const releasingCostGuard={allow:async()=>({allowed:true}),commit:async()=>({allowed:true}),release:async()=>{releases++;return{released:true}}};
const hallucinating={generate:async()=>({answer:"Use fake",sourceIds:["fake"]})};
const blocked=await guideAiService({version:GUIDE_AI_API_VERSION,query:"show me A",language:"en",placeId:"p"},context({modelAdapter:hallucinating,costGuard:releasingCostGuard}));
assert.equal(blocked.ok,false);
assert.equal(blocked.reason,"UNTRUSTED_SOURCE_REFERENCE");
assert.equal(blocked.mode,"DETERMINISTIC_ONLY");
assert.equal(releases,1);

const expensive={allow:async()=>({allowed:false,reason:"COST_GUARD_BLOCKED"}),commit:async()=>({allowed:true})};
const costBlocked=await guideAiService({version:GUIDE_AI_API_VERSION,query:"show me A",language:"en",placeId:"p"},context({costGuard:expensive}));
assert.equal(costBlocked.mode,"DETERMINISTIC_ONLY");
assert.equal(costBlocked.reason,"COST_GUARD_BLOCKED");

const missingLimiter=await guideAiService({version:GUIDE_AI_API_VERSION,query:"show me A",language:"en",placeId:"p"},{capabilities:all,catalog,costGuard,modelAdapter,resolver:{resolve:async()=>({placeId:"p",sourceIds:["a"]})},metrics:createInMemoryGuideAiMetrics(),rateSubject:subject});
assert.equal(missingLimiter.reason,"RATE_LIMITER_REQUIRED");

const noResolver=await guideAiService({version:GUIDE_AI_API_VERSION,query:"show me A",language:"en",placeId:"p"},{capabilities:all,catalog,costGuard,modelAdapter,rateLimiter:createInMemoryGuideAiRateLimiter(),metrics:createInMemoryGuideAiMetrics(),rateSubject:subject});
assert.equal(noResolver.reason,"DETERMINISTIC_RESOLVER_REQUIRED");

const rawIdentity=await guideAiService({version:GUIDE_AI_API_VERSION,query:"show me A",language:"en",placeId:"p"},context({rateSubject:"192.0.2.1"}));
assert.equal(rawIdentity.reason,"OPAQUE_RATE_SUBJECT_REQUIRED");

const metrics=createInMemoryGuideAiMetrics();
const observed=await guideAiService({version:GUIDE_AI_API_VERSION,query:"show me A",language:"en",placeId:"p"},context({metrics}));
assert.equal(observed.ok,true);
assert.ok(metrics.snapshot().some(x=>x.type==="success"));
assert.ok(metrics.snapshot().every(x=>!("query" in x)&&!("answer" in x)));

console.log("Generative Guide service enforces truth, cost, pseudonymous rate limits and aggregate-only observability");
