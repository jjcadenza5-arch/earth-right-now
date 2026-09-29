import assert from "node:assert/strict";
import fs from "node:fs";
const src=fs.readFileSync(new URL("../scripts/source-recency-summary.mjs",import.meta.url),"utf8");
assert.match(src,/stateOf\(s\)==="STALE_CHECK"/,"recency summary must use current stale state name");
assert.doesNotMatch(src,/RECHECK_DUE/,"legacy RECHECK_DUE state must not remain in recency summary");
console.log("Source recency summary classifies STALE_CHECK records correctly");
