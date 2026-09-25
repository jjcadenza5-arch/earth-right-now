import assert from "node:assert/strict";import {researchReviewQueue} from "../src/research-review-queue.js";
const candidates=[
 {id:"yt",provider:"Aquarium",platform:"YouTube",playbackReview:"HUMAN_PLAYBACK_REQUIRED"},
 {id:"explore",provider:"Explore.org",platform:"Explore",playbackReview:"HUMAN_PLAYBACK_REQUIRED"}
];
const preflight={rows:[{id:"yt",technicalReady:true,outcome:"TECHNICALLY_READY_FOR_DEPLOYED_TEST"},{id:"explore",technicalReady:true,outcome:"TECHNICALLY_READY_FOR_DEPLOYED_TEST"}]};
const families={items:[{provider:"Explore.org",termsEvidenceState:"CURRENT",safeUsage:true,networkFamily:"explore.org",permissionStatus:"TERMS_SUPPORT_ENABLED_BRANDED_PLAYER_SPECIFIC_PLAYER_REQUIRES_REVIEW"}]};
const r=researchReviewQueue(candidates,{preflightReport:preflight,providerFamilyReport:families,primaryCount:1});
assert.equal(r.primary.length,1);assert.equal(r.primary[0].id,"explore");assert.equal(r.alternates.length,1);assert.equal(r.primary[0].promotionAllowed,false);assert.equal(r.primary[0].permissionStillRequired,true);assert.equal(r.safety.catalogPromotionAllowed,false);assert.equal(r.safety.automaticPermissionApprovalAllowed,false);assert.equal(r.safety.automaticPlaybackConfirmationAllowed,false);
console.log("ERN second-provider review queue prioritizes strongest new-family test");

const exhausted=researchReviewQueue([
 {id:"failed-a",provider:"A",playbackReview:"HUMAN_PLAYBACK_FAILED"},
 {id:"failed-b",provider:"B",playbackReview:"HUMAN_PLAYBACK_FAILED"}
],{primaryCount:1});
assert.equal(exhausted.state,"EXHAUSTED_RESEARCH_NEW_PROVIDER");
assert.equal(exhausted.exhausted,true);
assert.equal(exhausted.reviewable,0);
assert.equal(exhausted.primary.length,0);
assert.equal(exhausted.nextAction,"RESEARCH_NEW_PROVIDER_FAMILY");
assert.equal(exhausted.safety.failedCandidateRetestAllowed,false);

const approvedQueue=researchReviewQueue([
 {id:"approved",provider:"Hida",status:"APPROVED",promotion:"APPROVED_FOR_CATALOG",playbackReview:"HUMAN_PLAYBACK_CONFIRMED",permissionReview:"PER_VIDEO_EMBED_CONFIRMED"},
 {id:"failed",provider:"Old",playbackReview:"HUMAN_PLAYBACK_FAILED"}
],{primaryCount:1});
assert.equal(approvedQueue.approved,1);
assert.equal(approvedQueue.primary.length,0);
assert.equal(approvedQueue.reviewable,0);
assert.equal(approvedQueue.exhausted,true);
assert.ok(!approvedQueue.alternates.some(x=>x.id==="approved"));

const batch=researchReviewQueue([
 {id:"a",provider:"A",playbackReview:"HUMAN_PLAYBACK_REQUIRED"},
 {id:"b",provider:"B",playbackReview:"HUMAN_PLAYBACK_REQUIRED"},
 {id:"c",provider:"C",playbackReview:"HUMAN_PLAYBACK_REQUIRED"},
 {id:"d",provider:"D",playbackReview:"HUMAN_PLAYBACK_REQUIRED"},
 {id:"e",provider:"E",playbackReview:"HUMAN_PLAYBACK_REQUIRED"}
],{primaryCount:4});
assert.equal(batch.primary.length,4);
assert.equal(batch.alternates.length,1);
