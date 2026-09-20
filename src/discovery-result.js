import { destinationSearchSummary } from "./destination-search.js";
import { rankDestinationsForIntent } from "./ern-ai-destinations.js";
import { interpretEarthIntent } from "./earth-intent.js";
export function discoveryResult(sources,query,{limit=12,mode="search",taste=null,now=new Date()}={}){
 const q=String(query||"").trim();if(!q)return{query:q,items:[],count:0,windowCount:0,empty:false,currentIntent:false};
 const intent=interpretEarthIntent(q),items=(mode==="ai"?rankDestinationsForIntent(sources,q,{taste,now}):destinationSearchSummary(sources,q,{now}).destinations).slice(0,Math.max(0,limit));
 const windowCount=items.reduce((n,p)=>n+(p.sources?.length||0),0),referenceCount=items.reduce((n,p)=>n+(p.sources||[]).filter(s=>s.truth==="PREVIEW"||s.playback==="PREVIEW").length,0);
 return{query:q,items,count:items.length,windowCount,referenceCount,empty:items.length===0,currentIntent:intent.wantsCurrent};
}
export function discoveryStatus(result={}){
 if(!result.query)return"";
 if(result.empty)return result.currentIntent?"No verified-current destination matches yet. Try another place or remove “live/now”.":"No matching destination yet. Try a place, country, landscape, wildlife, coast, mountain or city.";
 const liveLike=Math.max(0,result.windowCount-(result.referenceCount||0));const parts=[result.count+" destination"+(result.count===1?"":"s")];if(liveLike)parts.push(liveLike+" window"+(liveLike===1?"":"s"));if(result.referenceCount)parts.push(result.referenceCount+" reference "+(result.referenceCount===1?"image":"images"));return parts.join(" · ");
}
