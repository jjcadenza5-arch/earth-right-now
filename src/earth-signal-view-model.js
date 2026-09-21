import {earthSignalState,publicEarthSignal} from "./earth-signals.js";
const LABELS={RAINING:"Raining here",BEAUTIFUL_LIGHT:"Beautiful light",BUSY:"Busy",PEACEFUL:"Peaceful",SOMETHING_HAPPENING:"Something happening",WORTH_SEEING:"Worth seeing now"};
export function earthSignalViewModel(signal,{now=new Date()}={}){
 const state=earthSignalState(signal,{now});if(!state.visible)return null;
 const pub=publicEarthSignal(signal),age=state.ageMinutes===0?"Happening now":state.ageMinutes===1?"1 min ago":state.ageMinutes+" min ago";
 return{...pub,label:LABELS[pub.type]||"Visitor report",ageLabel:age,expiryLabel:"Expires in "+state.expiresInMinutes+" min",evidenceLabel:"EARTH SIGNAL",locationLabel:pub.nearPlaceVerified?"Near this place ✓":"Visitor-submitted · location not verified"};
}
export function earthSignalSummary(signals,{now=new Date()}={}){
 const visible=(signals||[]).map(s=>earthSignalViewModel(s,{now})).filter(Boolean);
 if(!visible.length)return{count:0,text:""};
 const kinds=[...new Set(visible.map(x=>x.label.toLowerCase()))];
 return{count:visible.length,text:`${visible.length} visitor signal${visible.length===1?"":"s"} right now · ${kinds.slice(0,2).join(" · ")}`};
}
