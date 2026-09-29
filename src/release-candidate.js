import { publicationInventory,inventoryPublicationWarnings } from "./publication-inventory.js";
import { releaseEvidenceSummary } from "./release-evidence.js";
import {candidateEvidenceStatus} from "./candidate-evidence-binding.js";

export function buildReleaseCandidate(rows,evidence={},options={}){
  const inventory=publicationInventory(rows,options);
  const sourceWarnings=inventoryPublicationWarnings(rows,options);
  const publication=releaseEvidenceSummary(rows,evidence,{...options,catalogOptions:{...(options.catalogOptions||{}),minimumCurrentHealthy:options.catalogOptions?.minimumCurrentHealthy??1,minimumInsideERN:options.catalogOptions?.minimumInsideERN??1}});
  const evidenceBinding=candidateEvidenceStatus(evidence,options.candidateCommit||"");
  const bindingRequired=evidenceBinding.candidateValid;
  return{
    generatedAt:new Date(options.now||Date.now()).toISOString(),
    releasable:publication.ready&&sourceWarnings.ok&&(!bindingRequired||evidenceBinding.allBound),
    inventory,
    sourceWarnings:sourceWarnings.warnings,
    evidenceBinding:{...evidenceBinding,required:bindingRequired},
    publication:{
      ready:publication.ready,
      catalogReady:publication.catalogReady,
      catalog:publication.catalog,
      passed:publication.passed,
      remaining:publication.remaining,
      blockers:publication.blockers
    },
    recheckIds:inventory.recheckIds
  };
}

export function releaseCandidateText(candidate){
  const c=candidate||{},p=c.publication||{},i=c.inventory||{};
  return[
    `ERN release candidate: ${c.releasable?"READY":"BLOCKED"}`,
    `Current sources: ${i.current||0} · Inside ERN: ${i.insideERN||0} · External current: ${i.externalCurrent||0}`,
    `Evidence passed: ${(p.passed||[]).join(", ")||"none"}`,
    `Evidence remaining: ${(p.remaining||[]).join(", ")||"none"}`,
    `Evidence binding: ${c.evidenceBinding?.required?(c.evidenceBinding.allBound?"candidate-bound":"mismatch: "+(c.evidenceBinding.unbound||[]).join(", ")):"not candidate-scoped"}`,
    `Source rechecks: ${(c.recheckIds||[]).length}`
  ].join("\n");
}
