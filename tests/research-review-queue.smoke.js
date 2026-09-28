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

const prep=researchReviewQueue([{id:"failed-a",provider:"Old",playbackReview:"HUMAN_PLAYBACK_FAILED"}],{providerFamilyReport:{items:[{id:"widget-family",provider:"Widget Provider",familyLabel:"Official widget",candidateEligible:true,technicalStatus:"GENERATED_WIDGET_CODE_REQUIRED",permissionStatus:"EXPLICIT_WIDGET_ALLOWED",nextAction:"GENERATE_WIDGET",termsEvidenceState:"CURRENT",safeUsage:true,networkFamily:"widget.example",usageMode:"PROVIDER_GENERATED_WIDGET_ONLY",discoveryProviderAliases:["Widget Provider Alias"]}]},primaryCount:1});
assert.equal(prep.state,"PROVIDER_PREPARATION_READY");
assert.equal(prep.exhausted,false);
assert.equal(prep.primary.length,0);
assert.equal(prep.preparation.length,1);
assert.equal(prep.preparation[0].requiredHumanAction,"NONE_YET_PREPARE_EXACT_PROVIDER_GENERATED_TARGET");
assert.equal(prep.nextAction,"PREPARE_PROVIDER_GENERATED_TARGET");
assert.equal(prep.safety.automaticWidgetGenerationAllowed,false);
assert.equal(prep.preparation[0].promotionAllowed,false);


const scheduledCandidate={id:"scheduled",provider:"Kyoto",playbackReview:"HUMAN_PLAYBACK_REQUIRED",reviewWindow:{timeZone:"Asia/Tokyo",start:"11:00",end:"18:00"}};
const outside=researchReviewQueue([scheduledCandidate],{primaryCount:1,now:new Date("2026-09-28T15:16:17.377Z")});
assert.equal(outside.state,"WAIT_FOR_REVIEW_WINDOW");
assert.equal(outside.primary.length,0);
assert.equal(outside.scheduledWaiting.length,1);
assert.equal(outside.scheduledWaiting[0].requiredHumanAction,"WAIT_FOR_PUBLISHED_LIVE_WINDOW");
assert.equal(outside.exhausted,false);
const inside=researchReviewQueue([scheduledCandidate],{primaryCount:1,now:new Date("2026-09-29T03:00:00Z")});
assert.equal(inside.state,"HUMAN_REVIEW_READY");
assert.equal(inside.primary.length,1);
assert.equal(inside.primary[0].id,"scheduled");
assert.equal(inside.scheduledWaiting.length,0);
console.log("ERN research review queue respects provider-published live windows");
