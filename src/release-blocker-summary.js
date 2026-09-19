export function releaseBlockerSummary(readiness,evidence){
 const blockers=[...(readiness?.blockers||[])],missing=Object.entries(evidence||{}).filter(([,x])=>!x?.ok).map(([k])=>k);
 return{ready:Boolean(readiness?.ready)&&missing.length===0,blockers,missingEvidence:missing,count:blockers.length+missing.length};
}
export function releaseBlockerCopy(x){if(x.ready)return"Publication evidence complete.";if(x.missingEvidence?.length)return"Publication remains blocked pending real-world evidence: "+x.missingEvidence.join(", ")+". ";return"Publication remains blocked."}
