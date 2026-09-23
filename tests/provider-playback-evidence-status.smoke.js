import assert from "node:assert/strict";
import { providerPlaybackEvidenceStatus } from "../src/provider-playback-evidence.js";

const sources=[
 {id:"a",title:"A",provider:"P1",playback:"EMBED",permission:"EMBED_ALLOWED",health:"HEALTHY",quality:90},
 {id:"b",title:"B",provider:"P1",playback:"EMBED",permission:"EMBED_ALLOWED",health:"HEALTHY",quality:80},
 {id:"c",title:"C",provider:"P2",playback:"EMBED",permission:"EMBED_ALLOWED",health:"DEGRADED",quality:70},
 {id:"d",title:"D",provider:"P2",playback:"EXTERNAL",permission:"LINK_ONLY",health:"HEALTHY",quality:99}
];
const first=providerPlaybackEvidenceStatus(sources,[
 {id:"a",httpStatus:200,confirmation:"HUMAN_PLAYBACK",observedAt:"2026-09-23T00:00:00Z"},
 {id:"b",httpStatus:200,confirmation:"MEDIA_ENDPOINT",observedAt:"2026-09-23T00:00:00Z"}
]);
assert.equal(first.insideERN,3);
assert.equal(first.providerFamilies,2);
assert.equal(first.providerFamiliesReady,0);
assert.deepEqual(first.missing.map(x=>x.id).sort(),["b","c"]);
assert.equal(first.providers.find(x=>x.provider==="P2").degradedRepresentatives[0],"c");
assert.equal(first.ready,false);

const complete=providerPlaybackEvidenceStatus(sources,[
 {id:"a",httpStatus:200,confirmation:"HUMAN_PLAYBACK",observedAt:"2026-09-23T00:00:00Z"},
 {id:"b",httpStatus:200,confirmation:"HUMAN_PLAYBACK",observedAt:"2026-09-23T00:00:00Z"},
 {id:"c",httpStatus:200,confirmation:"HUMAN_PLAYBACK",observedAt:"2026-09-23T00:00:00Z"}
]);
assert.equal(complete.providerFamiliesReady,2);
assert.equal(complete.ready,true);
assert.equal(complete.missing.length,0);
console.log("provider playback evidence status passed");
