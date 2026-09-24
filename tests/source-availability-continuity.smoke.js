import assert from "node:assert/strict";import {compareAvailabilityContinuity} from "../src/source-availability-continuity.js";
const prev={generatedAt:"2026-09-23T00:00:00Z",results:[
 {id:"missing",outcome:"PAGE_MISSING",observedAt:"2026-09-23T00:00:00Z"},
 {id:"blocked",outcome:"ACCESS_BLOCKED",observedAt:"2026-09-23T00:00:00Z"},
 {id:"recover",outcome:"TIMEOUT",observedAt:"2026-09-23T00:00:00Z"},
 {id:"transient",outcome:"NETWORK_ERROR",observedAt:"2026-09-23T00:00:00Z"}
]};
const cur={generatedAt:"2026-09-24T00:00:00Z",results:[
 {id:"missing",outcome:"PAGE_MISSING",observedAt:"2026-09-24T00:00:00Z"},
 {id:"blocked",outcome:"ACCESS_BLOCKED",observedAt:"2026-09-24T00:00:00Z"},
 {id:"recover",outcome:"PAGE_REACHABLE",observedAt:"2026-09-24T00:00:00Z"},
 {id:"transient",outcome:"TIMEOUT",observedAt:"2026-09-24T00:00:00Z"},
 {id:"new-missing",outcome:"PAGE_MISSING",observedAt:"2026-09-24T00:00:00Z"}
]};
const r=compareAvailabilityContinuity(prev,cur);
assert.equal(r.summary.persistentMissing,1);assert.equal(r.summary.repeatedAccessLimitation,1);assert.equal(r.summary.recovered,1);assert.equal(r.summary.repeatedTransient,1);assert.equal(r.summary.newMissing,1);
assert.equal(r.rows.find(x=>x.id==="missing").state,"PERSISTENT_MISSING_REVIEW");
assert.equal(r.rows.find(x=>x.id==="blocked").state,"REPEATED_ACCESS_LIMITATION");
assert.equal(r.rows.find(x=>x.id==="recover").state,"RECOVERED_PAGE");
assert.ok(r.rows.every(x=>x.catalogMutationAllowed===false&&x.automaticHealthChangeAllowed===false));
const baseline=compareAvailabilityContinuity(null,cur);assert.equal(baseline.summary.newMissing,2);assert.equal(baseline.summary.persistentMissing,0);
console.log("ERN availability continuity passed");
