import { readFile } from "node:fs/promises";
import { buildReleaseCandidate,releaseCandidateText } from "../src/release-candidate.js";

const rows=JSON.parse(await readFile(new URL("../data/sources.json",import.meta.url),"utf8"));
let evidence={};
try{evidence=JSON.parse(await readFile(new URL("../data/release-evidence.json",import.meta.url),"utf8"))}catch{}
const candidate=buildReleaseCandidate(rows,evidence);
console.log(releaseCandidateText(candidate));
console.log(JSON.stringify({
  generatedAt:candidate.generatedAt,
  inventory:candidate.inventory,
  sourceWarnings:candidate.sourceWarnings,
  publication:candidate.publication,
  recheckIds:candidate.recheckIds
},null,2));
if(!candidate.releasable){
  console.log("\nPublication remains blocked until fresh real-world release evidence is recorded. This report does not fabricate browser/provider evidence.");
}
