import { catalogHealthSummary } from "./catalog-health-summary.js";
import { buildRevalidationQueue } from "./revalidation-queue.js";
import { catalogReleaseGate } from "./catalog-release-gate.js";
import { releaseReadiness } from "./release-readiness.js";
import { catalogSnapshot } from "./catalog-snapshot.js";
import { healthCheckReport,healthReportAudit } from "./health-report.js";
import { providerHostIntegrity } from "./provider-host-integrity.js";

export function operationsReport(sources,{queueLimit=20,catalogOptions={},releaseEvidence={},healthObservations=null,checkedAt=null}={}){
  const health=catalogHealthSummary(sources),queue=buildRevalidationQueue(sources),gate=catalogReleaseGate(sources,catalogOptions);
  const release=releaseReadiness(sources,{...releaseEvidence,catalogOptions});
  const snapshot=catalogSnapshot(sources,{checkedAt});
  const providerReview=(sources||[]).map(source=>({id:source.id,...providerHostIntegrity(source)})).filter(x=>!x.ok||x.crossProvider);
  const healthAutomation=healthObservations===null?null:(()=>{
    const report=healthCheckReport(sources,healthObservations,{checkedAt:checkedAt||undefined});
    const audit=healthReportAudit(report);
    return{
      complete:audit.ok,
      issues:audit.issues,
      proposals:report.proposals.length,
      changes:report.changes,
      unobserved:report.unobserved,
      unknownObservationIds:report.unknownObservationIds,
      invalidObservations:report.invalidObservations
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
