import { readFile } from "node:fs/promises";
import { operationsReport } from "../src/operations-report.js";

const readJson=async url=>JSON.parse(await readFile(url,"utf8"));
const sources=await readJson(new URL("../data/sources.json",import.meta.url));
let providerObservations=[];
try{providerObservations=await readJson(new URL("../data/provider-observations.json",import.meta.url));}
catch(error){if(error?.code!=="ENOENT")throw error;}
const report=operationsReport(sources,{providerObservations});
const input=report.healthAutomation?.providerInput;
const worklist=input?.evidenceDebt||[];
console.log(JSON.stringify({
 generatedAt:report.generatedAt,
 summary:input?.evidenceDebtSummary||{total:0,degraded:0,unknown:0},
 staleObservationIds:input?.staleObservationIds||[],
 next:worklist.slice(0,20).map(item=>({...item,recordCommand:item.embedUrl?`npm run provider:record -- ${item.id} <http-status> <MEDIA_ENDPOINT|HUMAN_PLAYBACK> "" "<evidence note>"`:null,warning:"Do not record HTTP-only page reachability as playback proof."}))
},null,2));
if(input?.rejected?.length)process.exitCode=1;
