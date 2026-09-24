import assert from "node:assert/strict";import {playbackEvidenceHorizon} from "../src/playback-evidence-horizon.js";
const now=new Date("2026-09-24T12:00:00Z");
const base={playback:"EMBED",health:"HEALTHY"};
const rows=[
 {...base,id:"current",title:"Current",playbackVerifiedAt:"2026-09-24T00:30:00Z"},
 {...base,id:"due6",title:"Due6",playbackVerifiedAt:"2026-09-23T18:30:00Z"},
 {...base,id:"due12",title:"Due12",playbackVerifiedAt:"2026-09-23T21:00:00Z"},
 {...base,id:"expired",title:"Expired",playbackVerifiedAt:"2026-09-23T10:00:00Z"},
 {...base,id:"missing",title:"Missing"},
 {...base,id:"held",title:"Held",featuredHold:true}
];
const r=playbackEvidenceHorizon(rows,{now,maxAgeHours:24});
assert.equal(r.summary.totalEmbeds,6);assert.equal(r.summary.current,1);assert.equal(r.summary.due6h,1);assert.equal(r.summary.due12h,1);assert.equal(r.summary.expired,1);assert.equal(r.summary.missing,1);assert.equal(r.summary.held,1);
assert.deepEqual(r.urgent.map(x=>x.id),["expired","due6","due12"]);
console.log("ERN playback evidence horizon passed");
