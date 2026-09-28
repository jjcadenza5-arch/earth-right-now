import fs from "node:fs";
const src=fs.readFileSync("src/operations-operator-brief.js","utf8");
console.assert(src.includes("commercialExternalGate"),"Commercial external-gate reconciliation missing");
console.assert(src.includes("commercialResearchFiniteComplete"),"Finite commercial research boundary missing");
console.assert(src.includes("Commercial Wave A is externally gated"),"Commercial anti-loop focus message missing");
console.assert(!src.includes("noRequiredRenewal:"),"Human playback renewal must not be treated as autonomous implementation blocker");
console.assert(src.includes("AUTONOMOUS HOLD / HUMAN REVIEW DUE"),"Human-only hold state missing");
console.assert(src.includes("Human playback renewal is not autonomous work"),"Human playback evidence boundary missing");
console.log("Operations distinguishes external/human gates from autonomous work");
