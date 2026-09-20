import { readFile } from "node:fs/promises";
import { catalogStats } from "../src/catalog-stats.js";
import { releaseReadiness } from "../src/release-readiness.js";
import { businessReadiness } from "../src/business-readiness.js";
import { candidateEvidenceStatus } from "../src/release-evidence.js";
const rows=JSON.parse(await readFile(new URL("../data/sources.json",import.meta.url),"utf8"));
const evidence=JSON.parse(await readFile(new URL("../data/release-evidence.json",import.meta.url),"utf8"));
const stats=catalogStats(rows);
const release=releaseReadiness(rows,evidence);
const business=businessReadiness();
const candidateCommit=String(process.env.GITHUB_SHA||process.env.ERN_COMMIT_SHA||"").trim();
const evidenceBinding=candidateEvidenceStatus(evidence,candidateCommit);
const publicationReadyForCandidate=release.ready&&evidenceBinding.allBound;
const candidateBlockers=[...release.blockers,...(evidenceBinding.allBound?[]:[`Release evidence is not bound to candidate ${candidateCommit||"(missing commit)"}`])];
console.log(JSON.stringify({
 generatedAt:new Date().toISOString(),
 candidate:{sources:stats.total,countries:new Set(rows.map(x=>x.country).filter(Boolean)).size,providers:new Set(rows.map(x=>x.provider).filter(Boolean)).size,currentInsideERN:release.catalog.currentInsideERN},
 catalogReady:release.checks.catalog,
 publicationReady:release.ready,
 releaseBlockers:release.blockers,
 evidenceBinding,
 business:{score:business.score,foundationReady:business.foundationReady,commerciallyActive:business.commerciallyActive,remaining:business.remaining}
},null,2));
if(!release.checks.catalog)process.exitCode=1;
