import { searchEarth } from "./search-engine.js";
import { groupByPlace } from "./place-model.js";
import { destinationRank } from "./destination-engine.js";
import { bestAvailableWindows } from "./window-evidence.js";

export function destinationSearch(sources,query="",{now=new Date()}={}){
 const matches=searchEarth(sources,query,{now}),places=groupByPlace(matches,{now}).map(p=>({...p,sources:bestAvailableWindows(p.sources||[],{limit:12,now})}));
 return places.sort((a,b)=>destinationRank(b,{now})-destinationRank(a,{now}));
}
export function destinationSearchSummary(sources,query="",options={}){
 const destinations=destinationSearch(sources,query,options),windows=destinations.reduce((n,p)=>n+(p.sources?.length||0),0);
 return{query:String(query||"").trim(),destinations,windowCount:windows,destinationCount:destinations.length};
}
