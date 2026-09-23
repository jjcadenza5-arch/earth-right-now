import assert from "node:assert/strict";import {atlasMaintenanceSummary} from "../src/atlas-maintenance-summary.js";
const now=new Date("2026-09-23T12:00:00Z");
const base={placeId:"p",title:"Test",provider:"Provider",country:"Test",region:"Test",categories:["Useful Earth"],truth:"EXTERNAL_LIVE",permission:"LINK_ONLY",health:"HEALTHY",playback:"EXTERNAL",sourceUrl:"https://example.com/live",checkedAt:"2026-09-23T00:00:00Z",lastSuccessfulCheck:"2026-09-23T00:00:00Z",quality:80,freshness:80,moment:80,timeZone:"UTC"};
const rows=[
 {...base,id:"evidenced",lat:1,lon:2,coordinateBasis:"PLACE_REFERENCE",coordinateSourceUrl:"https://example.com/place"},
 {...base,id:"legacy",lat:3,lon:4},
 {...base,id:"unmapped"}
];
const r=atlasMaintenanceSummary(rows,{now,limit:5});
assert.equal(r.total,3);assert.equal(r.mapped,2);assert.equal(r.mappedWithEvidence,1);assert.equal(r.provenanceCompletionPct,50);assert.equal(r.unmapped,1);assert.equal(r.legacy,1);assert.equal(r.next.unmapped[0].id,"unmapped");assert.equal(r.next.legacy[0].id,"legacy");
console.log("ERN Atlas maintenance summary passed");
