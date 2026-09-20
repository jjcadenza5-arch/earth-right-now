import { windowEvidenceTier,bestAvailableWindows } from "./window-evidence.js";
import { destinationSummary } from "./destination-engine.js";
import { sourceChoiceCounts } from "./source-choice-summary.js";
export function placeAnswer(place,{now=new Date()}={}){
 const x=destinationSummary(place,{now}),best=bestAvailableWindows(place?.sources||[],{limit:1,now})[0]||null;
 if(!best)return{headline:"No visual view yet",detail:"ERN does not have a usable view for this place yet.",tier:"UNAVAILABLE"};
 const evidence=windowEvidenceTier(best,{now}),choice=x.hasChoice?" "+x.windows+" views are available to choose from.":"";
 const counts=sourceChoiceCounts(place,{now});
 const current=counts.nearNow?(counts.nearNow+" near-now "+(counts.nearNow===1?"view":"views")+" supported by current evidence."):(counts.current?(counts.current+" source "+(counts.current===1?"was":"were")+" recently checked by ERN; visual currentness is not confirmed."):"No recent source check is confirmed for this place.");
 const qualifier=evidence.label==="REFERENCE IMAGE"?"Reference only · not current. ":evidence.label==="REFRESHED IMAGE"?"Near-now refreshed image. ":evidence.label==="EXTERNAL LIVE"?"Opens at the source. ":evidence.label==="IMAGE SOURCE"?"Image source · frame freshness not yet verified. ":"";return{headline:evidence.label,detail:(qualifier+current+choice).trim(),tier:evidence.label};
}
