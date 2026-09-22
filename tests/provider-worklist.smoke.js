import fs from "node:fs";
const s=fs.readFileSync(new URL("../scripts/provider-worklist.mjs",import.meta.url),"utf8");
console.assert(s.includes("evidenceDebtSummary"),"worklist must expose evidence debt summary");
console.assert(s.includes("staleObservationIds"),"worklist must expose stale observation ids");
console.assert(s.includes("evidenceDebt"),"worklist must use the operations evidence debt contract");
console.assert(s.includes("provider:record"),"worklist must include evidence recording guidance");
console.assert(s.includes("HTTP-only page reachability"),"worklist must warn that page reachability is not playback proof");
console.log("provider worklist smoke passed");
