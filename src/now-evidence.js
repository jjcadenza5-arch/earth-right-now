import { currentSource } from "./discovery-eligibility.js";
export function nowEvidenceClass(source,{now=new Date()}={}){
 if(currentSource(source,{now})&&source.truth==="LIVE_VIDEO")return{rank:5,label:"LIVE VIDEO",nearNow:true};
 if(currentSource(source,{now})&&source.truth==="LIVE_IMAGE")return{rank:4,label:"REFRESHED IMAGE",nearNow:true};
 if(currentSource(source,{now})&&(source.truth==="EXTERNAL_LIVE"||source.playback==="EXTERNAL"))return{rank:3,label:"EXTERNAL LIVE",nearNow:true};
 if(source?.truth==="PREVIEW"||source?.playback==="PREVIEW")return{rank:1,label:"REFERENCE IMAGE",nearNow:false};
 return{rank:2,label:"AVAILABLE SOURCE",nearNow:false};
}
export function nearNowEvidence(source,options={}){return nowEvidenceClass(source,options).nearNow}
