import assert from "node:assert/strict";
import {guideAiFallback} from "../src/guide-ai-fallback.js";
const r=guideAiFallback("MODEL_GENERATION_FAILED",{query:"show coast",language:"en",placeId:"flam"});
assert.equal(r.mode,"DETERMINISTIC_ONLY");
assert.equal(r.deterministicRequest.query,"show coast");
assert.equal(r.deterministicRequest.placeId,"flam");
assert.equal(r.visitorMessage,null);
assert.match(r.truth,/existing deterministic Guide/);
console.log("Guide AI fallback preserves deterministic Guide handoff without exposing backend failure copy");
