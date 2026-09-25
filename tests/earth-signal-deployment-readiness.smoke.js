import assert from "node:assert/strict";
import {earthSignalDeploymentReadiness,earthSignalCapabilitiesFromDeployment} from "../src/earth-signal-deployment-readiness.js";

const empty=earthSignalDeploymentReadiness();
assert.equal(empty.ready,false);
assert.equal(empty.state,"NOT_DEPLOYED");
assert.equal(empty.missing.length,11);
assert.deepEqual(earthSignalCapabilitiesFromDeployment(),{
  transport:false,rateLimits:false,moderation:false,reporting:false,expiryDeletion:false,privacyNotice:false
});

const partial=earthSignalDeploymentReadiness({
  endpointUrl:"https://signals.example.test/api/earth-signals",
  durableStorage:true,
  serverRateLimits:true
});
assert.equal(partial.ready,false);
assert.equal(partial.checks.httpsEndpoint,true);
assert.equal(partial.checks.durableStorage,true);
assert.equal(partial.checks.serverRateLimits,true);
assert.equal(partial.checks.pseudonymousRateSubjects,false);
assert.equal(partial.checks.publishedPrivacyNotice,false);

const fullEvidence={
  endpointUrl:"https://signals.example.test/api/earth-signals",
  durableStorage:true,
  serverRateLimits:true,
  pseudonymousRateSubjects:true,
  rawNetworkIdentifiersStored:false,
  moderation:true,
  reportQueue:true,
  expiryCleanup:true,
  privacyUrl:"https://example.test/privacy",
  privacyPublished:true,
  secretIsolation:true,
  observability:true,
  costGuard:true
};
const ready=earthSignalDeploymentReadiness(fullEvidence);
assert.equal(ready.ready,true);
assert.equal(ready.state,"DEPLOYMENT_EVIDENCE_COMPLETE");
assert.deepEqual(ready.missing,[]);
assert.deepEqual(earthSignalCapabilitiesFromDeployment(fullEvidence),{
  transport:true,rateLimits:true,moderation:true,reporting:true,expiryDeletion:true,privacyNotice:true
});

console.log("Earth Signal deployment gate stays closed until every production evidence requirement is satisfied");
