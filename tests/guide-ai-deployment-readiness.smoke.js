import assert from "node:assert/strict";
import {guideAiDeploymentReadiness,guideAiCapabilitiesFromDeployment} from "../src/guide-ai-deployment-readiness.js";

const empty=guideAiDeploymentReadiness();
assert.equal(empty.ready,false);
assert.equal(empty.missing.length,14);
const evidence={
 endpointUrl:"https://guide.example.test/api/guide",
 secretIsolation:true,
 trustedContextRehydration:true,
 rateLimits:true,
 serverDerivedRateSubject:true,
 keyedRateSubjectDerivation:true,
 rawNetworkIdentifiersStored:false,
 idempotency:true,
 modelCancellation:true,
 observability:true,
 safetyBoundary:true,
 privacyUrl:"https://example.test/privacy",
 privacyPublished:true,
 providerDataHandlingReviewed:true,
 rawPromptLoggingDisabled:true,
 rawResponseLoggingDisabled:true,
 visitorProfilingDisabled:true,
 deterministicFallback:true,
 monthlyCostCeilingUsd:10,
 hardStopConfigured:true,
 usageMetering:true
};
const ready=guideAiDeploymentReadiness(evidence);
assert.equal(ready.ready,true);assert.equal(ready.checks.privacyDataHandling,true);assert.equal(ready.checks.modelCancellation,true);assert.equal(ready.checks.serverDerivedRateSubject,true);assert.equal(ready.checks.keyedRateSubjectDerivation,true);
assert.equal(ready.cost.monthlyCostCeilingUsd,10);
assert.equal(ready.cost.automaticCeilingIncreaseAllowed,false);
const caps=guideAiCapabilitiesFromDeployment(evidence);
assert.equal(caps.transport,true);
assert.equal(caps.costGuard,true);assert.equal(caps.idempotency,true);
const unsafeIdentity=guideAiDeploymentReadiness({...evidence,rawNetworkIdentifiersStored:true});assert.equal(unsafeIdentity.ready,false);assert.equal(unsafeIdentity.checks.serverDerivedRateSubject,false);
const notReady=guideAiCapabilitiesFromDeployment({...evidence,hardStopConfigured:false});
assert.equal(notReady.transport,false);
assert.equal(notReady.deterministicFallback,true);
console.log("Generative Guide deployment requires full production, privacy and hard cost-stop evidence");
