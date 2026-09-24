import {readFile} from "node:fs/promises";import {compareAvailabilityContinuity} from "../src/source-availability-continuity.js";
const [previousPath,currentPath]=process.argv.slice(2);
if(!currentPath)throw new Error("usage: node scripts/source-availability-continuity.mjs <previous-or-dash> <current>");
const read=async p=>JSON.parse(await readFile(p,"utf8"));
let previous=null;
if(previousPath&&previousPath!=="-"){try{previous=await read(previousPath)}catch(error){if(error?.code!=="ENOENT")throw error}}
const current=await read(currentPath);
console.log(JSON.stringify(compareAvailabilityContinuity(previous,current),null,2));
