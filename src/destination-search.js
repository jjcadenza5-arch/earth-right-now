import { searchEarth } from "./search-engine.js";
import { groupByPlace } from "./place-model.js";
import { destinationRank } from "./destination-engine.js";

export function destinationSearch(sources,query=""){
 const matches=searchEarth(sources,query),places=groupByPlace(matches);
 return places.sort((a,b)=>destinationRank(b)-destinationRank(a));
}
export function destinationSearchSummary(sources,query=""){
 const destinations=destinationSearch(sources,query),windows=destinations.reduce((n,p)=>n+(p.sources?.length||0),0);
 return{query:String(query||"").trim(),destinations,windowCount:windows,destinationCount:destinations.length};
}
