import { destinationSearchSummary } from "./destination-search.js";
import { rankDestinationsForIntent } from "./ern-ai-destinations.js";
import { interpretEarthIntent } from "./earth-intent.js";
export function discoveryResult(sources,query,{limit=12,mode="search"}={}){
 const q=String(query||"").trim();if(!q)return{query:q,items:[],count:0,windowCount:0,empty:false,currentIntent:false};
 const intent=interpretEarthIntent(q),items=(mode==="ai"?rankDestinationsForIntent(sources,q):destinationSearchSummary(sources,q).destinations).slice(0,Math.max(0,limit));
 const windowCount=items.reduce((n,p)=>n+(p.sources?.length||0),0);
 return{query:q,items,count:items.length,windowCount,empty:items.length===0,currentIntent:intent.wantsCurrent};
}
export function discoveryStatus(result={}){
 if(!result.query)return"";
 if(result.empty)return result.currentIntent?"No verified-current destination matches yet. Try another place or remove “live/now”.":"No matching destination yet. Try a place, country, landscape, wildlife, coast, mountain or city.";
 return result.count+" destination"+(result.count===1?"":"s")+" · "+result.windowCount+" window"+(result.windowCount===1?"":"s");
}
