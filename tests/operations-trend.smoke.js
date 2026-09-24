import assert from "node:assert/strict";import {operationsTrendSnapshot,compareOperationsTrend} from "../src/operations-trend.js";
const report={
 generatedAt:"2026-09-24T09:30:00Z",
 health:{total:78,healthy:74,degraded:4,offline:0,unknown:0,current:70,stale:6,expired:2},
 watchEarthProductBalance:{strongCurrent:51,insideCurrent:3,externalCurrent:48,insideShortfall:2,recommendedLimit:15,status:"INSIDE_SHORTFALL"},
 insideERNRecovery:{ready:3,targetReady:5,readyShortfall:2,recoveryDebt:15,degraded:4,held:4},
 insideProviderResilience:{providerFamilies:1,targetFamilies:2,dominantProviderShare:1,resilient:false,nextGoal:"REVIEW_SECOND_EMBED_PROVIDER"},
 release:{ready:false,blockers:["A","B"]},
 maintenance:{sourceRevalidation:{total:8},atlas:{unmapped:0,legacy:0}}
};
const a=operationsTrendSnapshot(report);
assert.equal(a.schemaVersion,1);assert.equal(a.catalog.healthy,74);assert.equal(a.watchEarth.insideCurrent,3);assert.equal(a.insideERN.readyShortfall,2);assert.equal(a.providers.families,1);assert.equal(a.release.blockers,2);
const baseline=compareOperationsTrend(null,a);assert.equal(baseline.direction,"BASELINE");
const b=structuredClone(a);b.generatedAt="2026-09-25T09:30:00Z";b.catalog.healthy=76;b.catalog.degraded=2;b.watchEarth.insideCurrent=5;b.watchEarth.insideShortfall=0;b.insideERN.ready=5;b.insideERN.readyShortfall=0;b.insideERN.recoveryDebt=10;b.providers.families=2;b.providers.dominantShare=.6;b.release.blockers=1;
const improving=compareOperationsTrend(a,b);assert.equal(improving.direction,"IMPROVING");assert.ok(improving.score>0);assert.ok(improving.improved.some(x=>x.metric==="insideERN.ready"));
const c=structuredClone(a);c.generatedAt="2026-09-25T09:30:00Z";c.catalog.healthy=72;c.catalog.degraded=6;c.watchEarth.insideCurrent=2;c.insideERN.ready=2;c.insideERN.readyShortfall=3;c.release.blockers=4;
const regressing=compareOperationsTrend(a,c);assert.equal(regressing.direction,"REGRESSING");assert.ok(regressing.score<0);assert.ok(regressing.regressed.some(x=>x.metric==="catalog.degraded"));
console.log("ERN operations trend snapshot and comparison passed");
