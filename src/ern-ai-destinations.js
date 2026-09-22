import { discoveryMix } from "./small-place-discovery.js";import { rankForIntent } from "./ern-ai.js";
import { groupByPlace } from "./place-model.js";
import { destinationRank } from "./destination-engine.js";

export function rankDestinationsForIntent(sources,query="",options={}){
 const ranked=rankForIntent(sources,query,options),sourcePosition=new Map(ranked.map((s,i)=>[s.id,i]));
 const ordered=groupByPlace(ranked,options).sort((a,b)=>{
  const ai=Math.min(...(a.sources||[]).map(s=>sourcePosition.get(s.id)??Infinity)),bi=Math.min(...(b.sources||[]).map(s=>sourcePosition.get(s.id)??Infinity));
  return ai-bi||destinationRank(b,options)-destinationRank(a,options);
 });
 return discoveryMix(ordered,{limit:ordered.length,promote:ordered.length>=4});
}
