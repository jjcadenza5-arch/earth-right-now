import {earthSignalViewModel} from "./earth-signal-view-model.js";
export function earthNowFeed(signals=[],places=[],{now=new Date(),limit=12}={}){
 const byId=new Map((places||[]).map(p=>[p.id,p]));
 return(signals||[]).map(s=>{const view=earthSignalViewModel(s,{now});if(!view)return null;const place=byId.get(view.placeId);return place?{...view,placeTitle:place.title||view.placeLabel||"Earth",region:place.region||null,country:place.country||null}:null}).filter(Boolean).sort((a,b)=>new Date(b.createdAt)-new Date(a.createdAt)).slice(0,Math.max(0,limit));
}
export function earthNowHeadline(feed=[]){
 if(!feed.length)return{active:false,title:"Earth is happening",text:"Fresh visitor signals will appear here when the contribution network is active."};
 const places=new Set(feed.map(x=>x.placeId)).size;
 return{active:true,title:"Earth is happening",text:`${feed.length} fresh signal${feed.length===1?"":"s"} across ${places} place${places===1?"":"s"} right now.`};
}
