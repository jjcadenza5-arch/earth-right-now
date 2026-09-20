import { arrangeWatchEarthJourney } from "./watch-earth-story-flow.js";
export function reconcileWatchEarthJourney(previous=[],refreshed=[],{limit=20,currentId=null,maxCarryRatio=.7,now=new Date()}={}){
 const fresh=[...(refreshed||[])].filter(Boolean),freshById=new Map(fresh.map(s=>[s.id,s])),target=Math.min(Math.max(0,limit),fresh.length);
 if(!target)return[];
 const out=[],used=new Set();
 const add=s=>{if(!s||used.has(s.id)||out.length>=target)return false;out.push(s);used.add(s.id);return true};
 if(currentId)add(freshById.get(currentId));
 const carryCap=Math.max(currentId&&used.has(currentId)?1:0,Math.floor(target*Math.min(1,Math.max(0,maxCarryRatio))));
 for(const old of previous||[]){if(out.length>=carryCap)break;add(freshById.get(old?.id))}
 const additions=[];for(const s of fresh)if(!used.has(s.id))additions.push(s);
 const arranged=arrangeWatchEarthJourney(additions,{now});for(const s of arranged)add(s);
 return out;
}
