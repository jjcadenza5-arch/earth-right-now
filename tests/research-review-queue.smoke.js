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
