import {readFile} from "node:fs/promises";import {researchReviewQueue} from "../src/research-review-queue.js";
const [preflightPath,familyPath]=process.argv.slice(2);
const read=async p=>JSON.parse(await readFile(p,"utf8"));
const optional=async p=>{if(!p||p==="-")return null;try{return await read(p)}catch(e){if(e?.code==="ENOENT")return null;throw e}};
const [candidates,preflightReport,providerFamilyReport]=await Promise.all([
 read(new URL("../data/embed-research-candidates.json",import.meta.url)),optional(preflightPath),optional(familyPath)
]);
console.log(JSON.stringify(researchReviewQueue(candidates,{preflightReport,providerFamilyReport,primaryCount:1}),null,2));
