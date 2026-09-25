import assert from "node:assert/strict";
import fs from "node:fs";
import {validateEarthSignalDeploymentManifest,publicEarthSignalDeploymentEvidence} from "../src/earth-signal-deployment-manifest.js";

const manifest=JSON.parse(fs.readFileSync("data/earth-signal-deployment.json","utf8"));
const current=validateEarthSignalDeploymentManifest(manifest);
assert.equal(current.valid,true);
const publicEvidence=publicEarthSignalDeploymentEvidence(manifest);
assert.equal(publicEvidence.ok,true);
assert.equal(publicEvidence.evidence.status,"NOT_DEPLOYED");
assert.equal(publicEvidence.evidence.endpointUrl,null);

const secretLeak=validateEarthSignalDeploymentManifest({...manifest,apiKey:"secret"});
assert.equal(secretLeak.valid,false);
assert.ok(secretLeak.issues.some(x=>x.includes("apiKey")));

const badUrl=validateEarthSignalDeploymentManifest({...manifest,endpointUrl:"http://example.test"});
assert.ok(badUrl.issues.includes("ENDPOINT_NOT_HTTPS"));

console.log("Earth Signal deployment manifest remains non-secret, HTTPS-bound and explicitly not deployed");
