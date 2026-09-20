import { windowEvidenceTier,bestAvailableWindows } from "./window-evidence.js";
import { destinationSummary } from "./destination-engine.js";
export function placeAnswer(place,{now=new Date()}={}){
 const x=destinationSummary(place,{now}),best=bestAvailableWindows(place?.sources||[],{limit:1,now})[0]||null;
 if(!best)return{headline:"No visual view yet",detail:"ERN does not have a usable view for this place yet.",tier:"UNAVAILABLE"};
 const evidence=windowEvidenceTier(best,{now}),choice=x.hasChoice?" "+x.windows+" views are available to choose from.":"";
 const current=x.current?(x.current+" current/live "+(x.current===1?"view":"views")+" checked by ERN."):"No current check is confirmed for this place.";
 return{headline:evidence.label,detail:(current+choice).trim(),tier:evidence.label};
}
