import fs from "node:fs";
const s=fs.readFileSync("scripts/release-candidate.mjs","utf8");
console.assert(!s.includes("\\\\n"),"candidate script must not contain escaped newline text");
console.assert(s.includes("publicationReadyForCandidate=release.ready&&evidenceBinding.allBound"));
console.assert(s.includes("publicationReadyForCandidate,"));
console.assert(s.includes("candidateBlockers,"));
console.assert(s.includes("Release evidence is not bound to candidate"));
console.log("candidate publication binding smoke passed");
