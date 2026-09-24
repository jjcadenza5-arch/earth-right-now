import {readFile} from "node:fs/promises";import {compareAvailabilityContinuity} from "../src/source-availability-continuity.js";
const [previousPath,currentPath]=process.argv.slice(2);
if(!currentPath)throw new Error("usage: node scripts/source-availability-continuity.mjs <previous-or-dash> <current>");
const read=async p=>JSON.parse(await readFile(p,"utf8"));
const optionalHistory=async p=>{
 if(!p||p==="-")return null;
 try{
   const raw=await readFile(p,"utf8");
   if(!raw.trim())return null;
   return JSON.parse(raw);
 }catch(error){
   if(error?.code==="ENOENT"||error instanceof SyntaxError)return null;
   throw error;
 }
};
const previous=await optionalHistory(previousPath);
const current=await read(currentPath);
console.log(JSON.stringify(compareAvailabilityContinuity(previous,current),null,2));
