import {readFile} from "node:fs/promises";import {operationsOperatorBrief} from "../src/operations-operator-brief.js";
const [snapshotPath,deltaPath,availabilityPath]=process.argv.slice(2);
if(!snapshotPath)throw new Error("usage: node scripts/operations-operator-brief.mjs <snapshot> [delta] [availability]");
const read=async path=>JSON.parse(await readFile(path,"utf8"));
const snapshot=await read(snapshotPath);
let delta=null,availability=null;
if(deltaPath&&deltaPath!=="-"){try{delta=await read(deltaPath)}catch(error){if(error?.code!=="ENOENT")throw error}}
if(availabilityPath&&availabilityPath!=="-"){try{availability=await read(availabilityPath)}catch(error){if(error?.code!=="ENOENT")throw error}}
console.log(operationsOperatorBrief({snapshot,delta,availability}));
