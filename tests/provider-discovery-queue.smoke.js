import assert from "node:assert/strict";
import {providerDiscoveryQueue} from "../src/provider-discovery-queue.js";

const now=new Date("2026-09-25T06:30:00Z");
const sources=[
 {id:"a1",provider:"Provider A",country:"X",truth:"EXTERNAL_LIVE",playback:"EXTERNAL",health:"HEALTHY",checkedAt:"2026-09-24T12:00:00Z",sourceUrl:"https://a.example/live/1"},
 {id:"a2",provider:"Provider A",country:"Y",truth:"EXTERNAL_LIVE",playback:"EXTERNAL",health:"HEALTHY",checkedAt:"2026-09-24T12:00:00Z",sourceUrl:"https://a.example/live/2"},
 {id:"b1",provider:"Provider B",country:"X",truth:"LIVE_IMAGE",playback:"EXTERNAL",health:"HEALTHY",checkedAt:"2026-09-24T12:00:00Z",sourceUrl:"https://b.example/cam"},
 {id:"alias1",provider:"Provider C Short",country:"X",truth:"EXTERNAL_LIVE",playback:"EXTERNAL",health:"HEALTHY",checkedAt:"2026-09-24T12:00:00Z",sourceUrl:"https://c.example/live"},
 {id:"old",provider:"Old Provider",country:"Z",truth:"EXTERNAL_LIVE",playback:"EXTERNAL",health:"HEALTHY",checkedAt:"2026-08-01T00:00:00Z",sourceUrl:"https://old.example/live"},
 {id:"inside",provider:"Inside",truth:"LIVE_VIDEO",playback:"EMBED",permission:"EMBED_ALLOWED",health:"HEALTHY",checkedAt:"2026-09-24T12:00:00Z",embedUrl:"https://inside.example/embed"}
];
const familyReport={items:[
 {provider:"Provider B"},
 {provider:"Provider C Incorporated",discoveryProviderAliases:["Provider C Short"]}
]};
const r=providerDiscoveryQueue(sources,familyReport,{now,maxAgeDays:7});
assert.equal(r.state,"DISCOVERY_READY");
assert.equal(r.primary.provider,"Provider A");
assert.equal(r.primary.sourceCount,2);
assert.equal(r.primary.liveVideoCount,2);
assert.equal(r.primary.countryCount,2);
assert.equal(r.primary.permissionKnown,false);
assert.equal(r.primary.embedKnown,false);
assert.equal(r.safety.embedPermissionInferred,false);
assert.equal(r.safety.humanReviewRequested,false);
assert.ok(!r.items.some(x=>x.provider==="Provider B"));
assert.ok(!r.items.some(x=>x.provider==="Provider C Short"));
assert.ok(!r.items.some(x=>x.provider==="Old Provider"));
console.log("Provider discovery queue skips researched provider labels and explicit aliases without inferring embed rights");
