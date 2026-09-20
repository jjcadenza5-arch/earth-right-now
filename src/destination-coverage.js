import { currentSource,discoverableSource } from "./discovery-eligibility.js";
export function destinationCoverage(places=[],{now=new Date()}={}){
 const countries=new Set(),regions=new Set();let current=0,windows=0,choices=0,referenceOnly=0;
 for(const p of places){if(p?.country)countries.add(p.country);if(p?.region)regions.add(p.region);const ss=(p?.sources||[]).filter(discoverableSource),currentWindows=ss.filter(s=>currentSource(s,{now}));windows+=ss.length;if(ss.length>1)choices++;if(currentWindows.length)current++;if(ss.length&&!currentWindows.length&&ss.every(s=>s.truth==="PREVIEW"||s.playback==="PREVIEW"))referenceOnly++}
 return{destinations:places.length,windows,countries:countries.size,regions:regions.size,multiWindowDestinations:choices,currentDestinations:current,referenceOnlyDestinations:referenceOnly};
}
export function destinationCoverageCopy(places=[],options={}){const x=destinationCoverage(places,options);return x.destinations?x.destinations+" destinations · "+x.windows+" views · "+x.countries+" countries":"No destinations in this view"}
