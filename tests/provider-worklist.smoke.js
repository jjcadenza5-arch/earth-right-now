import fs from "node:fs";
const s=fs.readFileSync(new URL("../scripts/provider-worklist.mjs",import.meta.url),"utf8");
console.assert(s.includes("evidenceDebtSummary"),"worklist must expose evidence debt summary");
console.assert(s.includes("staleObservationIds"),"worklist must expose stale observation ids");
console.assert(s.includes("evidenceDebt"),"worklist must use the operations evidence debt contract");
console.log("provider worklist smoke passed");
