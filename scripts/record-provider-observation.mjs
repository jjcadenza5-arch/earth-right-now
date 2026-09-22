import { readFile,writeFile } from "node:fs/promises";
import { providerObservationBatch } from "../src/provider-observation-batch.js";

const [id,httpStatusRaw,confirmation="",failure="",reason=""]=process.argv.slice(2);
if(!id)throw new Error("Usage: npm run provider:record -- <source-id> <http-status> [PROVIDER_API|MEDIA_ENDPOINT|HUMAN_PLAYBACK] [failure] [reason]");
const sources=JSON.parse(await readFile(new URL("../data/sources.json",import.meta.url),"utf8"));
const file=new URL("../data/provider-observations.json",import.meta.url);
let entries=[];try{entries=JSON.parse(await readFile(file,"utf8"));}catch(error){if(error?.code!=="ENOENT")throw error;}
const httpStatus=Number(httpStatusRaw);
const entry={id,httpStatus:Number.isInteger(httpStatus)?httpStatus:null,observedAt:new Date().toISOString()};
if(confirmation)entry.confirmation=confirmation;
if(failure)entry.failure=failure;
if(reason)entry.reason=reason;
const candidate=[...entries.filter(x=>x.id!==id),entry];
const batch=providerObservationBatch(candidate,{knownSourceIds:sources.map(x=>x.id)});
if(batch.rejected.length)throw new Error("Observation rejected: "+JSON.stringify(batch.rejected));
await writeFile(file,JSON.stringify(candidate,null,2)+"\n","utf8");
console.log(JSON.stringify({recorded:id,evidenceKind:batch.observations[id].evidenceKind,providerConfirmed:batch.observations[id].providerConfirmed,definitiveFailure:batch.observations[id].definitiveFailure},null,2));
