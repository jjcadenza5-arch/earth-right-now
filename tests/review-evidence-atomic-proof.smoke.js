import assert from "node:assert/strict";import {reviewEvidenceProposals} from "../src/review-evidence-proposals.js";
const packet={schemaVersion:1,kind:"ERN_OPERATOR_REVIEW_EVIDENCE",catalogMutationAllowed:false,networkStatus:"UNKNOWN_NOT_RECORDED",items:[{id:"x",type:"restore",outcome:"HUMAN_PLAYBACK_CONFIRMED",observedAt:"2026-09-24T12:00:00Z",evidenceKind:"HUMAN_REVIEW",networkStatus:"UNKNOWN_NOT_RECORDED"}]};
const availability={results:[{id:"x",outcome:"PAGE_REACHABLE",httpStatus:200,observedAt:"2026-09-24T11:55:00Z"}]};
const r=reviewEvidenceProposals(packet,{knownSourceIds:["x"],availabilityReport:availability});
const p=r.sourceProposals[0];assert.equal(p.atomicProofUpdateRequired,true);assert.equal(p.proposedObservation.observedAt,p.proposedCatalogPlaybackMarker.playbackVerifiedAt);assert.equal(p.automaticWriteAllowed,false);assert.equal(r.playbackProofUpdateAtomicityRequired,true);
console.log("ERN human playback proof proposal stays atomic");
