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
 {...base,id:"hold",title:"Hold",health:"DEGRADED",permission:"EMBED_ALLOWED",playback:"EMBED",featuredHold:true},
 {...base,id:"provider-offline",title:"Provider Offline",health:"DEGRADED",permission:"LINK_ONLY",playback:"EXTERNAL",failureReason:"OFFICIAL_COLLECTION_WEBCAMS_OFFLINE_2026-09-24"},
 {...base,id:"unsampled-embed",title:"Unsampled Embed",health:"HEALTHY",permission:"EMBED_ALLOWED",playback:"EMBED"},
 {...base,id:"unsampled-image",title:"Unsampled Image",health:"HEALTHY",permission:"LINK_ONLY",playback:"EXTERNAL",truth:"LIVE_IMAGE"},
 {...base,id:"unsampled-external",title:"Unsampled External",health:"HEALTHY",permission:"LINK_ONLY",playback:"EXTERNAL"}
];
const availability={results:[
 {id:"missing",outcome:"PAGE_MISSING"},{id:"blocked",outcome:"ACCESS_BLOCKED"},{id:"reachable",outcome:"PAGE_REACHABLE"},{id:"retry",outcome:"TIMEOUT"}
]};
const continuity={rows:[{id:"missing",state:"PERSISTENT_MISSING_REVIEW"}]};
const r=sourceRevalidationTriage(sources,{availability,continuity});
assert.equal(r.summary.permissionReview,1);assert.equal(r.summary.humanMediaReview,1);assert.equal(r.summary.manualSourceReview,1);assert.equal(r.summary.accessLimited,1);assert.equal(r.summary.editorialRecheck,1);assert.equal(r.summary.retryLater,1);assert.equal(r.summary.deferredPlaybackReprove,1);assert.equal(r.summary.deferredProviderOffline,1);assert.equal(r.summary.curationHold,1);assert.equal(r.summary.deployedPlaybackRecheck,1);assert.equal(r.summary.currentImageRecheck,1);assert.ok(r.summary.editorialRecheck>=2);
assert.ok(r.immediate.some(x=>x.id==="permission"));assert.ok(r.immediate.some(x=>x.id==="degraded"));assert.ok(!r.immediate.some(x=>x.id==="rejected"));assert.ok(!r.immediate.some(x=>x.id==="hold"));assert.ok(!r.immediate.some(x=>x.id==="provider-offline"));assert.equal(r.safety.catalogMutationAllowed,false);assert.equal(r.safety.automaticHealthChangeAllowed,false);assert.equal(r.safety.availabilityProvesLive,false);assert.equal(r.items.find(x=>x.id==="unsampled-embed").lane,"DEPLOYED_PLAYBACK_RECHECK");assert.equal(r.items.find(x=>x.id==="unsampled-image").lane,"CURRENT_IMAGE_RECHECK");assert.equal(r.items.find(x=>x.id==="unsampled-external").lane,"EDITORIAL_RECHECK");
console.log("ERN source revalidation triage separates actionable evidence lanes");
