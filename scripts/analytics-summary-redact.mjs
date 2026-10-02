import fs from "node:fs";
const file=process.argv[2];if(!file)throw new Error("analytics summary path required");
const x=JSON.parse(fs.readFileSync(file,"utf8"));
const sum=(rows=[])=>rows.reduce((n,r)=>n+(Number(r?.count)||0),0);
const out={
 schemaVersion:1,
 generatedAt:x.generatedAt||new Date().toISOString(),
 windowDays:x.windowDays||30,
 visitors:x.visitors||{},
 devices:x.devices||[],
 countries:x.countries||[],
 regions:x.regions||[],
 referrers:x.referrers||[],
 places:x.places||[],
 sources:x.sources||[],
 commercialOffers:x.commercialOffers||[],
 commercialPlaces:x.commercialPlaces||[],
 externalSources:x.externalSources||[],
 events:x.events||[],
 searchLearning:{
   searchesPerformed:sum(x.searches),
   zeroResultSearches:sum(x.searchGaps),
   distinctAggregatedSearchTerms:Array.isArray(x.searches)?x.searches.length:0,
   distinctZeroResultTerms:Array.isArray(x.searchGaps)?x.searchGaps.length:0,
   highestGapCount:Math.max(0,...(x.searchGaps||[]).map(r=>Number(r?.count)||0)),
   detailedTermsStoredOnlyInPrivateOperationsArtifact:true
 },
 privacy:x.privacy||{}
};
console.log(JSON.stringify(out,null,2));
