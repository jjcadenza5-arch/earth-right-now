import assert from "node:assert/strict";import{candidateEvidenceStatus,RELEASE_EVIDENCE_KEYS}from"../src/release-evidence.js";
const sha="abc123";const evidence=Object.fromEntries(RELEASE_EVIDENCE_KEYS.map(key=>[key,{commit:sha}]));
assert.equal(candidateEvidenceStatus(evidence,sha).allBound,true);
evidence.mobile.commit="older";const report=candidateEvidenceStatus(evidence,sha);assert.equal(report.allBound,false);assert.deepEqual(report.unbound,["mobile"]);
assert.equal(candidateEvidenceStatus(evidence,"").allBound,false);
console.log("release evidence candidate binding passed");
