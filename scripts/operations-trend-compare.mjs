import {readFile} from "node:fs/promises";import {compareOperationsTrend} from "../src/operations-trend.js";
const [previousPath,currentPath]=process.argv.slice(2);
if(!currentPath)throw new Error("usage: node scripts/operations-trend-compare.mjs <previous-or-dash> <current>");
const current=JSON.parse(await readFile(currentPath,"utf8"));
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
console.log(JSON.stringify(compareOperationsTrend(previous,current),null,2));
