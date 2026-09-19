import { groupByPlace } from "./place-model.js";
import { searchEarth } from "./search-engine.js";

export function atlasDestinationResults(sources,filters={},query=""){
  const base=query?.trim()?searchEarth(sources,query):sources;
  const places=groupByPlace(base);
  return places.filter(place=>{
    if(filters.current&&!(place.sources||[]).some(s=>s.health==="HEALTHY"))return false;
    if(filters.inside&&!(place.sources||[]).some(s=>s.permission==="EMBED_ALLOWED"||s.permission==="PARTNER_PERMISSION"))return false;
    return true;
  });
}
