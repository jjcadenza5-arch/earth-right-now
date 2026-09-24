import assert from "node:assert/strict";import {operationsTrendSnapshot,compareOperationsTrend} from "../src/operations-trend.js";
const report={generatedAt:"2026-09-24T10:30:00Z",health:{total:10,healthy:8,degraded:2,current:7},watchEarthProductBalance:{strongCurrent:6,insideCurrent:2,externalCurrent:4,insideShortfall:3,recommendedLimit:6,status:"INSIDE_SHORTFALL"},insideERNRecovery:{ready:2,targetReady:5,readyShortfall:3,recoveryDebt:5,degraded:1,held:1},insideProviderResilience:{providerFamilies:1,targetFamilies:2,dominantProviderShare:1,resilient:false,nextGoal:"REVIEW_SECOND_EMBED_PROVIDER"},release:{ready:false,blockers:["x"]},maintenance:{sourceRevalidation:{total:4},atlas:{unmapped:0,legacy:0}}};
const availability={summary:{total:4,reachable:2,missing:1,blocked:1,temporaryError:0,timeout:0,networkError:0}};
const a=operationsTrendSnapshot(report,{availability});assert.equal(a.availability.sampled,4);assert.equal(a.availability.missing,1);
const b=structuredClone(a);b.availability.missing=4;b.availability.reachable=0;
const d=compareOperationsTrend(a,b);assert.equal(d.direction,"UNCHANGED");assert.equal(d.score,0);assert.equal(d.observational.availability.delta.missing,3);
console.log("ERN availability stays non-scoring in trend");
