import fs from "node:fs";import assert from "node:assert/strict";import {researchReviewQueue} from "../src/research-review-queue.js";
const sources=JSON.parse(fs.readFileSync("data/sources.json","utf8"));
const observations=JSON.parse(fs.readFileSync("data/provider-observations.json","utf8"));
for(const [id,ts] of Object.entries({"ponte-di-legno-adamello":"2026-09-24T15:49:44.573Z","metung-gippsland-lakes":"2026-09-24T15:51:30.088Z"})){
 const s=sources.find(x=>x.id===id);assert.equal(s.playbackVerifiedAt,ts,id);
 const o=observations.find(x=>x.id===id&&x.confirmation==="HUMAN_PLAYBACK"&&x.observedAt===ts);assert.ok(o,id+" observation");
 assert.equal(o.httpStatus,200);
}
const research=JSON.parse(fs.readFileSync("data/embed-research-candidates.json","utf8"));
const e=research.find(x=>x.id==="explore-brooks-falls");
assert.equal(e.playbackReview,"HUMAN_PLAYBACK_FAILED");assert.equal(e.promotion,"BLOCKED_PLAYBACK_FAILED");assert.equal(e.lastHumanReviewAt,"2026-09-24T15:51:16.022Z");
const q=researchReviewQueue(research,{primaryCount:1});
assert.ok(!q.primary.some(x=>x.id==="explore-brooks-falls"));
assert.ok(q.alternates.some(x=>x.id==="explore-brooks-falls"&&x.requiredHumanAction==="WAIT_FOR_TARGET_OR_PROVIDER_CHANGE"));
console.log("ERN operator evidence applied atomically and failed research is deferred");
