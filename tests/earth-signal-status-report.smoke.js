import assert from "node:assert/strict";
import {EARTH_SIGNAL_CAPABILITIES} from "../src/earth-signal-capabilities.js";
import {earthSignalStatusReport,earthSignalStatusText} from "../src/earth-signal-status-report.js";

const r=earthSignalStatusReport();
assert.equal(r.mode,"READ_ONLY");
assert.equal(r.ready,false);
assert.equal(r.blockers.length,7);
assert.equal(r.truth,"Architecture readiness and an API contract are not production capability; deployment evidence must also pass.");
assert.equal(r.backendContract.version,"2026-09-25.v1");
assert.equal(r.backendContract.ttlMinutes,45);
assert.equal(r.backendFoundation.state,"PREPARED_NOT_DEPLOYED");
assert.equal(r.backendFoundation.deployedTransport,false);
assert.equal(r.backendFoundation.failClosedHttpAdapter,true);
assert.equal(r.backendFoundation.durableStorageContract,true);
assert.equal(r.backendFoundation.storageSchemaValidation,true);
assert.equal(r.backendFoundation.gatedServiceLayer,true);
assert.equal(r.backendFoundation.subjectScopedRateLimitContract,true);
assert.equal(r.backendFoundation.rawNetworkIdentifiersStored,false);
assert.equal(r.privacyNoticeDraft.contentReady,true);
assert.equal(r.privacyNoticeDraft.published,false);
assert.equal(r.privacyNoticeDraft.activationSatisfied,false);
assert.equal(r.deployment.state,"NOT_DEPLOYED");
assert.equal(r.deployment.ready,false);
assert.equal(r.deployment.missing.length,11);
assert.match(earthSignalStatusText(),/read-only · 7 blockers/);

const all=Object.fromEntries(Object.keys(EARTH_SIGNAL_CAPABILITIES).map(k=>[k,true]));
const noDeployment=earthSignalStatusReport(all);
assert.equal(noDeployment.mode,"READ_ONLY");
assert.equal(noDeployment.ready,false);

const deploymentEvidence={
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
const enabled=earthSignalStatusReport(all,{deploymentEvidence});
assert.equal(enabled.mode,"CONTRIBUTION_ENABLED");
assert.equal(enabled.ready,true);
assert.equal(enabled.backendFoundation.deployedTransport,true);

console.log("Earth Signal operator status requires both capabilities and deployment evidence");
