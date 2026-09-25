import assert from "node:assert/strict";
import fs from "node:fs";
import {validateGuideAiDeploymentManifest,publicGuideAiDeploymentEvidence} from "../src/guide-ai-deployment-manifest.js";

const manifest=JSON.parse(fs.readFileSync("data/guide-ai-deployment.json","utf8"));
assert.equal(validateGuideAiDeploymentManifest(manifest).valid,true);
assert.equal(publicGuideAiDeploymentEvidence(manifest).evidence.status,"NOT_DEPLOYED");
assert.equal(publicGuideAiDeploymentEvidence(manifest).evidence.rawPromptLoggingDisabled,true);
assert.equal(publicGuideAiDeploymentEvidence(manifest).evidence.providerDataHandlingReviewed,false);assert.equal(publicGuideAiDeploymentEvidence(manifest).evidence.idempotency,false);assert.equal(publicGuideAiDeploymentEvidence(manifest).evidence.modelCancellation,false);assert.equal(publicGuideAiDeploymentEvidence(manifest).evidence.serverDerivedRateSubject,false);assert.equal(publicGuideAiDeploymentEvidence(manifest).evidence.keyedRateSubjectDerivation,false);assert.equal(publicGuideAiDeploymentEvidence(manifest).evidence.rawNetworkIdentifiersStored,false);
const bad=validateGuideAiDeploymentManifest({...manifest,apiKey:"secret"});
assert.equal(bad.valid,false);
assert.ok(bad.issues.some(x=>x.includes("apiKey")));
console.log("Generative Guide deployment manifest is public evidence only and rejects secret-like fields");
