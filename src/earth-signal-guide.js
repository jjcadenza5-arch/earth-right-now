import {earthSignalViewModel} from "./earth-signal-view-model.js";
export function earthSignalsForPlace(signals,placeId,{now=new Date()}={}){
 return(signals||[]).filter(s=>s?.placeId===placeId).map(s=>earthSignalViewModel(s,{now})).filter(Boolean).sort((a,b)=>new Date(b.createdAt)-new Date(a.createdAt));
}
export function earthSignalGuideSummary(signals,place,{now=new Date()}={}){
 const visible=earthSignalsForPlace(signals,place?.id,{now});if(!visible.length)return null;
 const first=visible[0],extra=visible.length-1,where=place?.title||first.placeLabel||"this place";
 return{kind:"VISITOR_REPORT",count:visible.length,text:`Visitors are reporting ${first.label.toLowerCase()} at ${where} ${first.ageLabel.toLowerCase()}${extra?`, with ${extra} other recent signal${extra===1?"":"s"}`:""}.`,followUp:"Show me this place"};
}
