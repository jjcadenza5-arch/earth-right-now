import assert from "node:assert/strict";
import {GUIDE_AI_API_VERSION} from "../src/guide-ai-api-contract.js";
import {guideAiService} from "../src/guide-ai-service.js";
import {createInMemoryGuideAiRateLimiter} from "../src/guide-ai-rate-limit.js";
import {createInMemoryGuideAiMetrics} from "../src/guide-ai-observability.js";
import {createInMemoryGuideAiIdempotencyStore} from "../src/guide-ai-idempotency.js";

const all={transport:true,secretIsolation:true,trustedContext:true,costGuard:true,rateLimits:true,idempotency:true,observability:true,safetyBoundary:true,privacyNotice:true,deterministicFallback:true};
const catalog=[{id:"a",placeId:"p",title:"A",truth:"LIVE_VIDEO",permission:"EMBED_ALLOWED",health:"HEALTHY",playback:"EMBED",checkedAt:"2026-09-25T00:00:00Z"}];
const costGuard={allow:async()=>({allowed:true}),commit:async()=>({allowed:true}),release:async()=>({released:true}),forfeit:async()=>({forfeited:true})};
const modelAdapter={generate:async({trustedContext})=>({segments:[{text:"A is a current ERN window.",sourceIds:[trustedContext.sourceIds[0]]}],usage:{units:1}})};
const subject="anon_AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA";
const context=(overrides={})=>({
  capabilities:all,catalog,costGuard,modelAdapter,
  resolver:{resolve:async({placeHint})=>({placeId:placeHint||"p",sourceIds:["a"]})},
  rateLimiter:createInMemoryGuideAiRateLimiter(),
  idempotency:createInMemoryGuideAiIdempotencyStore(),
  metrics:createInMemoryGuideAiMetrics(),
  rateSubject:subject,
  ...overrides
});

const off=await guideAiService({version:GUIDE_AI_API_VERSION,query:"show me A",language:"en",requestId:"req_OFFAAAAAAAAAAAAAAAAAAAAA"},{});
assert.equal(off.mode,"DETERMINISTIC_ONLY");

const ok=await guideAiService({version:GUIDE_AI_API_VERSION,query:"show me A",language:"en",placeId:"p",requestId:"req_OKAAAAAAAAAAAAAAAAAAAAAA"},context());
assert.equal(ok.ok,true);
assert.equal(ok.response.sourceIds[0],"a");

let releases=0,forfeits=0;
const releasingCostGuard={allow:async()=>({allowed:true}),commit:async()=>({allowed:true}),release:async()=>{releases++;return{released:true}},forfeit:async()=>{forfeits++;return{forfeited:true}}};
const hallucinating={generate:async()=>({segments:[{text:"Use fake",sourceIds:["fake"]}]})};
const blocked=await guideAiService({version:GUIDE_AI_API_VERSION,query:"show me A",language:"en",placeId:"p",requestId:"req_HALLUCINATEAAAAAAAAAAAAAA"},context({modelAdapter:hallucinating,costGuard:releasingCostGuard}));
assert.equal(blocked.ok,false);
assert.equal(blocked.reason,"UNTRUSTED_SOURCE_REFERENCE");
assert.equal(blocked.mode,"DETERMINISTIC_ONLY");
assert.equal(releases,0);assert.equal(forfeits,1);

const expensive={allow:async()=>({allowed:false,reason:"COST_GUARD_BLOCKED"}),commit:async()=>({allowed:true}),release:async()=>({released:true}),forfeit:async()=>({forfeited:true})};
const costBlocked=await guideAiService({version:GUIDE_AI_API_VERSION,query:"show me A",language:"en",placeId:"p",requestId:"req_COSTAAAAAAAAAAAAAAAAAAAA"},context({costGuard:expensive}));
assert.equal(costBlocked.mode,"DETERMINISTIC_ONLY");
assert.equal(costBlocked.reason,"COST_GUARD_BLOCKED");

