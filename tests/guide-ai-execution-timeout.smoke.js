import assert from "node:assert/strict";
import {guideAiRunModelWithTimeout,GUIDE_AI_EXECUTION_POLICY} from "../src/guide-ai-execution-timeout.js";

let sawAbort=false;
const timed=await guideAiRunModelWithTimeout(({signal})=>new Promise(resolve=>{
  signal.addEventListener("abort",()=>{sawAbort=true;resolve("late")},{once:true});
}),{timeoutMs:1});
assert.equal(timed.ok,false);
assert.equal(timed.reason,"MODEL_TIMEOUT");
assert.equal(timed.timeoutMs,GUIDE_AI_EXECUTION_POLICY.minModelTimeoutMs);

const fast=await guideAiRunModelWithTimeout(async({signal})=>{
  assert.equal(signal.aborted,false);
  return "ok";
},{timeoutMs:5000});
assert.equal(fast.ok,true);
assert.equal(fast.value,"ok");

const failed=await guideAiRunModelWithTimeout(async()=>{throw new Error("boom")},{timeoutMs:5000});
assert.equal(failed.ok,false);
assert.equal(failed.reason,"MODEL_GENERATION_FAILED");

console.log("Guide AI model execution is bounded and exposes AbortSignal cancellation");
