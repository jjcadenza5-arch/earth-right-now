import assert from "node:assert/strict";
import fs from "node:fs";

const workflow=fs.readFileSync(".github/workflows/phase4-earth-signals-pilot.yml","utf8");
assert.match(workflow,/workflow_dispatch:/);
assert.match(workflow,/options:\s*[\s\S]*- activate[\s\S]*- rollback/);
assert.match(workflow,/ERN_EARTH_SIGNALS_ENABLED": "true"/);
assert.match(workflow,/ERN_EARTH_SIGNALS_ENABLED":\\s\*"true"\/,"\\\"ERN_EARTH_SIGNALS_ENABLED\\\": \\\"false\\\""/);
assert.match(workflow,/ownerApproval!==true/);
assert.match(workflow,/runtimeActivationAllowed!==true/);
assert.match(workflow,/observability!==true/);
assert.match(workflow,/costGuard!==true/);
assert.match(workflow,/ERN_RATE_HMAC_KEY/);
assert.match(workflow,/ERN_SIGNAL_REVIEW_TOKEN/);
assert.match(workflow,/Deploy Earth Signals runtime state/);
assert.match(workflow,/rolled back to runtime OFF/);
assert.ok(!/push:/.test(workflow),"Pilot control must remain manual-only");
console.log("Phase 4 Earth Signals pilot workflow is manual, approval-gated and rollback-capable");
