import { readFile } from "node:fs/promises";
import { operationsReport } from "../src/operations-report.js";

const rows=JSON.parse(await readFile(new URL("../data/sources.json",import.meta.url),"utf8"));
const evidence=JSON.parse(await readFile(new URL("../data/release-evidence.json",import.meta.url),"utf8"));
const report=operationsReport(rows,{releaseEvidence:evidence});
console.log(JSON.stringify({
 generatedAt:report.generatedAt,
 health:report.health,
 catalogGate:report.gate,
 release:{ready:report.release.ready,blockers:report.release.blockers},\n healthAutomation:report.healthAutomation,
 providerReview:{
  total:report.providerReview.total,
  unsafe:report.providerReview.unsafe.map(x=>({id:x.id,issues:x.issues})),
  reviewRequired:report.providerReview.reviewRequired.map(x=>({id:x.id,crossProvider:x.crossProvider,issues:x.issues}))
 },
 revalidation:report.revalidation
},null,2));
if(report.providerReview.unsafe.length)process.exitCode=1;
