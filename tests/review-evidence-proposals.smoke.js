import assert from "node:assert/strict";import {reviewEvidenceProposals} from "../src/review-evidence-proposals.js";
const packet={schemaVersion:1,kind:"ERN_OPERATOR_REVIEW_EVIDENCE",catalogMutationAllowed:false,networkStatus:"UNKNOWN_NOT_RECORDED",items:[
 {id:"source-a",type:"restore",title:"A",provider:"P",outcome:"HUMAN_PLAYBACK_CONFIRMED",observedAt:"2026-09-24T11:00:00Z",evidenceKind:"HUMAN_REVIEW",networkStatus:"UNKNOWN_NOT_RECORDED"},
 {id:"source-b",type:"restore",title:"B",provider:"P",outcome:"PLAYBACK_FAILED",observedAt:"2026-09-24T11:02:00Z",evidenceKind:"HUMAN_REVIEW",networkStatus:"UNKNOWN_NOT_RECORDED"},
 {id:"research-a",type:"research",title:"R",provider:"Q",outcome:"HUMAN_PLAYBACK_CONFIRMED",observedAt:"2026-09-24T11:03:00Z",evidenceKind:"HUMAN_REVIEW",networkStatus:"UNKNOWN_NOT_RECORDED"}
]};
const availability={results:[
 {id:"source-a",outcome:"PAGE_REACHABLE",httpStatus:200,observedAt:"2026-09-24T10:50:00Z"},
 {id:"source-b",outcome:"PAGE_MISSING",httpStatus:404,observedAt:"2026-09-24T10:51:00Z"}
]};
const preflight={rows:[{id:"research-a",technicalReady:true,outcome:"TECHNICALLY_READY_FOR_DEPLOYED_TEST"}]};
let r=reviewEvidenceProposals(packet,{knownSourceIds:["source-a","source-b"],researchIds:["research-a"],availabilityReport:availability,researchPreflight:preflight});
assert.equal(r.validation.ok,true);assert.equal(r.summary.sourceReady,1);assert.equal(r.summary.sourceFailureReview,1);assert.equal(r.summary.researchReadyForReview,1);
const ready=r.sourceProposals.find(x=>x.id==="source-a");assert.equal(ready.status,"READY_FOR_PROVIDER_OBSERVATION_PROPOSAL");assert.equal(ready.proposedObservation.httpStatus,200);assert.equal(ready.proposedObservation.confirmation,"HUMAN_PLAYBACK");assert.equal(ready.automaticWriteAllowed,false);
const failed=r.sourceProposals.find(x=>x.id==="source-b");assert.equal(failed.status,"POSSIBLE_SOURCE_REMOVAL_REVIEW");assert.equal(failed.proposedObservation,null);
const research=r.researchProposals[0];assert.equal(research.status,"READY_FOR_PERMISSION_AND_EDITORIAL_REVIEW");assert.equal(research.catalogPromotionAllowed,false);
assert.equal(r.catalogMutationAllowed,false);assert.equal(r.automaticHealthChangeAllowed,false);assert.equal(r.automaticPermissionApprovalAllowed,false);
r=reviewEvidenceProposals(packet,{knownSourceIds:["source-a","source-b"],researchIds:["research-a"],availabilityReport:{results:[]},researchPreflight:null});
assert.equal(r.sourceProposals.find(x=>x.id==="source-a").status,"NEEDS_FRESH_AVAILABILITY_EVIDENCE");
assert.equal(r.researchProposals[0].status,"NEEDS_TECHNICAL_PREFLIGHT");
console.log("ERN review evidence proposal layer passed");
