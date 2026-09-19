import { catalogCoverage } from "./catalog-coverage.js";
export function catalogBalance(sources){
 const c=catalogCoverage(sources),insideRatio=c.sources?c.playback.insideERN/c.sources:0,categoryCounts=Object.values(c.categories);
 const providerCounts=new Map();for(const s of sources)if(s.provider)providerCounts.set(s.provider,(providerCounts.get(s.provider)||0)+1);
 const largestProvider=providerCounts.size?Math.max(...providerCounts.values()):0,providerConcentration=c.sources?largestProvider/c.sources:0;
 return{...c,providers:providerCounts.size,providerConcentration,insideRatio,categorySpread:categoryCounts.length?Math.max(...categoryCounts)-Math.min(...categoryCounts):0,needsInsidePlayback:insideRatio<.35,needsGeographicBreadth:c.countries<12,needsProviderBreadth:c.sources>=3&&(providerCounts.size<3||providerConcentration>.45)}
}
export function recoveryNeeds(sources){const b=catalogBalance(sources),needs=[];if(b.needsInsidePlayback)needs.push("inside-ERN playable sources");if(b.needsGeographicBreadth)needs.push("more countries");if(b.needsProviderBreadth)needs.push("more provider diversity");const sorted=Object.entries(b.categories).sort((a,b)=>a[1]-b[1]);if(sorted.length)needs.push("underrepresented categories: "+sorted.slice(0,3).map(x=>x[0]).join(", "));return needs}
