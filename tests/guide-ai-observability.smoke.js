import assert from "node:assert/strict";
import {GUIDE_AI_OBSERVABILITY_POLICY,guideAiOperationalEvent,createInMemoryGuideAiMetrics} from "../src/guide-ai-observability.js";

assert.equal(GUIDE_AI_OBSERVABILITY_POLICY.rawPromptLogging,false);
assert.equal(GUIDE_AI_OBSERVABILITY_POLICY.rawResponseLogging,false);
assert.equal(GUIDE_AI_OBSERVABILITY_POLICY.visitorProfiling,false);
assert.equal(guideAiOperationalEvent({type:"prompt",query:"secret"}).ok,false);
const parsed=guideAiOperationalEvent({type:"success",latencyMs:123,inputChars:20,outputChars:50,estimatedCostUsd:0.001});
assert.equal(parsed.ok,true);
assert.ok(!("query" in parsed.event));
assert.ok(!("answer" in parsed.event));
const metrics=createInMemoryGuideAiMetrics();await metrics.record({type:"fallback",latencyMs:15,inputChars:8});
assert.equal(metrics.snapshot().length,1);
console.log("Guide AI observability retains aggregate operations only, not prompts or profiling");
