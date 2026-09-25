import {earthSignalViewModel} from "./earth-signal-view-model.js";
import {earthSignalPulse,earthSignalPulseText} from "./earth-signal-pulse.js";

export function earthSignalsForPlace(signals,placeId,{now=new Date()}={}){
 return(signals||[]).filter(s=>s?.placeId===placeId).map(s=>earthSignalViewModel(s,{now})).filter(Boolean).sort((a,b)=>new Date(b.createdAt)-new Date(a.createdAt));
}

export function earthSignalGuideSummary(signals,place,{now=new Date()}={}){
 const pulse=earthSignalPulse(signals,place?.id,{now});
 if(!pulse.count)return null;
 const where=place?.title||pulse.leading?.placeLabel||"this place";
 return{
  kind:"VISITOR_REPORT",
  count:pulse.count,
  verified:false,
  evidenceKind:pulse.evidenceKind,
  text:earthSignalPulseText(pulse,where),
  truth:pulse.truth,
  followUp:"Show me this place"
 };
}
