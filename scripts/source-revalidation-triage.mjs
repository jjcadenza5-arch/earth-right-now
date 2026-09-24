import {readFile} from "node:fs/promises";import {sourceRevalidationTriage} from "../src/source-revalidation-triage.js";
const [availabilityPath,continuityPath]=process.argv.slice(2);
const read=async p=>JSON.parse(await readFile(p,"utf8"));
const optional=async p=>{if(!p||p==="-")return null;try{return await read(p)}catch(e){if(e?.code==="ENOENT")return null;throw e}};
const [sources,availability,continuity]=await Promise.all([read(new URL("../data/sources.json",import.meta.url)),optional(availabilityPath),optional(continuityPath)]);
console.log(JSON.stringify(sourceRevalidationTriage(sources,{availability,continuity,limit:30}),null,2));
