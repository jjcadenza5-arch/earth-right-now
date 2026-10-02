import fs from "node:fs";
import {DISCOVERY_LOCALES,DISCOVERY_LOCALE_COPY,EDITORIAL_COLLECTION_LOCALES,LOCALIZED_DISCOVERY_SAFETY} from "../src/editorial-collections-l10n.js";
import {EDITORIAL_COLLECTIONS} from "../src/editorial-collections.js";

const registry=JSON.parse(fs.readFileSync("data/phase9-localized-discovery-registry.json","utf8"));
const builder=fs.readFileSync("scripts/build-destination-pages.mjs","utf8");
const issues=[];

const localeCodes=(registry.locales||[]).map(x=>x.code);
if(JSON.stringify(localeCodes)!==JSON.stringify(DISCOVERY_LOCALES))issues.push("LOCALE_REGISTRY_MISMATCH");
if(registry.defaultLocale!=="en"||registry.xDefaultLocale!=="en")issues.push("DEFAULT_LOCALE_MISMATCH");
for(const row of registry.locales||[]){
  if(!DISCOVERY_LOCALE_COPY[row.code])issues.push("MISSING_DISCOVERY_COPY_"+row.code);
  if(!row.languageName||typeof row.pathPrefix!=="string")issues.push("INVALID_LOCALE_ROW_"+row.code);
}
const collectionIds=EDITORIAL_COLLECTIONS.map(x=>x.id);
if(JSON.stringify(registry.collections||[])!==JSON.stringify(collectionIds))issues.push("COLLECTION_REGISTRY_MISMATCH");
for(const id of collectionIds){
  const row=EDITORIAL_COLLECTION_LOCALES[id];
  if(!row)issues.push("MISSING_COLLECTION_LOCALIZATION_"+id);
  else for(const locale of DISCOVERY_LOCALES)if(!row[locale]?.title||!row[locale]?.description)issues.push("MISSING_COLLECTION_COPY_"+id+"_"+locale);
}
for(const token of ["localizedDiscoverUrl","discoveryAlternates","localizedDiscoverRows","languageNav","sitemap.xml"]){
  if(!builder.includes(token))issues.push("BUILDER_WIRING_MISSING_"+token);
}
const safety=registry.safety||{};
for(const key of ["changesSourceTruth","changesPlaybackEligibility","changesCollectionMembership","automaticTranslationAllowed","paidRankingAllowed","requiresAnalytics","requiresSocialAccount","automaticExternalActionAllowed"]){
  if(safety[key]!==false)issues.push("SAFETY_BOUNDARY_"+key);
}
if(LOCALIZED_DISCOVERY_SAFETY.changesSourceTruth!==false||LOCALIZED_DISCOVERY_SAFETY.changesCollectionMembership!==false||LOCALIZED_DISCOVERY_SAFETY.automaticTranslationAllowed!==false||LOCALIZED_DISCOVERY_SAFETY.paidRankingAllowed!==false||LOCALIZED_DISCOVERY_SAFETY.requiresAnalytics!==false)issues.push("L10N_SAFETY_EXPORT_MISMATCH");

const report={
  schemaVersion:1,
  phase:9,
  label:"Localized Discovery Registry",
  valid:issues.length===0,
  localeCount:localeCodes.length,
  collectionCount:collectionIds.length,
  defaultLocale:registry.defaultLocale,
  xDefaultLocale:registry.xDefaultLocale,
  issues,
  safety
};
console.log(JSON.stringify(report,null,2));
if(issues.length)process.exitCode=1;
