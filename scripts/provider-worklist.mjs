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
const sourceById=new Map(sources.map(source=>[String(source.id),source]));
const deferredReason=item=>{
 const source=sourceById.get(String(item.id));
 if(source?.featuredHold===true)return "FEATURED_HOLD";
 if(String(source?.failureReason||"").startsWith("VISITOR_PLAYBACK_REJECTED_"))return "KNOWN_VISITOR_PLAYBACK_REJECTION";
 return null;
};
const deferred=worklist.filter(item=>deferredReason(item)).map(item=>({...item,deferredReason:deferredReason(item)}));
const actionable=worklist.filter(item=>!deferredReason(item));
const recordCommand=item=>item.embedUrl?`npm run provider:record -- ${item.id} <http-status> <MEDIA_ENDPOINT|HUMAN_PLAYBACK> "" "<evidence note>"`:null;
console.log(JSON.stringify({
 generatedAt:report.generatedAt,
 summary:{...(input?.evidenceDebtSummary||{total:0,degraded:0,unknown:0}),actionable:actionable.length,deferred:deferred.length},
 staleObservationIds:input?.staleObservationIds||[],
 blockedDegraded:actionable.filter(item=>item.health==="DEGRADED").map(item=>({id:item.id,provider:item.provider||null,sourceUrl:item.sourceUrl||null,embedUrl:item.embedUrl||null,action:item.action,requiredEvidence:item.requiredEvidence,reason:item.reason,recordCommand:recordCommand(item)})),
 deferred:deferred.map(item=>({id:item.id,provider:item.provider||null,health:item.health,deferredReason:item.deferredReason,reason:item.reason,action:item.action})),
 next:actionable.slice(0,20).map(item=>({...item,recordCommand:recordCommand(item),warning:"Do not record HTTP-only page reachability as playback proof."}))
},null,2));
if(input?.rejected?.length)process.exitCode=1;
