import assert from "node:assert/strict";
import { operationsReport } from "../src/operations-report.js";
const now="2026-03-20T12:00:00Z",base={truth:"EXTERNAL_LIVE",permission:"LINK_ONLY",health:"HEALTHY",playback:"EXTERNAL",sourceUrl:"https://example.com",checkedAt:now,lastSuccessfulCheck:now,quality:80,moment:80,categories:["Cities & Streets"],lat:0};
const rows=[{...base,id:"a",placeId:"a",provider:"A",country:"A",lon:0},{...base,id:"b",placeId:"b",provider:"B",country:"B",lon:180},{...base,id:"c",placeId:"c",provider:"C",country:"C",lon:20}];
const r=operationsReport(rows,{checkedAt:now});
assert.equal(r.watchEarth.count,3);assert.equal(r.watchEarth.target,20);assert.equal(r.watchEarth.shortfall,17);assert.equal(r.watchEarth.providers,3);assert.equal(r.watchEarth.providerResilient,true);
console.log("ERN Watch Earth operations resilience checks passed");
