import assert from "node:assert/strict";import {reviewEvidenceProposals} from "../src/review-evidence-proposals.js";
const packet={schemaVersion:1,kind:"ERN_OPERATOR_REVIEW_EVIDENCE",catalogMutationAllowed:false,networkStatus:"UNKNOWN_NOT_RECORDED",items:[{id:"a",type:"restore",outcome:"HUMAN_PLAYBACK_CONFIRMED",observedAt:"2026-09-24T11:00:00Z",evidenceKind:"HUMAN_REVIEW",networkStatus:"UNKNOWN_NOT_RECORDED",sourceUrl:"https://provider.example/source",embedUrl:"https://provider.example/embed"}]};
const r=reviewEvidenceProposals(packet,{knownSourceIds:["a"],knownSources:[{id:"a",sourceUrl:"https://provider.example/source",embedUrl:"https://provider.example/embed"}],availabilityReport:{results:[{id:"a",outcome:"PAGE_REACHABLE",httpStatus:200,observedAt:"2026-09-24T10:55:00Z"}]}});
assert.equal(r.sourceProposals[0].status,"READY_FOR_PROVIDER_OBSERVATION_PROPOSAL");assert.equal(r.summary.sourceTargetChanged,0);
console.log("ERN review evidence target binding accepts unchanged target");
