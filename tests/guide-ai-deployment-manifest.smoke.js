import assert from "node:assert/strict";
import fs from "node:fs";
import {validateGuideAiDeploymentManifest,publicGuideAiDeploymentEvidence} from "../src/guide-ai-deployment-manifest.js";
import {guideAiDeploymentReadiness} from "../src/guide-ai-deployment-readiness.js";

const manifest=JSON.parse(fs.readFileSync("data/guide-ai-deployment.json","utf8"));
const validated=validateGuideAiDeploymentManifest(manifest);
assert.equal(validated.valid,true);

const publicEvidence=publicGuideAiDeploymentEvidence(manifest);
assert.equal(publicEvidence.ok,true);
assert.equal(publicEvidence.evidence.status,"DEPLOYED");
assert.equal(publicEvidence.evidence.rawPromptLoggingDisabled,true);
assert.equal(publicEvidence.evidence.rawResponseLoggingDisabled,true);
assert.equal(publicEvidence.evidence.visitorProfilingDisabled,true);
assert.equal(publicEvidence.evidence.privacyPublished,true);
assert.equal(publicEvidence.evidence.privacyUrl,"https://earthrightnow.app/privacy.html");
assert.equal(publicEvidence.evidence.providerDataHandlingReviewed,true);
assert.equal(publicEvidence.evidence.idempotency,true);
assert.equal(publicEvidence.evidence.modelCancellation,true);
assert.equal(publicEvidence.evidence.serverDerivedRateSubject,true);
assert.equal(publicEvidence.evidence.keyedRateSubjectDerivation,true);
assert.equal(publicEvidence.evidence.rawNetworkIdentifiersStored,false);

const readiness=guideAiDeploymentReadiness(publicEvidence.evidence);
assert.equal(readiness.ready,true);
assert.equal(readiness.state,"DEPLOYMENT_EVIDENCE_COMPLETE");
assert.deepEqual(readiness.missing,[]);

const bad=validateGuideAiDeploymentManifest({...manifest,apiKey:"secret"});
assert.equal(bad.valid,false);
assert.ok(bad.issues.some(x=>x.includes("apiKey")));
console.log("Generative Guide deployment manifest is public evidence only, production-complete, and rejects secret-like fields");
