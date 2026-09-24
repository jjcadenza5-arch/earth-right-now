import {readFile} from "node:fs/promises";import {operationsOperatorBrief} from "../src/operations-operator-brief.js";
const [snapshotPath,deltaPath,availabilityPath,recoveryPath,researchPath]=process.argv.slice(2);
if(!snapshotPath)throw new Error("usage: node scripts/operations-operator-brief.mjs <snapshot> [delta] [availability] [recovery] [research]");
const read=async path=>JSON.parse(await readFile(path,"utf8"));
const snapshot=await read(snapshotPath);
async function optional(path){if(!path||path==="-")return null;try{return await read(path)}catch(error){if(error?.code==="ENOENT")return null;throw error}}
const delta=await optional(deltaPath),availability=await optional(availabilityPath),recovery=await optional(recoveryPath),research=await optional(researchPath);
console.log(operationsOperatorBrief({snapshot,delta,availability,recovery,research}));
