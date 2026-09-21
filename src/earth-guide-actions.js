import { interpretEarthIntent } from "./earth-intent.js";
const norm=q=>String(q||"").toLowerCase().trim();
export function earthGuideAction(query){
 const q=norm(query),intent=interpretEarthIntent(q);
 if(/surprise me|somewhere random|random window|never heard of|unexpected/.test(q))return{type:"SURPRISE"};
 if(/completely different|somewhere different|something different/.test(q))return{type:"DIFFERENT"};
 if(/what(?: is|[’']s) good on earth right now/.test(q))return{type:"LIVE_NOW"};
 if(intent.wantsCurrent&&intent.intents.length===0&&(/^(show me )?(what is |what's )?(live|current|right now|live right now|current right now)/.test(q)||/^(what(?: is|'s) happening|what can i see|show me earth) right now\??$/.test(q)))return{type:"LIVE_NOW"};
 return{type:"SEARCH"};
}
export function differentFrom(items,current,{limit=8}={}){const country=current?.country,region=current?.region,place=current?.placeId||current?.id;const far=(items||[]).filter(s=>(s.placeId||s.id)!==place&&s.country!==country&&s.region!==region);const near=(items||[]).filter(s=>(s.placeId||s.id)!==place);return(far.length?far:near).slice(0,limit)}
