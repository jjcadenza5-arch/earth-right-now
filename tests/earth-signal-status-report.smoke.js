import assert from "node:assert/strict";
import {EARTH_SIGNAL_CAPABILITIES} from "../src/earth-signal-capabilities.js";
import {earthSignalStatusReport,earthSignalStatusText} from "../src/earth-signal-status-report.js";

const r=earthSignalStatusReport();
assert.equal(r.mode,"READ_ONLY");
assert.equal(r.ready,false);
assert.equal(r.blockers.length,7);
assert.equal(r.truth,"Production infrastructure may be deployed while Earth Signals remain read-only; visitor contributions require complete evidence plus explicit public activation.");
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
assert.equal(r.privacyNoticeDraft.published,true);
assert.equal(r.privacyNoticeDraft.activationSatisfied,true);
assert.equal(r.deployment.state,"NOT_DEPLOYED");
assert.equal(r.deployment.ready,false);
assert.equal(r.deployment.missing.length,11);
assert.match(earthSignalStatusText(),/read-only · 7 blockers/);

const all=Object.fromEntries(Object.keys(EARTH_SIGNAL_CAPABILITIES).map(k=>[k,true]));
const noDeployment=earthSignalStatusReport(all);
assert.equal(noDeployment.mode,"READ_ONLY");
assert.equal(noDeployment.ready,false);

const deploymentEvidence={
 status:"DEPLOYED",
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
 costGuard:true,
 publicActivationAllowed:false
};
const gated=earthSignalStatusReport(all,{deploymentEvidence});
assert.equal(gated.mode,"READ_ONLY");
assert.equal(gated.ready,false);
assert.equal(gated.backendFoundation.deployedTransport,true);
assert.equal(gated.deployment.state,"DEPLOYMENT_EVIDENCE_COMPLETE");
assert.deepEqual(gated.blockers,["Explicit public activation decision"]);

const enabled=earthSignalStatusReport(all,{deploymentEvidence:{...deploymentEvidence,publicActivationAllowed:true}});
assert.equal(enabled.mode,"CONTRIBUTION_ENABLED");
assert.equal(enabled.ready,true);
assert.equal(enabled.backendFoundation.deployedTransport,true);

const partial=earthSignalStatusReport(all,{deploymentEvidence:{...deploymentEvidence,observability:false,costGuard:false}});
assert.equal(partial.mode,"READ_ONLY");
assert.equal(partial.deployment.state,"DEPLOYED_EVIDENCE_PARTIAL");
assert.deepEqual(partial.deployment.missing,["observability","costGuard"]);

console.log("Earth Signal operator status distinguishes deployed, evidence-complete and explicitly activated states");

const publishedOnly=earthSignalStatusReport(EARTH_SIGNAL_CAPABILITIES,{deploymentEvidence:{
 status:"NOT_DEPLOYED",
 endpointUrl:null,
 durableStorage:false,
 serverRateLimits:false,
 pseudonymousRateSubjects:false,
 rawNetworkIdentifiersStored:false,
 moderation:false,
 reportQueue:false,
 expiryCleanup:false,
 privacyUrl:"https://earthrightnow.app/privacy.html",
 privacyPublished:true,
 secretIsolation:false,
 observability:false,
 costGuard:false,
 publicActivationAllowed:false
}});
assert.equal(publishedOnly.deployment.ready,false);
assert.equal(publishedOnly.deployment.missing.length,10);
assert.ok(!publishedOnly.deployment.missing.includes("publishedPrivacyNotice"));
