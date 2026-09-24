import assert from "node:assert/strict";import {playbackProofApplicationPlan} from "../src/playback-proof-application-plan.js";
const proposals={sourceProposals:[
 {id:"ok",status:"READY_FOR_PROVIDER_OBSERVATION_PROPOSAL",proposedObservation:{id:"ok",confirmation:"HUMAN_PLAYBACK",observedAt:"2026-09-24T12:00:00Z",httpStatus:200},proposedCatalogPlaybackMarker:{id:"ok",playbackVerifiedAt:"2026-09-24T12:00:00Z"}},
 {id:"stale",status:"READY_FOR_PROVIDER_OBSERVATION_PROPOSAL",proposedObservation:{id:"stale",confirmation:"HUMAN_PLAYBACK",observedAt:"2026-09-24T12:00:00Z",httpStatus:200},proposedCatalogPlaybackMarker:{id:"stale",playbackVerifiedAt:"2026-09-24T12:00:00Z"}},
 {id:"bad",status:"READY_FOR_PROVIDER_OBSERVATION_PROPOSAL",proposedObservation:{id:"bad",confirmation:"HUMAN_PLAYBACK",observedAt:"2026-09-24T12:00:00Z",httpStatus:200},proposedCatalogPlaybackMarker:{id:"bad",playbackVerifiedAt:"2026-09-24T12:05:00Z"}}
]};
const sources=[
 {id:"ok",playback:"EMBED",permission:"EMBED_ALLOWED",health:"HEALTHY",playbackVerifiedAt:"2026-09-24T08:00:00Z"},
 {id:"stale",playback:"EMBED",permission:"EMBED_ALLOWED",health:"HEALTHY",playbackVerifiedAt:"2026-09-24T13:00:00Z"},
 {id:"bad",playback:"EMBED",permission:"EMBED_ALLOWED",health:"HEALTHY"}
];
const observations=[
 {id:"ok",confirmation:"HUMAN_PLAYBACK",observedAt:"2026-09-24T08:00:00Z"},
 {id:"stale",confirmation:"HUMAN_PLAYBACK",observedAt:"2026-09-24T13:00:00Z"}
];
const r=playbackProofApplicationPlan(proposals,{sources,observations});
assert.equal(r.total,3);assert.equal(r.ready,1);assert.equal(r.blocked,2);
const ok=r.items.find(x=>x.id==="ok");assert.equal(ok.ready,true);assert.equal(ok.proposedAtomicUpdate.catalog.playbackVerifiedAt,ok.proposedAtomicUpdate.observation.observedAt);assert.equal(ok.automaticWriteAllowed,false);
const stale=r.items.find(x=>x.id==="stale");assert.ok(stale.reasons.includes("CATALOG_MARKER_NOT_OLDER"));assert.ok(stale.reasons.includes("OBSERVATION_LEDGER_NOT_OLDER"));
const bad=r.items.find(x=>x.id==="bad");assert.ok(bad.reasons.includes("PROPOSED_PROOF_TIMESTAMPS_NOT_ATOMIC"));
assert.equal(r.safety.partialProofUpdateAllowed,false);assert.equal(r.safety.staleOverwriteAllowed,false);
console.log("ERN playback proof application plan guards stale/partial writes");
