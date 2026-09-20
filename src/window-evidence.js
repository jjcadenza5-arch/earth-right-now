import { currentSource,discoverableSource } from "./discovery-eligibility.js";
const truthRank={LIVE_VIDEO:50,LIVE_IMAGE:40,EXTERNAL_LIVE:35,PARTNER:30,PREVIEW:10};
const playbackRank={EMBED:10,IMAGE_REFRESH:8,EXTERNAL:5,PREVIEW:0};
const editorial=s=>(Number(s?.quality)||0)*.45+(Number(s?.moment)||0)*.35+(Number(s?.freshness)||0)*.2;
export function windowEvidenceTier(s){
 if(!discoverableSource(s))return{rank:0,label:"UNAVAILABLE",copy:"No usable window is available right now."};
 if(currentSource(s)&&s.truth==="LIVE_VIDEO")return{rank:5,label:"LIVE VIDEO",copy:"Verified-current moving view."};
 if(currentSource(s)&&s.truth==="LIVE_IMAGE")return{rank:4,label:"LIVE IMAGE",copy:"Verified-current refreshed view."};
 if(currentSource(s)&&(s.truth==="EXTERNAL_LIVE"||s.playback==="EXTERNAL"))return{rank:3,label:"EXTERNAL LIVE",copy:"Current view opens at its provider."};
 if(s.truth==="PREVIEW")return{rank:1,label:"PREVIEW",copy:"Reference view — not live."};
 return{rank:2,label:"CURRENT SOURCE",copy:"Available source with its status shown honestly."};
}
export function bestAvailableWindows(sources,{limit=12}={}){
 return [...(sources||[])].filter(discoverableSource).sort((a,b)=>{const ea=windowEvidenceTier(a),eb=windowEvidenceTier(b);return eb.rank-ea.rank||(truthRank[b.truth]||0)-(truthRank[a.truth]||0)||(playbackRank[b.playback]||0)-(playbackRank[a.playback]||0)||editorial(b)-editorial(a)}).slice(0,limit);
}
