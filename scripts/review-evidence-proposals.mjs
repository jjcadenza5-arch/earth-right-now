import {readFile} from "node:fs/promises";
import {reviewEvidenceProposals} from "../src/review-evidence-proposals.js";

const [packetPath,availabilityPath,preflightPath]=process.argv.slice(2);
if(!packetPath)throw new Error("usage: node scripts/review-evidence-proposals.mjs <review-packet.json> [availability.json] [research-preflight.json]");

const read=async p=>JSON.parse(await readFile(p,"utf8"));
const optional=async p=>{if(!p||p==="-")return null;try{return await read(p)}catch(error){if(error?.code==="ENOENT")return null;throw error}};
const [packet,sources,research,availability,researchPreflight]=await Promise.all([
  read(packetPath),
  read(new URL("../data/sources.json",import.meta.url)),
  read(new URL("../data/embed-research-candidates.json",import.meta.url)),
  optional(availabilityPath),
  optional(preflightPath)
]);

console.log(JSON.stringify(reviewEvidenceProposals(packet,{
  knownSourceIds:sources.map(x=>x.id),
  researchIds:research.map(x=>x.id),
  availabilityReport:availability,
  researchPreflight,
  expectedReviewOrigins:["https://earthrightnow.app/review/inside-ern.html"],
  maxReviewAgeHours:24,
  now:new Date()
}),null,2));
