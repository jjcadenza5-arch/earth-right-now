import {readFile} from "node:fs/promises";
import {operationsOperatorBrief} from "../src/operations-operator-brief.js";

const args=process.argv.slice(2);
const snapshotPath=args[0];
if(!snapshotPath) throw new Error("snapshot path required");

const read=async p=>JSON.parse(await readFile(p,"utf8"));
const optional=async p=>{
  if(!p||p==="-") return null;
  try{return await read(p)}catch(error){if(error?.code==="ENOENT") return null;throw error}
};

const snapshot=await read(snapshotPath);
const delta=await optional(args[1]);
const availability=await optional(args[2]);
const recovery=await optional(args[3]);
const research=await optional(args[4]);
const playbackHorizon=await optional(args[5]);
const researchPreflight=await optional(args[6]);\nconst availabilityContinuity=await optional(args[7]);

console.log(operationsOperatorBrief({snapshot,delta,availability,recovery,research,playbackHorizon,researchPreflight,availabilityContinuity,commercialInventory}));
