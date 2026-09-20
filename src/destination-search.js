import { searchEarth } from "./search-engine.js";
import { groupByPlace } from "./place-model.js";
import { destinationRank } from "./destination-engine.js";
import { bestAvailableWindows } from "./window-evidence.js";
import { nearNowEvidence } from "./now-evidence.js";

export function destinationSearch(sources,query="",{now=new Date()}={}){
 const matches=searchEarth(sources,query,{now}),places=groupByPlace(matches,{now}).map(p=>{const ordered=bestAvailableWindows(p.sources||[],{limit:12,now}),near=ordered.filter(s=>nearNowEvidence(s,{now})),other=ordered.filter(s=>!nearNowEvidence(s,{now}));return{...p,sources:[...near,...other]}});
 return places.sort((a,b)=>destinationRank(b,{now})-destinationRank(a,{now}));
}
export function destinationSearchSummary(sources,query="",options={}){
 const destinations=destinationSearch(sources,query,options),windows=destinations.reduce((n,p)=>n+(p.sources?.length||0),0);
 return{query:String(query||"").trim(),destinations,windowCount:windows,destinationCount:destinations.length};
}
