import { readFile } from "node:fs/promises";
import { catalogBalance,recoveryNeeds } from "../src/catalog-balance.js";
const rows=JSON.parse(await readFile(new URL("../data/sources.json",import.meta.url),"utf8"));
const b=catalogBalance(rows);
const report={
 sources:b.sources,countries:b.countries,providers:b.providers,
 insideERN:b.playback.insideERN,external:b.playback.external,unavailable:b.playback.unavailable,
 insideRatio:Number(b.insideRatio.toFixed(3)),providerConcentration:Number(b.providerConcentration.toFixed(3)),
 categories:b.categories,recoveryNeeds:recoveryNeeds(rows)
};
console.log("ERN catalog balance");
console.log(JSON.stringify(report,null,2));
