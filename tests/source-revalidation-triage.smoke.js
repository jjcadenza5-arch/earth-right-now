import assert from "node:assert/strict";import {sourceRevalidationTriage} from "../src/source-revalidation-triage.js";
const base={provider:"P",truth:"LIVE_VIDEO",quality:90,checkedAt:"2026-01-01T00:00:00Z",lastSuccessfulCheck:"2026-01-01T00:00:00Z",sourceUrl:"https://example.com"};
const sources=[
 {...base,id:"permission",title:"Permission",health:"HEALTHY",permission:"UNKNOWN",playback:"EXTERNAL"},
 {...base,id:"degraded",title:"Degraded",health:"DEGRADED",permission:"EMBED_ALLOWED",playback:"EMBED"},
 {...base,id:"missing",title:"Missing",health:"HEALTHY",permission:"LINK_ONLY",playback:"EXTERNAL"},
 {...base,id:"blocked",title:"Blocked",health:"HEALTHY",permission:"LINK_ONLY",playback:"EXTERNAL"},
 {...base,id:"reachable",title:"Reachable",health:"HEALTHY",permission:"LINK_ONLY",playback:"EXTERNAL"},
 {...base,id:"retry",title:"Retry",health:"HEALTHY",permission:"LINK_ONLY",playback:"EXTERNAL"},
 {...base,id:"rejected",title:"Rejected",health:"DEGRADED",permission:"EMBED_ALLOWED",playback:"EMBED",failureReason:"VISITOR_PLAYBACK_REJECTED_2026-09-20"},
 {...base,id:"hold",title:"Hold",health:"DEGRADED",permission:"EMBED_ALLOWED",playback:"EMBED",featuredHold:true}
];
const availability={results:[
 {id:"missing",outcome:"PAGE_MISSING"},{id:"blocked",outcome:"ACCESS_BLOCKED"},{id:"reachable",outcome:"PAGE_REACHABLE"},{id:"retry",outcome:"TIMEOUT"}
]};
const continuity={rows:[{id:"missing",state:"PERSISTENT_MISSING_REVIEW"}]};
const r=sourceRevalidationTriage(sources,{availability,continuity});
assert.equal(r.summary.permissionReview,1);assert.equal(r.summary.humanMediaReview,1);assert.equal(r.summary.manualSourceReview,1);assert.equal(r.summary.accessLimited,1);assert.equal(r.summary.editorialRecheck,1);assert.equal(r.summary.retryLater,1);assert.equal(r.summary.deferredPlaybackReprove,1);assert.equal(r.summary.curationHold,1);
assert.ok(r.immediate.some(x=>x.id==="permission"));assert.ok(r.immediate.some(x=>x.id==="degraded"));assert.ok(!r.immediate.some(x=>x.id==="rejected"));assert.ok(!r.immediate.some(x=>x.id==="hold"));assert.equal(r.safety.catalogMutationAllowed,false);assert.equal(r.safety.automaticHealthChangeAllowed,false);assert.equal(r.safety.availabilityProvesLive,false);
console.log("ERN source revalidation triage separates actionable evidence lanes");
