import assert from "node:assert/strict";import { discoveryMix } from "../src/small-place-discovery.js";const rows=[{title:"Iconic landmark",region:"Major city"},{title:"World famous skyline",region:"Major city"},{title:"Local village market",region:"Small town"},{title:"City landmark",region:"Major city"},{title:"Quiet marina",region:"Local harbour"},{title:"Famous square",region:"Major city"}];const mixed=discoveryMix(rows,{limit:6,promote:true});assert.equal(mixed.length,6);assert.match(mixed[0].title,/Local village market/);assert.match(mixed[1].title,/Quiet marina/);assert.deepEqual(discoveryMix(rows,{limit:3,promote:false}),rows.slice(0,3));console.log("ERN local discovery mix passed");

import { rankForIntent } from "../src/ern-ai.js";
const now=new Date("2026-09-22T12:00:00Z");
const sources=[{id:"generic",title:"Local beach",truth:"PREVIEW",playback:"PREVIEW",health:"HEALTHY",story:"beach",verifiedAt:"2026-09-22T11:00:00Z"},{id:"village",title:"Riverside village market",truth:"PREVIEW",playback:"PREVIEW",health:"HEALTHY",region:"Small town",story:"local market waterfront",verifiedAt:"2026-09-22T11:00:00Z"}];
const rankedLocal=rankForIntent(sources,"somewhere local",{now});assert.equal(rankedLocal[0]?.id,"village","stronger local context should rank ahead of generic local wording");
console.log("ERN local relevance ranking passed");
