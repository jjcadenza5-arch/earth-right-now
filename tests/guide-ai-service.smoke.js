import assert from "node:assert/strict";
import {GUIDE_AI_API_VERSION} from "../src/guide-ai-api-contract.js";
import {guideAiService} from "../src/guide-ai-service.js";

const all={transport:true,secretIsolation:true,trustedContext:true,costGuard:true,rateLimits:true,observability:true,safetyBoundary:true,privacyNotice:true,deterministicFallback:true};
const catalog=[{id:"a",placeId:"p",title:"A",truth:"LIVE_VIDEO",permission:"EMBED_ALLOWED",health:"HEALTHY",playback:"EMBED",checkedAt:"2026-09-25T00:00:00Z"}];
const costGuard={allow:async()=>({allowed:true}),commit:async()=>({allowed:true})};
const modelAdapter={generate:async({trustedContext})=>({answer:"A is a current ERN window.",sourceIds:[trustedContext.sourceIds[0]],usage:{units:1}})};

const off=await guideAiService({version:GUIDE_AI_API_VERSION,query:"show me A",language:"en"},{});
assert.equal(off.mode,"DETERMINISTIC_ONLY");

const ok=await guideAiService({version:GUIDE_AI_API_VERSION,query:"show me A",language:"en",placeId:"p"},{capabilities:all,catalog,costGuard,modelAdapter});
assert.equal(ok.ok,true);
assert.equal(ok.response.sourceIds[0],"a");

const hallucinating={generate:async()=>({answer:"Use fake",sourceIds:["fake"]})};
const blocked=await guideAiService({version:GUIDE_AI_API_VERSION,query:"show me A",language:"en",placeId:"p"},{capabilities:all,catalog,costGuard,modelAdapter:hallucinating});
assert.equal(blocked.ok,false);
assert.equal(blocked.reason,"UNTRUSTED_SOURCE_REFERENCE");
assert.equal(blocked.mode,"DETERMINISTIC_ONLY");

const expensive={allow:async()=>({allowed:false,reason:"COST_GUARD_BLOCKED"}),commit:async()=>({allowed:true})};
const costBlocked=await guideAiService({version:GUIDE_AI_API_VERSION,query:"show me A",language:"en",placeId:"p"},{capabilities:all,catalog,costGuard:expensive,modelAdapter});
assert.equal(costBlocked.mode,"DETERMINISTIC_ONLY");
assert.equal(costBlocked.reason,"COST_GUARD_BLOCKED");

console.log("Generative Guide service falls back deterministically on truth or cost failures");
