import assert from "node:assert/strict";import {reviewEvidenceProposals} from "../src/review-evidence-proposals.js";
const packet={schemaVersion:1,kind:"ERN_OPERATOR_REVIEW_EVIDENCE",catalogMutationAllowed:false,networkStatus:"UNKNOWN_NOT_RECORDED",items:[
 {id:"source-a",type:"restore",outcome:"HUMAN_PLAYBACK_CONFIRMED",observedAt:"2026-09-24T11:00:00Z",evidenceKind:"HUMAN_REVIEW",networkStatus:"UNKNOWN_NOT_RECORDED",sourceUrl:"https://provider.example/source-old",embedUrl:"https://provider.example/embed-old"},
 {id:"research-a",type:"research",outcome:"HUMAN_PLAYBACK_CONFIRMED",observedAt:"2026-09-24T11:00:00Z",evidenceKind:"HUMAN_REVIEW",networkStatus:"UNKNOWN_NOT_RECORDED",sourceUrl:"https://research.example/source-old",embedUrl:"https://research.example/player-old"}
]};
const r=reviewEvidenceProposals(packet,{
 knownSourceIds:["source-a"],researchIds:["research-a"],
 knownSources:[{id:"source-a",sourceUrl:"https://provider.example/source-new",embedUrl:"https://provider.example/embed-new"}],
 researchCandidates:[{id:"research-a",sourceUrl:"https://research.example/source-new",candidateEmbedUrl:"https://research.example/player-new"}],
 availabilityReport:{results:[{id:"source-a",outcome:"PAGE_REACHABLE",httpStatus:200,observedAt:"2026-09-24T10:55:00Z"}]},
 researchPreflight:{rows:[{id:"research-a",technicalReady:true,outcome:"TECHNICALLY_READY_FOR_DEPLOYED_TEST"}]}
});
assert.equal(r.sourceProposals[0].status,"EVIDENCE_TARGET_CHANGED");assert.equal(r.sourceProposals[0].proposedObservation,null);assert.equal(r.summary.sourceTargetChanged,1);
assert.equal(r.researchProposals[0].status,"EVIDENCE_TARGET_CHANGED");assert.equal(r.researchProposals[0].catalogPromotionAllowed,false);assert.equal(r.summary.researchTargetChanged,1);
console.log("ERN review evidence is bound to the reviewed source/player target");
