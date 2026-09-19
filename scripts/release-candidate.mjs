import { readFile } from "node:fs/promises";
import { catalogStats } from "../src/catalog-stats.js";
import { releaseReadiness } from "../src/release-readiness.js";
import { businessReadiness } from "../src/business-readiness.js";
const rows=JSON.parse(await readFile(new URL("../data/sources.json",import.meta.url),"utf8"));
const evidence=JSON.parse(await readFile(new URL("../data/release-evidence.json",import.meta.url),"utf8"));
const stats=catalogStats(rows);
const release=releaseReadiness(rows,evidence);
const business=businessReadiness();
console.log(JSON.stringify({
 generatedAt:new Date().toISOString(),
 candidate:{sources:stats.total,countries:stats.countries,providers:stats.providers,currentInsideERN:release.catalog.currentInsideERN},
 catalogReady:release.checks.catalog,
 publicationReady:release.ready,
 releaseBlockers:release.blockers,
 business:{score:business.score,foundationReady:business.foundationReady,commerciallyActive:business.commerciallyActive,remaining:business.remaining}
},null,2));
if(!release.checks.catalog)process.exitCode=1;
