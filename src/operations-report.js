import { watchEarthSequenceDiagnostics } from "./watch-earth-sequence-diagnostics.js";
import { watchEarthSnapshot } from "./watch-earth.js";
import { buildDynamicWatchEarth } from "./dynamic-watch-earth.js";
import { catalogHealthSummary } from "./catalog-health-summary.js";
import { buildRevalidationQueue } from "./revalidation-queue.js";
import { catalogReleaseGate } from "./catalog-release-gate.js";
import { releaseReadiness } from "./release-readiness.js";
import { catalogSnapshot } from "./catalog-snapshot.js";
import { healthCheckReport,healthReportAudit } from "./health-report.js";
import { providerHostIntegrity } from "./provider-host-integrity.js";
import { providerObservationBatch } from "./provider-observation-batch.js";
import { providerPlaybackEvidenceStatus } from "./provider-playback-evidence.js";
import { businessReadiness } from "./business-readiness.js";
import { earthSignalStatusReport } from "./earth-signal-status-report.js";
import { atlasMaintenanceSummary } from "./atlas-maintenance-summary.js";
import { insideERNRecoveryStatus } from "./inside-ern-recovery.js";
import { insideProviderResilience } from "./inside-provider-resilience.js";
import { watchEarthProductBalance } from "./watch-earth-product-balance.js";

