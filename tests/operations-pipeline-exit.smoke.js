import assert from "node:assert/strict";
import fs from "node:fs";
const workflow=fs.readFileSync(".github/workflows/operations-watch.yml","utf8");
const reportSteps=[...workflow.matchAll(/- name: ([^\n]+)\n\s+shell: bash\n\s+run: \|\n\s+set -o pipefail\n\s+(npm run [^\n]+ \| tee [^\n]+)/g)];
assert.equal(reportSteps.length,7,"all seven daily report pipelines must preserve failure status");
for(const [,name,command] of reportSteps){
 assert.match(command,/^npm run (sources:horizon|atlas:coordinates|provider:worklist|provider:evidence-plan|provider:playback-status|watch-earth:now|operations:status) \| tee [\w-]+\.json$/,`unexpected pipeline: ${name}`);
}
console.log("ERN daily operations pipeline failure propagation passed");
