import {readFile} from "node:fs/promises";import {validateOperatorReviewEvidence} from "../src/operator-review-evidence.js";
const [packetPath]=process.argv.slice(2);if(!packetPath)throw new Error("usage: node scripts/operator-review-evidence-status.mjs <packet.json>");
const [packet,sources,research]=await Promise.all([
 JSON.parse(await readFile(packetPath,"utf8")),
 JSON.parse(await readFile(new URL("../data/sources.json",import.meta.url),"utf8")),
 JSON.parse(await readFile(new URL("../data/embed-research-candidates.json",import.meta.url),"utf8"))
]);
console.log(JSON.stringify(validateOperatorReviewEvidence(packet,{knownSourceIds:sources.map(x=>x.id),researchIds:research.map(x=>x.id)}),null,2));