const missingLimiter=await guideAiService({version:GUIDE_AI_API_VERSION,query:"show me A",language:"en",placeId:"p",requestId:"req_LIMITERAAAAAAAAAAAAAAAAA"},{capabilities:all,catalog,costGuard,modelAdapter,resolver:{resolve:async()=>({placeId:"p",sourceIds:["a"]})},idempotency:createInMemoryGuideAiIdempotencyStore(),metrics:createInMemoryGuideAiMetrics(),rateSubject:subject});
assert.equal(missingLimiter.reason,"RATE_LIMITER_REQUIRED");

const noResolver=await guideAiService({version:GUIDE_AI_API_VERSION,query:"show me A",language:"en",placeId:"p",requestId:"req_RESOLVERAAAAAAAAAAAAAAAA"},{capabilities:all,catalog,costGuard,modelAdapter,rateLimiter:createInMemoryGuideAiRateLimiter(),idempotency:createInMemoryGuideAiIdempotencyStore(),metrics:createInMemoryGuideAiMetrics(),rateSubject:subject});
assert.equal(noResolver.reason,"DETERMINISTIC_RESOLVER_REQUIRED");

const rawIdentity=await guideAiService({version:GUIDE_AI_API_VERSION,query:"show me A",language:"en",placeId:"p",requestId:"req_RAWIDENTITYAAAAAAAAAAAAAA"},context({rateSubject:"192.0.2.1"}));
assert.equal(rawIdentity.reason,"OPAQUE_RATE_SUBJECT_REQUIRED");
const clientOnly=await guideAiService(
 {version:GUIDE_AI_API_VERSION,query:"show me A",language:"en",placeId:"p",sessionId:subject,requestId:"req_CLIENTONLYAAAAAAAAAAAAAAA"},
 context({rateSubject:null})
);
assert.equal(clientOnly.reason,"RATE_SUBJECT_REQUIRED");

const metrics=createInMemoryGuideAiMetrics();
const observed=await guideAiService({version:GUIDE_AI_API_VERSION,query:"show me A",language:"en",placeId:"p",requestId:"req_METRICSAAAAAAAAAAAAAAAAA"},context({metrics}));
assert.equal(observed.ok,true);
assert.ok(metrics.snapshot().some(x=>x.type==="success"));
assert.ok(metrics.snapshot().every(x=>!("query" in x)&&!("answer" in x)));

let modelCalls=0,costAllows=0,costCommits=0;
const replayStore=createInMemoryGuideAiIdempotencyStore();
const replayContext=context({
  idempotency:replayStore,
  modelAdapter:{generate:async({trustedContext})=>{modelCalls++;return{segments:[{text:"A is current.",sourceIds:[trustedContext.sourceIds[0]]}],usage:{units:1}}}},
  costGuard:{allow:async()=>{costAllows++;return{allowed:true}},commit:async()=>{costCommits++;return{allowed:true,estimatedCostUsd:0.001}},release:async()=>({released:true}),forfeit:async()=>({forfeited:true})}
});
const replayRequest={version:GUIDE_AI_API_VERSION,query:"show me A",language:"en",placeId:"p",requestId:"req_REPLAYAAAAAAAAAAAAAAAAAAA"};
const firstReplay=await guideAiService(replayRequest,replayContext);
const secondReplay=await guideAiService(replayRequest,replayContext);
assert.equal(firstReplay.ok,true);
assert.equal(firstReplay.replayed,false);
assert.equal(secondReplay.ok,true);
assert.equal(secondReplay.replayed,true);
assert.equal(secondReplay.response.answer,firstReplay.response.answer);
assert.equal(modelCalls,1);
assert.equal(costAllows,1);
assert.equal(costCommits,1);

console.log("Generative Guide service enforces truth, cost, replay safety, pseudonymous rate limits and aggregate-only observability");
