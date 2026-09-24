import {readFile} from "node:fs/promises";
import {playbackProofApplicationPlan} from "../src/playback-proof-application-plan.js";
const [proposalPath]=process.argv.slice(2);if(!proposalPath)throw new Error("usage: node scripts/playback-proof-application-plan.mjs <review-proposals.json>");
const read=async p=>JSON.parse(await readFile(p,"utf8"));
const [proposals,sources,observations]=await Promise.all([
 read(proposalPath),
 read(new URL("../data/sources.json",import.meta.url)),
 read(new URL("../data/provider-observations.json",import.meta.url))
]);
console.log(JSON.stringify(playbackProofApplicationPlan(proposals,{sources,observations}),null,2));
