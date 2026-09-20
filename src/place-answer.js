import { windowEvidenceTier } from "./window-evidence.js";
import { destinationSummary } from "./destination-engine.js";
export function placeAnswer(place){
 const x=destinationSummary(place),best=place?.preferred||place?.sources?.[0]||null;
 if(!best)return{headline:"No visual window yet",detail:"ERN does not have a usable view for this place yet.",tier:"UNAVAILABLE"};
 const evidence=windowEvidenceTier(best),choice=x.hasChoice?" "+x.windows+" views are available to choose from.":"";
 const current=x.current?(x.current+" current "+(x.current===1?"window":"windows")+" checked by ERN."):"No current check is confirmed for this place.";
 return{headline:evidence.label,detail:(current+choice).trim(),tier:evidence.label};
}
