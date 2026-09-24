import { readFile } from "node:fs/promises";
import { operationsReport } from "../src/operations-report.js";

const readJson=async url=>JSON.parse(await readFile(url,"utf8"));
const rows=await readJson(new URL("../data/sources.json",import.meta.url));
const evidence=await readJson(new URL("../data/release-evidence.json",import.meta.url));
let providerObservations=null;
try{providerObservations=await readJson(new URL("../data/provider-observations.json",import.meta.url));}
catch(error){if(error?.code!=="ENOENT")throw error;}
const report=operationsReport(rows,{releaseEvidence:evidence,providerObservations});
console.log(JSON.stringify({
 generatedAt:report.generatedAt,
 health:report.health,
 watchEarth:report.watchEarth,
 catalogGate:report.gate,
 release:{ready:report.release.ready,blockers:report.release.blockers},
 healthAutomation:report.healthAutomation,
 providerPlaybackEvidence:report.providerPlaybackEvidence,
 insideERNRecovery:report.insideERNRecovery,
 insideProviderResilience:report.insideProviderResilience,
 watchEarthProductBalance:report.watchEarthProductBalance,
 productActivation:report.productActivation,
 maintenance:report.maintenance,
 providerReview:{
  total:report.providerReview.total,
  unsafe:report.providerReview.unsafe.map(x=>({id:x.id,issues:x.issues})),
  reviewRequired:report.providerReview.reviewRequired.map(x=>({id:x.id,crossProvider:x.crossProvider,issues:x.issues}))
 },
 revalidation:report.revalidation
},null,2));
if(report.providerReview.unsafe.length)process.exitCode=1;
if(report.healthAutomation?.providerInput?.rejected?.length)process.exitCode=1;
