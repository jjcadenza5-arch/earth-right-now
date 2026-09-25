import assert from "node:assert/strict";
import {guideAiStatusReport} from "../src/guide-ai-status-report.js";

const r=guideAiStatusReport();
assert.equal(r.mode,"DETERMINISTIC_ONLY");
assert.equal(r.ready,false);
assert.equal(r.deterministicFallback,true);
assert.equal(r.deployment.state,"NOT_DEPLOYED");
assert.equal(r.deployment.missing.length,9);
assert.match(r.truth,/remains deterministic/);
console.log("Generative Guide status fails closed to the current deterministic Guide");
