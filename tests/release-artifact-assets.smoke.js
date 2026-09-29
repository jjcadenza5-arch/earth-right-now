import assert from "node:assert/strict";
import fs from "node:fs";
const build=fs.readFileSync(new URL("../scripts/build-release-snapshot.mjs",import.meta.url),"utf8");
const required=["guide-ai-client.js","guide-ai-routing.js","guide-ai-capabilities.js","guide-ai-activation.js","playback-proof.js","fullscreen-continuity.js","candidate-evidence-binding.js","travel-planning-client.js"];
assert.ok(build.includes("listArtifactFiles"),"release manifest must enumerate the full dist artifact");
assert.ok(build.includes('rel!=="release-manifest.json"'),"release manifest must exclude only itself from artifact hashing");
assert.ok(build.includes("data/viator-api-deployment.json"),"release build must ship Viator public config");
assert.ok(build.includes("data/viator-destination-map.json"),"release build must ship Viator destination mapping registry");
for(const name of required){
  assert.ok(build.includes('../src/'+name),"release build must copy "+name);
}
const pkg=JSON.parse(fs.readFileSync(new URL("../package.json",import.meta.url),"utf8"));
const workflow=fs.readFileSync(new URL("../.github/workflows/pages.yml",import.meta.url),"utf8");
assert.ok(pkg.scripts["release:public-module-integrity"],"post-build public module integrity command missing");
assert.ok(workflow.includes("Public module integrity"),"Pages workflow must run public module integrity after build");
const index=fs.readFileSync(new URL("../index.html",import.meta.url),"utf8");
assert.ok(index.includes('src/guide-ai-client.js'),"public index should reference Guide AI client");
console.log("Release artifact includes the full public Guide module chain");