export function operationsReport(sources,{queueLimit=20,catalogOptions={},releaseEvidence={},healthObservations=null,providerObservations=null,checkedAt=null}={}){
  const health=catalogHealthSummary(sources),gate=catalogReleaseGate(sources,catalogOptions);
  const release=releaseReadiness(sources,{...releaseEvidence,catalogOptions});
  const business=businessReadiness();
  const earthSignals=earthSignalStatusReport();
  const snapshot=catalogSnapshot(sources,{checkedAt});
  const maintenanceNow=checkedAt?new Date(checkedAt):new Date();
  const atlasMaintenance=atlasMaintenanceSummary(sources,{now:maintenanceNow,limit:10});
  const providerReview=(sources||[]).map(source=>({id:source.id,...providerHostIntegrity(source)})).filter(x=>!x.ok||x.crossProvider);
  const providerBatch=providerObservations===null?null:providerObservationBatch(providerObservations,{observedAt:checkedAt||undefined,knownSourceIds:(sources||[]).map(x=>x.id)});
  const providerPlaybackEvidence=providerPlaybackEvidenceStatus(sources||[],providerObservations||[]);
  const insideERNRecovery=insideERNRecoveryStatus(sources||[],providerObservations||[],{now:maintenanceNow,limit:queueLimit});
  const insideProvider=insideProviderResilience(sources||[]);
  const watchProductBalance=watchEarthProductBalance(sources||[],{now:maintenanceNow});
  const effectiveHealthObservations=healthObservations??providerBatch?.observations??null;
  const observationNow=Date.parse(checkedAt||new Date().toISOString());
  const observationMaxAgeMs=24*60*60*1000;
  const staleObservationIds=effectiveHealthObservations===null?[]:Object.entries(effectiveHealthObservations).filter(([,x])=>{const t=Date.parse(x?.observedAt||"");return !Number.isFinite(t)||observationNow-t>observationMaxAgeMs}).map(([id])=>id);
  const currentHealthObservations=effectiveHealthObservations===null?null:Object.fromEntries(Object.entries(effectiveHealthObservations).filter(([id])=>!staleObservationIds.includes(id)));
  const healthAutomation=effectiveHealthObservations===null?null:(()=>{
    const report=healthCheckReport(sources,effectiveHealthObservations,{checkedAt:checkedAt||undefined,maxObservationAgeHours:24});
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
        inconclusive:report.proposals.filter(x=>x.outcome==="INCONCLUSIVE").map(x=>({id:x.id,observedAt:x.observedAt,reason:effectiveHealthObservations?.[x.id]?.reason||"Current media not confirmed"})),
        definitiveFailures:report.proposals.filter(x=>x.outcome==="DEFINITIVE_FAILURE").map(x=>({id:x.id,observedAt:x.observedAt,reason:x.reason})),
        failedChecks:report.proposals.filter(x=>x.outcome==="FAILED_CHECK").map(x=>({id:x.id,observedAt:x.observedAt,reason:x.reason}))
      },
      changes:report.changes,
      unobserved:report.unobserved,
      unknownObservationIds:report.unknownObservationIds,
      invalidObservations:report.invalidObservations,
      providerInput:providerBatch?{accepted:providerBatch.total,current:providerBatch.total-staleObservationIds.length,rejected:providerBatch.rejected,staleObservationIds,evidenceDebt:(sources||[]).filter(source=>source.playback==="EMBED"&&!currentHealthObservations?.[source.id]).map(source=>({id:source.id,health:source.health,checkedAt:source.checkedAt||null,lastSuccessfulCheck:source.lastSuccessfulCheck||null,priority:source.health==="DEGRADED"?100:source.health==="UNKNOWN"?80:source.checkedAt?60:70,requiredEvidence:source.playback==="EMBED"?["MEDIA_ENDPOINT","HUMAN_PLAYBACK"]:[],action:source.health==="DEGRADED"?"REPROVE_PLAYBACK":"VERIFY_CURRENT_PLAYBACK",reason:staleObservationIds.includes(source.id)?"STALE_EVIDENCE":source.health==="DEGRADED"?"DEGRADED_WITHOUT_CURRENT_EVIDENCE":"MISSING_CURRENT_EVIDENCE",provider:source.provider||null,sourceUrl:source.sourceUrl||null,embedUrl:source.embedUrl||null})).sort((a,b)=>b.priority-a.priority||(Date.parse(a.lastSuccessfulCheck||a.checkedAt||0)||0)-(Date.parse(b.lastSuccessfulCheck||b.checkedAt||0)||0)||a.id.localeCompare(b.id)),evidenceDebtSummary:{total:(sources||[]).filter(source=>source.playback==="EMBED"&&!currentHealthObservations?.[source.id]).length,degraded:(sources||[]).filter(source=>source.playback==="EMBED"&&source.health==="DEGRADED"&&!currentHealthObservations?.[source.id]).length,unknown:(sources||[]).filter(source=>source.playback==="EMBED"&&source.health==="UNKNOWN"&&!currentHealthObservations?.[source.id]).length}}:null
    };
  })();

  const observationPriority=new Map((healthAutomation?.outcomeDetails?.definitiveFailures||[]).map(x=>[x.id,{boost:100,reason:"DEFINITIVE_FAILURE"}]));
  for(const x of healthAutomation?.outcomeDetails?.failedChecks||[])if(!observationPriority.has(x.id))observationPriority.set(x.id,{boost:80,reason:"FAILED_CHECK"});
  for(const x of healthAutomation?.outcomeDetails?.inconclusive||[])if(!observationPriority.has(x.id))observationPriority.set(x.id,{boost:60,reason:"INCONCLUSIVE_MEDIA"});
  const queue=buildRevalidationQueue(sources).map(x=>{const overlay=observationPriority.get(x.source.id);return overlay?{...x,priority:x.priority+overlay.boost,reason:[overlay.reason,x.reason].filter(Boolean).join("+")} : x}).sort((a,b)=>b.priority-a.priority||String(a.source.id).localeCompare(String(b.source.id)));

  const watchNow=checkedAt?new Date(checkedAt):new Date();
  const watchItems=buildDynamicWatchEarth(sources,{limit:20,now:watchNow});
  const watchSnapshot=watchEarthSnapshot(watchItems,{limit:20,now:watchNow});
  const watchSequence=watchEarthSequenceDiagnostics(watchItems);

  return{
    generatedAt:checkedAt||new Date().toISOString(),
    snapshot,
    watchEarth:{...watchSnapshot,...watchSequence,target:20,shortfall:Math.max(0,20-watchSnapshot.count),providerResilient:watchSequence.resilience==="DIVERSE"},
    health,
    gate:{ready:gate.ready,blockers:gate.blockers,currentHealthy:gate.currentHealthy,currentInsideERN:gate.currentInsideERN,unknown:gate.unknown,rejected:gate.rejected,rejectedDetails:gate.rejectedDetails||[]},
    release:{ready:release.ready,blockers:release.blockers,checks:release.checks,evidence:release.evidence},
    healthAutomation,
    providerReview:{total:providerReview.length,unsafe:providerReview.filter(x=>!x.ok),reviewRequired:providerReview.filter(x=>x.reviewRequired),crossProvider:providerReview.filter(x=>x.crossProvider)},
    providerPlaybackEvidence,
    insideERNRecovery,
    insideProviderResilience:insideProvider,
    watchEarthProductBalance:watchProductBalance,
    productActivation:{business,earthSignals},
    maintenance:{atlas:atlasMaintenance,sourceRevalidation:{total:queue.length,next:queue.slice(0,10).map(x=>({id:x.source.id,title:x.source.title,priority:x.priority,reason:x.reason}))}},
    revalidation:{total:queue.length,next:queue.slice(0,queueLimit).map(x=>({id:x.source.id,title:x.source.title,priority:x.priority,reason:x.reason,health:x.source.health,playback:x.source.playback,permission:x.source.permission}))}
  };
}
