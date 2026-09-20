import { currentSource,discoverableSource } from "./discovery-eligibility.js";
import { nowEvidenceClass } from "./now-evidence.js";
const truthRank={LIVE_VIDEO:50,LIVE_IMAGE:40,EXTERNAL_LIVE:35,PARTNER:30,PREVIEW:10};
const playbackRank={EMBED:10,IMAGE_REFRESH:8,EXTERNAL:5,PREVIEW:0};
const editorial=s=>(Number(s?.quality)||0)*.45+(Number(s?.moment)||0)*.35+(Number(s?.freshness)||0)*.2;
export function windowEvidenceTier(s,{now=new Date()}={}){
 if(!discoverableSource(s))return{rank:0,label:"UNAVAILABLE",copy:"No usable window is available right now."};
 const near=nowEvidenceClass(s,{now});
 if(near.label==="LIVE VIDEO")return{rank:5,label:"LIVE VIDEO",copy:"Verified-current moving view."};
 if(near.label==="REFRESHED IMAGE")return{rank:4,label:"REFRESHED IMAGE",copy:"Frequently refreshed near-now image."};
 if(near.label==="EXTERNAL LIVE")return{rank:3,label:"EXTERNAL LIVE",copy:"Current view opens at its provider."};
 if(near.label==="IMAGE SOURCE")return{rank:2,label:"IMAGE SOURCE",copy:"Camera image source; frame freshness is not yet independently verified."};
 if(s.truth==="PREVIEW")return{rank:1,label:"REFERENCE IMAGE",copy:"Reference view — not current."};
 return{rank:2,label:"CURRENT SOURCE",copy:"Available source with its status shown honestly."};
}
export function bestAvailableWindows(sources,{limit=12,now=new Date()}={}){
 return [...(sources||[])].filter(discoverableSource).sort((a,b)=>{const ea=windowEvidenceTier(a,{now}),eb=windowEvidenceTier(b,{now});const ha=a.health==="HEALTHY"?1:0,hb=b.health==="HEALTHY"?1:0;return eb.rank-ea.rank||hb-ha||(truthRank[b.truth]||0)-(truthRank[a.truth]||0)||(playbackRank[b.playback]||0)-(playbackRank[a.playback]||0)||editorial(b)-editorial(a)}).slice(0,limit);
}
