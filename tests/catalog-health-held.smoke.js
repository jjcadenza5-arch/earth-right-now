import assert from "node:assert/strict";import {catalogHealthSummary} from "../src/catalog-health-summary.js";
const now=new Date();
const old=new Date(now.getTime()-10*864e5).toISOString();
const rows=[
 {id:"held",health:"HEALTHY",truth:"LIVE_VIDEO",playback:"EXTERNAL",permission:"LINK_ONLY",checkedAt:old,lastSuccessfulCheck:old,featuredHold:true},
 {id:"expired",health:"HEALTHY",truth:"LIVE_VIDEO",playback:"EXTERNAL",permission:"LINK_ONLY",checkedAt:old,lastSuccessfulCheck:old}
];
const x=catalogHealthSummary(rows);
assert.equal(x.held,1);assert.equal(x.expired,1);assert.equal(x.total,2);
console.log("Catalog health summary separates deliberate holds from expired verification");
