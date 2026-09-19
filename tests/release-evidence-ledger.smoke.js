import "./test-browser-env.mjs";
import { readFileSync } from "node:fs";
import { RELEASE_EVIDENCE_KEYS } from "../src/release-evidence.js";
const ledger=JSON.parse(readFileSync(new URL("../data/release-evidence.json",import.meta.url),"utf8"));
console.assert(RELEASE_EVIDENCE_KEYS.every(k=>ledger[k]&&ledger[k].ok===false),"checked-in evidence ledger must start fail-closed");
console.assert(Object.keys(ledger).every(k=>RELEASE_EVIDENCE_KEYS.includes(k)),"evidence ledger must not contain unknown gates");
console.log("ERN release evidence ledger smoke checks passed");
