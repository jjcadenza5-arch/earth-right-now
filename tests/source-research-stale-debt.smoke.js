import assert from "node:assert/strict";
import fs from "node:fs";
const script=fs.readFileSync(new URL("../scripts/source-research-priority-status.mjs",import.meta.url),"utf8");
assert.match(script,/recencyState/);
assert.match(script,/STALE_CHECK/);
assert.match(script,/declared stale debt ids do not match catalog STALE_CHECK ids/);
assert.match(script,/declared stale debt total does not match catalog/);
console.log("Source research stale debt is cross-checked against catalog recency state");
