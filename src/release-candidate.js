import { publicationInventory,inventoryPublicationWarnings } from "./publication-inventory.js";
import { releaseEvidenceSummary } from "./release-evidence.js";

export function buildReleaseCandidate(rows,evidence={},options={}){
  const inventory=publicationInventory(rows);
  const sourceWarnings=inventoryPublicationWarnings(rows);
  const publication=releaseEvidenceSummary(rows,evidence,{...options,catalogOptions:{...(options.catalogOptions||{}),minimumCurrentHealthy:options.catalogOptions?.minimumCurrentHealthy??1,minimumInsideERN:options.catalogOptions?.minimumInsideERN??1}});
  return{
    generatedAt:new Date(options.now||Date.now()).toISOString(),
    releasable:publication.ready&&sourceWarnings.ok,
    inventory,
    sourceWarnings:sourceWarnings.warnings,
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
    `Source rechecks: ${(c.recheckIds||[]).length}`
  ].join("\n");
}
