import { catalogHealthSummary } from "./catalog-health-summary.js";
import { buildRevalidationQueue } from "./revalidation-queue.js";
import { catalogReleaseGate } from "./catalog-release-gate.js";
import { releaseReadiness } from "./release-readiness.js";
import { catalogSnapshot } from "./catalog-snapshot.js";
import { healthCheckReport,healthReportAudit } from "./health-report.js";
import { providerHostIntegrity } from "./provider-host-integrity.js";
import { providerObservationBatch } from "./provider-observation-batch.js";

export function operationsReport(sources,{queueLimit=20,catalogOptions={},releaseEvidence={},healthObservations=null,providerObservations=null,checkedAt=null}={}){
  const health=catalogHealthSummary(sources),queue=buildRevalidationQueue(sources),gate=catalogReleaseGate(sources,catalogOptions);
  const release=releaseReadiness(sources,{...releaseEvidence,catalogOptions});
  const snapshot=catalogSnapshot(sources,{checkedAt});
  const providerReview=(sources||[]).map(source=>({id:source.id,...providerHostIntegrity(source)})).filter(x=>!x.ok||x.crossProvider);
  const providerBatch=providerObservations===null?null:providerObservationBatch(providerObservations,{observedAt:checkedAt||undefined,knownSourceIds:(sources||[]).map(x=>x.id)});
  const effectiveHealthObservations=healthObservations??providerBatch?.observations??null;
  const healthCheckedAt=checkedAt||(providerBatch?Object.values(providerBatch.observations)[0]?.observedAt:null)||new Date().toISOString();
  const healthAutomation=effectiveHealthObservations===null?null:(()=>{
    const report=healthCheckReport(sources,effectiveHealthObservations,{checkedAt:healthCheckedAt});
    const audit=healthReportAudit(report);
    return{
      complete:audit.ok,
      issues:audit.issues,
      proposals:report.proposals.length,
      inconclusive:report.proposals.filter(x=>x.outcome==="INCONCLUSIVE").length,
      confirmedHealthy:report.proposals.filter(x=>x.outcome==="CONFIRMED_HEALTHY").length,
      definitiveFailures:report.proposals.filter(x=>x.outcome==="DEFINITIVE_FAILURE").length,
      failedChecks:report.proposals.filter(x=>x.outcome==="FAILED_CHECK").length,
      outcomeDetails:{
        inconclusive:report.proposals.filter(x=>x.outcome==="INCONCLUSIVE").map(x=>({id:x.id,observedAt:x.observedAt,reason:x.reason})),
        definitiveFailures:report.proposals.filter(x=>x.outcome==="DEFINITIVE_FAILURE").map(x=>({id:x.id,observedAt:x.observedAt,reason:x.reason})),
        failedChecks:report.proposals.filter(x=>x.outcome==="FAILED_CHECK").map(x=>({id:x.id,observedAt:x.observedAt,reason:x.reason}))
      },
      changes:report.changes,
      unobserved:report.unobserved,
      unknownObservationIds:report.unknownObservationIds,
      invalidObservations:report.invalidObservations,
      providerInput:providerBatch?{accepted:providerBatch.total,rejected:providerBatch.rejected}:null
    };
  })();

  return{
    generatedAt:checkedAt||new Date().toISOString(),
    snapshot,
    health,
    gate:{ready:gate.ready,blockers:gate.blockers,currentHealthy:gate.currentHealthy,currentInsideERN:gate.currentInsideERN,unknown:gate.unknown,rejected:gate.rejected},
    release:{ready:release.ready,blockers:release.blockers,checks:release.checks,evidence:release.evidence},
    healthAutomation,
    providerReview:{total:providerReview.length,unsafe:providerReview.filter(x=>!x.ok),reviewRequired:providerReview.filter(x=>x.reviewRequired),crossProvider:providerReview.filter(x=>x.crossProvider)},
    revalidation:{total:queue.length,next:queue.slice(0,queueLimit).map(x=>({id:x.source.id,title:x.source.title,priority:x.priority,reason:x.reason,health:x.source.health,playback:x.source.playback,permission:x.source.permission}))}
  };
}
