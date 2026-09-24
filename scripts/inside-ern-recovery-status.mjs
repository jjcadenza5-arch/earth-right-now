import { readFile } from "node:fs/promises";
import { insideERNRecoveryStatus } from "../src/inside-ern-recovery.js";
const readJson=async url=>JSON.parse(await readFile(url,"utf8"));
const sources=await readJson(new URL("../data/sources.json",import.meta.url));
let observations=[];try{observations=await readJson(new URL("../data/provider-observations.json",import.meta.url));}catch(error){if(error?.code!=="ENOENT")throw error;}
console.log(JSON.stringify(insideERNRecoveryStatus(sources,observations,{now:new Date(),limit:20}),null,2));
