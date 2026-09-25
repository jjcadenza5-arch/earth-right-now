import assert from "node:assert/strict";import {submissionTransportReadiness} from "../src/submission-transport-readiness.js";
let r=submissionTransportReadiness({enabled:false,endpoint:"",privacyUrl:"https://earthrightnow.app/privacy.html",retentionDays:30});
assert.equal(r.status,"DISABLED");assert.equal(r.active,false);assert.ok(r.missing.includes("HTTPS_REVIEW_ENDPOINT"));assert.ok(!r.missing.includes("RETENTION_POLICY"));assert.equal(r.privacyReady,true);assert.equal(r.retentionReady,true);assert.equal(r.retentionDays,30);
r=submissionTransportReadiness({enabled:true,endpoint:"https://review.example.com/submit",privacyUrl:"https://earthrightnow.app/privacy.html",retentionDays:30});
assert.equal(r.status,"READY");assert.equal(r.active,true);assert.deepEqual(r.missing,[]);assert.equal(r.endpointReady,true);assert.equal(r.retentionReady,true);
r=submissionTransportReadiness({enabled:true,endpoint:"http://review.example.com/submit",privacyUrl:"not-a-url",retentionDays:0});
assert.equal(r.status,"CONFIG_INCOMPLETE");assert.equal(r.active,false);assert.ok(r.missing.includes("HTTPS_REVIEW_ENDPOINT"));assert.ok(r.missing.includes("PRIVACY_NOTICE"));assert.ok(r.missing.includes("RETENTION_POLICY"));
for(const v of Object.values(r.safety))assert.equal(v,false);
console.log("ERN submission transport readiness passed");
