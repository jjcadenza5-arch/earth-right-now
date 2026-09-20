export function reconcileWatchEarthJourney(previous=[],refreshed=[],{limit=20,currentId=null,maxCarryRatio=.7}={}){
 const fresh=[...(refreshed||[])].filter(Boolean),freshById=new Map(fresh.map(s=>[s.id,s])),target=Math.min(Math.max(0,limit),fresh.length);
 if(!target)return[];
 const out=[],used=new Set();
 const add=s=>{if(!s||used.has(s.id)||out.length>=target)return false;out.push(s);used.add(s.id);return true};
 if(currentId)add(freshById.get(currentId));
 const carryCap=Math.max(currentId&&used.has(currentId)?1:0,Math.floor(target*Math.min(1,Math.max(0,maxCarryRatio))));
 for(const old of previous||[]){if(out.length>=carryCap)break;add(freshById.get(old?.id))}
 for(const s of fresh)add(s);
 return out;
}
