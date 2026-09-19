import { catalogBalance,recoveryNeeds } from "../src/catalog-balance.js";
const source=(id,country,provider,categories=["Cities & Streets"],action="EXTERNAL")=>({id,country,provider,categories,truth:action==="PLAY"?"LIVE_VIDEO":"EXTERNAL_LIVE",health:"HEALTHY",permission:action==="PLAY"?"EMBED_ALLOWED":"LINK_ONLY",playback:action==="PLAY"?"EMBED":"EXTERNAL",sourceUrl:"https://example.com/"+id,embedUrl:action==="PLAY"?"https://www.youtube.com/embed/"+id:undefined,checkedAt:"2026-09-19"});
const clustered=[source("a","A","Same"),source("b","B","Same"),source("c","C","Same")];
const x=catalogBalance(clustered);
console.assert(x.providers===1&&x.providerConcentration===1&&x.needsProviderBreadth,"provider concentration must be visible");
console.assert(recoveryNeeds(clustered).includes("more provider diversity"),"recovery priorities must request provider diversity");
const broad=Array.from({length:12},(_,i)=>source("s"+i,"C"+i,"P"+i,["Cities & Streets"],i<5?"PLAY":"EXTERNAL"));
const y=catalogBalance(broad);console.assert(!y.needsGeographicBreadth&&!y.needsProviderBreadth&&!y.needsInsidePlayback);
console.log("ERN catalog balance smoke checks passed");
