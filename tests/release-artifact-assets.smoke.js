import assert from "node:assert/strict";
import fs from "node:fs";
const build=fs.readFileSync(new URL("../scripts/build-release-snapshot.mjs",import.meta.url),"utf8");
const required=["guide-ai-client.js","guide-ai-routing.js","guide-ai-capabilities.js","guide-ai-activation.js","playback-proof.js"];
assert.ok(build.includes('"src/app-lite.js"'),"release manifest must hash app-lite.js");
assert.ok(build.includes('"src/styles-lite.css"'),"release manifest must hash styles-lite.css");
for(const name of required){
  assert.ok(build.includes('../src/'+name),"release build must copy "+name);
  assert.ok(build.includes('src/'+name),"release manifest must include "+name);
}
const pkg=JSON.parse(fs.readFileSync(new URL("../package.json",import.meta.url),"utf8"));
const workflow=fs.readFileSync(new URL("../.github/workflows/pages.yml",import.meta.url),"utf8");
assert.ok(pkg.scripts["release:public-module-integrity"],"post-build public module integrity command missing");
assert.ok(workflow.includes("Public module integrity"),"Pages workflow must run public module integrity after build");
const index=fs.readFileSync(new URL("../index.html",import.meta.url),"utf8");
assert.ok(index.includes('src/guide-ai-client.js'),"public index should reference Guide AI client");
console.log("Release artifact includes the full public Guide module chain");
