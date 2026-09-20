import { playbackCapability } from "./playback-capability.js";
import { currentSource,discoverableSource } from "./discovery-eligibility.js";
import { sourceScore } from "./source-score.js";
import { nearNowEvidence } from "./now-evidence.js";

export function groupByPlace(sources,{now=new Date()}={}){
  const map=new Map();
  for(const s of sources){
    if(s.id==="recovery-placeholder")continue;
    const key=s.placeId||s.id;
    if(!map.has(key))map.set(key,{id:key,title:s.title,country:s.country,region:s.region,lat:s.lat,lon:s.lon,categories:new Set(),sources:[]});
    const p=map.get(key);p.sources.push(s);for(const c of s.categories||[])p.categories.add(c);
  }
  return[...map.values()].map(p=>{const place={...p,categories:[...p.categories]};return{...place,preferred:bestWindow(place,{now})};});
}

export function bestWindow(place,{now=new Date()}={}){
  const sources=(place?.sources||[]).filter(discoverableSource);
  return[...sources].sort((a,b)=>{
    const an=nearNowEvidence(a,{now})?1:0,bn=nearNowEvidence(b,{now})?1:0;if(an!==bn)return bn-an;
    const ac=currentSource(a,{now})?1:0,bc=currentSource(b,{now})?1:0;if(ac!==bc)return bc-ac;
    const ah=a.health==="HEALTHY"?1:0,bh=b.health==="HEALTHY"?1:0;if(ah!==bh)return bh-ah;
    const ap=playbackCapability(a,{now}).action==="PLAY"?1:0,bp=playbackCapability(b,{now}).action==="PLAY"?1:0;if(ap!==bp)return bp-ap;
    return sourceScore(b,{now})-sourceScore(a,{now});
  })[0]||null;
}
